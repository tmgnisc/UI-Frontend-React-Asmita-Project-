// import React, { useEffect } from "react";

// const GoogleTranslate = () => {
//   useEffect(() => {
//     const addScript = document.createElement("script");
//     addScript.src =
//       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     addScript.async = true;
//     addScript.defer = true;
//     addScript.onerror = () =>
//       console.error("Google Translate script failed to load.");
//     document.body.appendChild(addScript);

//     return () => {
//       document.body.removeChild(addScript);
//     };
//   }, []);

//   return <div id="google_translate_element"></div>;
// };

// export default GoogleTranslate;

import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    addScript.defer = true;
    addScript.onerror = () =>
      console.error("Google Translate script failed to load.");
    document.body.appendChild(addScript);

    return () => {
      document.body.removeChild(addScript);
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
