import { getCountryData } from './countryData.js';

const minMax = {
  "elevation": {
    "max": 3280.0,
    "min": 18.0
  },
  "costline": {
    "max": 202080.0,
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
    "max": 131200.0,
    "min": 0.4
  },
  "average male height": {
    "max": 181.0,
    "min": 160.3
  },
  "population": {
    "max": 50000000.0,
    "min": 50.0
  }
};

const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const getMedian = (att, val) => {
  const max = minMax[att]['max'];
  return val/max;
 }

export const calculateColor = (att, id) => {
  const data = getCountryData(id);
  let val = data['info'][att];
  if (typeof val === 'undefined') {
    return "black";
  }
  if (att === 'average temperature') {
    val = val['temperature']
  }
  if (att === 'elevation') {
    val = val.slice(0, -1).replace(',','').replace('.','');
  }
  let median = getMedian(att, val);
  median = median>1 ? 1: median;
  if (val > 0) {
    return rgbToHex(Math.floor(55 + 200*median), 0,0);
  }
  return rgbToHex(0, 0, Math.floor(55+ 200*median+100));
}

export const getOptions = () => {
  return Object.keys(minMax);
}