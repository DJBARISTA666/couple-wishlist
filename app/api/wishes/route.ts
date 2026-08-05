import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


const filePath =
  path.join(
    process.cwd(),
    "data",
    "wishes.json"
  );




function readWishes(){

  if(!fs.existsSync(filePath)){

    return [];

  }


  const data =
    fs.readFileSync(
      filePath,
      "utf-8"
    );


  return JSON.parse(data);

}





function saveWishes(wishes:any[]){

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
      wishes,
      null,
      2
    )
  );

}








export async function GET(){


  const wishes =
    readWishes();



  return NextResponse.json(
    wishes
  );


}









export async function POST(
  request:Request
){


  const wish =
    await request.json();



  const wishes =
    readWishes();




  const exists =
    wishes.find(
      (w:any)=>
        w.id === wish.id
    );




  let updated;



  if(exists){


    updated =
      wishes.map(
        (w:any)=>

          w.id === wish.id

          ? wish

          : w

      );


  } else {


    updated = [
      ...wishes,
      wish
    ];


  }





  saveWishes(updated);



  return NextResponse.json(
    wish
  );


}









export async function PUT(
  request:Request
){


  const updatedWish =
    await request.json();



  const wishes =
    readWishes();




  const updated =

    wishes.map(
      (wish:any)=>

        wish.id === updatedWish.id

        ? updatedWish

        : wish

    );




  saveWishes(updated);



  return NextResponse.json(
    updatedWish
  );


}











export async function DELETE(
  request:Request
){


  const {id} =
    await request.json();



  const wishes =
    readWishes();




  const updated =

    wishes.filter(
      (wish:any)=>
        wish.id !== id
    );




  saveWishes(updated);



  return NextResponse.json({

    success:true,

  });


}