import Papa from "papaparse";

// object that stores continent boundbox coordinates
const regionBoundBoxes = [
  {
    Region: "North America",
    LatRange: [30.239, 61.606],
    LongRange: [-127.89, -71.203],
  },
  { Region: "Europe", LatRange: [36.597, 68.784], LongRange: [-6.152, 34.98] },
  { Region: "Asia", LatRange: [-7.536, 59.712], LongRange: [59.765, 136.58] },
  {
    Region: "Africa",
    LatRange: [-31.952, 36.031],
    LongRange: [-7.031, 50.273],
  },
  {
    Region: "Oceania",
    LatRange: [-39.909, -12.039],
    LongRange: [115.839, 155.742],
  },
  {
    Region: "South America",
    LatRange: [-36.879, 9.622],
    LongRange: [-75.41, -37.089],
  },
];

// parses csv data and returns object
function parse() {
  return new Promise((resolve, reject) => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/1Y_yiT-_7IimioBvcqiCPwLzTLazfdRyzZ4k3cpQXiAw/gviz/tq?tqx=out:csv&sheet=sample_data",
      {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          resolve(results.data);
        },
      }
    );
  });
}

// gets random lat or long coordinates within a region bound box
export function getRandomLatLong(index, latOrLongProp) {
  return parseFloat(
    (
      Math.random() *
        (regionBoundBoxes[index][latOrLongProp][1] -
          regionBoundBoxes[index][latOrLongProp][0]) +
      regionBoundBoxes[index][latOrLongProp][0]
    ).toFixed(3)
  );
}

// returns region of bound box
export function getRegion(index) {
  return regionBoundBoxes[index]["Region"];
}

// returns the first digit in a number, used for randomization
export function firstDigit(num) {
  const matches = String(num).match(/\d/);
  let digit = 0;
  if (matches) {
    digit = Number(matches[0]);
  }
  return digit;
}

// gets a random year in a decade range
export function randomYearinDecade(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function dataHandler(req, res) {
  try {
    const dataContents = await parse();
    return dataContents;
  } catch (err) {
    console.log("something went wrong");
  }
}
