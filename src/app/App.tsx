import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#C8C8C8",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "390px",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 60px rgba(0,0,0,0.25)",
          }}
        >
          <RouterProvider router={router} />
        </div>
      </div>
    </ThemeProvider>
  );
}
