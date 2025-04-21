import { useState } from "react";

// MUI Import
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface InfoCardData {
  title: string;
  imgSrc: string;
  altText: string;
  modalTextTitle: string;
  modalText: string;
}

const InfoCard: React.FC<InfoCardData> = ({
  title,
  imgSrc,
  altText,
  modalTextTitle,
  modalText,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div
        onClick={handleOpen}
        className="p-6 w-full h-5/6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mb-4"
      >
        <h1 className="text-xl font-semibold text-gray-800 mb-4">{title}</h1>
        <img src={imgSrc} alt={altText} />
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ direction: "rtl" }}
        >
          <Box sx={style}>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              {modalTextTitle}
            </h1>
            <p className="text-gray-600 text-lg mb-5">{modalText}</p>

            <Button onClick={handleClose} variant="contained">
              קרא עוד
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default InfoCard;
