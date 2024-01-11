import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import axios from 'axios';
import '../styles/Home.css';

const Ingredient = ({ name, onSelect }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'INGREDIENT',
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className='ingredient-item'
      onClick={() => onSelect(name)}
      ref={drag}
      style={{
        display: 'flex',
        justifyContent: 'center',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        marginBottom: '8px',
        border: '1px solid #000',
        padding: '8px',
        borderRadius: '20px',
        backgroundColor: '#0ABAB5',
      }}
    >
      {name}
    </div>
  );
};

const IngredientList = ({ onSelect }) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('https://important-cyan-sandals.cyclic.app/ingredients');
        setIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <div className='ingredient-block'>
      <h2 className='header'>Ингредиенты</h2>
      <div className='ingredient-list'>
        {ingredients.map((ingredient) => (
          <Ingredient key={ingredient._id} name={ingredient.name} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default IngredientList;
