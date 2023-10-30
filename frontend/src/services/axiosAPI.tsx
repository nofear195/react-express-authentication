import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { handleAndConvertError } from "../utils/helper";

interface responseData {
  code: number;
  message: string;
  data: unknown;
}

class ApiResult {
  data: unknown | null;
  error: string | null;
  constructor() {
    this.data = null;
    this.error = null;
  }
}

export default class AxiosApi {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({ baseURL });
  }

  private setAuthToken() {
    const token = localStorage.getItem("jwtToken");
    if (token)
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  private async sendRequest<T extends AxiosRequestConfig<T>>(
    endpoint: string,
    data: T | null,
    method: "get" | "post" | "put" | "delete",
  ): Promise<ApiResult> {
    const result = new ApiResult();
    this.setAuthToken();

    try {
      let response: AxiosResponse<responseData>;

      if (method === "get" || method === "delete") {
        response = await this.api[method](endpoint);
      } else {
        response = await this.api[method](endpoint, data);
      }

      if (response.status >= 300 || response.status < 200)
        throw new Error(response.statusText);

      const { code, message, data: resData } = response.data;
      if (code >= 300 && code < 200) throw new Error(message);

      result.data = resData;
    } catch (error) {
      result.error = handleAndConvertError(error);
    }

    return result;
  }

  public async fetchData(endpoint: string): Promise<ApiResult> {
    return this.sendRequest(endpoint, null, "get");
  }

  public async postData<T>(endpoint: string, data: T): Promise<ApiResult> {
    if (!data) return new ApiResult();
    return this.sendRequest(endpoint, data, "post");
  }

  public async updateData<T>(endpoint: string, data: T): Promise<ApiResult> {
    if (!data) return new ApiResult();
    return this.sendRequest(endpoint, data, "put");
  }

  public async deleteData(endpoint: string): Promise<ApiResult> {
    return this.sendRequest(endpoint, null, "delete");
  }
}
