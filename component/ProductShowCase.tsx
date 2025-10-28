'use client'
import { Product, useProductStore } from '@/store/productStore'
import { ShoppingCartAdd02Icon, StarAward01Icon, StarIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import React from 'react'

export default function ProductShowCase() {

  const { products, loading, error, } = useProductStore()

  console.log("products:", products);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  w-[90%] mx-auto my-10'>
      {products.map((product: Product, index: number) => (
        <ProductCard key={index} product={product} />
      ))}

    </div>
  )
}


const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className='w-full max-w-3xs h-80 rounded-lg overflow-hidden shadow-sm relative m-4 flex flex-col mx-auto'>
      <div className='h-2/3 w-[90%] mx-auto my-2 relative'>
        <Image
          width={240}
          height={320}
          src={product.image}
          alt={product.title}
          className='w-full h-full object-contain'
        />


        {/*  */}
        <div className='absolute bottom-0 left-0 w-full flex items-center justify-between'>
          <div className='flex items-center'>
            <HugeiconsIcon icon={StarIcon} className="w-3 fill-amber-400 stroke-none" />
            <span className='text-[10px] text-amber-400'>3,5</span>
          </div>

          <HugeiconsIcon icon={ShoppingCartAdd02Icon} className="w-4 text-green-500 " />
        </div>

      </div>

      <div className='h-1/3 py-2 overflow-x-hidden px-4 flex flex-col justify-center gap-1 text-zinc-700 bg-red-500 relative'>
        <div className='w-[95%] overflow-hidden text-ellipsis mx-auto'>
          <h4 className=' line-clamp-1 text-zinc-800 font-semibold mb-1'>{product.title}</h4>
          <p className=' text-xs line-clamp-2 text-slate-100'>{product.description}</p>
        </div>


      </div>


      {/*  */}
      <div className='absolute top-4 left-0 px-2 py-1 flex items-center justify-between w-full gap-2'>
        <span className=' bg-zinc-100/75 text-zinc-700 px-2 py-1 rounded-md text-xs '>{product.category}</span>
        <span className=' bg-zinc-100/75 text-zinc-700 px-2 py-1 rounded-md text-xs '>{product.price}</span>
      </div>



    </div>
  )
}