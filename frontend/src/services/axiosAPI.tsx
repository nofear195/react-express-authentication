import axios, { AxiosInstance, AxiosResponse } from "axios";
import { handleAndConvertError } from "../utils/helper";

interface responseData {
  code: number;
  message: string;
  data: unknown;
}

export class apiResult {
  data: unknown | null;
  error: string | null;
  constructor() {
    this.data = null;
    this.error = null;
  }
}

// Create an Axios instance with a base URL
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

function setAuthToken() {
  const token = localStorage.getItem("jwtToken");
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Define a function to fetch data with GET request
export async function fetchData(endpoint: string): Promise<apiResult> {
  setAuthToken();
  const result = new apiResult();
  try {
    const response: AxiosResponse<responseData> = await api.get(endpoint);
    if (response.status >= 300 || response.status < 200)
      throw new Error(response.statusText);

    const { code, message, data: resData } = response.data;
    if (code >= 300 && code < 200) throw new Error(message);

    result.data = resData;
    return result;
  } catch (error) {
    result.error = handleAndConvertError(error);
    return result;
  }
}

// Define a function to send data with POST request
export async function postData<T>(
  endpoint: string,
  data: T,
): Promise<apiResult> {
  setAuthToken();
  const result = new apiResult();
  try {
    const response: AxiosResponse<responseData> = await api.post(
      endpoint,
      data,
    );
    if (response.status >= 300 || response.status < 200)
      throw new Error(response.statusText);

    const { code, message, data: resData } = response.data;
    if (code >= 300 && code < 200) throw new Error(message);

    result.data = resData;
    return result;
  } catch (error) {
    result.error = handleAndConvertError(error);
    return result;
  }
}

// Define a function to update data with PUT request
export async function updateData<T>(
  endpoint: string,
  data: T,
): Promise<apiResult> {
  setAuthToken();
  const result = new apiResult();
  try {
    const response: AxiosResponse<responseData> = await api.put(endpoint, data);
    if (response.status >= 300 || response.status < 200)
      throw new Error(response.statusText);

    const { code, message, data: resData } = response.data;
    if (code >= 300 && code < 200) throw new Error(message);

    result.data = resData;
    return result;
  } catch (error) {
    result.error = handleAndConvertError(error);
    return result;
  }
}

// Define a function to delete data with DELETE request
export async function deleteData(endpoint: string): Promise<apiResult> {
  setAuthToken();
  const result = new apiResult();
  try {
    const response: AxiosResponse<responseData> = await api.delete(endpoint);
    if (response.status >= 300 || response.status < 200)
      throw new Error(response.statusText);

    const { code, message, data: resData } = response.data;
    if (code >= 300 && code < 200) throw new Error(message);

    result.data = resData;
    return result;
  } catch (error) {
    result.error = handleAndConvertError(error);
    return result;
  }
}


