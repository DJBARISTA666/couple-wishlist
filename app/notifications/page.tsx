"use client";

import { useEffect, useState } from "react";
import AppContainer from "@/components/AppContainer";
import { getCurrentUser } from "@/lib/currentUser";


type Notification = {
  id:string;
  text:string;
  createdAt:string;
  coupleId:string;
};







export default function Notifications(){


  const [notifications,setNotifications] =
    useState<Notification[]>([]);







  async function loadNotifications(){


    const currentUser =
      getCurrentUser();





    if(
      !currentUser.coupleId ||
      !currentUser.id
    ){

      setNotifications([]);

      return;

    }







    const res =
      await fetch(

        `/api/notifications?coupleId=${currentUser.coupleId}&userId=${currentUser.id}`

      );





    const data =
      await res.json();







    const sorted =

      data.sort(
        (a:Notification,b:Notification)=>

          new Date(b.createdAt).getTime() -

          new Date(a.createdAt).getTime()

      );







    setNotifications(sorted);








    await Promise.all(

      sorted.map(

        (item:Notification)=>

          fetch(
            "/api/read-notifications",
            {

              method:"POST",

              headers:{
                "Content-Type":"application/json",
              },

              body:JSON.stringify({

                userId:
                  currentUser.id,


                notificationId:
                  item.id,

              }),

            }

          )

      )

    );


  }












  useEffect(()=>{


    loadNotifications();


  },[]);













  async function clearNotifications(){


    const currentUser =
      getCurrentUser();








    await fetch(
      "/api/read-notifications",
      {

        method:"DELETE",

        headers:{
          "Content-Type":"application/json",
        },

        body:JSON.stringify({

          userId:
            currentUser.id,

        }),

      }
    );







    setNotifications([]);


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


          <p className="
            text-sm
            text-neutral-500
          ">
            Новости вашей пары
          </p>




          <h1 className="
            text-4xl
            font-semibold
          ">
            Уведомления 🔔
          </h1>


        </div>








        {
          notifications.length > 0 && (


            <button

              onClick={clearNotifications}

              className="
                rounded-2xl
                bg-red-50
                px-4
                py-2
                text-sm
                text-red-500
                active:scale-95
              "

            >

              Очистить

            </button>


          )
        }




      </section>









      <div className="space-y-4">






        {
          notifications.length === 0 && (


            <div
              className="
                rounded-[32px]
                bg-white
                p-6
                text-center
                text-neutral-500
              "
            >

              Пока ничего нового ✨

            </div>


          )
        }









        {
          notifications.map((item)=>(


            <div

              key={item.id}

              className="
                rounded-[32px]
                bg-white
                p-5
                shadow-[0_10px_30px_rgba(0,0,0,0.05)]
              "

            >


              <p className="
                font-medium
                text-black
              ">

                {item.text}

              </p>






              <p className="
                mt-2
                text-xs
                text-neutral-400
              ">

                {new Date(
                  item.createdAt
                ).toLocaleString("ru-RU")}

              </p>



            </div>


          ))
        }




      </div>





    </AppContainer>


  );


}