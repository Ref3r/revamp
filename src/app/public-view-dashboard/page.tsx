import React from 'react'
import Profile from '@/components/public-view-dashboard/Profile'
import Recentpartners from '@/components/public-view-dashboard/Recent-partners'
import Usercommunities from '@/components/public-view-dashboard/User-communities'
import Work from '@/components/public-view-dashboard/Work'

const Page = () => {
  return (
    <div className='bg-[#0E0E0E] h-screen'>
        <Profile />
        <Recentpartners /> 
        <Usercommunities />
        <Work/>  
    </div>
  )
}

export default Page
