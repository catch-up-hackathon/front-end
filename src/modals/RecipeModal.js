import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 모달이 화면에 나타날 위치를 설정

const RecipeModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Recipe Modal"
    >
      {/* 모달 내용을 구성 */}
      <h2>Recipe Modal</h2>
      {/* 추가적인 내용을 여기에 추가할 수 있습니다. */}
      <button onClick={closeModal}>닫기</button>
    </Modal>
  );
};

export default RecipeModal;