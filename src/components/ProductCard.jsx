import Link from 'next/link'
import React from 'react'

const ProductCard = ({product}) => {
  console.log(product.image)
  return (
    <Link className="bg-white text-black rounded-lg border border-gray-800 mb-3hover:cursor-pointer" href={`/products/${product.id}`}>
          {product.image &&(
            <img className='w-full h-[200px] rounded-t-lg object-cover' src={product.image} alt="" />
          )}
          <div className='p-4'>
          <h1 className="text-lg font-bold ">{product.name}</h1>
          <h2 className="text-2xl  text-slate-600">{product.price}</h2>
          <p>{product.description}</p>
          </div>
        </Link>
  )
}

export default ProductCard