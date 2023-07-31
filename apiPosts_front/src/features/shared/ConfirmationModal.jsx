import { Box, Button, Modal } from "@mui/material";
import React from "react";

const ConfirmationModal = ({
  handleOpen,
  handleClose,
  handleConfirm,
  title,
  dialog,
  buttonText,
  buttonTextColor,
}) => {
  return (
    <Modal
      open={handleOpen}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...modalStyle, width: 300 }}>
        <h2 id="child-modal-title">{title}</h2>
        <p id="child-modal-description">{dialog}</p>
        <div style={style.button}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} style={{ color: buttonTextColor }}>
            {buttonText ? buttonText : "Confirmar"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const style = {
  button: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default ConfirmationModal;
