import { Box, Button, Typography } from "@mui/material";
import type { FC } from "react";
import type { GameModalProps } from "./GameModal.types";

export const GameModal: FC<GameModalProps> = ({ label, handleClose }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {label}
      </Typography>
      <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
        Вернуться на главную
      </Button>
    </Box>
  );
};
