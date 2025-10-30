'use client'
import LoadingComp from "@/component/LoadingComp";
import ProductShowCase from "@/component/ProductShowCase";
import TopBarComp from "@/component/TopBarComp";
import { Suspense } from "react";


export default function Home() {

  return (
    <div className="flex flex-col min-h-screen  font-sans bg-zinc-50">
      <TopBarComp />
      <ProductShowCase />
    </div>
  );
}
