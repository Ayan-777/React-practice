import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";

export default function GroceryListPage() {
  const { bucket } = useOutletContext();
  const [copied, setCopied] = useState(false);

  const [isChecked, setIsChecked] = useState([]);

  if (!bucket || bucket.length === 0) {
    return <Link to="/">Browse Recipes</Link>;
  }

  const allIngredients = (bucket || []).flatMap(
    (recipe) => recipe.ingredients || [],
  );
  const uniqueIngredients = [...new Set(allIngredients)];

  function toggleItem(ingredient) {
    setIsChecked((prev) => {
      return prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient];
    });
  }

  const uncollected = uniqueIngredients.filter((item) => !isChecked.includes(item));

  function handleCopy(){
    const textToCopy = uniqueIngredients.join("\n");
    navigator.clipboard.writeText(textToCopy)
    setCopied(true);

    setTimeout(() => {
      setCopied(false)
    },2000);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Link to="/plan" className="text-zinc-400 hover:text-white">
          ← Back to Plan
        </Link>
        <div>
          <button
          onClick={handleCopy}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors "
          >{copied ? "Copied ✓" : "📋Copy"}</button>
        </div>
        <span className="text-sm font-semibold bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
          {isChecked.length} / {uniqueIngredients.length} collected
        </span>
      </div>

      

      <div className="space-y-2">
        {uniqueIngredients.map((item, index) => {
          const checked = isChecked.includes(item);
          return (
            <label
              key={index}
              className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl cursor-pointer hover:border-zinc-700 transition-colors"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleItem(item)}
                className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
              />
              <span
                className={
                  checked ? "line-through text-zinc-500" : "text-white"
                }
              >
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
