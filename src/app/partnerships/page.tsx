import Sidebar from '@/components/dashboard/Sidebar'
import Brandcollabchart from '@/components/partnerships/brand-collab/Brand-collab-chart'
import Campaign from '@/components/partnerships/campaign/Campaign'
import Earnings from '@/components/partnerships/earnings/Earnings'
import Partnershipsheader from '@/components/partnerships/header/Partnerships-header'
import React from 'react'

const page = () => {
  return (
    <div className='bg-[#0E0E0E] h-[1000px] p-4'>
      {/* Fixed Sidebar */}
      <div className="fixed left-3 top-0 bottom-0 z-30 hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#1A1919] py-2">
        <div className="flex justify-around items-center px-2">
          <Sidebar isMobile={true} />
        </div>
      </div>
      <Partnershipsheader />
      <Brandcollabchart />
      <Earnings />
      <Campaign/>
    </div>
  )
}

export default page
