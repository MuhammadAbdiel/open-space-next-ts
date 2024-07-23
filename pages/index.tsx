import { getData, postData } from '../utils/fetchData'
import TalkInput from '../components/TalkInput'
import TalksList from '../components/TalksList'
import Layout from '../layouts'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { GetServerSideProps, NextPage } from 'next'

export interface User {
  id: string
  name: string
  photo: string
}

interface Talk {
  id: string
  text: string
  user: string
  createdAt: string
}

interface HomeProps {
  data: {
    users: {
      data: {
        users: User[]
      }
    }
    authUser: {
      data: {
        user: User
      }
    }
  }
}

interface TalkResponse {
  talk: Talk
}

const Home: NextPage<HomeProps> = ({ data }: HomeProps) => {
  const { users = { data: { users: [] } }, authUser } = data
  const [talks, setTalks] = useState<Talk[]>([])

  useEffect(() => {
    fetchTalks()
  }, [])

  const fetchTalks = async () => {
    const res = await getData<{ talks: Talk[] }>('/talks')
    if (res.data) {
      setTalks(res.data.talks)
    }
  }

  const onAddTalk = async (text: string) => {
    const res = await postData<TalkResponse>(
      '/talks',
      { text },
      Cookies.get('token'),
    )

    if (res.data) {
      toast.success('Berhasil Menambahkan Talk', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setTalks([res.data.talk, ...talks])
    }
  }

  const talkList = talks
    .map((talk) => ({
      ...talk,
      user: users.data.users.find((user) => user.id === talk.user) as User,
      authUser: authUser.data.user.id,
    }))
    .filter((talk) => talk.user !== undefined)

  return (
    <Layout data={data}>
      <section className='home-page'>
        <TalkInput addTalk={onAddTalk} />
        <TalksList talks={talkList} />
      </section>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies
  const users = await getData('/users')
  let authUser = null

  if (token) {
    authUser = await getData('/users/me', {}, token)
  }

  const res = {
    users,
    authUser,
  }

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: res,
    },
  }
}
