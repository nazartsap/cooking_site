import React from 'react';
import { useDrag } from 'react-dnd';
import '../styles/ingredients_block.css';
const Ingredient = ({ name, onSelect }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'INGREDIENT',
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className='ingredient-item'
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
      }}
    >
      {name}
    </div>
  );
};

const IngredientList = ({ ingredients, onSelect }) => {
  return (
    <div className='ingredient-list'>
      <h2>Ингредиенты</h2>
      {ingredients.map((ingredient, index) => (
        <Ingredient key={index} name={ingredient} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default IngredientList;
