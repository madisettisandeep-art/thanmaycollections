import { formatPrice } from './formatters';
import { CustomerOrderDetails, OrderItem } from '@/types';

export function buildWhatsAppOrderMessage(params: {
  orderNumber: string;
  customer: CustomerOrderDetails;
  items: OrderItem[];
  subtotal: number;
}): string {
  const { orderNumber, customer, items, subtotal } = params;

  const productList = items
    .map(
      (item) =>
        `${item.product_name_snapshot}\n` +
        `Product ID: ${item.product_code_snapshot}\n` +
        `Quantity: ${item.quantity}\n` +
        `Unit Price: ${formatPrice(item.unit_price_snapshot)}\n` +
        `Subtotal: ${formatPrice(item.line_total)}`
    )
    .join('\n\n');

  const fullAddress = `${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}`;

  const message = `Hello Thanmay Collections!

I would like to place an order.

Order ID: ${orderNumber}

Customer Name: ${customer.name}

Products:

${productList}

Total Order Value: ${formatPrice(subtotal)}

Delivery Address:
${fullAddress}

Please confirm product availability and delivery details.

Thank you!`;

  return message;
}

export function generateWhatsAppOrderUrl(params: {
  orderNumber: string;
  customer: CustomerOrderDetails;
  items: OrderItem[];
  subtotal: number;
  businessNumber?: string;
}): string {
  const number = (params.businessNumber || process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER || '919876543210').replace(/[^\d]/g, '');
  const message = buildWhatsAppOrderMessage(params);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedText}`;
}

export function generateProductEnquiryUrl(params: {
  productName: string;
  productCode: string;
  price: number;
  productUrl: string;
  businessNumber?: string;
}): string {
  const number = (params.businessNumber || process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER || '919876543210').replace(/[^\d]/g, '');
  const message = `Hello Thanmay Collections!

I am interested in this jewellery piece:

Product: ${params.productName}
Product Code: ${params.productCode}
Price: ${formatPrice(params.price)}
Link: ${params.productUrl}

Could you please share more details and availability?

Thank you!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
