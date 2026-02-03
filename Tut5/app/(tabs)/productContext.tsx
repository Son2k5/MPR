import { createContext, useContext, useState, ReactNode } from 'react';

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
};

type ProductContextType = {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      price: '$999',
      description: 'Latest iPhone with A17 Pro chip.',
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24',
      price: '$899',
      description: 'Flagship Android phone with AI features.',
    },
  ]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        ...product,
      },
    ]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
}
