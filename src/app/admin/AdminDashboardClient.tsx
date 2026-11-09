'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Layers,
  History,
  Mail,
  Shield,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  AlertTriangle,
  LogOut,
  RefreshCw,
  Search,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { Product, Category, Order, InventoryLog, AuditLog, ContactEnquiry, OrderStatus } from '@/types';
import { formatPrice } from '@/lib/utils/formatters';

interface AdminDashboardClientProps {
  initialProducts: Product[];
  initialCategories: Category[];
  initialOrders: Order[];
  initialInventoryLogs: InventoryLog[];
  initialAuditLogs: AuditLog[];
  initialEnquiries: ContactEnquiry[];
}

export function AdminDashboardClient({
  initialProducts,
  initialCategories,
  initialOrders,
  initialInventoryLogs,
  initialAuditLogs,
  initialEnquiries,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'categories' | 'inventory' | 'enquiries' | 'audit'
  >('overview');

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>(initialInventoryLogs);
  const [categories] = useState<Category[]>(initialCategories);
  const [enquiries] = useState<ContactEnquiry[]>(initialEnquiries);
  const [auditLogs] = useState<AuditLog[]>(initialAuditLogs);

  // Search & filter states
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Modals state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [stockModalProduct, setStockModalProduct] = useState<Product | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);
  const [stockReason, setStockReason] = useState<string>('');

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    product_code: '',
    slug: '',
    price: 0,
    discount_price: 0 as number | null,
    category_id: initialCategories[0]?.id || '',
    stock_quantity: 10,
    material: '',
    occasion: '',
    description: '',
    is_featured: false,
    is_new_arrival: true,
    is_bestseller: false,
    image_url: '',
  });

  // Calculate analytics
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.is_active).length;
  const lowStockCount = products.filter((p) => p.stock_quantity <= 5).length;
  const totalOrdersCount = orders.length;
  const awaitingWhatsAppCount = orders.filter((o) => o.order_status === 'Awaiting WhatsApp Confirmation').length;
  const confirmedCount = orders.filter((o) => o.order_status === 'Confirmed').length;
  const deliveredCount = orders.filter((o) => o.order_status === 'Delivered').length;
  const totalRevenue = orders
    .filter((o) => o.order_status !== 'Cancelled')
    .reduce((sum, o) => sum + o.subtotal, 0);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o))
        );
        if (selectedOrderDetails?.id === orderId) {
          setSelectedOrderDetails((prev) => (prev ? { ...prev, order_status: newStatus } : null));
        }
      }
    } catch {
      alert('Error updating order status');
    }
  };

  const handleStockAdjustmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockModalProduct) return;

    try {
      const res = await fetch('/api/admin/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: stockModalProduct.id,
          newQuantity: newStockVal,
          reason: stockReason || 'Manual adjustment',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === stockModalProduct.id ? { ...p, stock_quantity: newStockVal } : p))
        );
        setInventoryLogs((prev) => [
          {
            id: `inv-${Date.now()}`,
            product_id: stockModalProduct.id,
            previous_quantity: stockModalProduct.stock_quantity,
            new_quantity: newStockVal,
            adjustment_reason: stockReason,
            created_at: new Date().toISOString(),
            product: stockModalProduct,
          },
          ...prev,
        ]);
        setStockModalProduct(null);
      }
    } catch {
      alert('Failed to update stock');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingProduct ? { id: editingProduct.id } : {}),
          ...productForm,
          images: productForm.image_url
            ? [
                {
                  id: `img-${Date.now()}`,
                  product_id: editingProduct?.id || 'new',
                  image_path: productForm.image_url,
                  alt_text: productForm.name,
                  display_order: 1,
                },
              ]
            : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (editingProduct) {
          setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? data.product : p)));
        } else {
          setProducts((prev) => [data.product, ...prev]);
        }
        setProductModalOpen(false);
        setEditingProduct(null);
      }
    } catch {
      alert('Failed to save product');
    }
  };

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      product_code: `TC-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      slug: '',
      price: 1999,
      discount_price: null,
      category_id: categories[0]?.id || '',
      stock_quantity: 10,
      material: 'Brass base, 24K Micro Gold Polish',
      occasion: 'Festivals & Weddings',
      description: 'Handcrafted luxury imitation jewellery with flawless finish.',
      is_featured: false,
      is_new_arrival: true,
      is_bestseller: false,
      image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    });
    setProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      product_code: product.product_code,
      slug: product.slug,
      price: product.price,
      discount_price: product.discount_price,
      category_id: product.category_id || '',
      stock_quantity: product.stock_quantity,
      material: product.material || '',
      occasion: product.occasion || '',
      description: product.description,
      is_featured: product.is_featured,
      is_new_arrival: product.is_new_arrival,
      is_bestseller: product.is_bestseller,
      image_url: product.images?.[0]?.image_path || '',
    });
    setProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-soft-cream flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-pure-white border-b border-border-soft px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-subtle">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-20 sm:w-24 filter drop-shadow-[0_2px_6px_rgba(220,193,140,0.3)]">
            <Image src="/images/logo.png" alt="Thanmay Collections" fill className="object-contain object-left" />
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-brand-pink8 text-brand-pink text-[11px] font-bold uppercase tracking-wider">
            Admin Console
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-text-secondary hover:text-brand-pink flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border-soft bg-cream-warm/40"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Admin Subheader Tabs */}
      <div className="bg-cream-warm border-b border-border-soft px-4 sm:px-8 overflow-x-auto scrollbar-none">
        <nav className="flex space-x-1 sm:space-x-3 py-2 min-w-max">
          {[
            { id: 'overview', name: 'Overview', icon: LayoutDashboard },
            { id: 'products', name: `Products (${products.length})`, icon: Package },
            { id: 'orders', name: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'inventory', name: 'Stock & Inventory', icon: History },
            { id: 'categories', name: `Categories (${categories.length})`, icon: Layers },
            { id: 'enquiries', name: `Enquiries (${enquiries.length})`, icon: Mail },
            { id: 'audit', name: 'Security Audit Logs', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-pink text-pure-white shadow-subtle'
                    : 'text-text-secondary hover:text-text-primary hover:bg-pure-white/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* =====================================================================
            TAB 1: OVERVIEW & ANALYTICS
            ===================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 rounded-2xl bg-pure-white border border-border-soft shadow-subtle space-y-1">
                <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">
                  Total Revenue Booked
                </span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-pink">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="text-[11px] text-text-secondary">{orders.length} total customer orders</div>
              </div>

              <div className="p-5 rounded-2xl bg-pure-white border border-border-soft shadow-subtle space-y-1">
                <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">
                  Awaiting WhatsApp
                </span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-600">
                  {awaitingWhatsAppCount}
                </div>
                <div className="text-[11px] text-text-secondary">Requires concierge confirmation</div>
              </div>

              <div className="p-5 rounded-2xl bg-pure-white border border-border-soft shadow-subtle space-y-1">
                <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">
                  Active Products
                </span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
                  {activeProducts} / {totalProducts}
                </div>
                <div className="text-[11px] text-text-secondary">Live in customer catalogue</div>
              </div>

              <div className="p-5 rounded-2xl bg-pure-white border border-border-soft shadow-subtle space-y-1">
                <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">
                  Low Stock Items (&le;5)
                </span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-red-600">
                  {lowStockCount}
                </div>
                <div className="text-[11px] text-text-secondary">Urgent restock advised</div>
              </div>
            </div>

            {/* Recent Orders Overview Table */}
            <div className="p-6 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-text-primary">Recent Orders</h3>
                  <p className="text-xs text-text-secondary">Orders awaiting verification and dispatch</p>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-brand-pink hover:underline"
                >
                  View all &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-cream-warm text-text-secondary uppercase text-[10px] tracking-wider border-b border-border-soft">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-soft">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-cream-warm/40">
                        <td className="p-3 font-mono font-bold text-text-primary">{order.order_number}</td>
                        <td className="p-3 font-medium text-text-primary">{order.customer_name}</td>
                        <td className="p-3 text-text-secondary">{order.customer_phone}</td>
                        <td className="p-3 font-bold text-brand-pink">{formatPrice(order.subtotal)}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              order.order_status === 'Confirmed'
                                ? 'bg-green-100 text-green-800'
                                : order.order_status === 'Awaiting WhatsApp Confirmation'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {order.order_status}
                          </span>
                        </td>
                        <td className="p-3 text-text-secondary">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(order)}
                            className="text-xs font-semibold text-brand-pink hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: PRODUCTS MANAGEMENT
            ===================================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by code or title..."
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-border-soft bg-pure-white"
                />
              </div>

              <button
                onClick={openNewProductModal}
                className="w-full sm:w-auto px-4 py-2.5 bg-brand-pink hover:bg-brand-pink2 text-pure-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-subtle"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Piece</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="p-6 rounded-3xl bg-pure-white border border-border-soft shadow-subtle overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream-warm text-text-secondary uppercase text-[10px] tracking-wider border-b border-border-soft">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Code</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Discount</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Badges</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  {products
                    .filter(
                      (p) =>
                        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.product_code.toLowerCase().includes(productSearch.toLowerCase())
                    )
                    .map((product) => {
                      const image = product.images?.[0]?.image_path || '/images/logo.png';
                      return (
                        <tr key={product.id} className="hover:bg-cream-warm/40">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border-soft flex-shrink-0 bg-cream-warm">
                                <Image src={image} alt={product.name} fill className="object-cover" />
                              </div>
                              <span className="font-semibold text-text-primary line-clamp-1 max-w-xs">
                                {product.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 font-mono font-bold text-text-secondary">{product.product_code}</td>
                          <td className="p-3 text-text-secondary">{product.category?.name || 'Unassigned'}</td>
                          <td className="p-3 font-semibold text-text-primary">{formatPrice(product.price)}</td>
                          <td className="p-3 text-brand-pink font-semibold">
                            {product.discount_price ? formatPrice(product.discount_price) : '-'}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => {
                                setStockModalProduct(product);
                                setNewStockVal(product.stock_quantity);
                                setStockReason('Restock');
                              }}
                              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] hover:underline ${
                                product.stock_quantity <= 5
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : 'bg-green-50 text-green-700'
                              }`}
                            >
                              {product.stock_quantity} in stock
                            </button>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1 flex-wrap">
                              {product.is_featured && (
                                <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[9px] font-bold">
                                  Featured
                                </span>
                              )}
                              {product.is_new_arrival && (
                                <span className="px-1.5 py-0.5 rounded bg-pink-100 text-pink-800 text-[9px] font-bold">
                                  New
                                </span>
                              )}
                              {product.is_bestseller && (
                                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                                  Bestseller
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditProductModal(product)}
                                className="p-1.5 text-text-secondary hover:text-brand-pink rounded-lg hover:bg-cream-warm"
                                title="Edit"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: ORDERS & WHATSAPP MANAGEMENT
            ===================================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by order ID, customer name or phone..."
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-border-soft bg-pure-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-text-secondary">Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-xl border border-border-soft bg-pure-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="Awaiting WhatsApp Confirmation">Awaiting WhatsApp</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-pure-white border border-border-soft shadow-subtle overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream-warm text-text-secondary uppercase text-[10px] tracking-wider border-b border-border-soft">
                  <tr>
                    <th className="p-3">Order Ref</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Pieces</th>
                    <th className="p-3">Subtotal</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  {orders
                    .filter((o) => {
                      const matchesSearch =
                        o.order_number.toLowerCase().includes(orderSearch.toLowerCase()) ||
                        o.customer_name.toLowerCase().includes(orderSearch.toLowerCase()) ||
                        o.customer_phone.includes(orderSearch);
                      const matchesStatus =
                        orderStatusFilter === 'all' || o.order_status === orderStatusFilter;
                      return matchesSearch && matchesStatus;
                    })
                    .map((order) => (
                      <tr key={order.id} className="hover:bg-cream-warm/40">
                        <td className="p-3">
                          <button
                            onClick={() => setSelectedOrderDetails(order)}
                            className="font-mono font-bold text-brand-pink hover:underline text-left block"
                          >
                            {order.order_number}
                          </button>
                          <span className="text-[10px] text-text-secondary">
                            {new Date(order.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-text-primary">{order.customer_name}</div>
                          <div className="text-[11px] text-text-secondary">{order.customer_phone}</div>
                        </td>
                        <td className="p-3 text-text-secondary">
                          {order.city}, {order.state} ({order.pincode})
                        </td>
                        <td className="p-3 font-semibold text-text-primary">
                          {order.items?.reduce((s, i) => s + i.quantity, 0) || 1}
                        </td>
                        <td className="p-3 font-bold text-brand-pink">{formatPrice(order.subtotal)}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              order.order_status === 'Confirmed'
                                ? 'bg-green-100 text-green-800'
                                : order.order_status === 'Awaiting WhatsApp Confirmation'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {order.order_status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <select
                            value={order.order_status}
                            onChange={(e) =>
                              handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                            }
                            className="px-2 py-1 text-[11px] rounded-lg border border-border-soft bg-pure-white text-text-primary focus:outline-none"
                          >
                            <option value="Awaiting WhatsApp Confirmation">Awaiting WhatsApp</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 4: INVENTORY & STOCK LOGS
            ===================================================================== */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-4">
              <h3 className="font-serif text-xl font-bold text-text-primary">
                Immutable Stock Adjustment Logs
              </h3>
              <p className="text-xs text-text-secondary">
                Audited history of all automated checkout deductions and administrative stock updates.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-cream-warm text-text-secondary uppercase text-[10px] tracking-wider border-b border-border-soft">
                    <tr>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Product</th>
                      <th className="p-3">Previous Qty</th>
                      <th className="p-3">New Qty</th>
                      <th className="p-3">Delta</th>
                      <th className="p-3">Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-soft">
                    {inventoryLogs.map((log) => {
                      const delta = log.new_quantity - log.previous_quantity;
                      return (
                        <tr key={log.id} className="hover:bg-cream-warm/40">
                          <td className="p-3 font-mono text-text-secondary">
                            {new Date(log.created_at).toLocaleString()}
                          </td>
                          <td className="p-3 font-semibold text-text-primary">
                            {log.product?.name || log.product_id}
                          </td>
                          <td className="p-3 text-text-secondary">{log.previous_quantity}</td>
                          <td className="p-3 font-bold text-text-primary">{log.new_quantity}</td>
                          <td className={`p-3 font-bold ${delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {delta > 0 ? `+${delta}` : delta}
                          </td>
                          <td className="p-3 text-text-secondary">{log.adjustment_reason}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 5: CATEGORIES MANAGEMENT
            ===================================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((c) => {
                const count = products.filter((p) => p.category_id === c.id).length;
                return (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-pure-white border border-border-soft shadow-subtle space-y-3"
                  >
                    <div className="relative h-28 rounded-xl overflow-hidden bg-cream-warm">
                      {c.image_url && (
                        <Image src={c.image_url} alt={c.name} fill className="object-cover" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-text-primary">{c.name}</h4>
                      <div className="text-xs text-text-secondary font-mono">{c.slug}</div>
                      <div className="text-xs text-brand-pink font-semibold mt-1">
                        {count} active designs
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 6: CUSTOMER ENQUIRIES
            ===================================================================== */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-4">
              <h3 className="font-serif text-xl font-bold text-text-primary">
                Customer Messages & Customisation Requests
              </h3>
              <div className="divide-y divide-border-soft">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="py-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-text-primary">{enq.customer_name}</span>
                      <span className="text-text-secondary">
                        {new Date(enq.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-brand-pink font-mono">{enq.contact_number}</div>
                    <p className="text-xs sm:text-sm text-text-secondary">{enq.message}</p>
                    <div className="pt-2">
                      <a
                        href={`https://wa.me/${enq.contact_number.replace(/[^\d]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1 rounded-lg border border-green-200"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reply on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 7: AUDIT LOGS
            ===================================================================== */}
        {activeTab === 'audit' && (
          <div className="p-6 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-4">
            <h3 className="font-serif text-xl font-bold text-text-primary">Administrative Audit Trail</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream-warm text-text-secondary uppercase text-[10px] tracking-wider border-b border-border-soft">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Entity</th>
                    <th className="p-3">Target ID</th>
                    <th className="p-3">Metadata</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-cream-warm/40">
                      <td className="p-3 font-mono text-text-secondary">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="p-3 font-bold text-brand-pink">{log.action}</td>
                      <td className="p-3 text-text-secondary">{log.entity_type}</td>
                      <td className="p-3 font-mono text-text-primary">{log.entity_id || '-'}</td>
                      <td className="p-3 text-text-secondary font-mono text-[11px]">
                        {JSON.stringify(log.metadata || {})}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Stock Adjustment Modal */}
      {stockModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/50 backdrop-blur-sm">
          <div className="bg-pure-white rounded-2xl p-6 max-w-sm w-full space-y-4 border border-border-soft shadow-xl">
            <h3 className="font-serif text-lg font-bold text-text-primary">
              Adjust Stock: {stockModalProduct.name}
            </h3>
            <form onSubmit={handleStockAdjustmentSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  New Stock Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={newStockVal}
                  onChange={(e) => setNewStockVal(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-border-soft rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Reason for Adjustment
                </label>
                <input
                  type="text"
                  required
                  value={stockReason}
                  onChange={(e) => setStockReason(e.target.value)}
                  placeholder="e.g. Received new shipment from artisan"
                  className="w-full px-3 py-2 border border-border-soft rounded-xl text-sm"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStockModalProduct(null)}
                  className="flex-1 py-2 text-xs border border-border-soft rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs bg-brand-pink text-pure-white rounded-xl font-semibold"
                >
                  Save Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/60 backdrop-blur-sm">
          <div className="bg-pure-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 border border-border-soft shadow-2xl">
            <div className="flex items-center justify-between border-b border-border-soft pb-4">
              <div>
                <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
                  Order Details
                </span>
                <h3 className="font-serif text-2xl font-bold text-text-primary">
                  {selectedOrderDetails.order_number}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 rounded-full text-text-secondary hover:text-text-primary"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-cream-warm/50 rounded-xl space-y-1">
                <span className="text-text-secondary block font-medium">Customer Information</span>
                <div className="font-bold text-text-primary text-sm">{selectedOrderDetails.customer_name}</div>
                <div>{selectedOrderDetails.customer_phone}</div>
              </div>
              <div className="p-3 bg-cream-warm/50 rounded-xl space-y-1">
                <span className="text-text-secondary block font-medium">Delivery Address</span>
                <div className="font-semibold text-text-primary">{selectedOrderDetails.delivery_address}</div>
                <div>
                  {selectedOrderDetails.city}, {selectedOrderDetails.state} - {selectedOrderDetails.pincode}
                </div>
              </div>
            </div>

            {/* Line items snapshot */}
            <div>
              <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                Purchased Snapshot Items
              </h4>
              <div className="divide-y divide-border-soft border border-border-soft rounded-xl overflow-hidden text-xs">
                {selectedOrderDetails.items?.map((item) => (
                  <div key={item.id} className="p-3 flex justify-between items-center bg-pure-white">
                    <div>
                      <div className="font-bold text-text-primary">{item.product_name_snapshot}</div>
                      <div className="text-[11px] font-mono text-text-secondary">
                        Code: {item.product_code_snapshot} | Qty: {item.quantity} x {formatPrice(item.unit_price_snapshot)}
                      </div>
                    </div>
                    <div className="font-bold text-brand-pink">{formatPrice(item.line_total)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-sm font-bold border-t border-border-soft pt-3">
              <span>Total Order Value:</span>
              <span className="text-brand-pink text-lg">{formatPrice(selectedOrderDetails.subtotal)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/60 backdrop-blur-sm">
          <div className="bg-pure-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[92vh] overflow-y-auto space-y-4 border border-border-soft shadow-2xl">
            <h3 className="font-serif text-2xl font-bold text-text-primary">
              {editingProduct ? 'Edit Jewellery Piece' : 'Add New Piece to Catalogue'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full p-2.5 border border-border-soft rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Product Code / SKU</label>
                  <input
                    type="text"
                    required
                    value={productForm.product_code}
                    onChange={(e) => setProductForm({ ...productForm, product_code: e.target.value })}
                    className="w-full p-2.5 border border-border-soft rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="w-full p-2.5 border border-border-soft rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 border border-border-soft rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.discount_price ?? ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        discount_price: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                    className="w-full p-2.5 border border-border-soft rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock Qty</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock_quantity}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stock_quantity: parseInt(e.target.value) || 0 })
                    }
                    className="w-full p-2.5 border border-border-soft rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 border border-border-soft rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Material Details</label>
                <input
                  type="text"
                  value={productForm.material}
                  onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                  className="w-full p-2.5 border border-border-soft rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full p-2.5 border border-border-soft rounded-xl"
                />
              </div>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.is_featured}
                    onChange={(e) => setProductForm({ ...productForm, is_featured: e.target.checked })}
                  />
                  <span>Featured</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.is_new_arrival}
                    onChange={(e) => setProductForm({ ...productForm, is_new_arrival: e.target.checked })}
                  />
                  <span>New Arrival</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.is_bestseller}
                    onChange={(e) => setProductForm({ ...productForm, is_bestseller: e.target.checked })}
                  />
                  <span>Bestseller</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border-soft">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="flex-1 py-2.5 border border-border-soft rounded-xl text-text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-brand-pink text-pure-white rounded-xl font-semibold"
                >
                  Save Piece
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
