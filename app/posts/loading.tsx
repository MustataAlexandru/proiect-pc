'use client'

import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
  return (
    <section className="pt-36 pb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
    <Skeleton></Skeleton>
    <Skeleton></Skeleton>
    <Skeleton></Skeleton>
  </section>
  )
}
