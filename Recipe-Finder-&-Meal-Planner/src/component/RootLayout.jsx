import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  const [bucket, setBucket] = useState([]);

  function handleAddToPlan(recipe, quantity) {
    setBucket((prev) => {
      const exitItem = prev.some((item) => item.id === recipe.id);

      if (exitItem) {
        return prev.map((item) =>
          item.id === recipe.id
            ? { ...recipe, quantity: item.quantity + quantity }
            : item,
        );
      } else return  [...prev, { ...recipe, quantity }];
    });
  }

  const totalItems = bucket.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800 px-6 py-4 flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="text-xl font-black tracking-wider uppercase">
          📝 Recipe Planner
        </Link>

        <Link
          to="/plan"
          className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-zinc-200 transition-colors"
        >
          <span>Meal Plan</span>
          {totalItems > 0 && (
            <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>


      <main>
        <Outlet context={{ bucket, setBucket, handleAddToPlan }} />
      </main>
    </div>
  );
}
