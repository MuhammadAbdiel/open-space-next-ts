import { User } from '../pages'
import { postedAt } from '../utils'
import React from 'react'

interface TalkDetailProps {
  text: string
  createdAt: string
  user: User
  authUser: string
}

const TalkDetail: React.FC<TalkDetailProps> = ({ text, createdAt, user }) => {
  return (
    <section className='talk-detail'>
      <header>
        <img src={user.photo} alt={user.name} />
        <div className='talk-detail__user-info'>
          <p className='talk-detail__user-name'>{user.name}</p>
          <p className='talk-detail__user-id'>@{user.id}</p>
        </div>
      </header>
      <article>
        <p className='talk-detail__text'>{text}</p>
      </article>
      <footer>
        <p className='talk-detail__created-at'>{postedAt(createdAt)}</p>
      </footer>
    </section>
  )
}

export default TalkDetail
