import { useParams, Link, useOutletContext } from "react-router-dom";
import 

export default function RecipeViewPage() {
  const id = useParams();
  const {recipes, handleAddToPlan} = useOutletContext();
  const recipe = recipes?.find((item) => item.id === Number(id));

  const recipe = 
}
