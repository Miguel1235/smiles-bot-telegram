const { API_TOKEN: token } = process.env;
if (token == null) throw new Error('"API_TOKEN" env var is required!');

export const headers = {
  accept: "application/json, text/plain, */*",
  channel: "Web",
  language: "es-ES",
  region: "ARGENTINA",
  Referer: "https://www.smiles.com.ar/",
  "x-api-key": token,
};
