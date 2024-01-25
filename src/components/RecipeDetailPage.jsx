import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import '../styles/RecipeDetailPage.css';
import axios from 'axios';
import apiUrl from '../config';

const RecipeDetailPage = () => {
  const [recipes, setRecipes] = useState([]);
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
  
  const { recipeId } = useParams();
  const selectedRecipe = recipes.find(recipe => String(recipe._id) === String(recipeId));
  if (!selectedRecipe) {
    return <div>Рецепт не найден</div>;
  }

  return (
    <div className='recipe-cont'>
      <h2 className='title-recipe-detail'>{selectedRecipe.name}</h2>
      <img src={selectedRecipe.imageUrl} alt={selectedRecipe.name} />
      <p className='description-recipe-detail'>{selectedRecipe.instructions}</p>
      <p>Рейтинг: {selectedRecipe.likes}</p>
    </div>
  );
};

export default RecipeDetailPage;