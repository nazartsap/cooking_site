import React from 'react';
import '../styles/Profile.css'; 

const ProfilePage = () => {
  return (
    <div>
      <div className="profile-header">
        <img src="/assets/user-profile-icon.svg" alt="Profile" className="profile-image" />
        <h2>Иван</h2>
        <p>Email: ivan@example.com</p>
      </div>

      <div className="profile-content">
        <h3>Любимые рецепты</h3>
        <ul>
          <li>Паста с лососем</li>
          <li>Картошка по-деревенски</li>
        </ul>
      </div>

      <button className="logout-button">Выйти</button>
    </div>
  );
};

export default ProfilePage;