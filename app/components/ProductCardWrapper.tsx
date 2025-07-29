'use client'

import React, { useEffect } from 'react';

import { supabase } from '@/lib/supabaseClient'
import ProductCard from './ProductCard';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image_url: string;
  rating: number;
  reviews: number;
  description: string;
  originalPrice?: number;
}


const ProductCardWrapper = () => {
      const [products, setProducts] = React.useState<ProductCardProps[]>([])
    
      
     useEffect(() => {

    const fetchProducts = async () => {
      const { data: productsData, error: productsError } = await supabase
            .from('products')
            .select('*')

      if (productsError) {
        console.error('Error fetching products:', productsError)
      } else {
        setProducts(productsData)
      }
    }

    fetchProducts()
  }, [])


  console.log("fetched products:", products);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => {
            if (index >= 6) return null; // Limit to 6 products
            return (
              <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <ProductCard {...product} />
              </div>
            )
        })}
    </div>
  )
}

export default ProductCardWrapper