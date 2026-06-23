import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[390px] min-h-screen bg-background shadow-xl">
          <RouterProvider router={router} />
        </div>
      </div>
    </ThemeProvider>
  );
}
