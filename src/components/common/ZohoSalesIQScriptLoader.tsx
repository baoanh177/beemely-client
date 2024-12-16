import { useEffect } from "react";
const ZohoSalesIQScriptLoader = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.text = `
      window.$zoho = window.$zoho || {};
      $zoho.salesiq = $zoho.salesiq || { ready: function() {} };
    `;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.id = "zsiqscript";
    script2.src = "https://salesiq.zohopublic.com/widget?wc=siqfeeec866f99da34a2966a85112c5ba9dc042b55d56338db898c45cb66e62c620";
    script2.defer = true;
    document.head.appendChild(script2);
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return null;
};

export default ZohoSalesIQScriptLoader;
