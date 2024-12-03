import { useEffect } from "react";
import { Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { renderRoutes } from "./routes/renderRoutes";

const App = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.text = `
      window.$zoho = window.$zoho || {};
      $zoho.salesiq = $zoho.salesiq || { ready: function() {} };
    `;
    document.head.appendChild(script1);

    // Thêm script thứ hai
    const script2 = document.createElement("script");
    script2.id = "zsiqscript";
    script2.src =
      "https://salesiq.zohopublic.com/widget?wc=siq42eef49730d9b857a49dd5bdc3a5df8543945902783c613c0a53a6be857dbfe9";
    script2.defer = true;
    document.head.appendChild(script2);
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default App;
