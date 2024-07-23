import { useRouter } from 'next/router'
import React, { useState, ChangeEvent } from 'react'

interface TalkReplyInputProps {
  replyTalk: (text: string) => void
}

const TalkReplyInput: React.FC<TalkReplyInputProps> = ({ replyTalk }) => {
  const router = useRouter()
  const [text, setText] = useState('')

  const replyTalkHandler = () => {
    if (text.trim()) {
      replyTalk(text)
      setText('')
      router.push('/')
    }
  }

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 320) {
      setText(event.target.value)
    }
  }

  return (
    <div className='talk-reply-input'>
      <textarea
        placeholder='Talk your reply'
        value={text}
        onChange={handleTextChange}
      />
      <p className='talk-reply-input__char-left'>
        <strong>{text.length}</strong>
        /320
      </p>
      <button type='submit' onClick={replyTalkHandler}>
        Reply
      </button>
    </div>
  )
}

export default TalkReplyInput
