'use client'
import LoadingComp from '@/component/LoadingComp'
import TopBarComp from '@/component/TopBarComp'
import { useProductStore } from '@/store/productStore'
import { ArrowLeft02Icon, MinusSignIcon, PlusSignIcon, ShoppingCart01Icon, Delete02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

interface NumProps {
  (id: number, quantity?: number): void;
}

export default function Page() {
  const { removeFromCart, cart, clearCart, updateQuantity, getCartTotal } = useProductStore()
  const router = useRouter();

  const handleDecOrderCount: NumProps = (id, quantity) => {
    if (quantity && quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  }

  const handleIncOrderCount: NumProps = (id, quantity) => {
    updateQuantity(id, quantity ? quantity + 1 : 1);
  }

  const handleCheckout = () => {
    // Add your checkout logic here
    alert('Checkout functionality coming soon!');
  }

  return (
    <Suspense fallback={<LoadingComp />}>
      <div className='w-full flex flex-col min-h-screen font-sans bg-gray-50'>
        <TopBarComp />

        {cart.length < 1 ? (
          <div className='flex-1 flex items-center justify-center p-4'>
            <div className='bg-white rounded-xl shadow-sm p-12 max-w-md w-full text-center border border-gray-100'>
              <div className='bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <HugeiconsIcon icon={ShoppingCart01Icon} className="text-blue-500" size={40} />
              </div>
              <h2 className='text-gray-900 font-bold text-2xl mb-2'>Your cart is empty</h2>
              <p className='text-gray-600 text-sm mb-6'>Add some products to get started</p>
              <button
                onClick={() => router.push('/')}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors'
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className='flex-1 p-4 md:p-6 lg:p-8'>
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className='flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group'
            >
              <HugeiconsIcon
                icon={ArrowLeft02Icon}
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              />
              <span className='text-sm font-medium'>Continue Shopping</span>
            </button>

            <div className='max-w-6xl mx-auto'>
              {/* Header */}
              <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                  <div>
                    <h1 className='text-gray-900 font-bold text-2xl md:text-3xl'>Shopping Cart</h1>
                    <p className='text-gray-600 text-sm mt-1'>{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-gray-600 text-sm'>Total Amount</p>
                    <p className='text-gray-900 font-bold text-3xl'>${getCartTotal().toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className='grid lg:grid-cols-3 gap-6'>
                {/* Cart Items */}
                <div className='lg:col-span-2 space-y-4'>
                  {cart.map((item) => (
                    <div key={item.id} className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-shadow'>
                      <div className='flex flex-col sm:flex-row gap-4'>
                        {/* Product Image */}
                        <div className='w-full sm:w-32 h-32 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden'>
                          <Image
                            width={128}
                            height={128}
                            src={item.image}
                            alt={item.title}
                            className='w-full h-full object-contain p-2'
                          />
                        </div>

                        {/* Product Details */}
                        <div className='flex-1 flex flex-col justify-between'>
                          <div>
                            <h3 className='text-gray-900 font-semibold text-lg mb-2 line-clamp-2'>{item.title}</h3>
                            <p className='text-gray-600 text-sm line-clamp-2 mb-3'>{item.description}</p>
                          </div>

                          {/* Price and Quantity Controls */}
                          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                            <div className='flex items-center gap-4'>
                              {/* Quantity Controls */}
                              <div className='flex items-center gap-2 bg-gray-50 rounded-lg p-1'>
                                <button
                                  onClick={() => handleDecOrderCount(item.id, item.quantity)}
                                  disabled={item.quantity === 1}
                                  className='p-1.5 hover:bg-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
                                  aria-label="Decrease quantity"
                                >
                                  <HugeiconsIcon icon={MinusSignIcon} className="text-gray-700 w-4 h-4" />
                                </button>
                                <span className='w-10 text-center text-gray-900 font-medium text-sm'>{item.quantity ?? 1}</span>
                                <button
                                  onClick={() => handleIncOrderCount(item.id, item.quantity)}
                                  className='p-1.5 hover:bg-white rounded transition-colors'
                                  aria-label="Increase quantity"
                                >
                                  <HugeiconsIcon icon={PlusSignIcon} className="text-gray-700 w-4 h-4" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className='text-gray-900 font-bold text-lg'>
                                ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className='flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors self-start sm:self-auto'
                            >
                              <HugeiconsIcon icon={Delete02Icon} className="w-4 h-4" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className='lg:col-span-1'>
                  <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4'>
                    <h2 className='text-gray-900 font-bold text-xl mb-4'>Order Summary</h2>

                    <div className='space-y-3 mb-4 pb-4 border-b border-gray-200'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600'>Subtotal</span>
                        <span className='text-gray-900 font-medium'>${getCartTotal().toFixed(2)}</span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600'>Shipping</span>
                        <span className='text-green-600 font-medium'>Free</span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600'>Tax</span>
                        <span className='text-gray-900 font-medium'>$0.00</span>
                      </div>
                    </div>

                    <div className='flex justify-between mb-6'>
                      <span className='text-gray-900 font-bold text-lg'>Total</span>
                      <span className='text-gray-900 font-bold text-2xl'>${getCartTotal().toFixed(2)}</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-3 transition-colors shadow-sm hover:shadow-md'
                    >
                      Proceed to Checkout
                    </button>

                    <button
                      onClick={clearCart}
                      className='w-full border-2 border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-lg font-semibold transition-colors'
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  )
}