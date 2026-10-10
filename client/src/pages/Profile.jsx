
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, CalendarDays, BadgeCheck, Pencil } from 'lucide-react'
import { dummyUserData, dummyPostsData } from '../assets/assets'
import PostCard from '../components/PostCard'
import ProfileModal from '../components/ProfileModal'

const Profile = () => {
      const { profileId } = useParams()

      const [user, setUser] = useState(null)
      const [posts, setPosts] = useState([])
      const [activeTab, setActiveTab] = useState('posts')
      const [showEdit, setShowEdit] = useState(false)

      const fetchUserData = async () => {
            setUser(dummyUserData)
            setPosts(dummyPostsData)
      }

      useEffect(() => {
            fetchUserData()
      }, [profileId])

      if (!user) {
            return (
                  <div className='min-h-full bg-[#f8f3e8] flex items-center justify-center'>
                        <div className='w-9 h-9 rounded-full border-4 border-[#d5c6ae] border-t-[#651d2b] animate-spin' />
                  </div>
            )
      }

      const userPosts = posts.filter((post) => post.user?._id === user._id)
      const mediaPosts = userPosts.filter((post) => post.image_urls?.length > 0)
      const likedPosts = posts.filter((post) => post.likes_count?.includes(user._id))

      const displayedPosts = activeTab === 'posts'
            ? userPosts
            : activeTab === 'media'
                  ? mediaPosts
                  : likedPosts

      const isOwnProfile = profileId === user._id || !profileId

      const tabs = [
            { id: 'posts', label: 'Posts' },
            { id: 'media', label: 'Media' },
            { id: 'likes', label: 'Likes' },
      ]

      return (
            <div className='min-h-full bg-[#f8f3e8] px-4 py-6 sm:px-6 lg:px-10'>
                  <div className='max-w-3xl mx-auto'>

                        {/* Profile Header */}
                        <div className='bg-white border border-[#d5c6ae] rounded-xl overflow-hidden shadow-sm'>

                              {/* Cover Image */}
                              <div className='relative h-36 sm:h-40 bg-[#eee4d0] overflow-hidden'>
                                    <img
                                          src={user.cover_photo || 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg'}
                                          alt='Profile cover'
                                          className='w-full h-full object-cover'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-[#3b2922]/20 to-transparent' />
                              </div>

                              {/* Profile Information */}
                              <div className='relative px-5 sm:px-7 pb-5'>

                                    {/* Profile Picture */}
                                    <div className='absolute -top-12 left-5 sm:left-7 z-10'>
                                          <img
                                                src={user.profile_picture}
                                                alt={user.full_name}
                                                className='w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md'
                                          />
                                    </div>

                                    {/* Edit Button */}
                                    {isOwnProfile && (
                                          <div className='flex justify-end pt-3'>
                                                <button
                                                      onClick={() => setShowEdit(true)}
                                                      className='flex items-center gap-2 px-4 py-2 rounded-md border border-[#d5c6ae] bg-[#f8f3e8] text-[#651d2b] text-sm font-medium hover:bg-[#eee4d0] transition'
                                                >
                                                      <Pencil className='w-4 h-4' />
                                                      Edit
                                                </button>
                                          </div>
                                    )}

                                    {/* Name and Username */}
                                    <div className='relative mt-3 min-h-[76px] pl-28 sm:pl-32 flex flex-col justify-center'>
                                          <div className='flex items-center gap-2 flex-wrap'>
                                                <h1 className='text-lg sm:text-2xl font-serif font-bold text-[#3b2922] break-words'>
                                                      {user.full_name}
                                                </h1>

                                                {user.is_verified && (
                                                      <BadgeCheck className='w-5 h-5 text-[#651d2b] shrink-0' />
                                                )}
                                          </div>

                                          <p className='text-sm text-[#8c7768] mt-0.5 break-all'>
                                                @{user.username?user.username : 'Username'}
                                          </p>
                                    </div>

                                    {/* Bio */}
                                    <p className='mt-3 text-sm leading-5 text-[#6b5b50] max-w-2xl'>
                                          {user.bio || '🌍 Dreamer | 📚 Learner | 🚀 Doer'}
                                    </p>

                                    {/* Location and Join Date */}
                                    <div className='flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs text-[#8c7768]'>

                                          {user.location && (
                                                <div className='flex items-center gap-1.5'>
                                                      <MapPin className='w-4 h-4 text-[#651d2b] shrink-0' />
                                                      <span>{user.location}</span>
                                                </div>
                                          )}

                                          <div className='flex items-center gap-1.5'>
                                                <CalendarDays className='w-4 h-4 text-[#651d2b] shrink-0' />
                                                <span>
                                                      Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently'}
                                                </span>
                                          </div>

                                    </div>

                                    {/* Heritage Divider */}
                                    <div className='mt-5'>
                                          <div className='h-px bg-[#d5c6ae]' />
                                          <div className='h-px bg-[#c7a86b] mt-1 opacity-50' />
                                    </div>

                                    {/* Profile Statistics */}
                                    <div className='flex items-center gap-6 sm:gap-8 mt-4'>

                                          <div className='text-center'>
                                                <p className='font-bold text-[#3b2922]'>
                                                      {userPosts.length}
                                                </p>
                                                <p className='text-xs text-[#8c7768]'>
                                                      Posts
                                                </p>
                                          </div>

                                          <div className='text-center'>
                                                <p className='font-bold text-[#3b2922]'>
                                                      {user.followers?.length || 0}
                                                </p>
                                                <p className='text-xs text-[#8c7768]'>
                                                      Followers
                                                </p>
                                          </div>

                                          <div className='text-center'>
                                                <p className='font-bold text-[#3b2922]'>
                                                      {user.following?.length || 0}
                                                </p>
                                                <p className='text-xs text-[#8c7768]'>
                                                      Following
                                                </p>
                                          </div>

                                    </div>
                              </div>
                        </div>

                        {/* Profile Tabs */}
                        <div className='mt-3 bg-white border border-[#d5c6ae] rounded-lg p-1 flex max-w-md mx-auto shadow-sm'>
                              {tabs.map((tab) => (
                                    <button
                                          key={tab.id}
                                          onClick={() => setActiveTab(tab.id)}
                                          className={`flex-1 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${activeTab === tab.id ? 'bg-[#651d2b] text-[#f8f3e8] shadow-sm' : 'text-[#6b5b50] hover:bg-[#eee4d0] hover:text-[#651d2b]'}`}
                                    >
                                          {tab.label}
                                    </button>
                              ))}
                        </div>

                        {/* Posts, Media, and Likes */}

{/* Posts Tab */}
{activeTab === 'posts' && (
      <div className='mt-5 space-y-5'>
            {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                        <PostCard key={post._id} post={post} />
                  ))
            ) : (
                  <div className='bg-white border border-[#d5c6ae] rounded-xl py-14 text-center'>
                        <p className='font-serif font-semibold text-[#3b2922]'>No posts yet</p>
                        <p className='text-sm text-[#8c7768] mt-1'>Nothing to show here yet.</p>
                  </div>
            )}
      </div>
)}

{/* Media Tab: Images and Post Dates Only */}
{activeTab === 'media' && (
      <div className='mt-5'>
            {mediaPosts.length > 0 ? (
                  <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                        {mediaPosts.flatMap((post) =>
                              (post.image_urls || []).map((image, index) => (
                                    <div key={`${post._id}-${index}`} className='group overflow-hidden rounded-lg border border-[#d5c6ae] bg-white shadow-sm hover:shadow-md transition-shadow'>
                                          <div className='aspect-square overflow-hidden bg-[#eee4d0]'>
                                                <img
                                                      src={image}
                                                      alt='Post media'
                                                      loading='lazy'
                                                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                                />
                                          </div>

                                          <div className='px-3 py-2'>
                                                <div className='flex items-center gap-1.5 text-xs text-[#8c7768]'>
                                                      <CalendarDays className='w-3.5 h-3.5 text-[#651d2b] shrink-0' />
                                                      <span>
                                                            {post.createdAt
                                                                  ? new Date(post.createdAt).toLocaleDateString('en-IN', {
                                                                        day: 'numeric',
                                                                        month: 'short',
                                                                        year: 'numeric',
                                                                  })
                                                                  : 'Date unavailable'}
                                                      </span>
                                                </div>
                                          </div>
                                    </div>
                              ))
                        )}
                  </div>
            ) : (
                  <div className='bg-white border border-[#d5c6ae] rounded-xl py-14 text-center'>
                        <p className='font-serif font-semibold text-[#3b2922]'>No images yet</p>
                        <p className='text-sm text-[#8c7768] mt-1'>Photos from your posts will appear here.</p>
                  </div>
            )}
      </div>
)}

{/* Likes Tab */}
{activeTab === 'likes' && (
      <div className='mt-5 space-y-5'>
            {likedPosts.length > 0 ? (
                  likedPosts.map((post) => (
                        <PostCard key={post._id} post={post} />
                  ))
            ) : (
                  <div className='bg-white border border-[#d5c6ae] rounded-xl py-14 text-center'>
                        <p className='font-serif font-semibold text-[#3b2922]'>No liked posts yet</p>
                        <p className='text-sm text-[#8c7768] mt-1'>Posts you like will appear here.</p>
                  </div>
            )}
      </div>
)}
                  </div>

                  {/* Edit Profile Modal */}
                  {showEdit && (
      <ProfileModal
            user={user}
            setUser={setUser}
            setShowEdit={setShowEdit}
      />
)}
            </div>
      )
}

export default Profile
