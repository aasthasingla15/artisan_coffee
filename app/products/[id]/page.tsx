import ProductDetail from '@/components/ProductDetail';
import { notFound } from 'next/navigation';

async function fetchProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) return null;
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductPage(props: any) {
  const params = props.params as { id: string } | undefined;
  const product = await fetchProduct(params?.id ?? '');

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
