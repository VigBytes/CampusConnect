import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'
import PostCard from '../components/PostCard'


const Feed = () => {
      const [feeds, setFeeds] = useState([])
      const [loading, setLoading] = useState(false)

      const fetchFeeds = async () => {
            setFeeds(dummyPostsData)
      }

      useEffect(() => {
            fetchFeeds()
      }, [])

      return !loading ? (
            <div className='h-full w-full min-w-0 overflow-y-auto no-scrollbar py-10 xl:pr-5 flex items-start justify-center gap-8'>

                  {/* Stories + Posts */}
                  <div className='w-full max-w-2xl min-w-0'>

                        {/* Stories */}
                        <StoriesBar />

                        {/* Posts */}
                        <div className='p-4 space-y-6'>
                              {feeds.map((post) => (
                                    <PostCard key={post._id} post={post} />
                              ))}
                        </div>

                  </div>

                 

            </div>
      ) : (
            <Loading height='100vh' />
      )
}

export default Feed