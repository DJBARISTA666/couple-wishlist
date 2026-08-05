import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


const filePath =
  path.join(
    process.cwd(),
    "data",
    "notifications.json"
  );





function readNotifications(){

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







function saveNotifications(
  notifications:any[]
){

  fs.writeFileSync(
    filePath,
    JSON.stringify(
      notifications,
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



  const coupleId =
    url.searchParams.get("coupleId");


  const userId =
    url.searchParams.get("userId");





  if(!coupleId){

    return NextResponse.json([]);

  }







  const notifications =
    readNotifications();







  const result =
    notifications.filter(
      (notification:any)=>{


        if(
          notification.coupleId !== coupleId
        ){

          return false;

        }



        // если уведомление адресовано конкретному человеку
        if(
          notification.targetUserId
        ){

          return (
            notification.targetUserId === userId
          );

        }



        // общие уведомления видят оба
        return true;


      }
    );





  return NextResponse.json(result);


}









export async function POST(
  request:Request
){

  const notification =
    await request.json();






  if(
    !notification.coupleId ||
    !notification.text
  ){

    return NextResponse.json(
      {
        error:"Missing notification data",
      },
      {
        status:400,
      }
    );

  }






  const notifications =
    readNotifications();






  const newNotification = {


    id:
      crypto.randomUUID(),



    createdAt:
      new Date().toISOString(),



    text:
      notification.text,



    coupleId:
      notification.coupleId,



    targetUserId:
      notification.targetUserId || null,


  };







  notifications.push(
    newNotification
  );






  saveNotifications(
    notifications
  );






  return NextResponse.json(
    newNotification
  );


}









export async function DELETE(){

  
  saveNotifications([]);



  return NextResponse.json({

    success:true,

  });


}