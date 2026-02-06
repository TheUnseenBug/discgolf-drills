import { useEffect, useState } from "react";
import supabase from "../services/supabase";
function App() {
  const [drills, setDrills] = useState();
  useEffect(() => {
    async function getDrills() {
      const { data: data, error } = await supabase.from("drills").select("*");

      console.log(data, error);
      console.log((await supabase.from("drills").select("*")).data);
      if (data.length > 1) {
        setDrills(data);
      }
    }

    getDrills();
  }, []);
  return (
    <>
      <div className="text-red-800">hello world</div>
      <div>{drills?.[0]?.name}</div>
    </>
  );
}

export default App;
