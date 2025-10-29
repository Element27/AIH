'use client'
import { useProductStore } from '@/store/productStore'
import { Cancel01Icon, Search01Icon, ShoppingCart02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TopBarComp() {

  const router = useRouter();
  const { fetchProducts, setSearchQuery, cart } = useProductStore()
  const [searchValue, setSearchValue] = useState("")
  const params = useSearchParams();

  const searchParam = params.get("search") ?? undefined;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  const handleSearch = () => {
    // window.location.href(``)
    router.push('?search=' + searchValue)
  }

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam, setSearchQuery])


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
          <input type="text" placeholder="Search..." className='w-full pl-8 text-zinc-700 p-2 focus:outline-none placeholder:text-zinc-600'
            onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
          {searchParam && <HugeiconsIcon icon={Cancel01Icon} className="absolute top-1/2 transform -translate-y-1/2 right-2 text-red-500 w-5" onClick={() => { setSearchQuery(""); setSearchValue(""); handleSearch() }} />}
        </div>
        <button className='bg-green-700 py-2 px-4 text-zinc-200 rounded-r-full cursor-pointer' onClick={handleSearch}>Search</button>
      </div>

      <div className='relative flex items-center justify-center'>
        <Link href="/cart" className='relative'>
          <HugeiconsIcon icon={ShoppingCart02Icon} className='text-green-600' />
          <div className='text-green-100 bg-green-800 rounded-full absolute -top-1 -right-1 p-2 w-4 h-4 flex items-center justify-center'>
            <span className='text-[10px]'>{cart.length}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
