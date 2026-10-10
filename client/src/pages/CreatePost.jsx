import React, { useRef, useState } from 'react'
import { ImagePlus, X, Send, LoaderCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { dummyUserData } from '../assets/assets'

const CreatePost = () => {
      const [content, setContent] = useState('')
      const [images, setImages] = useState([])
      const [loading, setLoading] = useState(false)
      const fileInputRef = useRef(null)

      const user = dummyUserData

      const handleImageChange = (e) => {
            const files = Array.from(e.target.files || [])
            const remainingSlots = 5 - images.length

            if (files.length > remainingSlots) {
                  toast.error(`You can upload a maximum of 5 images.`)
            }

            const selectedFiles = files.slice(0, remainingSlots)
            const validFiles = selectedFiles.filter((file) => file.type.startsWith('image/'))

            if (validFiles.length !== selectedFiles.length) {
                  toast.error('Please select valid image files.')
            }

            const newImages = validFiles.map((file) => ({
                  file,
                  preview: URL.createObjectURL(file),
            }))

            setImages((prev) => [...prev, ...newImages])

            e.target.value = ''
      }

      const removeImage = (index) => {
            setImages((prev) => {
                  URL.revokeObjectURL(prev[index].preview)
                  return prev.filter((_, i) => i !== index)
            })
      }

      const handlePublish = async () => {
            if (!content.trim() && images.length === 0) {
                  toast.error('Write something or add an image to your post.')
                  return
            }

            setLoading(true)

            try {
                  // Frontend demo: replace with your backend API later.
                  const postData = {
                        content: content.trim(),
                        images: images.map(({ file }) => file),
                        userId: user._id,
                        createdAt: new Date().toISOString(),
                  }

                  console.log('Post ready to publish:', postData)

                  await new Promise((resolve) => setTimeout(resolve, 700))

                  toast.success('Post created successfully!')
                  setContent('')
                  setImages([])
            } catch (error) {
                  toast.error('Unable to create post. Please try again.')
            } finally {
                  setLoading(false)
            }
      }

      return (
            <div className='min-h-full bg-[#f8f3e8] px-5 py-8 sm:px-8 lg:px-12'>
                  <div className='max-w-4xl mx-auto'>

                        {/* Header */}
                        <div className='mb-6'>
                              <h1 className='text-2xl sm:text-3xl font-serif font-bold text-[#3b2922]'>
                                    Create Post
                              </h1>
                              <p className='mt-1 text-sm text-[#8c7768]'>
                                    Share your thoughts with the world
                              </p>
                        </div>

                        {/* Post Form */}
                        <div className='max-w-xl bg-white border border-[#d5c6ae] rounded-xl shadow-sm overflow-hidden'>

                              <div className='p-5'>

                                    {/* User Information */}
                                    <div className='flex items-center gap-3 mb-5'>
                                          <img
                                                src={user.profile_picture}
                                                alt={user.full_name}
                                                className='w-11 h-11 rounded-full object-cover border-2 border-[#c7a86b]'
                                          />

                                          <div className='min-w-0'>
                                                <h2 className='text-sm font-serif font-semibold text-[#3b2922]'>
                                                      {user.full_name}
                                                </h2>
                                                <p className='text-xs text-[#8c7768] mt-0.5'>
                                                      @{user.username}
                                                </p>
                                          </div>
                                    </div>

                                    {/* Text Input */}
                                    <textarea
                                          value={content}
                                          onChange={(e) => setContent(e.target.value)}
                                          placeholder="What's happening?"
                                          rows={4}
                                          className='w-full resize-y min-h-24 bg-transparent outline-none text-sm text-[#3b2922] placeholder:text-[#a89a8d] leading-6'
                                    />

                                    {/* Image Previews */}
                                    {images.length > 0 && (
                                          <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3'>
                                                {images.map((image, index) => (
                                                      <div key={image.preview} className='relative group aspect-square rounded-lg overflow-hidden border border-[#d5c6ae]'>
                                                            <img
                                                                  src={image.preview}
                                                                  alt={`Preview ${index + 1}`}
                                                                  className='w-full h-full object-cover'
                                                            />

                                                            <button
                                                                  type='button'
                                                                  onClick={() => removeImage(index)}
                                                                  className='absolute top-2 right-2 w-7 h-7 rounded-full bg-[#3b2922]/80 text-white flex items-center justify-center hover:bg-[#651d2b] transition'
                                                                  aria-label={`Remove image ${index + 1}`}
                                                            >
                                                                  <X className='w-4 h-4' />
                                                            </button>
                                                      </div>
                                                ))}
                                          </div>
                                    )}

                                    {/* Heritage Divider */}
                                    <div className='mt-4 mb-3'>
                                          <div className='h-px bg-[#d5c6ae]' />
                                          <div className='h-px bg-[#c7a86b] mt-1 opacity-50' />
                                    </div>

                                    {/* Bottom Actions */}
                                    <div className='flex items-center justify-between'>

                                          <div>
                                                <input
                                                      ref={fileInputRef}
                                                      type='file'
                                                      accept='image/*'
                                                      multiple
                                                      onChange={handleImageChange}
                                                      className='hidden'
                                                />

                                                <button
                                                      type='button'
                                                      onClick={() => fileInputRef.current?.click()}
                                                      disabled={images.length >= 5 || loading}
                                                      className='flex items-center gap-2 p-2 rounded-md text-[#8c7768] hover:text-[#651d2b] hover:bg-[#f8f3e8] disabled:opacity-40 transition'
                                                      title='Add images'
                                                >
                                                      <ImagePlus className='w-5 h-5' />
                                                      <span className='text-xs'>
                                                            {images.length}/5
                                                      </span>
                                                </button>
                                          </div>

                                          <button
                                                type='button'
                                                onClick={handlePublish}
                                                disabled={loading || (!content.trim() && images.length === 0)}
                                                className='flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#651d2b] hover:bg-[#4f1621] disabled:opacity-40 disabled:cursor-not-allowed text-[#f8f3e8] text-sm font-medium shadow-sm transition active:scale-[0.98]'
                                          >
                                                {loading ? (
                                                      <LoaderCircle className='w-4 h-4 animate-spin' />
                                                ) : (
                                                      <Send className='w-4 h-4' />
                                                )}
                                                {loading ? 'Publishing...' : 'Publish Post'}
                                          </button>

                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default CreatePost