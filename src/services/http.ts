import envConfig from 'envConfig';

import { getDataFromStorage, removeDataFromStorage } from './zalo';

const request = async <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: any): Promise<T> => {
  try {
    const fullUrl = `${envConfig.API_ENDPOINT}${url}`;
    console.log('Request URL:', fullUrl);
    const storedData = await getDataFromStorage(['token']);
    const token = storedData?.token || '';

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const options: RequestInit = {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      if (response.status === 401) {
        await removeDataFromStorage(['token']);
        window.location.href = '/account';
        throw new Error('Token hết hạn');
      }
      const errorData = await response.json().catch(() => ({ message: 'Lỗi không xác định (request)' }));
      window.location.href = '/';
      throw new Error(errorData.message || 'Lỗi không xác định (request)');
    }

    const data: T = await response.json().catch(() => {
      throw new Error('Response không hợp lệ');
    });

    return data;
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
};

const http = {
  get: <T>(url: string) => request<T>('GET', url),
  post: <T>(url: string, body: any) => request<T>('POST', url, body),
  put: <T>(url: string, body: any) => request<T>('PUT', url, body),
  delete: <T>(url: string) => request<T>('DELETE', url),
};

export default http;
