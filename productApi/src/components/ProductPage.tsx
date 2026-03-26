import type { Product } from '../types/product'
import Card from './Card'
import { useCart } from '../context/CartContext'

type Props = {
    products: Product[]
}

const ProductPage = ({ products }: Props) => {
    const { addCart, decreaseQuantity,cart } = useCart()


  function exitsInCart (id:number){
   return  cart.find((prd) => prd.id == id);

  }


  return (
     <div className="max-w-7xl mx-auto px-4 mt-8">
      <div className="grid gap-6 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5">
        
        {products.map((p) => (
          <Card
            key={p.id}
            product={p}
            addCart={addCart}
            decreaseQuantity={decreaseQuantity}
            inCart={exitsInCart(p.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductPage
