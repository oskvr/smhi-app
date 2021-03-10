import { resultsPerPage, currentPage, totalResults } from "../pagination.js";
import { isFilteredByDate } from "../dateFilter.js";
let weatherData = [];
let filteredWeatherData = [];
export async function fetchWeatherDataAsync(stationId) {
  // Alla endpoints: https://opendata-download-metobs.smhi.se/api/version/latest.
  // 2 === temperatur medelvärde 1 gång/dygn
  const url = `https://opendata-download-metobs.smhi.se/api/version/latest/parameter/27/station/${stationId}/period/latest-months/data.json`;
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
  // render table body here
}
export function getWeatherDataProps() {
  return Object.keys(weatherData.value[0]);
}

export function filterByDates(start, end) {
  const filteredData = weatherData.value.filter((data) => {
    const convertedString = new Date(data.date).toDateString();
    const converted = new Date(convertedString).getTime();
    return converted >= start && converted <= end;
  });
  console.log(filteredData);
  filteredWeatherData = filteredData;
}
export function sortWeatherData(targetData, sortOrder) {
  const sorted = getWeatherData().sort((a, b) => {
    if (typeof a[targetData] === "string") {
      // Sort by string
      if (sortOrder === "asc") {
        return a[targetData] > b[targetData] ? 1 : -1;
      } else {
        return b[targetData] > a[targetData] ? 1 : -1;
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

function parse(data) {
  const output = {
    parameter: {
      key: data.parameter.key,
      name: data.parameter.name,
      summary: data.parameter.summary,
      unit: data.parameter.unit,
    },
    period: {
      key: data.period.key,
      from: data.period.from,
      to: data.period.to,
      summary: data.period.summary,
      sampling: data.period.sampling,
    },
    position: {
      from: data.position[0].from,
      to: data.position[0].to,
      height: data.position[0].height,
      latitude: data.position[0].latitude,
      longitude: data.position[0].longitude,
    },
    station: {
      height: data.station.height,
      key: data.station.key,
      name: data.station.name,
      owner: data.station.owner,
      ownerCategory: data.station.ownerCategory,
    },
    updated: data.updated,
    values: data.value,
  };
  return output;
}
