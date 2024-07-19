import { useEffect, useState } from "react";

function App() {

  useEffect(() => {
    fetch("/api/data")
      .then((res) => console.log("res", res))
  }, []);

  return <>Returning...</>;
}

export default App;
