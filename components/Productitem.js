import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.name}
          className="rounded shadow"
          width={500}
          height={200}
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <b>
            <h2 className="text-lg">{product.name}</h2>
          </b>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>Rs.{product.price}</p>
        <button
          className={
            ////yellow tailwind button
            'bg-black  hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
          }
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
