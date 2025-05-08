import { Toaster } from "react-hot-toast";

export function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
        },
        success: {
          iconTheme: {
            primary: "#00B24E",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ff4b4b",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
