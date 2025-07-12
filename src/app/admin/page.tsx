

import { productApi } from '@/lib/api/product-api';
import React from 'react'
import SummaryCards from '../../components/admin/SummeryCard';
import { fetchProducts } from '@/store/fetchProduct';

interface Props {
  searchParams?: {
    page: number
  }
}

const Admin: React.FC<Props> = async ({searchParams}) => {
  const currentPage = Number(searchParams?.page || 1);
  const { totalProducts } = await fetchProducts(currentPage);
  return (
    <div className='p-4 space-y-8'>
      <div>
        <h1 className='text-center text-3xl text-gray-700 font-medium'>Welcome to admin dashboard</h1>
      </div>
      <SummaryCards totalProducts={totalProducts}/>
    </div>
  )
}

export default Admin
