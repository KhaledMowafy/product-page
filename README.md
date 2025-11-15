<p align="center">
  <img src="https://img.shields.io/badge/React-19+-61DAFB?logo=react&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Zustand-State--Management-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/TailwindCSS-3+-06B6D4?logo=tailwindcss&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Immer-Immutable--State-52b788?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vite-Fast--Build-646CFF?logo=vite&style=for-the-badge" />
</p>

## 📌 Overview

This project is an implementation of an E-commerce Product Detail Page based on a Figma design.

### It demonstrates:

- Clean Architecture principles
- Reactive state management using Zustand + Immer
- Persistent shopping cart
- Dynamic product variations (color, size, etc.)
- Mobile & desktop responsive layouts
- A full cart drawer with quantity updates
- HTML product description with “See more” functionality
- API integration with EasyOrders using a Repository pattern

## 🧱 Architecture
### 🏛️ Clean Architecture (Frontend)

This project splits the codebase into Domain, Application, Infrastructure, and Presentation layers.

Architecture Diagram

```mermaid
flowchart TD

A[Presentation Layer\nReact Components\nPages, Layout, UI] --> B[Application Layer\nZustand Stores\nSelectors, Business Rules]

B --> C[Infrastructure Layer\nHttpProductRepository\nAPI Client]

C --> D[Domain Layer\nEntities: Product, Variant, CartItem]

D --> C
C --> B
B --> A
```
This ensures UI, state, API logic, and entities are cleanly separated.

## 📂 Folder Structure
```
src/
  domain/
    product.ts
    cart.ts

  application/
    state/
      productStore.ts
      cartStore.ts

    repositories/
      ProductRepository.ts

  infrastructure/
    http/
      apiClient.ts
    HttpProductRepository.ts

  presentation/
    layouts/
      Layout.tsx

    pages/
      ProductDetailPage.tsx

    components/
      product/
        ProductGallery.tsx
        ProductInfo.tsx
        VariationSelector.tsx
        QuantitySelector.tsx
        ProductDescriptionHtml.tsx
      cart/
        CartDrawer.tsx
```

## 🧰 Key Features Implemented

### 1️⃣ Product Detail Page UI
- Image gallery
- Variations
- Price + Sale price
- Quantity selector
- Add to Cart
- Responsive layout (Mobile & Desktop)

### 2️⃣ Layout (Header System)
Responsive navigation:
- Desktop → search, categories, wishlist, cart
- Mobile → search, cart badge, hamburger menu

### 3️⃣ Cart Drawer (Slide-out Panel)

```mermaid
sequenceDiagram
  participant UI as CartDrawer Component
  participant Store as Zustand Cart Store
  participant Local as LocalStorage

  UI->>Store: setQuantity(id, +1)
  Store->>Local: persist updated cart
  Store-->>UI: items[], subtotal, itemsCount

  UI->>Store: removeItem(id)
  Store->>Local: persist updated cart
  Store-->>UI: recomputed totals
```

### 4️⃣ Product Description — "See More"

HTML description is:
- Cleanly truncated using plain text extraction
- Expanded to full HTML via dangerouslySetInnerHTML
- Mobile-safe (no overflow)

### 5️⃣ API Integration (Repository Pattern)
```mermaid
flowchart LR

UI[ProductDetailPage] -->|calls| Store[getProduct slug]
Store --> Repo[HttpProductRepository]
Repo --> API[EasyOrders API]
API --> Repo
Repo --> Store
Store --> UI
```

### 🧠 Zustand Store: Cart Logic
```mermaid
classDiagram
    class CartStore {
      +CartItem[] items
      +addItem(product, variant, qty)
      +removeItem(id)
      +setQuantity(id, qty)
      +clear()
    }

    class CartItem {
      +string id
      +string productName
      +number unitPrice
      +number quantity
      +string imageUrl
      +string variantLabel?
    }

    CartStore --> CartItem
```

### 🧩 Component Hierarchy
```mermaid
graph TD

Page[ProductDetailPage] --> Gallery[ProductGallery]
Page --> Info[ProductInfo]
Info --> Variations[VariationSelector]
Info --> Quantity[QuantitySelector]
Page --> Description[ProductDescriptionHtml]
Layout --> CartDrawer
```



