import React from 'react'

import { SidebarData } from './SidebarData'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='w-[20%] bg-bkShade text-wtShade pt-12'>
      <ul>
    {SidebarData.map((val,key)=>{
      return <li key={key} className=' p-3'>
        <Link to={val.link} className='flex font-bold  mx-[20%]'>
        <div className='mr-2'>{val.icon}</div>
        <div>{val.title}</div>
        </Link>
      </li>
    })

    }
    </ul>
    </div>
  )
}

export default Sidebar