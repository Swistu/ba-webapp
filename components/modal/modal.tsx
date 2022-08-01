import React from 'react';
import style from './modal.module.css';

type ModalProps = {
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
  return <div className={style.modal}>{children ? children : null}</div>;
};

export default Modal;
