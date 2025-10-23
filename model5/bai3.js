const numbers = [3, 5, 7];

// Dùng spread để tạo mảng mới
const moreNumbers = [1, 2, ...numbers, 8, 9];

// Dùng destructuring để lấy phần tử đầu tiên, thứ hai và phần còn lại
const [first, second, ...others] = moreNumbers;

console.log("Phần tử đầu tiên:", first);
console.log("Phần tử thứ hai:", second);
console.log("Các phần tử còn lại:", others);

// Dùng rest parameter để tính tổng các số
function sum(...args) {
  return args.reduce((total, current) => total + current, 0);
}

// Gọi hàm với spread operator
const totalSum = sum(...moreNumbers);
console.log("Tổng tất cả các số:", totalSum);
