import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import RecipeModal from '../modals/RecipeModal';

const RecipePage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Recipe Page</h1>
      <button onClick={openModal}>모달 열기</button>
      {/* 모달을 라우트와 연결 */}
      <Route path="/recipe" component={() => <RecipeModal isOpen={modalIsOpen} closeModal={closeModal} />} />
    </div>
  );
};

export default RecipePage;