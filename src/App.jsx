import React, { useState } from "react";
import Navbar from "./component/navbar";
import Itempacker from "./component/Item_packer";
import Footer from "./component/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Itempacker />
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
