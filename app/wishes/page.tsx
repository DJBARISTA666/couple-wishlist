"use client";

import { useEffect, useState } from "react";
import AppContainer from "@/components/AppContainer";
import WishCard from "@/components/WishCard";
import AddWishModal from "@/components/AddWishModal";
import { Plus } from "lucide-react";
import { getCurrentUser } from "@/lib/currentUser";


type Wish = {
  id: string;
  emoji: string;
  title: string;
  price: string;
  url?: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  ownerId: string;
};






export default function Wishes() {


  const [showModal,setShowModal] = useState(false);

  const [wishes,setWishes] = useState<Wish[]>([]);








  async function loadWishes(){


    const currentUser =
      getCurrentUser();



    const res =
      await fetch("/api/wishes");



    const allWishes:Wish[] =
      await res.json();




    setWishes(

      allWishes.filter(
        wish =>
          wish.ownerId === currentUser.id
      )

    );


  }








  useEffect(()=>{


    loadWishes();


  },[]);









  async function addWish(wish:Wish){


    const currentUser =
      getCurrentUser();




    const newWish = {


      ...wish,


      id:
        crypto.randomUUID(),


      ownerId:
        currentUser.id,


    };









    await fetch("/api/wishes",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:
        JSON.stringify(newWish),

    });









    await fetch("/api/notifications",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:
        JSON.stringify({


          text:
            `❤️ ${currentUser.name} добавил(а) новое желание: ${newWish.title}`,



          coupleId:
            currentUser.coupleId,


        }),

    });






    loadWishes();


  }











 async function deleteWish(id:string){



    await fetch("/api/wishes",{

      method:"DELETE",

      headers:{
        "Content-Type":"application/json",
      },

      body:
        JSON.stringify({
          id,
        }),

    });






    loadWishes();



  }










  return (

    <AppContainer>


      <section
        className="
          mb-8
          flex
          items-center
          justify-between
        "
      >


        <div>

          <p
            className="
              text-sm
              text-neutral-500
            "
          >
            Моя коллекция
          </p>



          <h1
            className="
              text-4xl
              font-semibold
              text-black
            "
          >
            Желания 🎁
          </h1>


        </div>







        <button

          onClick={()=>
            setShowModal(true)
          }

          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-[#1C1C1E]
            text-white
            shadow-lg
            transition
            active:scale-90
          "

        >

          <Plus />

        </button>


      </section>









      <div className="space-y-4">


        {wishes.map((wish)=>(


          <WishCard


            key={wish.id}


            emoji={wish.emoji}


            title={wish.title}


            price={wish.price}


            url={wish.url}


            completed={wish.completed}


            priority={wish.priority}


            canComplete={false}


            canDelete={true}


            onDelete={()=>
              deleteWish(wish.id)
            }


            onComplete={()=>
              console.log(
                "Свое желание нельзя исполнить"
              )
            }


          />


        ))}


      </div>









      {showModal && (


        <AddWishModal


          onClose={()=>
            setShowModal(false)
          }


          onAdd={addWish}


        />


      )}



    </AppContainer>

  );

}