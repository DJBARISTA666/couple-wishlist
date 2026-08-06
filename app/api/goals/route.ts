import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coupleId = searchParams.get("coupleId");

  if (!coupleId) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("coupleId", coupleId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const goal = await request.json();

  const { data, error } = await supabase
    .from("goals")
    .upsert(goal)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const updatedGoal = await request.json();

  const { data, error } = await supabase
    .from("goals")
    .update(updatedGoal)
    .eq("id", updatedGoal.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const { error } = await supabase
    .from("goals")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
