const minMax = {
  "elevation": {
    "max": 3280.0,
    "min": 18.0
  },
  "costline": {
    "max": 998.0,
    "min": 0.0
  },
  "average temperature": {
    "max": 28.25,
    "min": -5.35
  },
  "life expectancy": {
    "max": 83.5,
    "min": 37.2
  },
  "surface area": {
    "max": 13120000.0,
    "min": 0.4
  },
  "average male height": {
    "max": 181.0,
    "min": 160.3
  },
  "population": {
    "max": 1277558000.0,
    "min": 50.0
  }
};

export const getMedian = (att, val) => {
  const max = minMax[att]['max'];
  return val/max;
 }

export const getOptions = () => {
  return Object.keys(minMax);
}