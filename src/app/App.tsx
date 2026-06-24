import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      {/* Gray desktop frame */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#B0B0B0",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* Phone container — 390px wide, full viewport height */}
        <div
          style={{
            width: "100%",
            maxWidth: "390px",
            height: "100dvh",
            position: "relative",
            overflowX: "hidden",
            overflowY: "visible",
            boxShadow: "0 0 40px rgba(0,0,0,0.3)",
          }}
        >
          <RouterProvider router={router} />
        </div>
      </div>
    </ThemeProvider>
  );
}
