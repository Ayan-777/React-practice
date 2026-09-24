export default function RecipeCard({ recipe }) {
  return (
    <div className="relative bg-white rounded-2xl p-4 shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute -top-0.5 -left-0.5 bg-zinc-900 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 border border-zinc-700">
        <span>⭐</span>
        <span>{recipe.rating}</span>
      </div>

      <div className="absolute -top-0.5 -right-0.5 bg-zinc-900 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 border border-zinc-700">
        <span>⏰</span>
        <span>{recipe.cookTimeMinutes}</span>
      </div>

      <div className="text-center px-2">
        <h2 className="text-lg font-extrabold text-zinc-900 tracking-tight line-clamp-1">
          {recipe.name}
        </h2>
      </div>

      <div className="w-full h-48 rounded-xl overflow-hidden mt-1 mb-4 bg-zinc-100">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400?text=No+Image"; 
          }}
        />
      </div>

      <button className="mt-4 w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer">
        Add to Meal Plan
      </button>
    </div>
  );
}
