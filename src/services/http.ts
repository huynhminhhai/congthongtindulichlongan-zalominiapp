import envConfig from 'envConfig';
import { useStoreApp } from 'store/store';

import { getDataFromStorage, removeDataFromStorage } from './zalo';

export class HttpError extends Error {
  status: number;

  response: Response;

  message: string;

  constructor(response, message = '') {
    super(message || response.statusText || String(response.status));
    this.name = 'HttpError';
    this.status = response.status;
    this.response = response;
    this.message = message;
  }
}
export const logout = () => {
  removeDataFromStorage('token');
  const { setAccount } = useStoreApp.getState();
  setAccount(null);
};

export const errorHandler = (error: HttpError) => {
  console.log('error', error);
  switch (error.status) {
    case 401:
      logout();
      break;

    default:
      throw error as HttpError;
  }
};
const request = async <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: any): Promise<T> => {
  try {
    let fullUrl = `${envConfig.API_ENDPOINT}${url}`;

    const token = await getDataFromStorage('token');

    const headers: HeadersInit = {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const options: RequestInit = {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(fullUrl, options);
    if (response.ok) {
      return response.json();
    }

    throw new HttpError(response);
  } catch (error) {
    throw errorHandler(error as HttpError);
  }
};

const http = {
  get: <T>(url: string) => request<T>('GET', url),
  post: <T>(url: string, body: any) => request<T>('POST', url, body),
  put: <T>(url: string, body: any) => request<T>('PUT', url, body),
  delete: <T>(url: string) => request<T>('DELETE', url),
};

export default http;
