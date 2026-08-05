import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";



const filePath =
  path.join(
    process.cwd(),
    "data",
    "users.json"
  );






function readUsers(){


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









function saveUsers(users:any[]){


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
      users,
      null,
      2
    )

  );


}









export async function GET(){


  const users =
    readUsers();



  return NextResponse.json(
    users
  );


}









export async function POST(
  request:Request
){


  const user =
    await request.json();




  const users =
    readUsers();





  const exists =
    users.find(
      (u:any)=>
        u.id === user.id
    );






  let updatedUsers;





  if(exists){


    updatedUsers =
      users.map(
        (u:any)=>

          u.id === user.id

          ? user

          : u

      );



  } else {


    updatedUsers = [

      ...users,

      user,

    ];


  }






  saveUsers(
    updatedUsers
  );





  return NextResponse.json(
    user
  );


}









export async function PUT(
  request:Request
){


  const updatedUser =
    await request.json();




  const users =
    readUsers();





  const updatedUsers =
    users.map(
      (user:any)=>

        user.id === updatedUser.id

        ? updatedUser

        : user

    );






  saveUsers(
    updatedUsers
  );





  return NextResponse.json(
    updatedUser
  );


}