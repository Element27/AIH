'use client'
import ErrorComp from '@/component/ErrorComp'
import LoadingComp from '@/component/LoadingComp'
import RelatedProduct from '@/component/RelatedProduct'
import TopBarComp from '@/component/TopBarComp'
import { useProductStore, Product } from '@/store/productStore'
import { ArrowLeft02Icon, MinusSignIcon, PlusSignIcon, ShoppingCartAdd02Icon, } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'



export default function Page() {

  const params = useSearchParams()
  const router = useRouter();
  const id = params.get("id")

  const { products, loading, error, } = useProductStore()

  console.log("errro", error)

  const [item, setItem] = useState<Product>({} as Product)
  const [orderCount, setOrderCount] = useState<number>(1);

  const handleDecOrderCount = () => {
    if (orderCount > 1) setOrderCount(orderCount - 1);

  }
  const handleIncOrderCount = () => {
    setOrderCount(orderCount + 1);

  }


  useEffect(() => {
    const getProd = () => {
      if (id && products.length > 0) {
        const found = products.find((p) => p.id === Number(id))
        console.log("item", found)
        if (found) {
          setItem(found)
        }
      }

    }

    getProd()
  })


  return (
    <div className="flex flex-col min-h-screen w-full  font-sans bg-zinc-50">
      <TopBarComp />
      <div className="">
        {/* <HugeiconsIcon icon={ArrowLeft02Icon} /> */}
        <HugeiconsIcon icon={ArrowLeft02Icon} className="mx-4 lg:mx-12 p-1.5 bg-zinc-200 rounded-full w-fit  text-zinc-500 my-4" size={32} onClick={() => router.back()} />
      </div>


      {
        loading ? (
          <LoadingComp />
        ) : error ? (
          <ErrorComp />) :

          (
            <div className='w-full'>
              <div className='p-4 flex items-center justify-between gap-24'>
                <Image
                  width={240}
                  height={360}
                  src={item?.image}
                  alt={item?.title}
                  className=''
                />


                <div>
                  <div className='flex items-center gap-4  py-2'>
                    <h3 className='text-zinc-700 font-bold'>{item?.title}</h3>
                    <h4 className='text-zinc-500 bg-zinc-300 rounded-full py-1 px-2'>{item?.category}</h4>
                  </div>
                  <p className='text-zinc-500 my-4 border-y border-y-zinc-200 py-2'>{item?.description}</p>

                  <div className='flex items-center gap-10'>

                    <div className='flex items-center gap-2 '>
                      <HugeiconsIcon icon={MinusSignIcon} className="text-red-500" size={12} onClick={handleDecOrderCount} />
                      <input value={orderCount} className='w-12 border border-zinc-100 text-center text-zinc-500 rounded-md p-1 text-sm focus:border-none' />
                      <HugeiconsIcon icon={PlusSignIcon} className="text-green-500" size={12} onClick={handleIncOrderCount} />
                    </div>

                    <button className='rounded-md bg-green-500 flex items-center gap-2 px-4 py-2'>
                      <HugeiconsIcon icon={ShoppingCartAdd02Icon} className=" text-green-100 " size={12} />
                      <span className='text-[12px]  '>Add To Cart</span>
                    </button>
                  </div>
                </div>

              </div>

              <RelatedProduct category={item?.category} />

            </div>
          )

      }

    </div>
  )
}
