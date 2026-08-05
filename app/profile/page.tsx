"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, setCurrentUser } from "@/lib/currentUser";


type User = {
  id: string;
  name: string;
  coupleId?: string;
  coupleCode?: string;
  partnerId?: string;
  partnerName?: string;
};



export default function Profile() {


  const [user,setUser] = useState<User | null>(null);

  const [editName,setEditName] = useState(false);

  const [name,setName] = useState("");

  const [code,setCode] = useState("");

  const [copied,setCopied] = useState(false);





  async function refreshUser(){


    const current = getCurrentUser();


    if(!current.id) return;



    const res = await fetch("/api/users");


    const users:User[] = await res.json();



    const fresh =
      users.find(
        u=>u.id === current.id
      );



    if(fresh){

      setCurrentUser(fresh);

      setUser(fresh);

      setName(fresh.name);

    } else {

      setUser(current);

      setName(current.name);

    }


  }




  useEffect(()=>{

    refreshUser();

  },[]);





  function saveName(){


    if(!name.trim()) return;



    const updated = {

      ...getCurrentUser(),

      name:name.trim(),

    };



    setCurrentUser(updated);

    setUser(updated);

    setEditName(false);



    fetch("/api/users",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify(updated),

    });


  }





  function copyCode(){


    if(!user?.coupleCode) return;


    navigator.clipboard.writeText(
      user.coupleCode
    );


    setCopied(true);



    setTimeout(()=>{

      setCopied(false);

    },1500);


  }





  async function createPair(){


    const current =
      getCurrentUser();



    const updated = {

      ...current,


      coupleId:
        crypto.randomUUID(),


      coupleCode:
        "LOVE-" +
        Math.random()
        .toString(36)
        .substring(2,6)
        .toUpperCase(),

    };



    setCurrentUser(updated);

    setUser(updated);



    await fetch("/api/users",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify(updated),

    });


  }






 async function joinPair(){


    if(!code.trim()) return;



    const res =
      await fetch("/api/users");



    const users:User[] =
      await res.json();





    const partner =
      users.find(
        u=>u.coupleCode === code.trim()
      );




    if(!partner){

      alert("Код пары не найден");

      return;

    }




    const current =
      getCurrentUser();





    const updatedCurrent:User = {


      ...current,


      coupleId:
        partner.coupleId,


      coupleCode:
        partner.coupleCode,


      partnerId:
        partner.id,


      partnerName:
        partner.name,

    };






    const updatedPartner:User = {


      ...partner,


      partnerId:
        current.id,


      partnerName:
        current.name,

    };






    await fetch("/api/users",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:
        JSON.stringify(updatedPartner),

    });






    await fetch("/api/users",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:
        JSON.stringify(updatedCurrent),

    });





    setCurrentUser(updatedCurrent);

    setUser(updatedCurrent);

    setCode("");


  }





  function logout(){

    localStorage.removeItem(
      "currentUser"
    );

    window.location.reload();

  }






  if(!user){

    return null;

  }






  return (

    <main
      className="
        min-h-screen
        bg-[#F7F3EE]
        p-6
      "
    >


      <h1
        className="
          text-4xl
          font-bold
          text-[#1C1C1E]
        "
      >
        Профиль 👤
      </h1>





      <div
        className="
          mt-8
          rounded-[36px]
          bg-[#1C1C1E]
          p-8
          text-white
          shadow-xl
        "
      >



        <div className="flex items-center gap-5">


          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-white
              text-4xl
            "
          >
            👤
          </div>




          <div className="flex-1">


            <p className="text-sm text-neutral-400">
              Пользователь
            </p>




            {!editName ? (


              <div className="flex items-center gap-3">


                <h2 className="text-3xl font-semibold">
                  {user.name}
                </h2>


                <button
                  onClick={()=>setEditName(true)}
                >
                  ✏️
                </button>


              </div>


            ) : (


              <div className="mt-2 flex gap-2">


                <input

                  value={name}

                  onChange={
                    e=>setName(e.target.value)
                  }

                  className="
                    w-full
                    rounded-xl
                    bg-white
                    px-3
                    py-2
                    text-black
                  "

                />


                <button

                  onClick={saveName}

                  className="
                    rounded-xl
                    bg-white
                    px-4
                    text-black
                  "

                >
                  ✓
                </button>


              </div>


            )}


          </div>


        </div>





        <div
          className="
            mt-6
            rounded-3xl
            bg-white/10
            p-5
          "
        >

          <p className="text-sm text-neutral-400">
            Код вашей пары 💕
          </p>



          {user.coupleCode ? (

            <>

              <p className="mt-2 text-2xl font-semibold">
                {user.coupleCode}
              </p>


              <button

                onClick={copyCode}

                className="
                  mt-3
                  rounded-xl
                  bg-white
                  px-4
                  py-2
                  text-black
                "

              >
                {copied ? "Скопировано ✓" : "Скопировать код"}
              </button>

            </>


          ) : (


            <button

              onClick={createPair}

              className="
                mt-3
                rounded-xl
                bg-white
                px-5
                py-3
                text-black
              "

            >
              Создать пару 💕
            </button>


          )}


        </div>







        {!user.partnerName && (

          <div
            className="
              mt-5
              rounded-3xl
              bg-white/10
              p-5
            "
          >


            <p className="text-neutral-400">
              Подключить партнёра
            </p>



            <div className="mt-3 flex gap-2">


              <input

                value={code}

                onChange={
                  e=>setCode(e.target.value)
                }

                placeholder="LOVE-XXXX"

                className="
                  w-full
                  rounded-xl
                  px-3
                  py-2
                  text-black
                "

              />


              <button

                onClick={joinPair}

                className="
                  rounded-xl
                  bg-white
                  px-4
                  text-black
                "

              >
                +
              </button>


            </div>


          </div>

        )}






        {user.partnerName && (

          <div
            className="
              mt-5
              rounded-3xl
              bg-white/10
              p-5
            "
          >


            <p className="text-sm text-neutral-400">
              Партнёр 💕
            </p>


            <p className="mt-2 text-2xl font-semibold">
              {user.partnerName}
            </p>


          </div>


        )}






        <button

          onClick={logout}

          className="
            mt-8
            w-full
            rounded-2xl
            bg-white
            p-4
            font-semibold
            text-[#1C1C1E]
            transition
            active:scale-95
          "

        >
          Выйти из аккаунта
        </button>



      </div>


    </main>

  );

}