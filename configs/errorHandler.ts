import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

interface ErrorResponseData {
  msg?: string
}

export default function errorHandler(error: AxiosError): Promise<never> {
  if (error) {
    let message: string | undefined

    if (
      error.response &&
      error.response.data &&
      typeof error.response.data === 'object'
    ) {
      const data = error.response.data as ErrorResponseData
      message = data.msg

      if (typeof message === 'string') {
        toast.error(message)
      }
    }
  }

  return Promise.reject(error)
}
