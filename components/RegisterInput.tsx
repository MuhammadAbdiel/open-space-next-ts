import React, { useState, ChangeEvent } from 'react'
import { postData } from '../utils/fetchData'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

interface FormState {
  name: string
  id: string
  password: string
}

export default function RegisterInput() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    name: '',
    id: '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      const res = await postData('/users', form)
      if (res.data) {
        toast.success('Berhasil Registrasi', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        router.push('/login')
      }
    } catch (error) {
      toast.error('Registrasi gagal. Silahkan coba lagi.', {
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
    <form className='register-input'>
      <input
        name='name'
        type='text'
        value={form.name}
        onChange={handleChange}
        placeholder='Name'
      />
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
        Register
      </button>
    </form>
  )
}
