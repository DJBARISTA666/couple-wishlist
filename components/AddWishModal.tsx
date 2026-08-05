"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getCurrentUser } from "@/lib/currentUser";

export default function AddWishModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;

  onAdd: (wish: {
    id: string;
    emoji: string;
    title: string;
    price: string;
    url: string;
    completed: boolean;
    priority: "high" | "medium" | "low";
    ownerId: string;
  }) => void;
}) {


  const currentUser = getCurrentUser();


  const [title, setTitle] = useState("");

  const [price, setPrice] = useState("");

  const [url, setUrl] = useState("");


  const [priority, setPriority] =
    useState<"high" | "medium" | "low">("medium");





  function addWish() {


    if (!title.trim() || !price.trim()) {
      return;
    }



    onAdd({


      id: crypto.randomUUID(),


      emoji: "🛍️",


      title: title.trim(),


      price: `${price} ₽`,


      url: url.trim(),


      completed: false,


      priority,


      ownerId: currentUser.id,


    });



    onClose();


  }







  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-end
        justify-center
        bg-black/20
      "
    >


      <motion.div

        initial={{
          opacity: 0,
          y: 120,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          type: "spring",
          stiffness: 260,
          damping: 28,
        }}

        className="
          w-full
          max-w-md
          rounded-t-[40px]
          bg-white
          p-8
        "

      >


        <h2 className="
          text-3xl
          font-semibold
          text-black
        ">
          Добавить желание ✨
        </h2>





        <input

          value={title}

          onChange={(e)=>setTitle(e.target.value)}

          placeholder="🎁 Название"

          className="
            mt-6
            w-full
            rounded-2xl
            bg-[#F7F3EE]
            p-4
            text-black
            placeholder:text-gray-500
            outline-none
          "

        />





        <input

          value={price}

          onChange={(e)=>setPrice(e.target.value)}

          placeholder="💰 Цена"

          type="number"

          className="
            mt-3
            w-full
            rounded-2xl
            bg-[#F7F3EE]
            p-4
            text-black
            placeholder:text-gray-500
            outline-none
          "

        />





        <input

          value={url}

          onChange={(e)=>setUrl(e.target.value)}

          placeholder="🔗 Ссылка на товар"

          className="
            mt-3
            w-full
            rounded-2xl
            bg-[#F7F3EE]
            p-4
            text-black
            placeholder:text-gray-500
            outline-none
          "

        />





        <div className="mt-5">


          <p className="
            mb-3
            text-sm
            text-gray-700
          ">
            Приоритет
          </p>




          <div className="grid grid-cols-3 gap-2">


            {[
              {
                id:"high",
                text:"🔥 Очень",
              },
              {
                id:"medium",
                text:"❤️ Хочу",
              },
              {
                id:"low",
                text:"🌙 Потом",
              },

            ].map((item)=>(


              <button

                key={item.id}

                onClick={() =>
                  setPriority(
                    item.id as "high" | "medium" | "low"
                  )
                }


                className={`

                  rounded-2xl
                  p-3
                  text-sm

                  ${
                    priority === item.id
                    ? "bg-[#1C1C1E] text-white"
                    : "bg-[#F7F3EE] text-black"
                  }

                `}

              >

                {item.text}

              </button>


            ))}


          </div>


        </div>





        <button

          onClick={addWish}

          className="
            mt-5
            w-full
            rounded-2xl
            bg-[#1C1C1E]
            p-4
            font-semibold
            text-white
            active:scale-95
          "

        >

          Добавить желание ❤️

        </button>





        <button

          onClick={onClose}

          className="
            mt-3
            w-full
            p-3
            text-gray-600
          "

        >

          Отмена

        </button>




      </motion.div>


    </div>

  );

}