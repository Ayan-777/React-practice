import { useState } from "react";

export default function RecipeCard({ recipe, onAddToPlan }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="relative bg-white rounded-3xl p-4 shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute -top-0.5 -left-0.5 bg-zinc-900 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2.5 border border-zinc-700">
        <span>⭐</span>
        <span>{recipe.rating}</span>
      </div>

      <div className="absolute -top-0.5 -right-0.5 bg-zinc-900 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2.5 border border-zinc-700">
        <span>⏰</span>
        <span>{recipe.cookTimeMinutes}m</span>
      </div>

      <div>
        <h2 className="text-lg font-extrabold text-zinc-900 tracking-tight text-center mt-2 mb-3 line-clamp-1">
          {recipe.name}
        </h2>

        <div className="w-full h-48 rounded-2xl overflow-hidden mb-5 bg-zinc-100">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400?text=No+Image";
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-1 pb-1">
        <button
          type="button"
          onClick={() => {
            if (quantity > 1) setQuantity((prev) => prev - 1);
          }}
          className="w-10 h-10 shrink-0 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md transition-transform active:scale-95 cursor-pointer border border-zinc-700"
        >
          -
        </button>

        <button
          type="button"
          onClick={() => onAddToPlan && onAddToPlan(recipe, quantity)}
          className="flex-1 h-10 px-4 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all active:scale-95 cursor-pointer border border-zinc-700 flex items-center justify-center text-center"
        >
          Add to Meal Plan ({quantity})
        </button>

        <button
          type="button"
          onClick={() => {
            if (quantity < 20) setQuantity((prev) => prev + 1);
          }}
          className="w-10 h-10 shrink-0 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md transition-transform active:scale-95 cursor-pointer border border-zinc-700"
        >
          +
        </button>
      </div>
    </div>
  );
}
