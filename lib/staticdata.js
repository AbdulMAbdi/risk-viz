import Papa from "papaparse";
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

export default async function handler(req, res) {
  try {
    const dataContents = await parse();
    return dataContents;
  } catch (err) {
    console.log("something went wrong");
  }
}
