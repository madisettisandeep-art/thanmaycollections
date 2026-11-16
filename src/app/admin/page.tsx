import React from 'react';
import { cookies } from 'next/headers';
import AdminLoginPage from './login/page';
import { AdminDashboardClient } from './AdminDashboardClient';
import {
  getAllProductsAdmin,
  getAllCategoriesAdmin,
  getOrdersAdmin,
  getInventoryLogs,
  getAuditLogs,
  getContactEnquiries,
  getHeroBanners,
  getCinemaScrollItems,
} from '@/lib/data/store-repository';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Thanmay Collections',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('thanmay_admin_token')?.value;

  if (!token) {
    return <AdminLoginPage />;
  }

  const [products, categories, orders, inventoryLogs, auditLogs, enquiries, heroBanners, cinemaItems] = await Promise.all([
    getAllProductsAdmin(),
    getAllCategoriesAdmin(),
    getOrdersAdmin(),
    getInventoryLogs(),
    getAuditLogs(),
    getContactEnquiries(),
    getHeroBanners(false),
    getCinemaScrollItems(false),
  ]);

  return (
    <AdminDashboardClient
      initialProducts={products}
      initialCategories={categories}
      initialOrders={orders}
      initialInventoryLogs={inventoryLogs}
      initialAuditLogs={auditLogs}
      initialEnquiries={enquiries}
      initialHeroBanners={heroBanners}
      initialCinemaItems={cinemaItems}
    />
  );
}
