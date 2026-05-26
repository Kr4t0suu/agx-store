import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  const [selectedCategory, setSelectedCategory] =
    useState("Todos");

  const categories = [
    "Todos",
    ...new Set(
      products.map(
        (product) =>
          product.categoria || "Outros"
      )
    ),
  ];

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter(
          (product) =>
            product.categoria ===
            selectedCategory
        );

  return (
    <section
      id="products"
      className="bg-black px-3 md:px-5 py-16 md:py-24"
    >
      <div className="max-w-[1400px] mx-auto">

        {/* TITULO */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-10 md:mb-14"
        >

          <h2 className="text-white text-3xl md:text-6xl font-black mb-3 md:mb-4">
            Vitrine Premium
          </h2>

          <p className="text-zinc-400 text-sm md:text-lg">
            Explore os produtos mais
            desejados da AGX STORE
          </p>

        </motion.div>

        {/* CATEGORIAS */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  category
                )
              }
              className={`
                px-4 md:px-6
                py-2 md:py-3
                rounded-full
                text-sm md:text-base
                font-bold
                transition-all
                duration-300
                ${
                  selectedCategory ===
                  category
                    ? "bg-[#d4af37] text-black scale-105"
                    : "bg-zinc-900 text-white border border-zinc-700 hover:border-[#d4af37]"
                }
              `}
            >
              {category}
            </button>

          ))}

        </div>

        {/* PRODUTOS */}
        <motion.div
          layout
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-4
            md:gap-8
          "
        >

          <AnimatePresence>

            {filteredProducts.map(
              (product) => (

                <motion.div
                  key={product.id}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >

                  <ProductCard
                    product={product}
                  />

                </motion.div>

              )
            )}

          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
}

export default ProductList;