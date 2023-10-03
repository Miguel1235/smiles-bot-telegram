import axios from "axios";
import axiosRetry from "axios-retry";
import { headers } from "./configs/headers";
import { retryConfig } from "./configs/retryConfig";

const taxes = axios.create({
  baseURL:
    "https://api-airlines-boarding-tax-prd.smiles.com.br/v1/airlines/flight",
  headers: {
    ...headers,
    "accept-language": "en-US,en;q=0.9,es-AR;q=0.8,es;q=0.7",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
});

axiosRetry(taxes, retryConfig);

export default taxes;
