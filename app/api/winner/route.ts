import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("scores")
    .select("*")
    .order("score", { ascending: true })
    .limit(1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    winner: data?.[0] || null,
  });
}