"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
const Buttons = ({ productId }) => {
  const router = useRouter();

  const deleteProduct = async () => {
    if (confirm("Are you sure you want delete this product?")) {
      await axios.delete("/api/products/" + productId).then((res) => {
        if (res.status === 204) {
          router.push("/products");
          router.refresh();
        }
      });
    }
  };

  return (
    <div className="flex gap-x-2 justify-center mt-2">
      <button
        onClick={deleteProduct}
        className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded text-white"
      >
        Delete
      </button>
      <Link href={`edit/${productId}`} className="bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded text-white">
        Edit
      </Link>
    </div>
  );
};

export default Buttons;
