import { Product, useProductStore } from '@/store/productStore'
import { ShoppingCartAdd02Icon, StarIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

export default function ProductCard({ product }: { product: Product }) {

  const { addToCart, cart } = useProductStore()

  const handleAddToCart = () => {
    const alreadyInCart = cart.find((c) => c.id === product.id)
    if (alreadyInCart) {
      toast.warning("This product is already in your cart")
    } else {
      addToCart({ ...product, quantity: 1 })
      toast.success(`${product.title} added to cart!`)
    }
  }

  return (
    <div className='group w-full max-w-xs rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative m-2 flex flex-col mx-auto bg-white border border-gray-100'>
      <Link href={`/product?id=${product.id}`} className='w-full flex-1 flex flex-col'>
        {/* Image Container */}
        <div className='relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden'>
          <Image
            width={240}
            height={320}
            src={product.image}
            alt={product.title}
            className='w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300'
          />

          {/* Category Badge */}
          <div className='absolute top-2 left-2'>
            <span className='bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-[10px] font-medium shadow-sm'>
              {product.category}
            </span>
          </div>

          {/* Rating Badge */}
          <div className='absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm flex items-center gap-0.5'>
            <HugeiconsIcon icon={StarIcon} className="w-3 h-3 fill-amber-400 stroke-none" />
            <span className='text-[10px] font-semibold text-gray-700'>3.5</span>
          </div>
        </div>

        {/* Content Container */}
        <div className='flex-1 p-3 flex flex-col justify-between'>
          <div>
            <h4 className='text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-green-500 transition-colors leading-tight'>
              {product.title}
            </h4>
            <p className='text-xs text-gray-600 line-clamp-2 mb-2 leading-relaxed'>
              {product.description}
            </p>
          </div>

          {/* Price and Action Row */}
          <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
            <span className='text-lg font-bold text-gray-900'>
              {product.price}
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
              className='bg-green-500 bg-green-500 text-white p-2 rounded-lg transition-colors shadow-sm hover:shadow-md active:scale-95 transform duration-150'
              aria-label="Add to cart"
            >
              <HugeiconsIcon icon={ShoppingCartAdd02Icon} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
