import axios, { AxiosResponseType } from '../configs'

type DataResponse<T> = AxiosResponseType<T>

export async function getData<T>(
  url: string,
  params?: object,
  token?: string,
): Promise<DataResponse<T>> {
  return await axios.get(url, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function postData<T>(
  url: string,
  payload: object,
  token?: string,
): Promise<DataResponse<T>> {
  return await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function putData<T>(
  url: string,
  payload: object,
  token?: string,
): Promise<DataResponse<T>> {
  return await axios.put(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function deleteData<T>(
  url: string,
  token?: string,
): Promise<DataResponse<T>> {
  return await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
