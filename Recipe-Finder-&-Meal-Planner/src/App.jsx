import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MealCartPage from "./pages/MealCartPage";
import RecipeViewPage from "./pages/RecipeViewPage";
import GroceryListPage from "./pages/GroceryListPage";
import RootLayout from "./component/RootLayout";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan" element={<MealCartPage />} />
        <Route path="/recipe/:id" element={<RecipeViewPage />} />
        <Route path="/grocery-list" element={<GroceryListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
