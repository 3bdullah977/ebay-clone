"use client";

import Product from "./components/product";
import "@/style/app.scss";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
import { getProducts } from "@/lib/product";
import { SearchableProduct } from "@/lib/product";

export default function Home() {
  const [products, setProducts] = useState<SearchableProduct[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let res = getProducts(page, 15);
    res.then((data) => {
      if ("data" in data) setProducts(data.data || []);
    });
  }, [page]);
  return (
    <>
      <div>
        <div className="products pt-4">
          {products.map((product) => (
            <Product product={product} />
          ))}
        </div>
        <div className="pt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem className="bg-primary rounded-lg text-white">
                <PaginationPrevious
                  href="#"
                  onClick={() => (page > 1 ? setPage(page - 1) : page)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={() => setPage(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={() => setPage(2)}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={() => setPage(3)}>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem className="bg-primary rounded-lg text-white">
                <PaginationNext href="#" onClick={() => setPage(page + 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
