import { useEffect, useState } from "react";
import "./ResultsVisualization.css";
import Grid from "../../Components/Grid/Grid";

import { createColorScale } from '../../utils/createColorScale'
const GRID_SIZE = 10; // Assuming a 10x10 grid

const ResultsVisualization: React.FC = () => {
  const [metric, setMetric] = useState<"temperature" | "pressure" | "kelvin">("pressure"); // Restrict to the valid metrics
  const [gridData, setGridData] = useState<number[][]>(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0)));
  const [iterations, setIterations] = useState<any[]>([]); // Store all metrics data
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
        console.log("data-----", data.iterations);
        setIterations(data.iterations);
      } catch (error) {
        console.error("Failed to fetch grid data:", error);
      }
    };
    fetchGridData();
  }, []);

  useEffect(() => {
    if (iterations.length > 0) {
      setGridData((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row]); // Clone the previous grid
  
        const stepData = iterations[currentStep]?.values;
  
        stepData?.forEach(([x, y, value]: [number, number, { temperature: string; pressure: number; kelvin: string }]) => {
          if (value && value[metric] !== undefined) {
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                const newX = x + i;
                const newY = y + j;
  
                // ✅ Update the entire 10x10 grid (remove any size limitation)
                if (newX < GRID_SIZE && newY < GRID_SIZE) {
                  const numericValue =
                    typeof value[metric] === "string"
                      ? parseFloat(value[metric]) // Convert "48.0°C" → 48.0
                      : value[metric];
  
                  if (newGrid[newX][newY] === 0) {
                    newGrid[newX][newY] = numericValue || 0;
                  }
                }
              }
            }
          }
        });
  
        return newGrid;
      });
    }
  }, [currentStep, metric, iterations]);
  
  
  // Animation handling
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prevStep) => {
        const nextStep = prevStep + 1;
        if (nextStep >= iterations.length) {
          clearInterval(interval); // Stop the animation at the last step
          return prevStep;
        }
        return nextStep;
      });
    }, 1000); // Update every 1 second

    return () => clearInterval(interval); // Cleanup on component unmount or when animation is stopped
  }, [isPlaying, iterations.length]);

  const playAnimation = () => setIsPlaying(true);
  const stopAnimation = () => setIsPlaying(false);
  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  // Get the color scale for the grid
  const colorScale = createColorScale(gridData);

  return (
    <div className="container">
      {/* Tabs for selecting metrics */}
      <div className="tabs">
        {["temperature", "pressure", "kelvin"].map((m) => (
          <button
            key={m}
            className={metric === m ? "active" : ""}
            onClick={() => setMetric(m as "temperature" | "pressure" | "kelvin")}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid">
        {/* Render the Grid component */}
        <Grid data={gridData} metric={metric} colorScale={colorScale} />
      </div>

      <div className="controls">
        {/* Animation controls */}
        <button onClick={playAnimation}>Play</button>
        <button onClick={stopAnimation}>Pause</button>
        <button onClick={resetAnimation}>Reset</button>
      </div>
    </div>
  );
};

export default ResultsVisualization;
