"use client"

import { useEffect } from "react"
import { useCartStore } from "./useCart"

const CartInitializer = () => {
  const loadCartFromStorage = useCartStore((state) => state.loadCartFromStorage)

  useEffect(() => {
    loadCartFromStorage();
  }, [])
  return null;
}

export default CartInitializer
