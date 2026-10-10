
import React, { useState, useRef, useEffect } from 'react'
import { Send, ImagePlus, X } from 'lucide-react'
import { dummyMessagesData, dummyUserData } from '../assets/assets'
import moment from 'moment'

const ChatBox = () => {
      const [messages, setMessages] = useState(dummyMessagesData)
      const [text, setText] = useState('')
      const [image, setImage] = useState(null)
      const [user, setUser] = useState(dummyUserData)
      const messageEndRef = useRef(null)
      const fileInputRef = useRef(null)

      useEffect(() => {
            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, [messages])

      const handleImageChange = (e) => {
            const file = e.target.files?.[0]

            if (file && file.type.startsWith('image/')) {
                  setImage({
                        file,
                        preview: URL.createObjectURL(file),
                  })
            }

            e.target.value = ''
      }

      const removeImage = () => {
            if (image?.preview) {
                  URL.revokeObjectURL(image.preview)
            }

            setImage(null)
      }

      const handleSendMessage = (e) => {
            e.preventDefault()

            if (!text.trim() && !image) return

            const newMessage = {
                  _id: crypto.randomUUID(),
                  from_user_id: user._id,
                  to_user_id: user._id,
                  text: text.trim(),
                  message_type: image ? 'image' : 'text',
                  media_url: image?.preview || '',
                  createdAt: new Date().toISOString(),
                  seen: false,
            }

            setMessages((prev) => [...prev, newMessage])
            setText('')
            setImage(null)
      }

      return user&&(
            <div className='h-full min-h-[500px] flex flex-col bg-[#f8f3e8]'>

                  {/* Chat Header */}
                  <div className='sticky top-0 z-10 border-b border-[#d5c6ae] bg-[#f8f3e8] px-4 py-2 sm:px-6'>
                        <div className='max-w-4xl mx-auto flex items-center gap-3'>
                              <img
                                    src={user.profile_picture}
                                    alt={user.full_name}
                                    className='w-10 h-10 rounded-full object-cover border-2 border-[#c7a86b]'
                              />

                              <div className='min-w-0'>
                                    <h2 className='text-sm font-serif font-bold text-[#3b2922]'>
                                          {user.full_name}
                                    </h2>
                                    <p className='text-xs text-[#8c7768]'>
                                          @{user.username}
                                    </p>
                              </div>
                        </div>
                  </div>

                  {/* Messages */}
                  <div className='flex-1 overflow-y-auto px-4 py-5 sm:px-6'>
                        <div className='max-w-4xl mx-auto space-y-4'>

                              {messages.map((message) => {
                                    const isMine = message.from_user_id === user._id

                                    return (
                                          <div
                                                key={message._id}
                                                className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                                          >
                                                {message.message_type === 'image' && message.media_url && (
                                                      <div className={`max-w-[85%] sm:max-w-xs rounded-lg border border-[#d5c6ae] bg-white p-1.5 shadow-sm ${isMine ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
                                                            <img
                                                                  src={message.media_url}
                                                                  alt='Shared image'
                                                                  className='max-h-72 w-full rounded-md object-cover'
                                                            />
                                                      </div>
                                                )}

                                                {message.text && (
                                                      <div className={`max-w-[85%] sm:max-w-md mt-1 rounded-lg border px-3 py-2 text-sm leading-5 shadow-sm break-words ${isMine ? 'bg-[#651d2b] text-[#f8f3e8] border-[#651d2b] rounded-br-sm' : 'bg-white text-[#3b2922] border-[#d5c6ae] rounded-bl-sm'}`}>
                                                            {message.text}
                                                      </div>
                                                )}

                                                <p className='mt-1 text-[10px] text-[#8c7768]'>
                                                      {moment(message.createdAt).format('hh:mm A')}
                                                </p>
                                          </div>
                                    )
                              })}

                              <div ref={messageEndRef} />
                        </div>
                  </div>

                  {/* Image Preview */}
                  {image && (
                        <div className='border-t border-[#d5c6ae] bg-white px-4 py-3'>
                              <div className='max-w-4xl mx-auto relative w-20 h-20'>
                                    <img
                                          src={image.preview}
                                          alt='Attachment preview'
                                          className='w-full h-full object-cover rounded-lg border border-[#d5c6ae]'
                                    />

                                    <button
                                          type='button'
                                          onClick={removeImage}
                                          className='absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#651d2b] text-white flex items-center justify-center'
                                    >
                                          <X className='w-4 h-4' />
                                    </button>
                              </div>
                        </div>
                  )}

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className='border-t border-[#d5c6ae] bg-white px-4 py-3 sm:px-6'>
                        <div className='max-w-4xl mx-auto flex items-center gap-3'>

                              <input
                                    ref={fileInputRef}
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    className='hidden'
                              />

                              <button
                                    type='button'
                                    onClick={() => fileInputRef.current?.click()}
                                    className='shrink-0 p-2 rounded-lg text-[#651d2b] hover:bg-[#f8f3e8] transition'
                                    title='Attach image'
                              >
                                    <ImagePlus className='w-5 h-5' />
                              </button>

                              <input
                                    type='text'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder='Write a message...'
                                    className='flex-1 min-w-0 rounded-full border border-[#d5c6ae] bg-[#fffdf7] px-4 py-2.5 text-sm text-[#3b2922] outline-none focus:border-[#651d2b] focus:ring-2 focus:ring-[#651d2b]/10'
                              />

                              <button
                                    type='submit'
                                    disabled={!text.trim() && !image}
                                    className='shrink-0 p-3 rounded-full bg-[#651d2b] text-[#f8f3e8] hover:bg-[#4f1621] disabled:opacity-40 transition'
                                    title='Send message'
                              >
                                    <Send className='w-4 h-4' />
                              </button>

                        </div>
                  </form>

            </div>
      )
}

export default ChatBox

