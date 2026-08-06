import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from("read_notifications")
    .select("*")
    .eq("userId", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { error } = await supabase
    .from("read_notifications")
    .upsert(
      {
        userId: body.userId,
        notificationId: body.notificationId,
      },
      { onConflict: "userId,notificationId", ignoreDuplicates: true }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const body = await request.json();

  const { error } = await supabase
    .from("read_notifications")
    .delete()
    .eq("userId", body.userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
