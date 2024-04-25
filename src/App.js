import React from "react";

import { HomeContainer } from "./home_container";

function App() {
  if (
    window.location.href === "https://e-kinetika.ru/" ||
    window.location.href === "http://e-kinetika.ru/"
  ) {
    window.location.href = "https://express-kinetika.ru";
  }

  return (
    <div>
      <HomeContainer />
    </div>
  );
}

export default App;
