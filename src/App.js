import axios from "axios";
import { useState, useEffect } from "react";

import { TransTable } from "./components/TransTable";

function App() {
  const [trans, setTrans] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTrans = async () => {
    setLoading(true);

    const res = await axios.get("./data.json");

    setTrans(res.data);

    setLoading(false);
  };


  useEffect(() => {

    loadTrans();

  },[]);

  return (
    <div className="App">
      {loading ? (
        <h4>Loading...</h4>) : 
        <TransTable trans={trans}/>
        
      }
    </div>
  );
}

export default App;
