import { create } from 'zustand';
import { Product } from '@/types/products.types';
import { json } from 'zod';


// defining type by just extending product with quantity
export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];

  setCartItems: (cartItems: CartItem[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateCart: (id: number, quantity: number) => void;
  clearCart: () => void;
  loadCartFromStorage: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
   loadCartFromStorage: () => {
    const cartItems = localStorage.getItem("cart");
    console.log(cartItems);

    if(cartItems) {
      try {
        const paredData = JSON.parse(cartItems);
        console.log(paredData);
        set({
          items: paredData
        })
      } catch (error: any) {
        console.log(error?.message || "Something went wrong")
      }
    }
  },

//   set cart item from localstorage
  setCartItems: (cartItems) => {
    set({items: cartItems});
    localStorage.setItem("cart", JSON.stringify(cartItems));
  },
//add to cart if already exist just increase quantity othersize put whole item
  addToCart: (product) => {
    const items = get().items;
    console.log(items);
    const existingItem = items.find((item) => item.id === product.id);

    const updatedItem = existingItem
                      ? items.map((item) =>
                      item.id === product.id
                      ? {...item, quantity: item.quantity + 1}
                      : item)
                      : [...items, {
                        ...product, quantity: 1
                      }];
    console.log(updatedItem)
    set({items: updatedItem});
    localStorage.setItem("cart", JSON.stringify(updatedItem));
  },
// if id match remove item from cart
  removeFromCart: (id) => {

    const updatedItem = get().items.filter((item) => item.id !==id)
    set({
      items: updatedItem
    });
    localStorage.setItem("cart", JSON.stringify(updatedItem))
  },

//   update the cart with id matcing

updateCart: (id, quantity) => {
    // if quantity is 0 remove the item from cart
    if (quantity <= 0) {
      get().removeFromCart(id);
      return;
    }

    // otherwise just update quantity
    const updatedItem = get().items.map((item) => 
    item.id ===id ? {...item, quantity} : item)
     set({
      items: updatedItem
     });

     localStorage.setItem("cart", JSON.stringify(updatedItem));
  },

  clearCart: () => {set({ items: [] })
  localStorage.setItem("cart", JSON.stringify([]))
},
 
}));
