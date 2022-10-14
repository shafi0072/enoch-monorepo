import React from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import styles from "../ComponentClasses.module.css";

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const ModalWrapper = ({ title, isOpen, onClose, children }: ModalProps) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <ModalHeader className="border-bottom border-2" closeButton>
        {title && (
          <ModalTitle className={`${styles.modalTitle}`}>{title}</ModalTitle>
        )}
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default ModalWrapper;
