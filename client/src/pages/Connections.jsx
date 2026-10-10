import React, { useState } from 'react'
import { Users, UserPlus, UserCheck, UserRoundPen, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
      dummyConnectionsData as connections,
      dummyFollowersData as followers,
      dummyFollowingData as following,
      dummyPendingConnectionsData as pendingConnections,
} from '../assets/assets'

const Connections = () => {
      const navigate = useNavigate()
      const [activeTab, setActiveTab] = useState('Connections')

      const dataArray = [
            { label: 'Followers', value: followers, icon: Users },
            { label: 'Following', value: following, icon: UserCheck },
            { label: 'Pending', value: pendingConnections, icon: UserRoundPen },
            { label: 'Connections', value: connections, icon: UserPlus },
      ]

      const activeData = dataArray.find((item) => item.label === activeTab)

      return (
            <div className='min-h-full bg-[#f8f3e8] px-5 py-8 sm:px-8 lg:px-12'>

                  {/* Header */}
                  <div className='max-w-6xl mx-auto'>
                        <h1 className='text-2xl sm:text-3xl font-serif font-bold text-[#3b2922]'>
                              Connections
                        </h1>

                        <p className='mt-1 text-sm text-[#8c7768]'>
                              Manage your network and discover new connections
                        </p>

                        {/* Statistics */}
                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-8'>
                              {dataArray.map(({ label, value, icon: Icon }) => (
                                    <button
                                          key={label}
                                          onClick={() => setActiveTab(label)}
                                          className={`bg-white border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 ${activeTab === label ? 'border-[#651d2b] ring-1 ring-[#651d2b]/20' : 'border-[#d5c6ae]'}`}
                                    >
                                          <div className='flex justify-center mb-2'>
                                                <Icon className='w-5 h-5 text-[#651d2b]' />
                                          </div>

                                          <p className='text-xl font-bold text-[#3b2922]'>
                                                {value.length}
                                          </p>

                                          <p className='text-sm text-[#6b5b50]'>
                                                {label}
                                          </p>
                                    </button>
                              ))}
                        </div>

                        {/* Tabs */}
                        <div className='mt-7 bg-white border border-[#d5c6ae] rounded-lg p-1 flex flex-wrap w-fit shadow-sm'>

                              {dataArray.map(({ label, icon: Icon }) => (
                                    <button
                                          key={label}
                                          onClick={() => setActiveTab(label)}
                                          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all duration-200 ${activeTab === label ? 'bg-[#651d2b] text-[#f8f3e8] shadow-sm' : 'text-[#6b5b50] hover:bg-[#eee4d0] hover:text-[#651d2b]'}`}
                                    >
                                          <Icon className='w-4 h-4' />
                                          <span>{label}</span>
                                    </button>
                              ))}

                        </div>

                        {/* User Cards */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>

                              {activeData?.value?.length > 0 ? (
                                    activeData.value.map((user) => (
                                          <div
                                                key={user._id}
                                                className='bg-white border border-[#d5c6ae] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200'
                                          >

                                                {/* User Info */}
                                                <div className='flex items-center gap-4'>

                                                      <img
                                                            src={user.profile_picture}
                                                            alt={user.full_name}
                                                            className='w-12 h-12 rounded-full object-cover border-2 border-[#c7a86b] shrink-0'
                                                      />

                                                      <div className='min-w-0 flex-1'>
                                                            <h2 className='font-serif font-semibold text-[#3b2922] truncate'>
                                                                  {user.full_name}
                                                            </h2>

                                                            <p className='text-xs text-[#8c7768] mt-0.5 truncate'>
                                                                  @{user.username}
                                                            </p>

                                                            <p className='text-xs text-[#6b5b50] mt-1 truncate'>
                                                                 {user.bio.slice(0, 50)}{user.bio.length > 50 ? '...' : ''}
                                                            </p>
                                                      </div>

                                                </div>

                                                {/* Buttons */}
                                                <div className='flex gap-2 mt-5'>

                                                      <button
                                                            onClick={() => navigate(`/profile/${user._id}`)}
                                                            className='flex-1 py-2.5 rounded-md bg-[#651d2b] hover:bg-[#4f1621] text-[#f8f3e8] text-sm font-medium transition'
                                                      >
                                                            View Profile
                                                      </button>

                                                      {activeTab === 'Connections' && (
                                                            <button
                                                                  onClick={() => navigate(`/messages/${user._id}`)}
                                                                  className='w-11 rounded-md border border-[#d5c6ae] bg-[#eee4d0] text-[#651d2b] flex items-center justify-center hover:bg-[#d5c6ae] transition'
                                                                  title='Message'
                                                            >
                                                                  <MessageSquare className='w-4 h-4' />
                                                            </button>
                                                      )}

                                                </div>

                                          </div>
                                    ))
                              ) : (
                                    <div className='md:col-span-2 bg-white border border-[#d5c6ae] rounded-lg py-12 text-center'>
                                          <Users className='w-10 h-10 mx-auto text-[#c7a86b]' />

                                          <h2 className='mt-3 font-serif font-semibold text-[#3b2922]'>
                                                No {activeTab.toLowerCase()} yet
                                          </h2>

                                          <p className='mt-1 text-sm text-[#8c7768]'>
                                                Your {activeTab.toLowerCase()} will appear here.
                                          </p>
                                    </div>
                              )}

                        </div>

                  </div>

            </div>
      )
}

export default Connections