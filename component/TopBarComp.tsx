'use client'
import { useProductStore } from '@/store/productStore'
import { Search01Icon, ShoppingCart02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import { useEffect } from 'react'

export default function TopBarComp() {

  const { fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])


  return (
    <div className='flex items-center py-2 px-4 w-full h-fit justify-between  shadow-md'>
      <Image
        width={50}
        height={50}
        src="/logo.png"
        alt="logo Icon"
        className=''
      />

      <div className='flex items-center w-1/3'>
        <div className='relative bg-zinc-100 rounded-l-full flex gap-4 items-center w-full'>
          <HugeiconsIcon icon={Search01Icon} className="absolute top-1/2 transform -translate-y-1/2 left-2 text-zinc-800 w-5" />
          <input type="text" placeholder="Search..." className='w-full pl-8 text-zinc-700 p-2 focus:outline-none placeholder:text-zinc-600' />
        </div>
        <button className='bg-green-700 py-2 px-4 text-zinc-200 rounded-r-full '>Search</button>
      </div>

      <div className='relative flex items-center justify-center'>
        <HugeiconsIcon icon={ShoppingCart02Icon} className='text-green-600' />
        <div className='text-green-100 bg-green-800 rounded-full absolute -top-1 -right-1 p-2 w-4 h-4 flex items-center justify-center'>
          <span className='text-[10px]'>1</span>
        </div>
      </div>
    </div>
  )
}
