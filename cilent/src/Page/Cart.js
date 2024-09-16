import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ cartOpen, onClose }) => {
  const { cartItems, total, handleRemoveItem, incrementQuantity, decrementQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/check-out');
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <Dialog
          open={cartOpen}
          onClose={onClose}
          className="relative z-10"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <motion.div
                  className="pointer-events-auto w-screen max-w-md transform bg-white shadow-xl"
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: '0%' }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex h-full flex-col overflow-y-scroll">
                    <div className="flex items-center justify-between px-4 py-6">
                      <DialogTitle className="text-lg font-medium text-gray-900">Giỏ hàng</DialogTitle>
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                        aria-label="Close cart"
                      >
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="px-4 py-6">
                      {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500">Giỏ hàng của bạn đang trống</div>
                      ) : (
                        <div>
                          <ul className="-my-6 divide-y divide-gray-200">
                            {cartItems.map(item => (
                              <li key={item.cart_item_id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={`/images/${item.anh}`}
                                    alt={item.ten_sanpham}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.ten_sanpham}</h3>
                                    <p className="ml-4">{item.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                  </div>
                                  <div className="mt-1 text-sm text-gray-500">Số lượng: {item.quantity}</div>
                                  <div className="flex items-end justify-between text-sm mt-2">
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() => decrementQuantity(item.cart_item_id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        -
                                      </button>
                                      <span>{item.quantity}</span>
                                      <button
                                        onClick={() => incrementQuantity(item.cart_item_id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        +
                                      </button>
                                    </div>
                                    <button
                                      onClick={() => handleRemoveItem(item.cart_item_id)}
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className="border-t border-gray-200 px-4 py-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p>Tổng cộng</p>
                              <p>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div className="mt-6 flex justify-center">
                              <button
                                onClick={handleCheckout}
                                className="rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                              >
                                Thanh toán
                              </button>
                            </div>
                            <div className="mt-6 flex justify-center text-sm text-gray-500">
                              <p>
                                hoặc{' '}
                                <button
                                  type="button"
                                  onClick={onClose}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Tiếp tục mua sắm <span aria-hidden="true">&rarr;</span>
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Cart;
