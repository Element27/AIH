'use client'
import TopBarComp from '@/component/TopBarComp'
import { useProductStore } from '@/store/productStore'
import { MinusSignIcon, PlusSignIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import { useEffect } from 'react'

interface NumProps {
  (id: number, quantity?: number): void;
}


export default function Page() {

  const { removeFromCart, cart, clearCart, updateQuantity, getCartTotal, } = useProductStore()


  const handleDecOrderCount: NumProps = (id, quantity) => {
    if (quantity && quantity > 1) updateQuantity(id, quantity! - 1);
  }

  const handleIncOrderCount: NumProps = (id, quantity) => {
    updateQuantity(id, quantity ? quantity + 1 : 1);

  }

  useEffect(() => {
    if (cart.length < 1) {
      window.location.href = "/"
    }
  }, [cart])


  console.log("cart items", cart)
  return (
    <div className='w-full flex flex-col min-h-screen  font-sans bg-zinc-50'>
      <TopBarComp />

      <div className='w-full lg:w-[90%] mx-auto border border-zinc-200 rounded-md p-4 mt-4 flex items-center justify-between'>
        <h3 className='text-zinc-700 font-semibold text-xl'>Your Cart</h3>

        <h3 className='text-zinc-700 font-semibold text-xl'><span className='text-base'>Total:</span> ${getCartTotal()}</h3>
      </div>

      <div className='w-[90%] mx-auto  p-4 my-4'>

        {
          cart?.map((item, index) => (
            <div key={index} className='flex items-center justify-center gap-6 flex-col lg:flex-row my-4 border border-zinc-200 rounded-lg p-4'>
              <Image
                width={200}
                height={200}
                src={item.image}
                alt={item.title}
                className='mx-auto'
              />

              <div>
                <h3 className='text-zinc-700 font-semibold text-xl'>{item.title}</h3>
                <p className='text-zinc-500 my-2'>{item.description}</p>

                <div className='text-zinc-500 my-2 border-y border-y-zinc-100 py-2 font-semibold flex items-center'>
                  <div className='flex items-center gap-2'>
                    <p className=''>${item.price}</p> {" "}
                    <p className=''> x {item.quantity ?? 1}</p>
                  </div>
                  <span className='ml-4'>= ${item.price * (item.quantity ?? 1)}</span>

                </div>

                <div className='flex items-center gap-4 '>

                  <div className='flex items-center gap-2 '>
                    <HugeiconsIcon icon={MinusSignIcon} className="text-red-500 cursor-pointer" size={12} onClick={() => handleDecOrderCount(item.id, item.quantity)} />
                    <input value={item.quantity} className='w-12 border border-zinc-100 text-center text-zinc-500 rounded-md p-1 text-sm focus:border-none' />
                    <HugeiconsIcon icon={PlusSignIcon} className="text-green-500 cursor-pointer" size={12} onClick={() => handleIncOrderCount(item.id, item.quantity)} />
                  </div>

                  <button className='text-xs bg-red-500 text-white px-4 py-2 rounded-md' onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
                </div>

              </div>

            </div>
          ))
        }

        <div className="w-full flex items-center justify-between">
          <button className="w-fit mx-auto bg-green-500 rounded-md text-green-200 px-8 py-2" disabled>Check Out</button>
          <button className="w-fit mx-auto bg-red-500 rounded-md text-green-200 px-8 py-2" onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  )
}
