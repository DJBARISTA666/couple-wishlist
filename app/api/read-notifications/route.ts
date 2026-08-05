import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


const filePath =
  path.join(
    process.cwd(),
    "data",
    "readNotifications.json"
  );







function readData(){


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








function saveData(data:any[]){


  fs.writeFileSync(

    filePath,

    JSON.stringify(
      data,
      null,
      2
    )

  );


}









export async function GET(
  request:Request
){


  const url =
    new URL(request.url);



  const userId =
    url.searchParams.get("userId");




  if(!userId){

    return NextResponse.json([]);

  }





  const data =
    readData();





  return NextResponse.json(

    data.filter(
      (item:any)=>
        item.userId === userId
    )

  );


}









export async function POST(
  request:Request
){

  const body =
    await request.json();



  const data =
    readData();





  const exists =
    data.find(
      (item:any)=>

        item.userId === body.userId &&
        item.notificationId === body.notificationId

    );





  if(!exists){


    data.push({

      id:
        crypto.randomUUID(),


      userId:
        body.userId,


      notificationId:
        body.notificationId,


    });


  }






  saveData(data);






  return NextResponse.json({
    success:true,
  });


}









export async function DELETE(
  request:Request
){

  const body =
    await request.json();





  const data =
    readData();





  const updated =

    data.filter(
      (item:any)=>

        !(
          item.userId === body.userId
        )

    );






  saveData(updated);






  return NextResponse.json({
    success:true,
  });


}