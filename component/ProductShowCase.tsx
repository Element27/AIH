'use client'
import { Product, useProductStore } from '@/store/productStore'
import LoadingComp from './LoadingComp'
import ErrorComp from './ErrorComp'
import ProductCard from './ProductCard'

export default function ProductShowCase() {

  const { products, loading, error, filteredProducts, searchQuery } = useProductStore()

  const prod = searchQuery ? filteredProducts : products;

  return (
    <>
      {
        loading ? (
          <LoadingComp />
        ) : error ? (
          <ErrorComp />)
          :
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  w-[90%] mx-auto my-10'>
            {prod.map((product: Product, index: number) => (
              <ProductCard key={index} product={product} />
            ))}

          </div>
      }
    </>
  )
}




