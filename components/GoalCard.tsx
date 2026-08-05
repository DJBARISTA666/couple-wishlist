"use client";

import AnimatedCard from "@/components/AnimatedCard";
import { getCurrentUser } from "@/lib/currentUser";


type Contribution = {
  userId: string;
  amount: number;
};



export default function GoalCard({
  image,
  emoji,
  title,
  targetAmount,
  contributions,
  onAddMoney,
  canDelete = false,
  onDelete,
}: {
  image?: string;
  emoji: string;
  title: string;
  targetAmount: number;
  contributions: Contribution[];
  onAddMoney: () => void;
  canDelete?: boolean;
  onDelete?: () => void;
}) {


  const currentUser = getCurrentUser();



  const currentAmount = contributions.reduce(
    (sum, item) =>
      sum + item.amount,
    0
  );



  const progress = Math.min(
    (currentAmount / targetAmount) * 100,
    100
  );



  const myAmount = contributions
    .filter(
      (item)=>
        item.userId === currentUser.id
    )
    .reduce(
      (sum,item)=>
        sum + item.amount,
      0
    );



  const partnerAmount = contributions
    .filter(
      (item)=>
        item.userId !== currentUser.id
    )
    .reduce(
      (sum,item)=>
        sum + item.amount,
      0
    );




  return (

    <AnimatedCard delay={0.15}>

      <div
        className="
          overflow-hidden
          rounded-[32px]
          bg-white
          shadow-[0_10px_30px_rgba(0,0,0,0.05)]
        "
      >



        {image && (

          <img
            src={image}
            alt={title}
            className="
              h-48
              w-full
              object-cover
            "
          />

        )}




        <div className="p-6">



          <div className="flex items-center justify-between gap-3">


            <div className="flex items-center gap-3">


              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#F7F3EE]
                  text-2xl
                "
              >
                {emoji}
              </div>




              <div>


                <h2
                  className="
                    text-xl
                    font-semibold
                    text-black
                  "
                >
                  {title}
                </h2>



                <p
                  className="
                    text-sm
                    text-neutral-500
                  "
                >
                  {currentAmount.toLocaleString("ru-RU")} ₽ из{" "}
                  {targetAmount.toLocaleString("ru-RU")} ₽
                </p>



              </div>



            </div>





            {canDelete && onDelete && (

              <button
                onClick={onDelete}
                className="
                  rounded-xl
                  bg-red-50
                  px-3
                  py-2
                  text-red-500
                  transition
                  active:scale-95
                "
              >
                🗑️
              </button>

            )}



          </div>






          <div className="mt-6">


            <div
              className="
                h-3
                overflow-hidden
                rounded-full
                bg-[#F7F3EE]
              "
            >

              <div
                className="
                  h-full
                  rounded-full
                  bg-[#1C1C1E]
                "
                style={{
                  width:`${progress}%`
                }}
              />

            </div>



            <p
              className="
                mt-2
                text-sm
                text-neutral-500
              "
            >
              {Math.round(progress)}% собрано
            </p>



          </div>







          <div className="mt-5 flex gap-3">



            <div
              className="
                flex-1
                rounded-2xl
                bg-[#F7F3EE]
                p-3
                text-center
              "
            >

              <p className="text-xs text-neutral-500">
                Мой вклад
              </p>


              <p className="font-semibold text-black">
                {myAmount.toLocaleString("ru-RU")} ₽
              </p>


            </div>






            <div
              className="
                flex-1
                rounded-2xl
                bg-[#F7F3EE]
                p-3
                text-center
              "
            >

              <p className="text-xs text-neutral-500">
                Партнёр
              </p>


              <p className="font-semibold text-black">
                {partnerAmount.toLocaleString("ru-RU")} ₽
              </p>


            </div>



          </div>








          <button

            onClick={onAddMoney}

            className="
              mt-5
              w-full
              rounded-2xl
              bg-[#1C1C1E]
              p-4
              font-semibold
              text-white
              transition
              active:scale-95
            "

          >

            + Добавить деньги 💰

          </button>





        </div>


      </div>


    </AnimatedCard>

  );

}