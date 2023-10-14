import axios from "axios";
import axiosRetry from "axios-retry";
import { headers } from "./configs/headers";
import { retryConfig } from "./configs/retryConfig";

const flights = axios.create({
  baseURL: "https://api-air-flightsearch-prd.smiles.com.br/v1/airlines",
  headers: {
    ...headers,
    authority: "api-air-flightsearch-prd.smiles.com.br",
    "cache-control": "no-cache",
    origin: "https://www.smiles.com.ar",
    pragma: "no-cache",
    "user-agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
  },
});

axiosRetry(flights, retryConfig);

export default flights;
