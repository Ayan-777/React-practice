import { Link, useOutletContext } from "react-router-dom";

export default function MealCartPage() {
  const { bucket, setBucket } = useOutletContext();

  if (bucket.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <span className="text-5xl mb-4">🍽️</span>
        <h2 className="text-xl font-bold text-white mb-2">
          Your meal plan is empty
        </h2>
        <p className="text-zinc-400 text-sm mb-6">
          Add some delicious recipes from the home page to start planning.
        </p>
        <Link
          to="/"
          className="bg-white text-black font-semibold px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-colors"
        >
          Browse Recipes
        </Link>
      </div>
    );
  }

  function handelUpQuntity(id, newQty) {
    if (newQty < 1) return;

    setBucket((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  }

  function handleRemove(id) {
    setBucket((prev) => prev.filter((item) => item.id !== id));
  }

  const totalServings = bucket.reduce(
    (acc, item) => acc + (item.servings || 1) * item.quantity,
    0,
  );
  const totalPrepTime = bucket.reduce(
    (acc, item) => acc + (item.prepTimeMinutes || 0) * item.quantity,
    0,
  );
  const totalMeals = bucket.reduce((acc, item) => acc + item.quantity, 0);

 return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Top Header & Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/"
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
        >
          ⮜
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Meal Cart List
        </h1>
        <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full font-medium">
          {bucket.length} unique recipes
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Meal Cards */}
        <div className="lg:col-span-2 space-y-4">
          {bucket.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between hover:border-zinc-700 transition-colors"
            >
              {/* Recipe Image & Title */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-zinc-800 shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-white text-base leading-tight mb-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span>⏱ {item.prepTimeMinutes || 0}m prep</span>
                    <span>•</span>
                    <span>🍽️ {item.servings || 1} servings/batch</span>
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Delete */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                {/* Stepper */}
                <div className="flex items-center bg-zinc-800/80 border border-zinc-700/60 rounded-xl px-2 py-1 gap-2">
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() => handelUpQuntity(item.id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-medium text-sm text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handelUpQuntity(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-2 text-zinc-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                  title="Remove from plan"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        
        <div className="lg:col-span-1 lg:sticky lg:top-6">
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Plan Summary</h2>

            <div className="space-y-3 text-sm border-b border-zinc-800 pb-4 mb-4">
              <div className="flex justify-between text-zinc-400">
                <span>Unique Recipes</span>
                <span className="font-semibold text-white">{bucket.length}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Total Meals Planned</span>
                <span className="font-semibold text-white">{totalMeals}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Total Prep Time</span>
                <span className="font-semibold text-white">{totalPrepTime} mins</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Total Est. Servings</span>
                <span className="font-semibold text-emerald-400">
                  {totalServings}
                </span>
              </div>
            </div>

            <Link
            to="/grocery-list"
            className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5">
              Generate Grocery List
            </Link> 
          </div>
        </div>
      </div>
    </div>
  );
}
