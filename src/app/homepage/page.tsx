import Fourth_section from '@/components/learn_more/Fourth_section'
import Third_section from '@/components/learn_more/Third_section'
import Hero_learn_more from '@/components/learn_more/Hero_learn_more'
import Navbar_learn_more from '@/components/learn_more/Navbar_learn_more'
import Second_section from '@/components/learn_more/Second_section'
import Fifth_section from '@/components/learn_more/Fifth_section'
import Sixth_section from '@/components/learn_more/Sixth_section'
import Seventh_section from '@/components/learn_more/Seventh_section'
import Final_section from '@/components/learn_more/Final_section'
import React from 'react'

const homepage = () => {
  return (
    <div className=''>
      <Navbar_learn_more />
      <Hero_learn_more />
      <Second_section />
      <Third_section/>
      <Fourth_section />
      <Fifth_section />
      <Sixth_section />
      <Seventh_section />
      <Final_section/>
      
    </div>
  )
}

export default homepage