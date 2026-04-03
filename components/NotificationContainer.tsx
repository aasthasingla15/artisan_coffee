'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '@/context/NotificationContext';

const notificationVariants = {
  initial: { opacity: 0, y: -50, scale: 0.3 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }
};

const notificationColors = {
  success: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    text: 'text-green-400',
    icon: 'text-green-400'
  },
  error: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    text: 'text-red-400',
    icon: 'text-red-400'
  },
  warning: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    icon: 'text-yellow-400'
  },
  info: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    icon: 'text-blue-400'
  }
};

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-24 right-6 z-[200] space-y-4">
      <AnimatePresence>
        {notifications.map((notification) => {
          const colors = notificationColors[notification.type];

          return (
            <motion.div
              key={notification.id}
              variants={notificationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`p-4 rounded-xl backdrop-blur-sm border ${colors.bg} ${colors.border} shadow-xl max-w-sm cursor-pointer`}
              onClick={() => removeNotification(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-6 h-6 ${colors.icon}`}>
                  {notification.type === 'success' && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                  {notification.type === 'error' && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  )}
                  {notification.type === 'warning' && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                  )}
                  {notification.type === 'info' && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${colors.text}`}>
                    {notification.message}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(notification.id);
                  }}
                  className={`flex-shrink-0 w-4 h-4 ${colors.text} hover:opacity-70 transition-opacity`}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}