import React from 'react'
import { Button } from '@/components/ui/button';

const PageButton = ({pg, setPage, isPreviousData}:any) => {
  return (
    <Button onClick={() => setPage(pg)} disabled={isPreviousData} className="join-item" variant="outline">{pg}</Button>
  )
}

export default PageButton