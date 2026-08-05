import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";



export async function GET(){

  const { data, error } =
    await supabase
      .from("users")
      .select("*");


  if(error){

    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );

  }


  return NextResponse.json(data);

}







export async function POST(
  request:Request
){

  const user =
    await request.json();



  const { data:existing } =
    await supabase
      .from("users")
      .select("*")
      .eq(
        "id",
        user.id
      )
      .maybeSingle();




  if(existing){


    const { data,error } =
      await supabase
        .from("users")
        .update(user)
        .eq(
          "id",
          user.id
        )
        .select()
        .single();



    if(error){

      return NextResponse.json(
        {
          error:error.message
        },
        {
          status:500
        }
      );

    }


    return NextResponse.json(data);


  }






  const { data,error } =
    await supabase
      .from("users")
      .insert(user)
      .select()
      .single();





  if(error){

    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );

  }





  return NextResponse.json(data);

}









export async function PUT(
  request:Request
){

  const user =
    await request.json();




  const { data,error } =
    await supabase
      .from("users")
      .update(user)
      .eq(
        "id",
        user.id
      )
      .select()
      .single();




  if(error){

    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );

  }




  return NextResponse.json(data);

}