/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'custom-dark': '0 0 10px rgba(0, 0, 0, 0.1)', // Tùy chỉnh màu và độ đậm
        'custom-light': '0 4px 8px rgba(0, 0, 0, 0.3)', // Ví dụ cho bóng đổ nhẹ hơn
    },
    colors: {
      'color-dark': '#D0D3D4',
      
      'color-blueGray': '#7393B3'
    },
    zIndex: {
      '1001': '1001',
    },
  },
  plugins: [],
}
}

