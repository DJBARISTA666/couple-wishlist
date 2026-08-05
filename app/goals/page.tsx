"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/currentUser";
import AppContainer from "@/components/AppContainer";
import GoalCard from "@/components/GoalCard";
import AddGoalModal from "@/components/AddGoalModal";
import AddMoneyModal from "@/components/AddMoneyModal";
import { Plus } from "lucide-react";


type Contribution = {
  userId:string;
  amount:number;
};


type Goal = {
  id:string;
  emoji:string;
  title:string;
  image?:string;
  targetAmount:number;
  contributions:Contribution[];

  ownerId:string;
  ownerName:string;
  coupleId:string;
};





export default function Goals(){


  const [goals,setGoals] =
    useState<Goal[]>([]);


  const [showGoalModal,setShowGoalModal] =
    useState(false);


  const [selectedGoal,setSelectedGoal] =
    useState<string | null>(null);






  async function loadGoals(){


    const current =
      getCurrentUser();



    if(!current.coupleId){

      setGoals([]);

      return;

    }




    const res =
      await fetch(
        `/api/goals?coupleId=${current.coupleId}`
      );



    const data:Goal[] =
      await res.json();



    setGoals(data);


  }







  useEffect(()=>{

    loadGoals();

  },[]);









  async function addGoal(
    goal:Omit<
      Goal,
      "id"|"ownerId"|"ownerName"|"coupleId"
    >
  ){


    const current =
      getCurrentUser();




    const newGoal:Goal = {


      ...goal,


      id:
        crypto.randomUUID(),


      ownerId:
        current.id,


      ownerName:
        current.name,


      coupleId:
        current.coupleId || "",


    };







    await fetch("/api/goals",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:
        JSON.stringify(newGoal),

    });







    await fetch("/api/notifications",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:
        JSON.stringify({

          coupleId:
            current.coupleId,


          userId:
            current.id,


          text:
            `✈️ ${current.name} создал(а) новую общую мечту: ${newGoal.title}`,

        }),

    });






    setShowGoalModal(false);

    loadGoals();


  }









  async function deleteGoal(id:string){


    await fetch("/api/goals",{

      method:"DELETE",

      headers:{
        "Content-Type":"application/json",
      },

      body:
        JSON.stringify({
          id,
        }),

    });



    loadGoals();


  }











  async function addMoney(amount:number){


    if(!selectedGoal)
      return;



    const current =
      getCurrentUser();






    const goal =
      goals.find(
        g =>
          g.id === selectedGoal
      );



    if(!goal)
      return;









    const updatedGoal:Goal = {


      ...goal,



      contributions:[


        ...(goal.contributions || []),



        {

          userId:
            current.id,


          amount,

        },


      ],


    };









    await fetch("/api/goals",{

      method:"PUT",

      headers:{
        "Content-Type":"application/json",
      },

      body:
        JSON.stringify(updatedGoal),

    });









    await fetch("/api/notifications",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:
        JSON.stringify({


          coupleId:
            current.coupleId,



          userId:
            current.id,



          text:
            `💰 ${current.name} добавил(а) ${amount.toLocaleString("ru-RU")} ₽ в мечту "${goal.title}"`,


        }),

    });








    setSelectedGoal(null);


    loadGoals();


  }








  const total =
    goals.reduce(
      (sum,goal)=>
        sum +
        goal.contributions.reduce(
          (s,c)=>s+c.amount,
          0
        ),
      0
    );








  return (

    <AppContainer>


      <section className="
        mb-8
        flex
        items-center
        justify-between
      ">


        <div>


          <p className="text-sm text-neutral-500">
            Наша коллекция
          </p>



          <h1 className="text-4xl font-semibold">
            Наши мечты ✈️
          </h1>



          <p className="mt-2 text-neutral-500">
            Вместе собрали:{" "}
            {total.toLocaleString("ru-RU")} ₽
          </p>


        </div>





        <button

          onClick={()=>
            setShowGoalModal(true)
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
            active:scale-90
          "

        >

          <Plus />

        </button>


      </section>







      <div className="space-y-4">



        {goals.map((goal)=>(


          <GoalCard


            key={goal.id}


            emoji={goal.emoji}


            title={goal.title}


            image={goal.image}


            targetAmount={goal.targetAmount}


            contributions={
              goal.contributions || []
            }


            onAddMoney={()=>


              setSelectedGoal(
                goal.id
              )


            }


            canDelete={
              goal.ownerId === getCurrentUser().id
            }


            onDelete={()=>


              deleteGoal(
                goal.id
              )


            }


          />


        ))}







        {goals.length === 0 && (

          <div className="
            rounded-[32px]
            bg-white
            p-6
            text-center
            text-neutral-500
          ">

            У вас пока нет общих мечт ✨

          </div>

        )}



      </div>







      {showGoalModal && (


        <AddGoalModal


          onClose={()=>


            setShowGoalModal(false)


          }


          onAdd={addGoal}


        />


      )}








      {selectedGoal && (


        <AddMoneyModal


          onClose={()=>


            setSelectedGoal(null)


          }


          onAdd={addMoney}


        />


      )}



    </AppContainer>

  );

}