"use client";

import { useEffect, useState } from "react";
import {
  getCurrentUser,
  setCurrentUser,
  createUser,
} from "@/lib/currentUser";





export default function WelcomeModal() {


  const [name, setName] = useState("");

  const [visible, setVisible] = useState(false);







  useEffect(()=>{


    const user =
      getCurrentUser();



    if(!user.id){

      setVisible(true);

    }


  },[]);









  function generateCode(){


    return (
      "LOVE-" +
      Math.random()
        .toString(36)
        .substring(2,6)
        .toUpperCase()
    );


  }









  async function saveUser(){


    if(!name.trim()) return;





    const newUser = {


      id:
        crypto.randomUUID(),



      name:
        name.trim(),



      coupleId:
        crypto.randomUUID(),



      coupleCode:
        generateCode(),



      partnerId:"",



      partnerName:"",


    };






    const createdUser =
      await createUser(newUser);






    setCurrentUser(createdUser);




    setVisible(false);



  }









  if(!visible){

    return null;

  }








  return (


    <div

      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-pink-100/80
        backdrop-blur-sm
      "

    >





      <div

        className="
          w-[90%]
          max-w-sm
          rounded-3xl
          bg-white
          p-8
          text-center
        "

      >





        <div className="mb-5 text-5xl">

          💕

        </div>






        <h1

          className="
            mb-2
            text-2xl
            font-semibold
            text-black
          "

        >

          Couple Wishlist

        </h1>







        <p

          className="
            mb-6
            text-black
          "

        >

          Как тебя зовут?

        </p>








        <input


          value={name}


          onChange={(e)=>
            setName(e.target.value)
          }



          placeholder="Твоё имя"



          className="
            mb-4
            w-full
            rounded-2xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            text-black
            outline-none
          "


        />









        <button


          onClick={saveUser}



          className="
            w-full
            rounded-2xl
            bg-pink-500
            py-3
            font-medium
            text-white
            transition
            active:scale-95
          "


        >

          Продолжить

        </button>





      </div>





    </div>


  );

}