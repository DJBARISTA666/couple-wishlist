import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const coupleId = url.searchParams.get("coupleId");
  const userId = url.searchParams.get("userId");

  if (!coupleId) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("coupleId", coupleId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = (data || []).filter((notification) => {
    // если уведомление адресовано конкретному человеку
    if (notification.targetUserId) {
      return notification.targetUserId === userId;
    }

    // общие уведомления видят оба
    return true;
  });

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const notification = await request.json();

  if (!notification.coupleId || !notification.text) {
    return NextResponse.json(
      { error: "Missing notification data" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("notifications")
    .insert({
      text: notification.text,
      coupleId: notification.coupleId,
      targetUserId: notification.targetUserId || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE() {
  const { error } = await supabase
    .from("notifications")
    .delete()
    .not("id", "is", null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
