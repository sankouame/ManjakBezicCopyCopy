import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: "#D6D6D6" }}>
        <div className="mx-auto max-w-[390px] min-h-screen bg-background shadow-2xl relative overflow-hidden">
          <RouterProvider router={router} />
        </div>
      </div>
    </ThemeProvider>
  );
}
