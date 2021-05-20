
import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

const instance = axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: BASE_URL,
});

export default instance;
