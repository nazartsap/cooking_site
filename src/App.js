import React  from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/Home';
import Help from './components/Help';
import Navbar from './services/navbar';
import Profile from './components/Profile';
import Recipe from './components/Recipe';
import RecipeDetailPage from './components/RecipeDetailPage';
import Registration from './components/Registration';
import Login from './components/Login';
import popularRecipesData from './services/recipesData';

const App = () => {
  
  const isRegistrationPage = window.location.pathname === '/registration';
  const isLoginPage = window.location.pathname === '/login';
  
  return (
    <div className="App">
      <Router>
        {!isRegistrationPage && !isLoginPage && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe" element={<Recipe/>} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetailPage recipes={popularRecipesData} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
