import React, { useState } from "react";
import "../styles/CreateRecipes.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import IngredientList from "../services/IngredientList_for_Create";
import apiUrl from "../config";
import axios from "axios";

const CreateRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [nameRecipe, setRecipeName] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [instructions, setInstructions] = useState([""]);
  const [stepCount, setStepCount] = useState(1);

  const getStoredAuthToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    return token ? token.split("=")[1] : null;
  };

  const handleIngredientSelect = (ingredientId, ingredientName) => {
    setSelectedIngredients((prevIngredients) => [
      ...prevIngredients,
      { id: ingredientId, name: ingredientName },
    ]);
    generateRecipes([...selectedIngredients, ingredientId]);
  };

  const setItam = (e) => {
    setRecipeName(e.target.value);
    console.log(nameRecipe);
  };

  const setInstructionAtIndex = (e, index) => {
    setInstructions((prevInstructions) => {
      const newInstructions = [...prevInstructions];
      newInstructions[index] = e.target.value;
      return newInstructions;
    });
  };

  const handleRemoveStep = (index) => {
    setInstructions((prevInstructions) =>
      prevInstructions.filter((_, i) => i !== index)
    );
    setStepCount((prevStepCount) => prevStepCount - 1);
  };

  const handleAddStep = () => {
    setInstructions((prevInstructions) => [...prevInstructions, ""]);
    setStepCount((prevStepCount) => prevStepCount + 1);
  };

  const handleIngredientRemove = (ingredientId) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
    );
    generateRecipes(selectedIngredients, searchTerm);
  };

  const generateRecipes = (selectedIngredients, search = "") => {
    console.log(selectedIngredients);
    const encodedIngredients = selectedIngredients.map((ingredient) => {
      if (typeof ingredient === "string") {
        return encodeURIComponent(ingredient);
      } else {
        return encodeURIComponent(ingredient.id);
      }
    });

    const queryString = `ingredients=${encodedIngredients.join(",")}`;
    console.log(queryString);

    axios
      .get(`${apiUrl}/recipes/searchByIngredients?${queryString}`)
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Error fetching recipes:", error));
  };

  const handleCreateRecipe = async () => {
    try {
      // Проверка наличия обязательных полей
      if (!nameRecipe || !instructions.some((step) => step.trim() !== "")) {
        console.error("Name and instructions are required fields.");
        return;
      }

      // Подготовка данных для отправки на сервер
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("name", nameRecipe);
      formData.append("instructions", instructions.join("\n"));

      // Добавление идентификаторов ингредиентов
      selectedIngredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}]`, ingredient.id);
      });

      console.log(selectedImage);

      // Отправка POST-запроса на сервер с использованием FormData
      const response = await axios.post(`${apiUrl}/recipes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getStoredAuthToken()}`,
        },
      });

      // Обработка успешного ответа, например, очистка формы
      console.log("Recipe created successfully:", response.data);
      setRecipeName("");
      setInstructions([""]);
      setSelectedIngredients([]);
      setSelectedImage(null); // Очистка выбранного изображения
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      // Можете также выполнить перенаправление или выполнить другие действия по вашему выбору
    } catch (error) {
      // Обработка ошибки, например, отображение сообщения об ошибке
      console.error(
        "Error creating recipe:",
        error.response?.data?.message || "Unknown error"
      );
    }
  };

  return (
    <div className="create-block">
      <h1 className="heder-create-recipes">Создать свои рецепты</h1>
      <div className="inputs">
        <input
          className="input-name"
          type="text"
          placeholder="Название рецепта"
          onChange={(e) => setItam(e)}
        />
        <div className="stratch"></div>
        <h1 className="heder-create-recipes">Фото готового блюда</h1>
        <label htmlFor="images" className="drop-container" id="dropcontainer">
          <span className="drop-title">Перетащите фотографии сюда</span>
          или
          <input
            type="file"
            id="images"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
        </label>
        <div className="stratch"></div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className="block">
          <IngredientList
            onSelect={handleIngredientSelect}
            selectedIngredients={selectedIngredients}
            onIngredientRemove={handleIngredientRemove}
          />
        </div>
      </DndProvider>
      <div className="input-ingredient-block">
        <h1 className="heder-create-recipes">Инструкция</h1>
        {instructions.map((instruction, index) => (
          <div className="input-inst-block" key={index}>
            <h2>Шаг {index + 1}</h2>
            <textarea
              className="input-inst"
              placeholder={`Инструкция к шагу ${index + 1}`}
              rows="4"
              cols="80"
              value={instruction}
              onChange={(e) => setInstructionAtIndex(e, index)}
            />
            <button
              className="btn-remove-step"
              onClick={() => handleRemoveStep(index)}
            >
              <img className="img-delete" src="/assets/delete.png" />
            </button>
          </div>
        ))}
        <button className="btn-add-step" onClick={handleAddStep}>
          Добавить шаг
        </button>
      </div>
      <div className="center">
        <button
          className="btn-primary_create-recipe"
          onClick={handleCreateRecipe}
          disabled={!getStoredAuthToken()}
        >
          Создать рецепт
        </button>
      </div>
      {showSuccessMessage && (
        <div className="success-message">Рецепт успешно создан!</div>
      )}
    </div>
  );
};

export default CreateRecipes;
