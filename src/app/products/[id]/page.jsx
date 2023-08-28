import axios from "axios";
import React from "react";
import Buttons from "./Buttons";

const loadProduct = async (productId) => {
  const { data } = await axios.get(
    "http://localhost:3000/api/products/" + productId
  );
  return data;
};

const ProductPage = async ({ params }) => {
  const product = await loadProduct(params.id);
  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex w-4/6 h-3/6 justify-center">
      <div className="w-1/3 h-full flex justify-center items-center flex-col gap-2 p-6 bg-white text-black">
        <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
        <h4 className="text-4xl font-bold">${product.price}</h4>
        <p className="text-slate-700">{product.description}</p>
        <Buttons productId={product.id}/>
      </div>
      <img className="w-1/3" src={product.image} alt="" />
      </div>
    </section>
  );
};

export default ProductPage;
