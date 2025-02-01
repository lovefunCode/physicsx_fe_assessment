import { useEffect, useState } from "react";
import "./ResultsVisualization.css";

import Grid from "../../Components/Grid/Grid";

const GRID_SIZE = 10;


const ResultsVisualization: React.FC = () => {
  const [metric, setMetric] = useState<"temperature" | "pressure" | "kelvin">("temperature");; // Default to pressure
  const [gridData, setGridData] = useState<number[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
  );
  const [iterations, setIterations] = useState<any>({}); // Store all metrics data
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch initial grid data from API
  useEffect(() => {
    const fetchGridData = async () => {
      try {
        const allDataResponse = await fetch(
          "http://localhost:5001/api/iterations"
        );
        const data = await allDataResponse.json();
        setIterations(data.iterations);
      } catch (error) {
        console.error("Failed to fetch grid data:", error);
      }

    };
    fetchGridData();
  }, []);

  // Update grid data when the current step changes
  useEffect(() => {
    console.log('=======iterations', iterations)
    if (iterations > 0) {
      const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
       // Get the data for the selected metric (temperature, pressure, or kelvin)
       const stepData = iterations[currentStep]?.values;

       // Loop through the values for the current step
       stepData?.forEach(([x, y, value]: [number, number, { temperature: string, pressure: number, kelvin: string }]) => {
         // Extract the value based on the selected metric
         if (value && value[metric] !== undefined) {
           // Update the grid with the metric value (e.g., pressure, temperature, or kelvin)
           newGrid[x][y] = value[metric];
         }
       });
      console.log('newGrid----', newGrid)
      setGridData(newGrid);
    }
  }, [currentStep, metric, iterations]);

  // Animation handling
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % iterations.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, iterations.length]);

  const playAnimation = () => setIsPlaying(true);
  const stopAnimation = () => setIsPlaying(false);
  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="container">
      {/* Tabs for selecting metrics */}
      <div className="tabs">
        {["temperature", "pressure", "kelvin"].map((m) => (
          <button
            key={m}
            className={metric === m ? "active" : ""}
            onClick={() => setMetric(m)}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid">
        {/* paste your code here */}
        <Grid data={gridData} metric={metric} />
      </div>
      <div className="controls">
        {/* paste your code here */}
        <button onClick={playAnimation}>Play</button>
        <button onClick={stopAnimation}>Pause</button>
        <button onClick={resetAnimation}>Reset</button>
      </div>
    </div>
  );
};

export default ResultsVisualization;
function setIsPlaying(arg0: boolean) {
  throw new Error("Function not implemented.");
}

