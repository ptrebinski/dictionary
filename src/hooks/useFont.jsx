import { useEffect, useState } from "react";

export function useFont() {
  const [font, setFont] = useState("serif");

  useEffect(() => {
    const storedFont = localStorage.getItem("font");
    if (storedFont !== null) {
      setFont(storedFont);
    } else {
      localStorage.setItem("font", font);
    }
  }, []);

  const handleFontChange = (font) => {
    setFont(font);
    localStorage.setItem("font", font);
  };

  return [font, handleFontChange];
}
