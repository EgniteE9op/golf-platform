import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-black text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full bg-white/10 px-4 py-2 text-sm">
          Golf Score Competition Platform
        </p>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
          Track Scores. Compete Monthly. Win.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-200">
          A full-stack golf platform with authentication, score tracking,
          leaderboard, analytics, and monthly winner system.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/signup"
            className="rounded-full bg-white px-8 py-3 font-semibold text-green-900 transition hover:bg-gray-200"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-full border border-white/40 px-8 py-3 font-semibold transition hover:bg-white/10"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}