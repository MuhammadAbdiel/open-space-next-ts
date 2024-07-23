import React, { useState } from 'react'

interface TalkInputProps {
  addTalk: (text: string) => void
}

const TalkInput: React.FC<TalkInputProps> = ({ addTalk }) => {
  const [text, setText] = useState<string>('')

  const addtalk = () => {
    if (text.trim()) {
      addTalk(text)
      setText('')
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 320) {
      setText(e.target.value)
    }
  }

  return (
    <div className='talk-input'>
      <textarea
        placeholder='What are you thinking?'
        value={text}
        onChange={handleTextChange}
      />
      <p className='talk-input__char-left'>
        <strong>{text.length}</strong>
        /320
      </p>
      <button type='button' onClick={addtalk}>
        Talk
      </button>
    </div>
  )
}

export default TalkInput
