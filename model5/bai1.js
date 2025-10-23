const cart = [
  { name: "Laptop", price: 15000000, quantity: 1 },
  { name: "Chuột", price: 300000, quantity: 2 },
  { name: "Bàn phím", price: 800000, quantity: 1 }
];

// Dùng map để lấy ra giá từng sản phẩm (price * quantity)
const total = cart
  .map(item => item.price * item.quantity)
  .reduce((sum, current) => sum + current, 0);

console.log("Tổng giá trị đơn hàng là:", total, "VND");

