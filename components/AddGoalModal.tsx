"use client";

import { useState } from "react";
import { motion } from "framer-motion";


type Contribution = {
  userId: string;
  amount: number;
};



export default function AddGoalModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;

  onAdd: (goal: {
    emoji: string;
    title: string;
    targetAmount: number;
    contributions: Contribution[];
  }) => void;
}) {


  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");



  function addGoal() {


    if (!title.trim() || !amount.trim()) {
      return;
    }



    onAdd({

      emoji: "🌟",

      title: title.trim(),

      targetAmount: Number(amount),

      contributions: [],

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
          opacity:0,
          y:120,
        }}

        animate={{
          opacity:1,
          y:0,
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
          Добавить мечту ✨
        </h2>




        <input

          value={title}

          onChange={(e)=>
            setTitle(e.target.value)
          }

          placeholder="🌴 Название мечты"

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

          value={amount}

          onChange={(e)=>
            setAmount(e.target.value)
          }

          placeholder="💰 Сколько нужно собрать?"

          type="number"

          className="
            mt-4
            w-full
            rounded-2xl
            bg-[#F7F3EE]
            p-4
            text-black
            placeholder:text-gray-500
            outline-none
          "

        />







        <button

          onClick={addGoal}

          className="
            mt-6
            w-full
            rounded-2xl
            bg-[#1C1C1E]
            p-4
            font-semibold
            text-white
          "

        >

          Добавить мечту ❤️

        </button>






        <button

          onClick={onClose}

          className="
            mt-3
            w-full
            p-3
            text-neutral-500
          "

        >

          Отмена

        </button>




      </motion.div>


    </div>

  );

}