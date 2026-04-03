'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useNotification } from '@/context/NotificationContext';
import { useCompare } from '@/context/CompareContext';
import { CoffeeProduct } from '@/data/products';

interface ProductCardProps {
  product: CoffeeProduct;
  index: number;
}
export default function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addNotification } = useNotification();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  // Parse price from string to number
  const priceNumber = parseFloat(product.price.replace('$', ''));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
      addNotification(`${product.name} removed from comparison`, 'info');
    } else {
      addToCompare(product);
      addNotification(`${product.name} added to comparison`, 'success');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-[#3D2820]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#5A4034] hover:border-[#4F9C8F] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#4F9C8F]/20 flex flex-col h-[520px]"
    >
      {/* Star Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-[#FFD700]' : 'text-[#5A4034]'}`}>★</span>
          ))}
        </div>
        <span className="text-[#F5E6D3] font-semibold text-sm">({product.reviews.length})</span>
      </div>
      {/* Coffee Image */}
      <div className="w-full h-48 bg-[#2D1810] rounded-xl mb-5 overflow-hidden flex-shrink-0 relative">
        <Image
          src={product.image}
          alt={t(`products.${product.id}.name`)}
          width={400}
          height={300}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        {/* Favorite Heart */}
        <motion.button
          onClick={handleFavoriteClick}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <motion.svg
            className={`w-5 h-5 ${isFavorite(product.id) ? 'text-red-500 fill-red-500' : 'text-white'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={isFavorite(product.id) ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </motion.svg>
        </motion.button>
        {/* Compare Button */}
        <motion.button
          onClick={handleCompareClick}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-16 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <motion.svg
            className={`w-5 h-5 ${isInCompare(product.id) ? 'text-blue-500' : 'text-white'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={isInCompare(product.id) ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </motion.svg>
        </motion.button>
      </div>
      {/* Title & Description */}
      <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-3">
        {t(`products.${product.id}.name`)}
      </h3>
      <p className="text-sm text-[#C9B8A0] mb-4 line-clamp-2 font-['Inter']">
        {t(`products.${product.id}.description`)}
      </p>
      {/* Reviews */}
      {product.reviews.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-[#C9B8A0] italic">
            &ldquo;{product.reviews[0].comment}&rdquo; - {product.reviews[0].user}
          </p>
        </div>
      )}
      {/* Price & Add Button */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-3xl font-bold text-[#F5E6D3] font-['Inter']">
          {formatPrice(priceNumber)}
        </span>
        <motion.button
          onClick={() => {
            addToCart(product);
            addNotification(`${product.name} added to cart!`, 'success');
          }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F9C8F] to-[#3D8B7F] flex items-center justify-center hover:shadow-lg hover:shadow-[#4F9C8F]/40 transition-shadow cursor-pointer"
        >
          <span className="text-white text-2xl font-bold">+</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
