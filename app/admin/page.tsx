'use client';

import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

// Mock Analytics Data
const SALES_GROWTH = [
  { month: 'Jan', revenue: 4200, subscriptions: 80 },
  { month: 'Feb', revenue: 5100, subscriptions: 95 },
  { month: 'Mar', revenue: 6400, subscriptions: 110 },
  { month: 'Apr', revenue: 7800, subscriptions: 140 },
  { month: 'May', revenue: 9500, subscriptions: 185 }
];

const ORIGIN_DEMAND = [
  { origin: 'Ethiopia', sales: 420 },
  { origin: 'Colombia', sales: 380 },
  { origin: 'Brazil', sales: 310 },
  { origin: 'Sumatra', sales: 220 },
  { origin: 'Guatemala', sales: 180 }
];

// Initial coffee inventory list
const INITIAL_COFFEES = [
  { id: '1', name: 'Ethiopia Yirgacheffe', price: '$4.50', stock: 45, origin: 'Ethiopia' },
  { id: '2', name: 'Colombia Huila', price: '$3.50', stock: 60, origin: 'Colombia' },
  { id: '3', name: 'Brazil Santos', price: '$4.00', stock: 50, origin: 'Brazil' },
  { id: '4', name: 'Sumatra Mandheling', price: '$4.25', stock: 32, origin: 'Sumatra' }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'coffees' | 'orders'>('overview');
  const [coffees, setCoffees] = useState(INITIAL_COFFEES);
  
  // Form state for adding new coffee
  const [newCoffee, setNewCoffee] = useState({ name: '', price: '', stock: 10, origin: '' });

  // Mock Active Orders
  const [orders, setOrders] = useState([
    { id: 'AC-1024', email: 'guest@domain.com', total: '$14.25', status: 'received' },
    { id: 'AC-1025', email: 'vip@domain.com', total: '$38.00', status: 'preparing' },
    { id: 'AC-1026', email: 'john@domain.com', total: '$4.50', status: 'brewing' }
  ]);

  const handleAddCoffee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoffee.name || !newCoffee.price) return;
    setCoffees([
      ...coffees,
      {
        id: String(coffees.length + 1),
        name: newCoffee.name,
        price: `$${parseFloat(newCoffee.price).toFixed(2)}`,
        stock: Number(newCoffee.stock),
        origin: newCoffee.origin || 'Unknown'
      }
    ]);
    setNewCoffee({ name: '', price: '', stock: 10, origin: '' });
  };

  const handleStatusChange = (orderId: string, nextStatus: 'received' | 'preparing' | 'brewing' | 'ready') => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  return (
    <div className="min-h-screen bg-[#110B08] text-[#FAFAF9] font-['Inter'] relative flex flex-col justify-between py-12 px-6">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-950/15 blur-[130px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 z-10">
        <Link href="/" className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-[#D4A574]">
          Artisan Admin
        </Link>
        <Link href="/" className="text-amber-100/60 hover:text-amber-100 text-sm transition-colors">
          Back to Lounge
        </Link>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-6xl mx-auto w-full flex-grow grid grid-cols-1 lg:grid-cols-4 gap-8 items-start z-10">
        
        {/* Sidebar Nav Toggles */}
        <div className="lg:col-span-1 bg-[#1C120C]/65 border border-amber-900/30 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-4 px-3">
            Management Panel
          </h3>
          {[
            { id: 'overview', label: '📊 Business Overview' },
            { id: 'coffees', label: '☕ Coffee Inventory' },
            { id: 'orders', label: '📦 Live Orders' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'coffees' | 'orders')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#2E1F15] text-[#D4A574] border-l-2 border-[#D4A574]'
                  : 'text-amber-100/50 hover:bg-[#20150F]/40 hover:text-amber-100/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Panels */}
        <div className="lg:col-span-3 bg-[#1C120C]/65 border border-amber-900/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl min-h-[500px]">
          
          {/* OVERVIEW PANEL */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold text-amber-50">
                Business Analytics
              </h2>

              {/* Statistics Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#20150F]/40 p-5 border border-amber-900/15 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-100/40">Total Revenue</span>
                  <span className="block text-2xl font-bold text-amber-100 mt-1">$9,500</span>
                  <span className="text-[9px] text-emerald-400 font-semibold mt-1 block">▲ 22.4% this month</span>
                </div>
                <div className="bg-[#20150F]/40 p-5 border border-amber-900/15 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-100/40">Subscriptions</span>
                  <span className="block text-2xl font-bold text-amber-100 mt-1">185 Active</span>
                  <span className="text-[9px] text-emerald-400 font-semibold mt-1 block">▲ 32.1% this month</span>
                </div>
                <div className="bg-[#20150F]/40 p-5 border border-amber-900/15 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-100/40">Client Rating</span>
                  <span className="block text-2xl font-bold text-amber-100 mt-1">4.82 / 5.0</span>
                  <span className="text-[9px] text-amber-500 font-semibold mt-1 block">Based on 142 reviews</span>
                </div>
              </div>

              {/* Recharts Graphs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Subscription Growth Chart */}
                <div className="bg-[#150d09]/40 border border-amber-900/15 rounded-2xl p-4">
                  <h4 className="text-xs font-semibold text-amber-200/80 mb-4">Recurring Subscription Growth</h4>
                  <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={SALES_GROWTH}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4A574" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#D4A574" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2c1a11" />
                        <XAxis dataKey="month" stroke="#a18276" fontSize={10} />
                        <YAxis stroke="#a18276" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#1C120C', borderColor: '#78350F', borderRadius: '12px', fontSize: '11px' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#D4A574" fillOpacity={1} fill="url(#colorRev)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Origin Demand Bar Chart */}
                <div className="bg-[#150d09]/40 border border-amber-900/15 rounded-2xl p-4">
                  <h4 className="text-xs font-semibold text-amber-200/80 mb-4">Origin bean Demand (Units Sold)</h4>
                  <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ORIGIN_DEMAND}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2c1a11" />
                        <XAxis dataKey="origin" stroke="#a18276" fontSize={10} />
                        <YAxis stroke="#a18276" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#1C120C', borderColor: '#78350F', borderRadius: '12px', fontSize: '11px' }} />
                        <Bar dataKey="sales" fill="#D4A574" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* INVENTORY PANEL */}
          {activeTab === 'coffees' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-['Playfair_Display'] font-bold text-amber-50">
                  Coffee Catalog Management
                </h2>
              </div>

              {/* Add new Coffee Form */}
              <form onSubmit={handleAddCoffee} className="bg-[#20150F]/20 border border-amber-900/15 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-amber-100/50 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={newCoffee.name}
                    onChange={(e) => setNewCoffee({ ...newCoffee, name: e.target.value })}
                    placeholder="e.g. Geisha Lot 12"
                    className="w-full bg-[#150D09]/50 border border-amber-900/30 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-amber-100/50 mb-1">Origin</label>
                  <input
                    type="text"
                    required
                    value={newCoffee.origin}
                    onChange={(e) => setNewCoffee({ ...newCoffee, origin: e.target.value })}
                    placeholder="e.g. Panama"
                    className="w-full bg-[#150D09]/50 border border-amber-900/30 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-amber-100/50 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newCoffee.price}
                    onChange={(e) => setNewCoffee({ ...newCoffee, price: e.target.value })}
                    placeholder="5.50"
                    className="w-full bg-[#150D09]/50 border border-amber-900/30 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#D4A574] text-[#110B08] text-xs font-bold py-2.5 rounded-xl uppercase tracking-wider hover:bg-amber-400 transition-colors"
                >
                  Add Coffee
                </button>
              </form>

              {/* Table of coffees */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-amber-900/20 text-amber-200/60">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Origin</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4 text-center">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coffees.map((coffee) => (
                      <tr key={coffee.id} className="border-b border-amber-900/10 hover:bg-[#20150F]/20 transition-colors">
                        <td className="py-3 px-4 font-semibold text-amber-100">{coffee.name}</td>
                        <td className="py-3 px-4 text-amber-100/60">{coffee.origin}</td>
                        <td className="py-3 px-4 text-amber-200">{coffee.price}</td>
                        <td className="py-3 px-4 text-center text-amber-100/70">{coffee.stock} bags</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ORDERS MANAGEMENT PANEL */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold text-amber-50">
                Live Orders Queue
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-b-amber-900/20 text-amber-200/60">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Client Email</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Current Status</th>
                      <th className="py-3 px-4 text-right">Process Step</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-amber-900/10 hover:bg-[#20150F]/20 transition-colors">
                        <td className="py-3 px-4 font-mono font-semibold text-amber-100">
                          <Link href={`/orders/${order.id}`} className="hover:underline text-amber-500">
                            {order.id}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-amber-100/60">{order.email}</td>
                        <td className="py-3 px-4 text-amber-200">{order.total}</td>
                        <td className="py-3 px-4 font-semibold capitalize text-amber-300">{order.status}</td>
                        <td className="py-3 px-4 text-right space-x-1">
                          {(['received', 'preparing', 'brewing', 'ready'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleStatusChange(order.id, st)}
                              className={`px-2 py-1 rounded text-[9px] font-bold capitalize transition-colors ${
                                order.status === st
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-[#20150F]/40 text-amber-100/35 hover:text-amber-100/70 hover:bg-[#20150F]/80'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-amber-100/40 mt-8 z-10">
        © {new Date().getFullYear()} Artisan Admin Intelligence. All rights reserved.
      </footer>
    </div>
  );
}
