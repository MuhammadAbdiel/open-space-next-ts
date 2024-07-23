import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import React from 'react'
import { LayoutProps } from '../layouts'

interface NavigationProps {
  data: LayoutProps['data']
}

export default function Navigation({ data }: NavigationProps) {
  const router = useRouter()
  const { id, photo, name } = data.authUser.data.user

  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('name')
    toast.success('Berhasil Logout', {
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

  return (
    <div className='navigation'>
      <img src={photo} alt={id} title={name} />
      <nav>
        <Link href='/'>Home</Link>
      </nav>
      <button type='button' onClick={handleLogout}>
        Sign out
      </button>
    </div>
  )
}
