import axios, { AxiosInstance, AxiosResponse as AxiosResponseType } from 'axios'
import errorHandler from './errorHandler'

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
})

instance.interceptors.response.use(
  (response: AxiosResponseType) => response.data,
  errorHandler,
)

export type { AxiosResponseType }
export default instance
