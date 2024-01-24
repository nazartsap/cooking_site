import React from 'react';
import '../styles/Profile.css'; 

const ProfilePage = () => {
  return (
    <div className='profile-block'>
      <div className='favorite-reciper'>
        <a>Пока здесь ничего нет, но скоро здесь появятся ваши любимые рецепты</a>
      </div>
      <div className='vertical-line'></div>
      <div className='profile-info'>
      <div className="profile-header">
        <img src="/assets/profile-icon.png" alt="Profile" className="profile-image" />
        <h2>Иван</h2>
        <p>Email: ivan@example.com</p>
      </div>
      <button className="change-button">Редактировать</button>
      <div className="profile-content">
        <h3>Лайков поставленно</h3>
        <h3>Коментариев оставленно</h3>
      </div>

      <button className="logout-button">Выйти</button>
      </div>
    </div>
  );
};

export default ProfilePage;