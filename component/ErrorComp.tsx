import { ShoppingCart01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'


export default function ErrorComp() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='bg-zinc-200 rounded-md p-16 w-fit h-fit text-center flex flex-col items-center justify-center'>
        <HugeiconsIcon icon={ShoppingCart01Icon} className="animate-bounce text-red-500" size={56} />

        <h2 className='text-zinc-800 font-semibold'>Something went wrong</h2>
        <p className='text-zinc-800 text-sm my-2'>Try refreshing the page and try again</p>
        <button onClick={() => window.location.reload()} className='py-2 px-4 rounded-md bg-zinc-800 text-zinc-200 cursor-pointer'>Refresh</button>
      </div>
    </div>
  )
}
