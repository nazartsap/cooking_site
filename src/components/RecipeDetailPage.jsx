import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/RecipeDetailPage.css";
import axios from "axios";
import apiUrl from "../config";
import RecipeCard from './RecipeCard';

const RecipeDetailPage = () => {
  const [ recipe, setRecipe ] = useState([]);
  const { recipeId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(3);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [recipeId]);

  console.log(recipe)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/recipes`);
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (!recipe) {
    return <div>Рецепт не найден</div>;
  }

  return (
    <div className="recipe-cont">
      <h2 className="title-recipe-detail">{recipe.name}</h2>
      <img src={recipe.imageUrl} alt={recipe.name} />
      <div className='like-and-dislike'>
      <div className='like'><img className='like-img' src='/assets/like.svg' alt='?'/> {recipe.likes}</div>
      <div className='dislike'><img className='like-img' src='/assets/dislike.svg' alt='?'/> {recipe.likes}</div>
      </div>
      {recipe.createdBy && (
        <div className="author-info">
          {recipe.createdBy.role === 'user' ? (
            <p>Автор: {recipe.createdBy.name} {recipe.createdBy.surname}</p>
          ) : null}
        </div>
      )}
      <h1>Ингредиенты</h1>
      {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="ingredients-block">
            {recipe.ingredients.map((ingredient) => (
              <span className='ingridient'key={ingredient._id}>{ingredient.name} </span>
            ))}
          </div>
        )}
        <h1>Способ приготовления</h1>
        <p className="description-recipe-detail">{recipe.instructions}</p>
      <h1>Похожие рецепты</h1>
        <div className='similar-recipes'>
          {currentRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} id={recipe._id} name={recipe.name} instructions={recipe.instructions} imageUrl={recipe.imageUrl} likes={recipe.likes} ingredients={recipe.ingredients}/>
          ))}
        </div>
      <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
          <span>Страница {currentPage}</span>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastRecipe >= recipes.length}>{'>'}</button>
        </div>
    </div>
  );
};

export default RecipeDetailPage;
