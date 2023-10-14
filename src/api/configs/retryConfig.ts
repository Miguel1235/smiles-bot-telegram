import axiosRetry from "axios-retry";

export const retryConfig = {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: () => true,
};
