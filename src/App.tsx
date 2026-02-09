import { useEffect } from "react";
import { useDrillStore } from "./store/useDrillStore";
import { Card } from "./components/Card";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { Drill } from "./types/drill";

function App() {
  const fetchDrills = useDrillStore((state) => state.fetchDrills);
  const drills = useDrillStore((state) => state.drills);
  const selectedCategory = useDrillStore((state) => state.selectedCategory);
  const isLoading = useDrillStore((state) => state.isLoading);

  useEffect(() => {
    fetchDrills();
  }, [fetchDrills]);

  // Filter drills based on selected category
  const filteredDrills = selectedCategory
    ? drills.filter((drill) => drill.category === selectedCategory)
    : drills;

  console.log("Selected category:", selectedCategory);
  console.log("Filtered drills:", filteredDrills);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-4 py-4">
        {isLoading ? (
          <div className="text-center py-8">Loading drills...</div>
        ) : (
          <ul className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-5 gap-4">
            {filteredDrills.map((drill: Drill) => (
              <li key={drill.id}>
                <Card drill={drill}>{drill.description}</Card>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
