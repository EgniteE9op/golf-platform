import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 px-8 py-4 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          ⛳ GolfPlatform
        </Link>

        <div className="flex gap-6 text-sm">
          <Link href="/dashboard" className="hover:text-green-400">
            Dashboard
          </Link>
          <Link href="/login" className="hover:text-green-400">
            Login
          </Link>
          <Link href="/signup" className="hover:text-green-400">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}