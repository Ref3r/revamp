import React from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Wallet_balance from '@/components/dashboard/Wallet_balance'

const dashboard = () => {
  return (
    <div className='bg-[#0E0E0E] py-6 '>
      <Wallet_balance/>
      <Sidebar />
    </div>
  )
}

export default dashboard
