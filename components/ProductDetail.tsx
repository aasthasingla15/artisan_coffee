'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useNotification } from '@/context/NotificationContext';
import { CoffeeProduct } from '@/data/products';

interface ProductDetailProps {
  product: CoffeeProduct;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { addNotification } = useNotification();

  return (
    <main className="min-h-screen bg-[#110B08] text-[#FAFAF9] font-['Inter'] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <section className="rounded-3xl bg-[#1C120C]/80 border border-[#5A4034]/30 p-8 shadow-2xl">
          <div className="relative rounded-3xl overflow-hidden mb-8">
            <Image
              src={product.image}
              alt={product.name}
              width={1200}
              height={800}
              className="w-full h-[480px] object-cover"
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#110B08]/90 via-transparent to-transparent" />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#C9B8A0]">
              <span>{product.origin}</span>
              <span>•</span>
              <span>{product.roastLevel} roast</span>
            </div>
            <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#F5E6D3]">{product.name}</h1>
            <p className="text-[#C9B8A0] text-lg leading-relaxed">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="rounded-3xl bg-[#221609]/80 border border-[#5A4034]/30 p-5">
                <span className="text-xs uppercase text-[#A48A74]">Rating</span>
                <p className="text-xl text-[#F5E6D3] font-semibold mt-2">{product.rating.toFixed(1)} / 5</p>
              </div>
              <div className="rounded-3xl bg-[#221609]/80 border border-[#5A4034]/30 p-5">
                <span className="text-xs uppercase text-[#A48A74]">Price</span>
                <p className="text-xl text-[#F5E6D3] font-semibold mt-2">{formatPrice(parseFloat(product.price.replace('$', '')))}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              {product.features.map((feature) => (
                <div key={feature} className="rounded-3xl bg-[#221609]/80 border border-[#5A4034]/30 p-5">
                  <p className="text-sm text-[#A48A74]">Feature</p>
                  <p className="text-base text-[#F5E6D3] font-semibold mt-2">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-[#1C120C]/80 border border-[#5A4034]/30 p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-[#F5E6D3] mb-4">Quick Brew Pack</h2>
            <div className="space-y-3 text-sm text-[#C9B8A0]">
              <p><span className="font-semibold text-[#F5E6D3]">Origin:</span> {product.origin}</p>
              <p><span className="font-semibold text-[#F5E6D3]">Flavor Notes:</span> {product.flavorNotes.join(', ')}</p>
              <p><span className="font-semibold text-[#F5E6D3]">Body:</span> {product.body} / 5</p>
              <p><span className="font-semibold text-[#F5E6D3]">Acidity:</span> {product.acidity} / 5</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                addToCart(product);
                addNotification(`${product.name} added to cart`, 'success');
              }}
              className="mt-8 w-full rounded-3xl bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] py-4 text-lg font-semibold text-white shadow-xl shadow-[#4F9C8F]/20"
            >
              Add to Cart
            </motion.button>
          </div>

          <div className="rounded-3xl bg-[#1C120C]/80 border border-[#5A4034]/30 p-8 text-[#C9B8A0] shadow-2xl">
            <h3 className="text-xl font-semibold text-[#F5E6D3] mb-4">Reviews</h3>
            <div className="space-y-4">
              {product.reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="rounded-3xl bg-[#221609]/70 p-4">
                  <p className="text-sm text-[#F5E6D3] font-semibold">{review.user}</p>
                  <p className="text-xs text-[#A48A74]">{review.date}</p>
                  <p className="mt-2 text-sm text-[#C9B8A0]">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <Link href="/" className="block text-center rounded-3xl border border-[#4F9C8F]/30 bg-[#221609]/80 py-4 text-sm uppercase tracking-[0.25em] text-[#4F9C8F] hover:bg-[#4F9C8F]/10 transition-colors">
            Back to Shop
          </Link>
        </aside>
      </div>
    </main>
  );
}
