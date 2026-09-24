import { useEffect, useState } from "react";
import RecipeCard from "../component/recipesCard";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const feacthdata = async () => {
      try {
        const res = await fetch("https://dummyjson.com/recipes");
        if (!res.ok) {
          throw new Error("HTTP error:", res.status);
        }

        const data = await res.json();
        setRecipes(data.recipes);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch Recipes: ", error.message);
      }finally{
        setIsLoading(false);
      }
    };
    feacthdata();
  }, []);

  const filterRecipes = recipes.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl font-semibold">
        Recipes are loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <header className="text-center mb-10 flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl font-black tracking-widest uppercase mb-4">
            WELCOME TO
          </h1>
          <div className="bg-white text-black text-sm sm:text-base font-bold px-8 py-2.5 rounded-full shadow-lg">
            Recipe Finder &amp; Meal Planner
          </div>
        </header>
        <div className="relative w-full max-w-md mb-14">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">🔍</span>
          <input
            type="text"
            placeholder="Search recipes by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm"
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterRecipes.map((item) => (
            <RecipeCard key={item.id} recipe={item}></RecipeCard>
          ))}
        </div>
      </div>
    </div>
  );
}
