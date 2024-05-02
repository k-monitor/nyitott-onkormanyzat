// utils/fetchCsv.js
import Papa from 'papaparse';

export async function fetchCsv(url) {
   return fetch(url)
      .then((response) => response.text())
      .then((csv) => {
         const parsed = Papa.parse(csv, { header: true });
         return parsed.data;
      });
}
