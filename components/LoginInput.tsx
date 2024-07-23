import React, { useState, ChangeEvent } from 'react'
import { getData, postData } from '../utils/fetchData'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

interface FormState {
  id: string
  password: string
}

interface LoginResponse {
  data: {
    token: string
  }
}

interface ProfileResponse {
  data: {
    user: {
      name: string
    }
  }
}

export default function LoginInput(): React.ReactElement {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({ id: '', password: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const res: LoginResponse = await postData('/login', form)

      Cookies.set('token', res.data.token)
      if (res.data.token) {
        const profile: ProfileResponse = await getData(
          '/users/me',
          {},
          res.data.token,
        )

        Cookies.set('name', profile.data.user.name)
        toast.success('Berhasil Login', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        router.push('/')
      }
    } catch (error) {
      toast.error('Login gagal. Silahkan coba lagi.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <form className='login-input'>
      <input
        name='id'
        type='text'
        value={form.id}
        onChange={handleChange}
        placeholder='Username'
      />
      <input
        name='password'
        type='password'
        value={form.password}
        onChange={handleChange}
        placeholder='Password'
      />
      <button type='button' onClick={handleSubmit}>
        Login
      </button>
    </form>
  )
}
