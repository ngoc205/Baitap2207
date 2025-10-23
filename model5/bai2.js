const users = [
  { name: "An", age: 25 },
  { name: "Bình", age: 17 },
  { name: "Chi", age: 30 },
  { name: "Dũng", age: 20 }
];

// Lọc người dùng >= 18 tuổi
const adults = users.filter(user => user.age >= 18);

// Sắp xếp theo tuổi tăng dần
const sortedUsers = adults.sort((a, b) => a.age - b.age);

// In ra danh sách tên theo thứ tự đã sắp xếp
const names = sortedUsers.map(user => user.name);

console.log("Người dùng đủ 18 tuổi trở lên (sắp xếp theo tuổi):", names);
