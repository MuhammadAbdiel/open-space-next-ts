import React, { useEffect, useState } from 'react'
import { getData, postData } from '../../utils/fetchData'
import TalkDetail from '../../components/TalkDetail'
import TalkItem from '../../components/TalkItem'
import TalkReplyInput from '../../components/TalkReplyInput'
import Layout from '../../layouts'
import Cookies from 'js-cookie'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { GetServerSideProps } from 'next'

interface User {
  id: string
  name: string
  photo: string
}

interface Talk {
  id: string
  text: string
  user: User
  createdAt: string
  parent?: Talk
}

interface DetailProps {
  data: {
    authUser: {
      data: {
        user: User
      }
    }
  }
}

const Detail: React.FC<DetailProps> = ({ data }) => {
  const { id } = useParams()
  const { authUser } = data
  const [talkDetail, setTalkDetail] = useState<Talk | null>(null)

  useEffect(() => {
    fetchDetailTalk()
  }, [])

  const fetchDetailTalk = async () => {
    const res = await getData<{ talkDetail: Talk }>(`/talks/${id}`)

    if (res.data) {
      setTalkDetail(res.data.talkDetail)
    }
  }

  const onReplyTalk = async (text: string) => {
    const res = await postData<{ talk: Talk }>(
      '/talks',
      { text, replyTo: id },
      Cookies.get('token'),
    )

    if (res.data) {
      toast.success('Berhasil Membalas Talk', {
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

  if (!talkDetail) {
    return null
  }

  return (
    <Layout data={data}>
      <section className='detail-page'>
        {talkDetail.parent && (
          <div className='detail-page__parent'>
            <h3>Replying To</h3>
            <TalkItem {...talkDetail.parent} authUser={authUser.data.user.id} />
          </div>
        )}
        <TalkDetail {...talkDetail} authUser={authUser.data.user.id} />
        <TalkReplyInput replyTalk={onReplyTalk} />
      </section>
    </Layout>
  )
}

export default Detail

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies
  let authUser = null

  if (token) {
    authUser = await getData('/users/me', {}, token)
  }

  const res = {
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
