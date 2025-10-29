'use client'
import { useProductStore } from '@/store/productStore'
import { Cancel01Icon, Search01Icon, ShoppingCart02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TopBarComp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchProducts, filterProducts, cart, categories } = useProductStore();
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // Sync URL params to state on mount and when URL changes
  useEffect(() => {

    const func = () => {


      const search = searchParams.get("search") || "";
      const category = searchParams.get("category") || "";

      setSearchValue(search);
      setFilterValue(category);
    }
    func();
  }, [searchParams]);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("searchValue", searchValue);
  console.log("filterValue", filterValue);

  // Apply filters whenever search or filter values change
  useEffect(() => {
    filterProducts(searchValue, filterValue);
  }, [searchValue, filterValue, filterProducts]);

  const updateURL = (updates: { search?: string; category?: string }) => {
    const params = new URLSearchParams(window.location.search);

    // Update search param
    if (updates.search !== undefined) {
      if (updates.search.trim()) {
        params.set('search', updates.search.trim());
      } else {
        params.delete('search');
      }
    }

    // Update category param
    if (updates.category !== undefined) {
      if (updates.category) {
        params.set('category', updates.category);
      } else {
        params.delete('category');
      }
    }

    router.push('?' + params.toString());
  };

  const handleSearch = () => {
    updateURL({ search: searchValue });
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setFilterValue("")
    updateURL({ search: "", category: "" });
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setFilterValue(newCategory);
    updateURL({ category: newCategory });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='flex items-center py-2 px-4 w-full h-fit justify-between shadow-md gap-2'>
      <Image
        width={50}
        height={50}
        src="/logo.png"
        alt="logo Icon"
        className=''
      />

      <div className='mx-2 flex flex-col lg:flex-row items-center w-full lg:w-2/3'>
        <div className='w-full flex'>
          <div className='relative bg-zinc-100 rounded-l-full flex flex-nowrap gap-4 items-center w-full'>
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute top-1/2 transform -translate-y-1/2 left-2 text-zinc-800 w-5"
            />
            <input
              type="text"
              placeholder="Search..."
              className='w-full pl-8 pr-8 text-zinc-700 p-2 focus:outline-none placeholder:text-zinc-600'
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              onKeyPress={handleKeyPress}
            />
            {searchValue && (
              <HugeiconsIcon
                icon={Cancel01Icon}
                className="absolute top-1/2 transform -translate-y-1/2 right-2 text-red-500 w-5 cursor-pointer hover:text-red-700"
                onClick={handleClearSearch}
              />
            )}
          </div>
          <button
            className='bg-green-700 py-2 px-4 text-zinc-200 rounded-r-full cursor-pointer hover:bg-green-800 transition-colors'
            onClick={handleSearch}
          >
            <span className='hidden lg:block'>
              Search
            </span>
            <HugeiconsIcon
              icon={Search01Icon}
              className="block lg:hidden text-zinc-200 w-3"
            />
          </button>
        </div>

        <select
          onChange={handleFilter}
          value={filterValue}
          className='ml-4 p-2 rounded-md border border-zinc-300 text-zinc-700 w-full mx-2 my-2 focus:outline-none focus:border-green-500'
        >
          <option value="">All Categories</option>
          {categories && categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className='relative flex items-center justify-center'>
        <Link href="/cart" className='relative hover:opacity-80 transition-opacity'>
          <HugeiconsIcon icon={ShoppingCart02Icon} className='text-green-600 w-6 h-6' />
          {cart.length > 0 && (
            <div className='text-green-100 bg-green-800 rounded-full absolute -top-1 -right-1 p-2 w-4 h-4 flex items-center justify-center'>
              <span className='text-[10px] font-semibold'>{cart.length}</span>
            </div>
          )}
        </Link>
      </div>
    </div>
  )
}