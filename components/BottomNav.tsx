"use client";

import { Heart, Plane, Gift, User, Bell } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/currentUser";



export default function BottomNav() {


  const router = useRouter();

  const pathname = usePathname();


  const [count,setCount] =
    useState(0);






  async function loadNotifications(){


    const currentUser =
      getCurrentUser();




    if(
      !currentUser.coupleId ||
      !currentUser.id
    ){

      setCount(0);

      return;

    }







    const notificationsRes =
      await fetch(

        `/api/notifications?coupleId=${currentUser.coupleId}&userId=${currentUser.id}`

      );



    const notifications =
      await notificationsRes.json();









    const readRes =
      await fetch(

        `/api/read-notifications?userId=${currentUser.id}`

      );



    const read =
      await readRes.json();






    const readIds =
      read.map(
        (item:any)=>
          item.notificationId
      );








    const unread =

      notifications.filter(
        (item:any)=>

          !readIds.includes(item.id)

      );







    setCount(
      unread.length
    );


  }









  useEffect(()=>{


    loadNotifications();



    const timer =
      setInterval(
        loadNotifications,
        3000
      );



    return () =>
      clearInterval(timer);



  },[]);









  const items = [


    {
      icon: Heart,
      label: "Партнёр",
      path: "/her",
    },


    {
      icon: Plane,
      label: "Наши",
      path: "/goals",
    },


    {
      icon: Bell,
      label: "События",
      path: "/notifications",
    },


    {
      icon: Gift,
      label: "Мои",
      path: "/wishes",
    },


    {
      icon: User,
      label: "Профиль",
      path: "/profile",
    },


  ];









  return (


    <nav
      className="
        fixed
        bottom-6
        left-1/2
        z-50
        flex
        w-[94%]
        max-w-md
        -translate-x-1/2
        justify-between
        rounded-[32px]
        bg-white/80
        p-2
        shadow-xl
        backdrop-blur
      "
    >





      {items.map((item)=>{


        const Icon = item.icon;


        const active =
          pathname === item.path;






        return (


          <button


            key={item.path}



            onClick={() =>
              router.push(item.path)
            }



            className={`

              flex
              flex-1
              flex-col
              items-center
              justify-center
              gap-1
              rounded-[24px]
              py-3
              transition-all
              active:scale-95


              ${
                active
                ? "bg-[#1C1C1E] text-white"
                : "text-neutral-400"
              }

            `}



          >





            <div className="relative">


              <Icon size={20}/>






              {
                item.path === "/notifications" &&
                count > 0 && (


                  <span
                    className="
                      absolute
                      -right-3
                      -top-3
                      flex
                      h-5
                      min-w-5
                      items-center
                      justify-center
                      rounded-full
                      bg-red-500
                      px-1
                      text-[11px]
                      font-bold
                      text-white
                    "
                  >

                    {count}

                  </span>


                )
              }





            </div>







            <span className="text-xs font-medium">

              {item.label}

            </span>



          </button>


        );


      })}



    </nav>


  );


}