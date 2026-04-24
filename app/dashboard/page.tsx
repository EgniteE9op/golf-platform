import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import LogoutButton from "@/components/LogoutButton";
import ScoreForm from "@/components/ScoreForm";
import Navbar from "@/components/Navbar";
import DeleteScoreButton from "@/components/DeleteScoreButton";
import ScoreChart from "@/components/ScoreChart";
import WinnerCard from "@/components/WinnerCard";

export default async function Dashboard() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: scores } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const bestScore =
    scores && scores.length > 0
      ? Math.min(...scores.map((s) => s.score))
      : null;

  const totalScores = scores?.length || 0;

  const averageScore =
    scores && scores.length > 0
      ? Math.round(
          scores.reduce((sum, item) => sum + item.score, 0) / scores.length
        )
      : null;

  const { data: leaderboard } = await supabase
    .from("scores")
    .select("user_id, score, course")
    .order("score", { ascending: true })
    .limit(5);

  const { data: winnerData } = await supabase
    .from("scores")
    .select("*")
    .order("score", { ascending: true })
    .limit(1)
    .single();

  return (
  <>
  <Navbar />
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black p-6 text-white md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-green-400">
              Golf Competition Dashboard
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Welcome back ⛳
            </h1>
            <p className="mt-3 text-gray-400">{user.email}</p>
          </div>

          <LogoutButton />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <p className="text-sm text-gray-400">Total Scores</p>
            <h2 className="mt-3 text-4xl font-bold">{totalScores}</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <p className="text-sm text-gray-400">Best Score</p>
            <h2 className="mt-3 text-4xl font-bold text-green-400">
              {bestScore !== null ? bestScore : "—"}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <p className="text-sm text-gray-400">Average Score</p>
            <h2 className="mt-3 text-4xl font-bold">
              {averageScore !== null ? averageScore : "—"}
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <h2 className="mb-4 text-2xl font-semibold">Add Golf Score</h2>
            <ScoreForm />
          </section>

          <WinnerCard winner={winnerData} />
        </div>

        <div className="mt-8">
          <ScoreChart scores={scores || []} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <h2 className="mb-5 text-2xl font-semibold">My Scores</h2>

            <div className="space-y-4">
              {scores?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div>
                    <p className="font-semibold text-white">{item.course}</p>
                    <p className="text-sm text-gray-400">{item.round_date}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold text-green-400">
                      {item.score}
                    </p>
                    <DeleteScoreButton id={item.id} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <h2 className="mb-5 text-2xl font-semibold">Leaderboard 🏆</h2>

            <div className="space-y-4">
              {leaderboard?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <p className="text-lg font-bold text-yellow-400">
                    #{index + 1}
                  </p>
                  <p>{item.course}</p>
                  <p className="text-xl font-bold text-green-400">
                    {item.score}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
    </>
  );
}