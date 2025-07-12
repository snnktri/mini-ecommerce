'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Products } from '@/types/products.types';

interface Props {
  products: Products | undefined;
  currentPage: number;
}

const AdminPaginate = ({ products, currentPage }: Props) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/admin/products/?page=${page}`);
  };

  return (
    <div className="w-full flex justify-end gap-2 mt-8">
      <Button
        disabled={!products?.previousPage}
        className={`text-white bg-gray-700 hover:bg-gray-800 hover:scale-105 transition-transform ${
          !products?.previousPage ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => {
          if (products?.previousPage) handlePageChange(currentPage - 1);
        }}
      >
        Previous
      </Button>

      <Button
        disabled={!products?.nextPage}
        className={`text-white bg-gray-700 hover:bg-gray-800 hover:scale-105 transition-transform ${
          !products?.nextPage ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => {
          if (products?.nextPage) handlePageChange(currentPage + 1);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default AdminPaginate;
