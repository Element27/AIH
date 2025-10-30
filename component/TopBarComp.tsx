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

    const setFilterState = () => {
      const search = searchParams.get("search") || "";
      const category = searchParams.get("category") || "";

      setSearchValue(search);
      setFilterValue(category);
    };

    setFilterState();
  }, [searchParams]);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
    updateURL({ search: "" });
    // Note: We're only clearing search, keeping the category filter active
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

  const handleClearAll = () => {
    setSearchValue("");
    setFilterValue("");
    updateURL({ search: "", category: "" });
  };

  return (
    <div className='flex flex-col lg:flex-row items-center py-2 px-3 md:px-4 w-full h-fit justify-between shadow-sm border-b border-gray-100 gap-2 lg:gap-3 bg-white'>
      {/* Logo and Cart - Top row on mobile */}
      <div className='flex items-center justify-between w-full lg:w-auto gap-3'>
        <Link href="/">
          <Image
            width={36}
            height={36}
            src="/logo.png"
            alt="logo Icon"
            className='flex-shrink-0 md:w-10 md:h-10 cursor-pointer hover:opacity-80 transition-opacity'
          />
        </Link>

        {/* Cart icon - visible on mobile, hidden on desktop */}
        <div className='relative flex items-center lg:hidden'>
          <Link href="/cart" className='relative hover:scale-110 transition-transform p-1'>
            <HugeiconsIcon icon={ShoppingCart02Icon} className='text-green-500 w-6 h-6' />
            {cart.length > 0 && (
              <div className='text-white bg-red-500 rounded-full absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center shadow-md'>
                <span className='text-[10px] font-bold'>{cart.length}</span>
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* Search and Filter - Second row on mobile, middle on desktop */}
      <div className='flex flex-col sm:flex-row items-center w-full lg:flex-1 gap-2'>
        <div className='w-full flex flex-1'>
          <div className='relative bg-gray-50 rounded-l-lg flex items-center w-full border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-all'>
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute left-2.5 text-gray-500 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search products..."
              className='w-full pl-9 pr-9 text-gray-700 py-1.5 text-sm bg-transparent focus:outline-none placeholder:text-gray-400'
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              onKeyPress={handleKeyPress}
            />
            {searchValue && (
              <HugeiconsIcon
                icon={Cancel01Icon}
                className="absolute right-2.5 text-gray-400 w-4 h-4 cursor-pointer hover:text-red-500 transition-colors"
                onClick={handleClearSearch}
              />
            )}
          </div>
          <button
            className='bg-green-500 py-1.5 px-3 sm:px-4 text-white rounded-r-lg cursor-pointer transition-colors shadow-sm '
            onClick={handleSearch}
          >
            <span className='hidden sm:block text-sm font-medium'>
              Search
            </span>
            <HugeiconsIcon
              icon={Search01Icon}
              className="block sm:hidden text-white w-4 h-4"
            />
          </button>
        </div>

        <div className='flex gap-2 w-full sm:w-auto'>
          <select
            onChange={handleFilter}
            value={filterValue}
            className='p-1.5 px-3 rounded-lg border border-gray-200 text-gray-700 text-sm flex-1 sm:flex-none sm:min-w-[160px] lg:w-48 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white transition-all'
          >
            <option value="">All Categories</option>
            {categories && categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>

          {/* Clear All button - only show when filters are active */}
          {(searchValue || filterValue) && (
            <button
              onClick={handleClearAll}
              className='px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap'
              title="Clear all filters"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Cart icon - hidden on mobile, visible on desktop */}
      <div className='relative hidden lg:flex items-center justify-center flex-shrink-0'>
        <Link href="/cart" className='relative hover:scale-110 transition-transform p-1'>
          <HugeiconsIcon icon={ShoppingCart02Icon} className='text-green-500 w-6 h-6' />
          {cart.length > 0 && (
            <div className='text-white bg-red-500 rounded-full absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center shadow-md'>
              <span className='text-[10px] font-bold'>{cart.length}</span>
            </div>
          )}
        </Link>
      </div>
    </div>
  )
}