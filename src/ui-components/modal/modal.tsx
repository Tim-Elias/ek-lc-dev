import React, { useCallback, useEffect, useState } from "react";
import "./modal.css";

interface IModalProps {
  open: boolean;
  header: string;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  children?: React.JSX.Element;
  trigger?: React.JSX.Element | null;
  height?: string;
  width?: string;
  heightBody?: string;
}

const Modal = ({
  open,
  header,
  onClose,
  onCancel,
  onConfirm,
  children,
  trigger = null,
  height = "250px",
  width = "500px",
  heightBody = "calc(100% - 123px)",
}: IModalProps) => {
  const [isOpen, setOpen] = useState(false);

  const modalStyle = {
    height,
    width,
  };

  const modalBodyStyle = {
    height: heightBody,
  };

  useEffect(() => {
    if (open) {
      setOpen(open);
    }
  }, [open]);

  const handleCancel = useCallback(() => {
    onCancel && onCancel();
    setOpen(false);
  }, [setOpen, onCancel]);

  const handleConfirm = useCallback(() => {
    onConfirm && onConfirm();
    setOpen(false);
  }, [setOpen, onConfirm]);

  const handleClose = useCallback(() => {
    onClose && onClose();
    setOpen(false);
  }, [setOpen, onClose]);

  return (
    <>
      {trigger && <div onClick={() => setOpen(true)}>{trigger}</div>}

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal" style={modalStyle}>
            <div className="modal-header">
              <h2>{header}</h2>
              <button className="close-button" onClick={handleClose}>
                &times;
              </button>
            </div>
            <div className="modal-body" style={modalBodyStyle}>
              {children}
            </div>
            <div className="modal-footer">
              {onCancel && <button onClick={handleCancel}>Отмена</button>}
              {onConfirm && (
                <button onClick={handleConfirm}>Подтвердить</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
