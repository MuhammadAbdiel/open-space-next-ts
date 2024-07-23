import Link from 'next/link'
import { IoEarthOutline } from 'react-icons/io5'
import LoginInput from '../components/LoginInput'
import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

const Login: React.FC = () => {
  return (
    <>
      <Head>
        <title>Open Space App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='login-page'>
        <header className='login-page__hero'>
          <h1>
            <IoEarthOutline />
          </h1>
        </header>
        <article className='login-page__main'>
          <h2>
            See <strong>The World</strong>, <br />
            Through Open Space App.
          </h2>

          <LoginInput />
          <p>
            Don&apos;t have an account? <Link href='/register'>Register</Link>
          </p>
        </article>
      </section>
    </>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
