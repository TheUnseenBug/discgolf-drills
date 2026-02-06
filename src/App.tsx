import { useEffect, useState } from "react";
import supabase from "./services/supabase";
import type { Drill } from "./types/drill";
import { Card } from "./components/Card";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  const [drills, setDrills] = useState<Drill[] | null>(null);
  useEffect(() => {
    async function getDrills() {
      const { data: data, error } = await supabase.from("drills").select("*");
      console.log("data:", data, "error:", error);
      setDrills(data);
    }

    getDrills();
  }, []);
  return (
    <>
      <Navbar />
      <ul className="grid grid-cols-4">
        {drills?.map((drill) => (
          <li key={drill.id}>
            <Card drill={drill}>{drill.description}</Card>
          </li>
        ))}
      </ul>
      <Footer />
    </>
  );
}

export default App;
