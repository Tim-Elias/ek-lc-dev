import React, { useCallback } from "react";
import Modal from "../ui-components/modal/modal";
import { useDispatch, useSelector } from "react-redux";

export const ContentModal = () => {
  const dispatch = useDispatch();

  const modal_show = useSelector((state) => state.general.modal_show);
  const modal_header = useSelector((state) => state.general.modal_header);
  const modal_text = useSelector((state) => state.general.modal_text);

  const set_modal_show = useCallback(() => {
    dispatch({ type: "set_modal_show", payload: false });
  }, [dispatch]);

  return (
    <Modal open={modal_show} onClose={set_modal_show} header={modal_header}>
      <p>{modal_text}</p>
    </Modal>
  );
};
