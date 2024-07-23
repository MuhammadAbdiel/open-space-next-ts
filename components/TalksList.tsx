import TalkItem, { TalkItemProps } from './TalkItem'
import React from 'react'

interface TalksListProps {
  talks: TalkItemProps[]
}

const TalksList: React.FC<TalksListProps> = ({ talks }) => {
  return (
    <div className='talks-list'>
      {talks.map((talk) => (
        <TalkItem key={talk.id} {...talk} />
      ))}
    </div>
  )
}

export default TalksList
