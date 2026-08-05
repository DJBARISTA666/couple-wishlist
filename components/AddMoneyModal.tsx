"use client";

import { useState } from "react";
import { motion } from "framer-motion";


export default function AddMoneyModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (amount: number) => void;
}) {


  const [amount, setAmount] = useState("");



  function submit() {


    if (!amount) return;


    onAdd(Number(amount));


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

        transition={{
          type:"spring",
          stiffness:260,
          damping:28,
        }}

        className="
          w-full
          max-w-md
          rounded-t-[40px]
          bg-white
          p-8
        "

      >


        <h2 className="text-3xl font-semibold">
          Добавить вклад 💰
        </h2>



        <p className="mt-2 text-sm text-neutral-500">
          Сколько добавляем в мечту?
        </p>



        <input

          value={amount}

          onChange={(e)=>
            setAmount(e.target.value)
          }

          type="number"

          placeholder="1000 ₽"

          className="
            mt-6
            w-full
            rounded-2xl
            bg-[#F7F3EE]
            p-4
            text-lg
            outline-none
          "

        />





        <button

          onClick={submit}

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

          Добавить ❤️

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