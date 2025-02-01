export type Unit = "pressure" | "kelvin" | "temperature";
export function formatValue(value: number, type: Unit) {
  if (type === "pressure") {
    return value;
  }

  if (type === "temperature") {
    return `${value} °C`;
  }

  if (type === "kelvin") {
    return `${value} K`;
  }
}
