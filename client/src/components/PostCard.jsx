import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Share2, BadgeCheck } from 'lucide-react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post }) => {
      const navigate = useNavigate()
      const [currentImage, setCurrentImage] = useState(0)

      const renderContent = (content) => {
            return content.split(/(#[a-zA-Z0-9_]+)/g).map((part, index) =>
                  part.startsWith('#') ? (
                        <span key={index} className='text-[#651d2b] font-semibold hover:underline cursor-pointer'>
                              {part}
                        </span>
                  ) : (
                        part
                  )
            )
      }

      return (
            <div className='bg-[#ffffff] border border-[#d5c6ae] rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200'>

                  {/* User Information */}
                  <div onClick={() => navigate(`/profile/${post.user._id}`)} className='p-4 flex items-center gap-3 cursor-pointer'>

                        <img src={post.user.profile_picture} alt='' className='w-10 h-10 rounded-full object-cover border-2 border-[#c7a86b]' />

                        <div className='flex-1 min-w-0'>
                              <div className='flex items-center gap-1'>

                                    <h2 className='font-serif font-semibold text-[#3b2922] text-sm truncate'>
                                          {post.user.full_name}
                                    </h2>

                                    {post.user.is_verified && (
                                          <BadgeCheck className='w-4 h-4 text-[#651d2b]' />
                                    )}

                              </div>

                              <p className='text-xs text-[#8c7768] truncate'>
                                    @{post.user.username} · {moment(post.createdAt).fromNow()}
                              </p>

                        </div>

                  </div>

                  {/* Heritage Divider */}
                  <div className='px-4'>
                        <div className='h-px bg-[#d5c6ae]' />
                        <div className='h-px bg-[#c7a86b] mt-1 opacity-50' />
                  </div>

                  {/* Post Content */}
                  {post.content && (
                        <div className='px-4 pt-4'>
                              <p className='text-sm leading-6 text-[#3b2922] whitespace-pre-line'>
                                    {renderContent(post.content)}
                              </p>
                        </div>
                  )}

                  {/* Post Images Slider */}
                  {post.image_urls?.length > 0 && (
                        <div className='px-4 pt-4'>

                              <div className='relative rounded-lg overflow-hidden border border-[#d5c6ae] bg-[#eee4d0]'>

                                    {/* Current Image */}
                                    <img
                                          src={post.image_urls[currentImage]}
                                          alt=''
                                          className='w-full max-h-[500px] object-cover'
                                    />

                                    {/* Previous Button */}
                                    {currentImage > 0 && (
                                          <button
                                                onClick={() => setCurrentImage(currentImage - 1)}
                                                className='absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition'
                                          >
                                                <ChevronLeft className='w-5 h-5' />
                                          </button>
                                    )}

                                    {/* Next Button */}
                                    {currentImage < post.image_urls.length - 1 && (
                                          <button
                                                onClick={() => setCurrentImage(currentImage + 1)}
                                                className='absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition'
                                          >
                                                <ChevronRight className='w-5 h-5' />
                                          </button>
                                    )}

                                    {/* Image Indicators */}
                                    {post.image_urls.length > 1 && (
                                          <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
                                                {post.image_urls.map((_, index) => (
                                                      <span
                                                            key={index}
                                                            className={`h-1.5 rounded-full transition-all ${currentImage === index ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`}
                                                      />
                                                ))}
                                          </div>
                                    )}

                              </div>

                        </div>
                  )}

                  {/* Actions */}
                  <div className='px-4 py-3 mt-3 border-t border-[#d5c6ae] flex items-center gap-6 text-[#6b5b50]'>

                        {/* Like */}
                        <button className='flex items-center gap-1.5 hover:text-[#651d2b] transition-colors'>
                              <Heart className='w-5 h-5' />

                              <span className='text-sm'>
                                    {post.likes_count?.length || 0}
                              </span>
                        </button>

                        {/* Comment */}
                        <button className='flex items-center gap-1.5 hover:text-[#651d2b] transition-colors'>
                              <MessageCircle className='w-5 h-5' />

                              <span className='text-sm'>
                                    12
                              </span>
                        </button>

                        {/* Share */}
                        <button className='flex items-center gap-1.5 hover:text-[#651d2b] transition-colors'>
                              <Share2 className='w-5 h-5' />

                              <span className='text-sm'>
                                    7
                              </span>
                        </button>

                  </div>

            </div>
      )
}

export default PostCard