export default function WinnerCard({ winner }: { winner: any }) {
  if (!winner) {
    return (
      <div className="rounded border p-4">
        <h2 className="text-xl font-bold">Monthly Winner 🏆</h2>
        <p>No winner yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-yellow-50 p-6 shadow-sm">
      <h2 className="text-xl font-bold">Monthly Winner 🏆</h2>
      <p className="mt-2">Course: {winner.course}</p>
      <p>Score: <strong>{winner.score}</strong></p>
      <p>Date: {winner.round_date}</p>
    </div>
  );
}