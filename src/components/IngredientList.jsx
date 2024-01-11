import React from 'react';
import { useDrag } from 'react-dnd';
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
        backgroundColor: '#0ABAB5',
      }}
    >
      {name}
    </div>
  );
};

const IngredientList = ({ ingredients, onSelect }) => {
  return (
    <div className='ingredient-block'>
      <h2 className='hader'>Ингредиенты</h2>
        <div className='ingredient-list'>
        {ingredients.map((ingredient, index) => (
          <Ingredient key={index} name={ingredient} onSelect={onSelect} />
        ))}
        </div>
    </div>
  );
};

export default IngredientList;
