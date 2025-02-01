import { useEffect } from "react";
import "./ResultsVisualization.css";

const ResultsVisualization: React.FC = () => {

  // Fetch initial grid data from API
  useEffect(() => {
    const fetchGridData = async () => {
      const allDataResponse = await fetch(
        "http://localhost:5001/api/iterations"
      );
      console.log(allDataResponse.json());
    };
    fetchGridData();
  }, []);


  return (
    <div className="container">
      <div className="grid">
        {/* paste your code here */}
      </div>
      <div className="controls">
        {/* paste your code here */}
      </div>
    </div>
  );
};

export default ResultsVisualization;
