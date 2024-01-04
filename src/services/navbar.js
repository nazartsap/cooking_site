import React from 'react';
import {  Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Главная страница</Link>
    </li>
    <li>
      <Link to="/cats">Помощь</Link>
    </li>
  </div>
  );
}
export default navbar;