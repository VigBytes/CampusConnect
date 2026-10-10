import React from 'react'
import { X } from 'lucide-react'
import moment from 'moment'

const StoryViewer = ({ viewStory, setViewStory }) => {
      return (
            <div className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4'>

                  <div className='relative w-full max-w-md h-[80vh] rounded-xl overflow-hidden'>

                        {/* Story */}
                        <div className='w-full h-full' style={{ backgroundColor: viewStory.background_color }}>

                              {viewStory.media_type === 'image' && (
                                    <img src={viewStory.media_url} alt='' className='w-full h-full object-cover' />
                              )}

                              {viewStory.media_type === 'video' && (
                                    <video src={viewStory.media_url} autoPlay controls className='w-full h-full object-cover' />
                              )}

                              {viewStory.media_type === 'text' && (
                                    <div className='w-full h-full flex items-center justify-center p-8'>
                                          <p className='text-white text-xl text-center font-medium'>
                                                {viewStory.content}
                                          </p>
                                    </div>
                              )}

                        </div>

                        {/* Close button */}
                        <button onClick={() => setViewStory(null)} className='absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70'>
                              <X className='w-5 h-5' />
                        </button>

                        {/* User information */}
                        <div className='absolute top-4 left-4 flex items-center gap-3'>

                              <img src={viewStory.user.profile_picture} alt='' className='w-9 h-9 rounded-full border-2 border-white' />

                              <div>
                                    <p className='text-white text-sm font-medium'>
                                          {viewStory.user.full_name}
                                    </p>

                                    <p className='text-white/60 text-xs'>
                                          {moment(viewStory.createdAt).fromNow()}
                                    </p>
                              </div>

                        </div>

                  </div>

            </div>
      )
}

export default StoryViewer