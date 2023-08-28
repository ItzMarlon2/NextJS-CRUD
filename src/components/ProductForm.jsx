"use client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    if (file) {
      formData.append("image", file);
    }
    if (!params.id) {
      axios
        .post("/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          router.push("/products");
          router.refresh();
        });
    } else {
      axios
        .put("/api/products/" + params.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          router.push("/products");
          router.refresh();
        });
    }
    form.current.reset();
  };

  useEffect(() => {
    if (params.id) {
      axios.get("/api/products/" + params.id).then((res) => {
        setProduct({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
        });
      });
    }
  }, []);

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        ref={form}
      >
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Product name:
        </label>
        <input
          value={product.name}
          name="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          type="text"
          placeholder="name"
          onChange={handleChange}
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Product price:
        </label>
        <input
          value={product.price}
          name="price"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          type="text"
          placeholder="00.00"
          onChange={handleChange}
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Product description:
        </label>
        <textarea
          value={product.description}
          name="description"
          rows={3}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          placeholder="description"
          onChange={handleChange}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="productImage"
        >
          Product image:
        </label>
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          className="block text-gray-700 text-sm font-bold mb-2"
        />
        {file && (
          <img
            className=" w-96 my-4 object-contain mx-auto"
            src={URL.createObjectURL(file)}
            alt=""
          />
        )}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">
          {params.id ? "Update product" : "Save product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
