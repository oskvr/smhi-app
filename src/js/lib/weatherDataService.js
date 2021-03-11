import {
  resultsPerPage,
  currentPage,
  totalResults,
  setResultsLength,
} from "../pagination.js";
import { isFilteredByDate } from "../dateFilter.js";
let weatherData = [];
let filteredWeatherData = [];
export async function fetchWeatherDataAsync(stationId) {
  // Alla endpoints: https://opendata-download-metobs.smhi.se/api/version/latest.
  // 2 === temperatur medelvärde 1 gång/dygn
  const url = `https://opendata-download-metobs.smhi.se/api/version/latest/parameter/2/station/${stationId}/period/latest-months/data.json`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export function getWeatherData() {
  if (isFilteredByDate) {
    return filteredWeatherData;
  } else {
    return weatherData.value;
  }
}
export function setWeatherData(value) {
  weatherData = value;
  setResultsLength(weatherData.value.length);
}
export function getWeatherDataProps() {
  return Object.keys(weatherData.value[0]);
}

export function filterByDates(start, end) {
  const filteredData = weatherData.value.filter((data) => {
    const convertedString = new Date(
      data.date ?? data.from ?? data.ref
    ).toDateString();
    const converted = new Date(convertedString).getTime();
    return converted >= start && converted <= end;
  });
  console.log(filteredData);
  console.log(filteredData);
  filteredWeatherData = filteredData;
}

export function sortWeatherData(targetData, sortOrder) {
  function sortAscString(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }
  function sortDescString(a, b) {
    return b > a ? 1 : b < a ? -1 : 0;
  }

  const sorted = getWeatherData().sort((a, b) => {
    if (typeof a[targetData] === "string" && isNaN(a[targetData])) {
      // Sort by string
      if (sortOrder === "asc") {
        // return a[targetData] > b[targetData] ? 1 : -1;
        return sortAscString(a[targetData], b[targetData]);
      } else {
        return sortDescString(a[targetData], b[targetData]);
        // return b[targetData] > a[targetData] ? 1 : -1;
      }
    } else {
      // Sort by number
      return sortOrder === "asc"
        ? b[targetData] - a[targetData]
        : a[targetData] - b[targetData];
    }
  });
  if (isFilteredByDate) {
    filteredWeatherData = sorted;
  } else {
    weatherData.value = sorted;
  }
}
export function getUnitString() {
  switch (weatherData.parameter.unit) {
    case "millimetre":
      return "mm";
    case "metre":
      return "m";
    case "degree celsius":
      return "°C";
    default:
      return "";
  }
}

export function getPaginatedWeatherData() {
  if (resultsPerPage === totalResults) return getWeatherData();
  const minIndex = currentPage * resultsPerPage - resultsPerPage;
  const maxIndex = minIndex + resultsPerPage;
  return getWeatherData().filter((_, i) => i >= minIndex && i < maxIndex);
}

export function get() {
  const output = {
    parameter: {
      key: weatherData.parameter.key,
      name: weatherData.parameter.name,
      summary: weatherData.parameter.summary,
      unit: weatherData.parameter.unit,
    },
    period: {
      key: weatherData.period.key,
      from: weatherData.period.from,
      to: weatherData.period.to,
      summary: weatherData.period.summary,
      sampling: weatherData.period.sampling,
    },
    position: {
      from: weatherData.position[0].from,
      to: weatherData.position[0].to,
      height: weatherData.position[0].height,
      latitude: weatherData.position[0].latitude,
      longitude: weatherData.position[0].longitude,
    },
    station: {
      height: weatherData.station.height,
      key: weatherData.station.key,
      name: weatherData.station.name,
      owner: weatherData.station.owner,
      ownerCategory: weatherData.station.ownerCategory,
    },
    updated: weatherData.updated,
    values: weatherData.value,
  };
  return output;
}
