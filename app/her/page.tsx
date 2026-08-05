"use client";

import { useEffect, useState } from "react";
import AppContainer from "@/components/AppContainer";
import WishCard from "@/components/WishCard";
import { getCurrentUser } from "@/lib/currentUser";


type Wish = {
  id:string;
  emoji:string;
  title:string;
  price:string;
  url?:string;
  completed:boolean;
  priority:"high"|"medium"|"low";
  ownerId:string;
};







export default function PartnerWishes(){


  const [wishes,setWishes] =
    useState<Wish[]>([]);







  async function loadPartnerWishes(){


    const currentUser =
      getCurrentUser();




    const res =
      await fetch("/api/wishes");



    const allWishes:Wish[] =
      await res.json();






    const partnerWishes =
      allWishes.filter(
        wish =>
          wish.ownerId === currentUser.partnerId
      );



    setWishes(partnerWishes);


  }









  useEffect(()=>{


    loadPartnerWishes();


  },[]);












  async function completeWish(id:string){


    const currentUser =
      getCurrentUser();




    const wish =
      wishes.find(
        w=>w.id===id
      );



    if(!wish) return;









    await fetch("/api/wishes",{

      method:"PUT",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        ...wish,

        completed:true

      })

    });









    await fetch("/api/notifications",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({


        coupleId:
          currentUser.coupleId,



        // кто сделал действие
        userId:
          currentUser.id,



        // кому показать уведомление
        targetUserId:
          wish.ownerId,



        text:
          `🎁 ${currentUser.name} исполнил(а) желание ${currentUser.partnerName || "партнёра"}: ${wish.title} ❤️`,


      })

    });










    loadPartnerWishes();


  }














  return (

    <AppContainer>


      <section className="mb-8">


        <p className="
          text-sm
          text-neutral-500
        ">
          Коллекция партнёра ❤️
        </p>



        <h1 className="
          text-4xl
          font-semibold
          text-black
        ">
          Желания партнёра 🎁
        </h1>


      </section>









      <div className="space-y-4">





        {
          wishes.length===0 && (


            <div
              className="
                rounded-[32px]
                bg-white
                p-6
                text-center
                text-neutral-500
              "
            >

              Пока нет желаний ✨

            </div>


          )
        }








        {
          wishes.map((wish)=>(


            <WishCard

              key={wish.id}

              emoji={wish.emoji}

              title={wish.title}

              price={wish.price}

              url={wish.url}

              completed={wish.completed}

              priority={wish.priority}



              canComplete={true}



              onComplete={()=>
                completeWish(wish.id)
              }


            />


          ))
        }



      </div>



    </AppContainer>

  );


}