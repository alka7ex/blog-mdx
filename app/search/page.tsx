import React from 'react'
import Searchpage from '@/components/Searchpage'
import BlogListWithPagination from '@/components/Searchpage'

const page = () => {
  return (
    <div className='min-h-screen'><BlogListWithPagination></BlogListWithPagination></div>
  )
}

export default page