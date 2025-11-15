
export interface CartItem {
  id: string; 
  productId: string;
  productName: string;
  variantId: string | null;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
  imageUrl?: string;
}

export interface CartTotals {
  subtotal: number;
  itemsCount: number;
}
