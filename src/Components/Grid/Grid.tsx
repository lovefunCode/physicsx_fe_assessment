import React from "react";
import "./Grid.css";

interface GridProps {
  data: number[][];
  metric: string;
}

const getColor = (value: number, metric: string): string => {
    

  const colorScales: Record<string, [number, number, number][]> = {
    pressure: [[173, 216, 230], [255, 69, 0]], // Blue to Red
    temperature: [[0, 255, 0], [255, 0, 0]], // Green to Red
    humidity: [[255, 255, 0], [0, 0, 255]], // Yellow to Blue
  };

  const [minColor, maxColor] = colorScales[metric] || colorScales["pressure"];
  const ratio = Math.min(value / 100, 1); // Normalize
  const r = Math.round(minColor[0] + ratio * (maxColor[0] - minColor[0]));
  const g = Math.round(minColor[1] + ratio * (maxColor[1] - minColor[1]));
  const b = Math.round(minColor[2] + ratio * (maxColor[2] - minColor[2]));

  return `rgb(${r}, ${g}, ${b})`;
};

const Grid: React.FC<GridProps> = ({ data, metric }) => {
    console.log('----', data, metric)

  return (
    <div className="grid-container">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((value, colIndex) => (
            <div
              key={colIndex}
              className="grid-cell"
              style={{ backgroundColor: getColor(value, metric) }}
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
