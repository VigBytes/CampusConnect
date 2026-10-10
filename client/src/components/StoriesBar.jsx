import React, { useEffect, useState } from 'react'
import { Plus, GraduationCap } from 'lucide-react'
import { dummyStoriesData } from '../assets/assets'
import moment from 'moment'
import StoryModal from './StoryModal'
import StoryViewer from './StoryViewer'

const StoriesBar = () => {
      const [stories, setStories] = useState([])
      const [showStoryModal, setShowStoryModal] = useState(false)
      const [viewStory,setViewStory]=useState(null)
      const fetchStories = async () => {
            setStories(dummyStoriesData)
      }

      useEffect(() => {
            fetchStories()
      }, [])

      return (
            <>
                  <div className='w-full max-w-2xl no-scrollbar overflow-x-auto px-4'>
                        <div className='flex gap-4 w-max'>

                              {/* Create Story */}
                              <div onClick={() => setShowStoryModal(true)} className='relative w-30 h-40 shrink-0 rounded-xl overflow-hidden cursor-pointer border border-[#c7a86b] bg-[#f8f3e8] shadow-sm hover:shadow-lg transition-all duration-200 group'>

                                    {/* Heritage Top */}
                                    <div className='absolute top-0 left-0 right-0 h-1 bg-[#651d2b]' />

                                    <div className='h-full flex flex-col items-center justify-center p-4'>

                                          <div className='size-11 rounded-full bg-[#651d2b] border-2 border-[#c7a86b] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200'>
                                                <Plus className='w-5 h-5 text-[#f8f3e8]' />
                                          </div>

                                          <p className='mt-3 text-xs font-semibold text-[#651d2b] text-center'>
                                                Create Story
                                          </p>

                                          <div className='mt-2 flex items-center gap-1'>
                                                <span className='w-1 h-1 rounded-full bg-[#c7a86b]' />
                                                <span className='w-1 h-1 rounded-full bg-[#651d2b]' />
                                                <span className='w-1 h-1 rounded-full bg-[#c7a86b]' />
                                          </div>

                                    </div>
                              </div>

                              {/* Campus Stories */}
                              {stories.map((story, index) => (
                                    <div onClick={()=>setViewStory(story)} key={index} className='relative w-30 h-40 shrink-0 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-200 active:scale-95 bg-[#651d2b]'>

                                          {/* Story Media */}
                                          {story.media_type !== 'text' ? (
                                                <div className='absolute inset-0'>
                                                      {story.media_type === 'image' ? (
                                                            <img src={story.media_url} alt='' className='w-full h-full object-cover transition-transform duration-300 hover:scale-105' />
                                                      ) : (
                                                            <video src={story.media_url} className='w-full h-full object-cover' />
                                                      )}

                                                      <div className='absolute inset-0 bg-gradient-to-t from-[#3b2922]/80 via-transparent to-black/20' />
                                                </div>
                                          ) : (
                                                <div className='absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-[#651d2b] to-[#4f1621]'>
                                                      <GraduationCap className='absolute top-3 right-3 w-5 h-5 text-[#c7a86b]/50' />

                                                      {/* Story Content */}
<p className='absolute top-14 left-3 right-2 z-10 text-[#f8f3e8]/60 text-[10px] font-normal truncate blur-[0.2px]'>
      {story.content}
</p>

{/* User Name */}
<p className='absolute left-3 right-2 bottom-7 z-10 text-[#f8f3e8]/70 text-[9px] font-medium truncate blur-[0.2px]'>
      {story.user.full_name || story.user.username}
</p>

{/* Time */}
<p className='absolute left-3 bottom-2 z-10 text-[#f8f3e8]/50 text-[8px] font-normal blur-[0.2px]'>
      {moment(story.createdAt).fromNow()}
</p> 
                                                </div>
                                          )}

                                          {/* Profile Picture */}
                                          <img src={story.user.profile_picture} alt='' className='absolute top-3 left-3 z-10 w-8 h-8 rounded-full border-2 border-[#f8f3e8] shadow-md' />

                                          {/* User Name */}
                                          <p className='absolute left-3 right-2 bottom-7 z-10 text-[#f8f3e8] text-xs font-semibold truncate'>
                                                {story.user.full_name || story.user.username}
                                          </p>

                                          {/* Time */}
                                          <p className='absolute left-3 bottom-2 z-10 text-[#f8f3e8]/70 text-[10px]'>
                                                {moment(story.createdAt).fromNow()}
                                          </p>

                                          {/* Gold Accent */}
                                          <div className='absolute bottom-0 left-0 right-0 h-[2px] bg-[#c7a86b]' />

                                    </div>
                              ))}

                        </div>
                  </div>

                  {/* Story Modal */}
                  {showStoryModal && (
                        <StoryModal setShowStoryModal={setShowStoryModal} fetchStories={fetchStories}/>
                  )}
                  {/* View Story Modal */}
                  {
                        viewStory&&<StoryViewer viewStory={viewStory} setViewStory={setViewStory}/>
                        
                  }
            </>
      )
}

export default StoriesBar