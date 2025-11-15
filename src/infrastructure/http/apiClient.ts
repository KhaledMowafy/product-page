import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.easy-orders.net/api/v1",
  timeout: 10000,
});