import { Box } from "@mui/material";
import { type FC, type ReactNode } from "react";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box>
      <Box>{children}</Box>
    </Box>
  );
};
