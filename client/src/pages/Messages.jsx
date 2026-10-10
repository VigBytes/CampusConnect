import React from 'react'
import { MessageCircle, Eye } from 'lucide-react'
import { dummyConnectionsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Messages = () => {
      const navigate = useNavigate()

      return (
            <div className='min-h-full bg-[#f8f3e8] px-5 py-8 sm:px-8 lg:px-12'>
                  <div className='max-w-3xl'>
                        <div className='mb-7'>
                              <h1 className='text-3xl font-serif font-bold text-[#3b2922]'>Messages</h1>
                              <p className='mt-1 text-sm text-[#8c7768]'>Talk to your friends and family</p>
                        </div>

                        <div className='space-y-4'>
                              {dummyConnectionsData.map((user) => (
                                    <div key={user._id} className='bg-white border border-[#d5c6ae] rounded-lg shadow-sm hover:shadow-md transition p-5'>
                                          <div className='flex items-center gap-4'>
                                                <img src={user.profile_picture} alt={user.full_name} className='w-12 h-12 rounded-full object-cover border-2 border-[#c7a86b]' />

                                                <div className='flex-1 min-w-0'>
                                                      <h2 className='text-sm font-semibold text-[#3b2922]'>{user.full_name}</h2>

                                                      <p className='text-xs text-[#8c7768] mt-0.5'>@{user.username}</p>

                                                      <p className='text-xs text-[#6b5b50] mt-1 line-clamp-2'>
                                                            {user.bio}
                                                      </p>
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                      <button onClick={() => navigate(`/messages/${user._id}`)} className='w-9 h-9 rounded-md bg-[#eee4d0] text-[#651d2b] flex items-center justify-center hover:bg-[#651d2b] hover:text-white transition'>
                                                            <MessageCircle className='w-4 h-4' />
                                                      </button>

                                                      <button onClick={() => navigate(`/profile/${user._id}`)} className='w-9 h-9 rounded-md bg-[#eee4d0] text-[#651d2b] flex items-center justify-center hover:bg-[#651d2b] hover:text-white transition'>
                                                            <Eye className='w-4 h-4' />
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      )
}

export default Messages