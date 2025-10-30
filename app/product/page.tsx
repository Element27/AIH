'use client'
import ErrorComp from '@/component/ErrorComp'
import LoadingComp from '@/component/LoadingComp'
import RelatedProduct from '@/component/RelatedProduct'
import TopBarComp from '@/component/TopBarComp'
import { useProductStore, Product } from '@/store/productStore'
import { ArrowLeft02Icon, MinusSignIcon, PlusSignIcon, ShoppingCartAdd02Icon, StarIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Page() {
  const router = useRouter();
  const { products, loading, error, addToCart, cart, updateQuantity } = useProductStore()

  const [item, setItem] = useState<Product | null>(null)
  const [orderCount, setOrderCount] = useState<number>(1);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const idSet = () => {

      const params = new URLSearchParams(window.location.search);
      setId(params.get("id") || "");
    }

    idSet();
  }, []);

  useEffect(() => {

    const itemSet = () => {
      if (id && products.length > 0) {
        const found = products.find((p) => p.id === Number(id))
        if (found) {
          setItem(found)
          // Check if item is already in cart and set quantity
          const inCart = cart.find((c) => c.id === found.id)
          if (inCart) {
            setOrderCount(inCart.quantity || 1)
          }
        } else {
          setItem(null)
        }
      }
    }
    itemSet();
  }, [id, products, cart])

  const handleDecOrderCount = () => {
    if (orderCount > 1) {
      setOrderCount(orderCount - 1);
    }
  }

  const handleIncOrderCount = () => {
    setOrderCount(orderCount + 1);
  }

  const handleAddToCart = () => {
    if (!item) return;

    const alreadyInCart = cart.find((c) => c.id === item.id)
    if (alreadyInCart) {
      // Update quantity instead of showing warning
      updateQuantity(item.id, orderCount)
      toast.success(`Updated ${item.title} quantity to ${orderCount}! 🛒`)
    } else {
      addToCart({ ...item, quantity: orderCount })
      toast.success(`${item.title} added to cart! 🎉`)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen w-full font-sans bg-gray-50">
        <TopBarComp />
        <LoadingComp />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen w-full font-sans bg-gray-50">
        <TopBarComp />
        <ErrorComp />
      </div>
    )
  }

  if (!item) {
    return (
      <Suspense fallback={<LoadingComp />}>
        <div className="flex flex-col min-h-screen w-full font-sans bg-gray-50">
          <TopBarComp />
          <div className='flex-1 flex items-center justify-center p-4'>
            <div className='bg-white rounded-xl shadow-sm p-12 max-w-md w-full text-center border border-gray-100'>
              <h2 className='text-gray-900 font-bold text-2xl mb-2'>Product not found</h2>
              <p className='text-gray-600 text-sm mb-6'>{`The product you're looking for doesn't exist`}</p>
              <button
                onClick={() => router.push('/')}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors'
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </Suspense>
    )
  }

  const isInCart = cart.some((c) => c.id === item.id)

  return (
    <div className="flex flex-col min-h-screen w-full font-sans bg-gray-50">
      <Suspense fallback={<LoadingComp />}>
        <TopBarComp />
      </Suspense>

      {/* Back Button */}
      <div className="p-4 md:p-6 lg:px-12">
        <button
          onClick={() => router.back()}
          className='flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group'
        >
          <HugeiconsIcon
            icon={ArrowLeft02Icon}
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          />
          <span className='text-sm font-medium'>Back</span>
        </button>
      </div>

      <div className='flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-12 pb-12'>
        {/* Product Details */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-12'>
          <div className='grid md:grid-cols-2 gap-8 lg:gap-12'>
            {/* Product Image */}
            <div className='flex items-center justify-center bg-gray-50 rounded-lg p-8'>
              <Image
                width={400}
                height={400}
                src={item.image}
                alt={item.title}
                className='w-full h-auto max-h-96 object-contain'
              />
            </div>

            {/* Product Info */}
            <div className='flex flex-col justify-center'>
              {/* Category Badge */}
              <span className='inline-block w-fit bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-3'>
                {item.category}
              </span>

              {/* Title */}
              <h1 className='text-gray-900 font-bold text-2xl md:text-3xl mb-4'>
                {item.title}
              </h1>

              {/* Rating */}
              <div className='flex items-center gap-2 mb-4'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <HugeiconsIcon
                      key={i}
                      icon={StarIcon}
                      className={`w-4 h-4 ${i < Math.floor(item.rating?.rate || 4) ? 'fill-amber-400 stroke-none' : 'fill-gray-200 stroke-none'}`}
                    />
                  ))}
                </div>
                <span className='text-sm text-gray-600'>
                  {item.rating?.rate || 4.0} ({item.rating?.count || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className='mb-6 pb-6 border-b border-gray-200'>
                <p className='text-4xl font-bold text-gray-900'>
                  ${item.price?.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <div className='mb-6'>
                <h3 className='text-gray-900 font-semibold mb-2'>Description</h3>
                <p className='text-gray-600 leading-relaxed'>
                  {item.description}
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className='flex flex-col sm:flex-row gap-4'>
                {/* Quantity Controls */}
                <div className='flex items-center gap-2 bg-gray-50 rounded-lg p-2'>
                  <button
                    onClick={handleDecOrderCount}
                    disabled={orderCount === 1}
                    className='p-2 hover:bg-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
                    aria-label="Decrease quantity"
                  >
                    <HugeiconsIcon icon={MinusSignIcon} className="text-gray-700 w-4 h-4" />
                  </button>
                  <span className='w-12 text-center text-gray-900 font-semibold'>
                    {orderCount}
                  </span>
                  <button
                    onClick={handleIncOrderCount}
                    className='p-2 hover:bg-white rounded transition-colors'
                    aria-label="Increase quantity"
                  >
                    <HugeiconsIcon icon={PlusSignIcon} className="text-gray-700 w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  className='flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm hover:shadow-md'
                  onClick={handleAddToCart}
                >
                  <HugeiconsIcon icon={ShoppingCartAdd02Icon} className="w-5 h-5" />
                  <span>{isInCart ? 'Update Cart' : 'Add to Cart'}</span>
                </button>
              </div>

              {isInCart && (
                <p className='text-sm text-green-600 mt-3 flex items-center gap-1'>
                  ✓ This item is in your cart
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {item.category && <RelatedProduct category={item.category} />}
      </div>
    </div>
  )
}