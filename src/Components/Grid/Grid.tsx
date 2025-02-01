import React from "react";
import "./Grid.css";

interface GridProps {
  data: number[][];
  metric: string;
  colorScale: (value: number) => string;
}


const Grid: React.FC<GridProps> = ({ data, metric, colorScale }) => {

  return (
    <div className="grid-container">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((value, colIndex) => (
            <div
              key={colIndex}
              className="grid-cell"
              style={{ backgroundColor: colorScale(value) }}
              title={`Row: ${rowIndex}, Col: ${colIndex}, Value: ${value}`}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
