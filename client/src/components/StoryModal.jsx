import React, { useState } from 'react'
import { ArrowLeft, Image, Sparkles, X } from 'lucide-react'
import toast from 'react-hot-toast'

const StoryModal = ({ setShowStoryModal , fetchStories}) => {
      const bgColors = ['#651d2b', '#4f1621', '#3b2922', '#8c7768', '#c7a86b', '#2f6f73']

      const [mode, setMode] = useState('text')
      const [background, setBackground] = useState(bgColors[0])
      const [text, setText] = useState('')
      const [media, setMedia] = useState(null)
      const [previewUrl, setPreviewUrl] = useState(null)

      const handleMediaUpload = (e) => {
            const file = e.target.files?.[0]

            if (file) {
                  const url = URL.createObjectURL(file)
                  setPreviewUrl(url)
                  setMedia(file)
                  setMode('media')
            }
      } 

      const handleCreateStory = async () => {
            console.log({
                  text,
                  background,
                  media
            })
            fetchStories()
            setShowStoryModal(false)
      }

      const removeMedia = () => {
            if (previewUrl) {
                  URL.revokeObjectURL(previewUrl)
            }

            setPreviewUrl(null)
            setMedia(null)
            setMode('text')
      }

      return (
            <div className='fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4'>

                  {/* Modal */}
                  <div className='w-full max-w-md'>

                        {/* Header */}
                        <div className='relative flex items-center justify-center mb-4'>

                              <button onClick={() => setShowStoryModal(false)} className='absolute left-0 w-9 h-9 flex items-center justify-center rounded-full text-[#f8f3e8] hover:bg-white/10 transition'>
                                    <ArrowLeft className='w-5 h-5' />
                              </button>

                              <h2 className='text-lg font-serif font-semibold text-[#f8f3e8]'>
                                    Create Story
                              </h2>

                              <button onClick={() => setShowStoryModal(false)} className='absolute right-0 w-9 h-9 flex items-center justify-center rounded-full text-[#f8f3e8] hover:bg-white/10 transition'>
                                    <X className='w-5 h-5' />
                              </button>

                        </div>

                        {/* Story Preview */}
                        <div className='relative w-full aspect-[3/4] max-h-[420px] rounded-lg overflow-hidden shadow-2xl' style={{ backgroundColor: background }}>

                              {previewUrl ? (
                                    media?.type.startsWith('video/') ? (
                                          <video src={previewUrl} controls className='w-full h-full object-cover' />
                                    ) : (
                                          <img src={previewUrl} alt='Story preview' className='w-full h-full object-cover' />
                                    )
                              ) : (
                                    <textarea
                                          value={text}
                                          onChange={(e) => setText(e.target.value)}
                                          placeholder="What's on your mind?"
                                          className='w-full h-full resize-none bg-transparent outline-none border-none p-5 text-[#f8f3e8] placeholder:text-[#f8f3e8]/60 text-sm'
                                    />
                              )}

                              {/* Remove Media */}
                              {previewUrl && (
                                    <button onClick={removeMedia} className='absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition'>
                                          <X className='w-4 h-4' />
                                    </button>
                              )}

                        </div>

                        {/* Background Colors */}
                        {!previewUrl && (
                              <div className='flex items-center justify-center gap-2 mt-4'>

                                    {bgColors.map((color) => (
                                          <button
                                                key={color}
                                                onClick={() => setBackground(color)}
                                                style={{ backgroundColor: color }}
                                                className={`w-4 h-4 rounded-full transition-transform hover:scale-125 ${background === color ? 'ring-2 ring-white ring-offset-2 ring-offset-black/20 scale-110' : ''}`}
                                          />
                                    ))}

                              </div>
                        )}

                        {/* Story Type Buttons */}
                        <div className='flex mt-4 rounded-lg overflow-hidden'>

                              <button onClick={() => setMode('text')} className={`flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition ${mode === 'text' ? 'bg-[#f8f3e8] text-[#651d2b]' : 'bg-[#3b2922] text-[#f8f3e8]'}`}>
                                    <Sparkles className='w-4 h-4' />
                                    Text
                              </button>

                              <label className={`flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer transition ${mode === 'media' ? 'bg-[#f8f3e8] text-[#651d2b]' : 'bg-[#3b2922] text-[#f8f3e8]'}`}>
                                    <Image className='w-4 h-4' />
                                    Photo / Video

                                    <input type='file' accept='image/*,video/*' onChange={handleMediaUpload} className='hidden' />
                              </label>

                        </div>

                        {/* Create Story */}
                        <button
                              onClick={() => toast.promise(handleCreateStory(), {
      loading: 'Saving....',
      success: <p>Story Added</p>,
      error: e => <p>{e.message}</p>,
})}
                              disabled={!text.trim() && !media}
                              className='w-full mt-3 py-2.5 rounded-lg bg-[#651d2b] hover:bg-[#4f1621] disabled:opacity-40 disabled:cursor-not-allowed text-[#f8f3e8] font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]'
                        >
                              <Sparkles className='w-4 h-4 text-[#c7a86b]' />
                              Create Story
                        </button>

                  </div>

            </div>
      )
}

export default StoryModal