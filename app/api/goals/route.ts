import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


const filePath =
  path.join(
    process.cwd(),
    "data",
    "goals.json"
  );







function readGoals(){


  const dir =
    path.dirname(filePath);



  if(!fs.existsSync(dir)){


    fs.mkdirSync(
      dir,
      {
        recursive:true,
      }
    );


  }





  if(!fs.existsSync(filePath)){


    fs.writeFileSync(
      filePath,
      JSON.stringify([])
    );


  }






  const data =
    fs.readFileSync(
      filePath,
      "utf-8"
    );



  return JSON.parse(data);


}









function saveGoals(goals:any[]){


  const dir =
    path.dirname(filePath);



  if(!fs.existsSync(dir)){


    fs.mkdirSync(
      dir,
      {
        recursive:true,
      }
    );


  }





  fs.writeFileSync(

    filePath,

    JSON.stringify(
      goals,
      null,
      2
    )

  );


}









export async function GET(
  request:Request
){


  const {searchParams} =
    new URL(request.url);



  const coupleId =
    searchParams.get("coupleId");




  const goals =
    readGoals();




  if(!coupleId){

    return NextResponse.json([]);

  }




  return NextResponse.json(

    goals.filter(
      (goal:any)=>
        goal.coupleId === coupleId
    )

  );


}









export async function POST(
  request:Request
){

  const goal =
    await request.json();




  const goals =
    readGoals();





  const exists =
    goals.find(
      (g:any)=>
        g.id === goal.id
    );





  let updated;





  if(exists){


    updated =
      goals.map(
        (g:any)=>

          g.id === goal.id

          ? goal

          : g

      );



  } else {


    updated = [

      ...goals,

      goal,

    ];


  }






  saveGoals(
    updated
  );






  return NextResponse.json(
    goal
  );


}









export async function PUT(
  request:Request
){

  const updatedGoal =
    await request.json();




  const goals =
    readGoals();






  const updated =

    goals.map(
      (goal:any)=>

        goal.id === updatedGoal.id

        ? updatedGoal

        : goal

    );






  saveGoals(
    updated
  );






  return NextResponse.json(
    updatedGoal
  );


}









export async function DELETE(
  request:Request
){


  const {id} =
    await request.json();




  const goals =
    readGoals();






  const updated =

    goals.filter(
      (goal:any)=>

        goal.id !== id

    );







  saveGoals(
    updated
  );






  return NextResponse.json({

    success:true,

  });


}