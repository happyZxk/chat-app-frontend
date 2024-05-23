import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Chat, { Bubble, useMessages, MessageProps } from '@chatui/core'
const socket = io('http://localhost:8080')
const ChatComponent: React.FC = () => {
  const { messages, appendMsg, setTyping } = useMessages([])

  useEffect(() => {
    socket.on('message', (message: { sender: string; message: string }) => {
      appendMsg({
        type: 'text',
        content: { text: message.message },
        position: message.sender === '我' ? 'right' : 'left',
      })
    })
  }, [])

  const handleSend = (type: string, val: string) => {
    if (type === 'text' && val.trim()) {
      const message = { sender: '我', message: val.trim() }
      socket.emit('message', message)
      appendMsg({
        type: 'text',
        content: { text: val.trim() },
        position: 'right',
      })
    }
  }

  const renderMessageContent = (msg: MessageProps) => {
    const { content } = msg
    return <Bubble content={content.text} />
  }

  return (
    <Chat
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  )
}

export default ChatComponent
