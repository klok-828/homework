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

  const rewards = (total) => {
    let points = 0;
    let amt = total;
    let above100 = amt - 100;

    if(above100 > 0) {
      points += (above100 * 2);
    }

    if(amt > 50) {
      points += 50;
    }

    return points;
  }

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
