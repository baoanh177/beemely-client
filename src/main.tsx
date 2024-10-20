import ReactDOM from "react-dom/client";

import App from "./App.tsx";

// Styles
import "./index.css";

// Providers
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "@/services/store.ts";
import { Toaster } from "react-hot-toast";
import ModalProvider from "./components/modal/ModalProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster />
      <ModalProvider />
      <App />
    </Provider>
  </BrowserRouter>,
);
