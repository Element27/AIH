import { Loading02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React from 'react'

export default function LoadingComp() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <HugeiconsIcon icon={Loading02Icon} className="animate-spin text-green-500" />
    </div>
  )
}
