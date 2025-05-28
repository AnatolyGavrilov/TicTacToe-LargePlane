import { createBrowserRouter } from "react-router-dom";
import { AppRouter } from "../../AppRouter";
import { ROUTES } from "../../constants";
import { LoginPage } from "../../pages/LoginPage";
import { GamePage } from "../../pages/GamePage";
import { HistoryPage } from "../../pages/HistoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRouter />,
    children: [
      { path: ROUTES.ROOT, element: <LoginPage /> },
      {
        path: ROUTES.GAME,
        element: <GamePage />,
      },
      {
        path: ROUTES.HISTORY,
        element: <HistoryPage />,
      },
    ],
  },
]);
