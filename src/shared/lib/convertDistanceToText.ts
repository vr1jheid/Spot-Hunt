export const convertDistanceToText = (distance: number) => {
  if (distance < 1 && distance > 0.09) {
    return `${Math.round(distance * 100)}0 m`;
  }
  if (distance < 0.09) {
    return "<100 m";
  }
  if (distance > 1) {
    return distance.toFixed(1) + " km";
  }
  return "error";
};
