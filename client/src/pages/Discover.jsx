import React, { useState } from 'react'
import { Search, UserPlus, MessageCircle, MapPin, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { dummyConnectionsData, dummyUserData } from '../assets/assets'

const Discover = () => {
      const navigate = useNavigate()

      const currentUser = dummyUserData

      const [inputValue, setInputValue] = useState('')
      const [users, setUsers] = useState(dummyConnectionsData)
      const [loading, setLoading] = useState(false)

      const [following, setFollowing] = useState(currentUser.following || [])
      const [connections, setConnections] = useState(currentUser.connections || [])
      const [pending, setPending] = useState(currentUser.pending_connections || [])

      const handleSearch = (e) => {
            if (e.key !== 'Enter') return

            setUsers([])
            setLoading(true)

            setTimeout(() => {
                  const search = inputValue.toLowerCase().trim()

                  if (!search) {
                        setUsers(dummyConnectionsData)
                  } else {
                        const filteredUsers = dummyConnectionsData.filter((user) =>
                              user.full_name?.toLowerCase().includes(search) ||
                              user.username?.toLowerCase().includes(search) ||
                              user.bio?.toLowerCase().includes(search) ||
                              user.location?.toLowerCase().includes(search)
                        )

                        setUsers(filteredUsers)
                  }

                  setLoading(false)
            }, 700)
      }

      const handleFollow = (userId) => {
            setFollowing((prev) =>
                  prev.includes(userId)
                        ? prev.filter((id) => id !== userId)
                        : [...prev, userId]
            )
      }

      const handleConnect = (userId) => {
            setPending((prev) =>
                  prev.includes(userId)
                        ? prev.filter((id) => id !== userId)
                        : [...prev, userId]
            )
      }

      return (
            <div className='min-h-full bg-[#f8f3e8] px-5 py-8 sm:px-8 lg:px-12'>

                  <div className='max-w-6xl mx-auto'>

                        {/* Header */}
                        <div>
                              <h1 className='text-2xl sm:text-3xl font-serif font-bold text-[#3b2922]'>
                                    Discover People
                              </h1>

                              <p className='mt-1 text-sm text-[#8c7768]'>
                                    Connect with amazing people and grow your network
                              </p>
                        </div>

                        {/* Search */}
                        <div className='mt-7 bg-white border border-[#d5c6ae] rounded-lg p-4 shadow-sm'>

                              <div className='relative'>

                                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c7768]' />

                                    <input
                                          type='text'
                                          value={inputValue}
                                          onChange={(e) => setInputValue(e.target.value)}
                                          onKeyDown={handleSearch}
                                          placeholder='Search people by name, username, bio, or location...'
                                          className='w-full h-10 pl-10 pr-4 rounded-md border border-[#d5c6ae] bg-[#fffdf7] text-sm text-[#3b2922] placeholder:text-[#a89a8d] outline-none focus:border-[#651d2b] focus:ring-2 focus:ring-[#651d2b]/10 transition'
                                    />

                              </div>

                        </div>

                        {/* Loading */}
                        {loading ? (

                              <div className='flex flex-col items-center justify-center py-20'>

                                    <div className='w-9 h-9 rounded-full border-4 border-[#d5c6ae] border-t-[#651d2b] animate-spin' />

                                    <p className='mt-4 text-sm text-[#8c7768]'>
                                          Discovering people...
                                    </p>

                              </div>

                        ) : (

                              <>
                                    {/* Users */}
                                    {users.length > 0 ? (

                                          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6'>

                                                {users.map((user) => {

                                                      const isFollowing = following.includes(user._id)
                                                      const isConnected = connections.includes(user._id)
                                                      const isPending = pending.includes(user._id)

                                                      return (

                                                            <div
                                                                  key={user._id}
                                                                  className='bg-white border border-[#d5c6ae] rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-200'
                                                            >

                                                                  {/* Profile */}
                                                                  <div className='flex flex-col items-center text-center'>

                                                                        <img
                                                                              src={user.profile_picture}
                                                                              alt={user.full_name}
                                                                              className='w-14 h-14 rounded-full object-cover border-2 border-[#c7a86b] shadow-sm'
                                                                        />

                                                                        <h2 className='mt-3 font-serif font-semibold text-[#3b2922] truncate max-w-full'>
                                                                              {user.full_name}
                                                                        </h2>

                                                                        <p className='text-xs text-[#8c7768] mt-0.5 truncate max-w-full'>
                                                                              @{user.username}
                                                                        </p>

                                                                        {/* Bio */}
                                                                        <p className='text-xs text-[#6b5b50] leading-5 mt-3 line-clamp-2 min-h-10'>
                                                                              {user.bio || '🌍 Dreamer | 📚 Learner | 🚀 Doer'}
                                                                        </p>

                                                                        {/* Location / Followers */}
                                                                        <div className='flex items-center justify-center gap-2 mt-3'>

                                                                              {user.location && (
                                                                                    <span className='flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#d5c6ae] text-[10px] text-[#6b5b50] bg-[#f8f3e8]'>
                                                                                          <MapPin className='w-3 h-3 text-[#651d2b]' />
                                                                                          {user.location}
                                                                                    </span>
                                                                              )}

                                                                              <span className='px-2.5 py-1 rounded-full border border-[#d5c6ae] text-[10px] text-[#6b5b50] bg-[#f8f3e8]'>
                                                                                    {user.followers?.length || 0} Followers
                                                                              </span>

                                                                        </div>

                                                                  </div>

                                                                  {/* Actions */}
                                                                  <div className='flex gap-2 mt-4'>

                                                                        {/* Follow */}
                                                                        <button
                                                                              onClick={() => handleFollow(user._id)}
                                                                              className={`flex-1 h-10 rounded-md text-[#f8f3e8] text-sm font-medium flex items-center justify-center gap-2 transition active:scale-[0.98] ${isFollowing ? 'bg-[#4f1621]' : 'bg-[#651d2b] hover:bg-[#4f1621]'}`}
                                                                        >

                                                                              <UserPlus className='w-4 h-4' />

                                                                              {isFollowing ? 'Following' : 'Follow'}

                                                                        </button>

                                                                        {/* Message / Connect */}
                                                                        {isConnected ? (

                                                                              <button
                                                                                    onClick={() => navigate(`/messages/${user._id}`)}
                                                                                    className='w-11 h-10 rounded-md border border-[#d5c6ae] bg-[#f8f3e8] text-[#651d2b] flex items-center justify-center hover:bg-[#eee4d0] transition'
                                                                              >
                                                                                    <MessageCircle className='w-4 h-4' />
                                                                              </button>

                                                                        ) : (

                                                                              <button
                                                                                    onClick={() => handleConnect(user._id)}
                                                                                    disabled={isPending}
                                                                                    className={`w-11 h-10 rounded-md border border-[#d5c6ae] flex items-center justify-center transition ${isPending ? 'bg-[#eee4d0] text-[#8c7768] cursor-default' : 'bg-[#f8f3e8] text-[#651d2b] hover:bg-[#eee4d0]'}`}
                                                                                    title={isPending ? 'Request Sent' : 'Connect'}
                                                                              >
                                                                                    {isPending ? (
                                                                                          <UserPlus className='w-4 h-4' />
                                                                                    ) : (
                                                                                          <Plus className='w-5 h-5' />
                                                                                    )}
                                                                              </button>

                                                                        )}

                                                                  </div>

                                                            </div>

                                                      )
                                                })}

                                          </div>

                                    ) : (

                                          /* No Results */
                                          <div className='mt-8 bg-white border border-[#d5c6ae] rounded-lg py-14 text-center'>

                                                <Search className='w-10 h-10 mx-auto text-[#c7a86b]' />

                                                <h2 className='mt-3 font-serif font-semibold text-[#3b2922]'>
                                                      No people found
                                                </h2>

                                                <p className='mt-1 text-sm text-[#8c7768]'>
                                                      Try searching with a different name or username.
                                                </p>

                                          </div>

                                    )}

                              </>

                        )}

                  </div>

            </div>
      )
}

export default Discover