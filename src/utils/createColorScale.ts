import { scaleSequential } from "d3-scale";
import { interpolatePRGn } from "d3-scale-chromatic";
import { flatten, min, max } from "lodash";

export function createColorScale(gridData: number[][]) {
  // Compute the range of the nested array using lodash
  const flatData = flatten(gridData); // Flatten the 2D array
  const minValue = min(flatData) ?? 0; // Minimum value
  const maxValue = max(flatData) ?? 1; // Maximum value (default to 1 to avoid division by zero)

  // Create a d3 scale with purple colors
  const scale = scaleSequential(interpolatePRGn).domain([minValue, maxValue]);

  // Return the scale
  return scale;
}
