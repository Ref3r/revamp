import Sidebar from '@/components/dashboard/Sidebar'
import Brandcollabchart from '@/components/partnerships/brand-collab/BrandCollabChart'
import Campaign from '@/components/partnerships/campaign/Campaign'
import Earnings from '@/components/partnerships/earnings/Earnings'
import PartnershipsHeader from '@/components/partnerships/header/PartnershipsHeader'
import React from 'react'

const Page = () => {
  return (
    <div className='bg-[#0E0E0E] min-h-screen'>
      {/* Fixed Sidebar */}
      <div className="fixed left-3 top-0 bottom-0 z-30 hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="lg:ml-[70px] relative">
        <PartnershipsHeader />
        
        {/* Charts Row */}
        <div className="flex flex-col md:flex-row gap-4 px-4 mt-4">
          <div className="w-full md:w-1/2">
            <Earnings />
          </div>
          <div className="w-full md:w-1/2">
            <Brandcollabchart />
          </div>
        </div>
        
        {/* Campaign Section */}
        <div className="px-4 mt-8">
          <Campaign />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#1A1919] py-2">
        <div className="flex justify-around items-center px-2">
          <Sidebar isMobile={true} />
        </div>
      </div>
    </div>
  )
}

export default Page