import React, { useEffect, useState } from 'react'
import { Camera, X } from 'lucide-react'
import toast from 'react-hot-toast'

const ProfileModal = ({ user, setUser, setShowEdit }) => {
      const [editForm, setEditForm] = useState({
            full_name: user?.full_name || '',
            username: user?.username || '',
            bio: user?.bio || '',
            location: user?.location || '',
            profile_picture: user?.profile_picture || '',
            cover_photo: user?.cover_photo || '',
      })

      const [profileFile, setProfileFile] = useState(null)
      const [coverFile, setCoverFile] = useState(null)

      useEffect(() => {
            return () => {
                  if (profileFile?.preview) URL.revokeObjectURL(profileFile.preview)
                  if (coverFile?.preview) URL.revokeObjectURL(coverFile.preview)
            }
      }, [profileFile, coverFile])

      const handleChange = (e) => {
            const { name, value } = e.target
            setEditForm((prev) => ({ ...prev, [name]: value }))
      }

      const handleImageChange = (e, type) => {
            const file = e.target.files?.[0]
            if (!file) return

            if (!file.type.startsWith('image/')) {
                  toast.error('Please select a valid image.')
                  e.target.value = ''
                  return
            }

            const preview = URL.createObjectURL(file)

            if (type === 'profile_picture') {
                  setProfileFile({ file, preview })
                  setEditForm((prev) => ({ ...prev, profile_picture: file }))
            } else {
                  setCoverFile({ file, preview })
                  setEditForm((prev) => ({ ...prev, cover_photo: file }))
            }

            e.target.value = ''
      }

      const handleSaveProfile = (e) => {
            e.preventDefault()

            if (!editForm.full_name.trim() || !editForm.username.trim()) {
                  toast.error('Name and username are required.')
                  return
            }

            const updatedUser = {
                  ...user,
                  ...editForm,
                  full_name: editForm.full_name.trim(),
                  username: editForm.username.trim(),
                  bio: editForm.bio.trim(),
                  location: editForm.location.trim(),
            }

            setUser(updatedUser)
            toast.success('Profile updated successfully!')
            setShowEdit(false)
      }

      return (
            <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5'>
                  <div className='w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar bg-white rounded-xl border border-[#d5c6ae] shadow-2xl'>

                        {/* Header */}
                        <div className='sticky top-0 z-10 bg-white border-b border-[#d5c6ae] px-5 py-4 flex items-center justify-between'>
                              <h2 className='text-xl font-serif font-bold text-[#3b2922]'>Edit Profile</h2>
                              <button type='button' onClick={() => setShowEdit(false)} className='p-2 rounded-full text-[#8c7768] hover:bg-[#eee4d0] hover:text-[#651d2b] transition'>
                                    <X className='w-5 h-5' />
                              </button>
                        </div>

                        <form onSubmit={handleSaveProfile} className='p-5 space-y-4'>

                              {/* Profile Picture */}
                              <div>
                                    <label className='block text-xs font-medium text-[#3b2922] mb-2'>Profile Picture</label>
                                    <label className='relative block w-16 h-16 cursor-pointer group'>
                                          <img src={editForm.profile_picture} alt='Profile preview' className='w-16 h-16 rounded-full object-cover border-2 border-[#c7a86b]' />
                                          <div className='absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'>
                                                <Camera className='w-5 h-5 text-white' />
                                          </div>
                                          <input type='file' accept='image/*' onChange={(e) => handleImageChange(e, 'profile_picture')} className='hidden' />
                                    </label>
                              </div>

                              {/* Cover Photo */}
                              <div>
                                    <label className='block text-xs font-medium text-[#3b2922] mb-2'>Cover Photo</label>
                                    <label className='relative block w-full max-w-sm h-28 cursor-pointer overflow-hidden rounded-lg border border-[#d5c6ae] bg-[#eee4d0] group'>
                                          {editForm.cover_photo ? (
                                                <img src={editForm.cover_photo} alt='Cover preview' className='w-full h-full object-cover' />
                                          ) : (
                                                <div className='w-full h-full flex items-center justify-center text-sm text-[#8c7768]'>Choose cover photo</div>
                                          )}
                                          <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'>
                                                <Camera className='w-6 h-6 text-white' />
                                          </div>
                                          <input type='file' accept='image/*' onChange={(e) => handleImageChange(e, 'cover_photo')} className='hidden' />
                                    </label>
                              </div>

                              {/* Name */}
                              <div>
                                    <label htmlFor='full_name' className='block text-xs font-medium text-[#3b2922] mb-1.5'>Name</label>
                                    <input id='full_name' name='full_name' value={editForm.full_name} onChange={handleChange} required className='w-full px-3 py-2.5 rounded-md border border-[#d5c6ae] text-sm text-[#3b2922] outline-none focus:border-[#651d2b] focus:ring-2 focus:ring-[#651d2b]/10' />
                              </div>

                              {/* Username */}
                              <div>
                                    <label htmlFor='username' className='block text-xs font-medium text-[#3b2922] mb-1.5'>Username</label>
                                    <input id='username' name='username' value={editForm.username} onChange={handleChange} required className='w-full px-3 py-2.5 rounded-md border border-[#d5c6ae] text-sm text-[#3b2922] outline-none focus:border-[#651d2b] focus:ring-2 focus:ring-[#651d2b]/10' />
                              </div>

                              {/* Bio */}
                              <div>
                                    <label htmlFor='bio' className='block text-xs font-medium text-[#3b2922] mb-1.5'>Bio</label>
                                    <textarea id='bio' name='bio' value={editForm.bio} onChange={handleChange} rows={3} maxLength={250} className='w-full px-3 py-2.5 rounded-md border border-[#d5c6ae] text-sm text-[#3b2922] resize-y outline-none focus:border-[#651d2b] focus:ring-2 focus:ring-[#651d2b]/10' />
                              </div>

                              {/* Location */}
                              <div>
                                    <label htmlFor='location' className='block text-xs font-medium text-[#3b2922] mb-1.5'>Location</label>
                                    <input id='location' name='location' value={editForm.location} onChange={handleChange} className='w-full px-3 py-2.5 rounded-md border border-[#d5c6ae] text-sm text-[#3b2922] outline-none focus:border-[#651d2b] focus:ring-2 focus:ring-[#651d2b]/10' />
                              </div>

                              {/* Buttons */}
                              <div className='flex justify-end gap-2 pt-3 border-t border-[#eee4d0]'>
                                    <button type='button' onClick={() => setShowEdit(false)} className='px-4 py-2.5 rounded-md border border-[#d5c6ae] text-[#6b5b50] text-sm hover:bg-[#eee4d0] transition'>
                                          Cancel
                                    </button>
                                    <button type='submit' className='px-4 py-2.5 rounded-md bg-[#651d2b] hover:bg-[#4f1621] text-[#f8f3e8] text-sm font-medium transition'>
                                          Save Changes
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      )
}

export default ProfileModal
