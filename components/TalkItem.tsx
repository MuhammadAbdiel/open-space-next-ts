import { postedAt } from '../utils'
import { useRouter } from 'next/router'
import React from 'react'
import { User } from '../pages'

export interface TalkItemProps {
  id: string
  text: string
  createdAt: string
  user: User
  authUser: string
}

const TalkItem: React.FC<TalkItemProps> = ({ id, text, createdAt, user }) => {
  const router = useRouter()

  // Handler untuk klik pada item talk
  const onTalkClick = () => {
    router.push(`/talks/${id}`)
  }

  // Handler untuk penekanan tombol
  const onTalkPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      router.push(`/talks/${id}`)
    }
  }

  return (
    <div
      role='button'
      tabIndex={0}
      className='talk-item'
      onClick={onTalkClick}
      onKeyDown={onTalkPress}
    >
      <div className='talk-item__user-photo'>
        <img src={user.photo} alt={user.name} />
      </div>
      <div className='talk-item__detail'>
        <header>
          <div className='talk-item__user-info'>
            <p className='talk-item__user-name'>{user.name}</p>
            <p className='talk-item__user-id'>@{user.id}</p>
          </div>
          <p className='talk-item__created-at'>{postedAt(createdAt)}</p>
        </header>
        <article>
          <p className='talk-item__text'>{text}</p>
        </article>
      </div>
    </div>
  )
}

export default TalkItem
