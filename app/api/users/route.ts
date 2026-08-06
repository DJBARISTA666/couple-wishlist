import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


export async function GET(
  request: Request
){

  const { searchParams } =
    new URL(request.url);


  const id =
    searchParams.get("id");



  let query =
    supabase
      .from("users")
      .select("*");



  if(id){

    query =
      query.eq(
        "id",
        id
      );

  }



  const {data,error} =
    await query;



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


  return NextResponse.json(
    id ? data[0] ?? null : data
  );

}





export async function POST(
 request:Request
){


 const body =
   await request.json();



 const {data,error} =
   await supabase
     .from("users")
     .upsert(body)
     .select()
     .single();



 if(error){

   console.error(error);


   return NextResponse.json(
    {
      error:error.message,
      details:error.details,
      hint:error.hint
    },
    {
      status:500
    }
   );

 }



 return NextResponse.json(data);


}