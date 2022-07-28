import { NextComponentType } from "next";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
};

import style from './modal.module.css'
const Modal = ({ children }: ModalProps) => {

  return (
    <div className={style.modal}>
      {children}
    </div>
  )
}

export default Modal;