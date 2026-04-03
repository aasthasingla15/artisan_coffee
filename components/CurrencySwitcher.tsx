'use client';

import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  const currencies = [
    { code: 'USD', symbol: '$', name: 'USD' },
    { code: 'EUR', symbol: '€', name: 'EUR' },
    { code: 'GBP', symbol: '£', name: 'GBP' },
    { code: 'JPY', symbol: '¥', name: 'JPY' },
    { code: 'INR', symbol: '₹', name: 'INR' },
  ];

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="bg-[#2D1810] border border-[#5A4034] rounded px-3 py-1 text-[#F5E6D3] text-sm focus:outline-none focus:border-[#4F9C8F]"
    >
      {currencies.map((curr) => (
        <option key={curr.code} value={curr.code}>
          {curr.symbol} {curr.name}
        </option>
      ))}
    </select>
  );
}