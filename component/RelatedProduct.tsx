'use client'
import { Product, useProductStore } from '@/store/productStore'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { HugeiconsIcon } from '@hugeicons/react';
import { ShoppingCart01Icon } from '@hugeicons/core-free-icons';

export default function RelatedProduct({ category }: { category: string }) {

  const { products } = useProductStore();
  const [related, setRelated] = useState<Product[]>([])

  useEffect(() => {

    const getRelated = () => {
      const filtered = products.filter((p) => p.category === category)
      setRelated(filtered)
    }

    if (category) getRelated();

  }, [category, products])

  return (
    <div className='w-full h-fit p-4 lg:p-10'>
      <h3 className='text-zinc-500 font-semibold'>Related Products</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-[90%] mx-auto my-10'>
        {
          related?.length > 0 ? related.map((p, index) => (<ProductCard key={index} product={p} />)) :
            (
              <div className='w-full h-screen flex items-center justify-center'>
                <div className='bg-zinc-200 rounded-md p-16 w-fit h-fit text-center flex flex-col items-center justify-center'>
                  <HugeiconsIcon icon={ShoppingCart01Icon} className="text-zinc-500" size={56} />

                  <h2 className='text-zinc-800 font-semibold'>Something went wrong</h2>
                </div>
              </div>
            )
        }
      </div>
    </div>
  )
}
