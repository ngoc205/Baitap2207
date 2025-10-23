import { formatDate, validateInput } from "./utils.js";
import { saveOrders, loadOrders } from "./storage.js";

class Order {
  constructor(id, customerName, address, status = "Đang giao") {
    this.id = id;
    this.customerName = customerName;
    this.address = address;
    this.status = status;
    this.createdAt = new Date();
  }
}

let orders = loadOrders();
const form = document.getElementById("orderForm");
const table = document.getElementById("orderTable");
const searchBox = document.getElementById("searchBox");

// ================== HIỂN THỊ ==================
function renderOrders(list = orders) {
  table.innerHTML = "";
  if (list.length === 0) {
    table.innerHTML = `<tr><td colspan="6">Không có đơn hàng</td></tr>`;
    return;
  }

  list.forEach((order, index) => {
    const row = `
      <tr>
        <td>${order.id}</td>
        <td>${order.customerName}</td>
        <td>${order.address}</td>
        <td>${order.status}</td>
        <td>${formatDate(order.createdAt)}</td>
        <td>
          <button class="action-btn edit-btn" data-index="${index}">Sửa</button>
          <button class="action-btn delete-btn" data-index="${index}">Xóa</button>
        </td>
      </tr>`;
    table.innerHTML += row;
  });
  saveOrders(orders);
}

// ================== THÊM ==================
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("orderId").value;
  const customerName = document.getElementById("customerName").value;
  const address = document.getElementById("address").value;
  const status = document.getElementById("status").value;

  if (!validateInput(id, customerName, address)) {
    alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  orders.push(new Order(id, customerName, address, status));
  renderOrders();
  form.reset();
});

// ================== HÀNH ĐỘNG (SỬA / XÓA) ==================
table.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Bạn có chắc muốn xóa đơn này?")) {
      orders.splice(index, 1);
      renderOrders();
    }
  }

  if (e.target.classList.contains("edit-btn")) {
    const newStatus = prompt("Nhập trạng thái mới (Đang giao/Hoàn thành/Đã hủy):", orders[index].status);
    if (newStatus) {
      orders[index].status = newStatus;
      renderOrders();
    }
  }
});

// ================== TÌM KIẾM ==================
searchBox.addEventListener("input", () => {
  const keyword = searchBox.value.toLowerCase();
  const filtered = orders.filter(o =>
    o.id.toLowerCase().includes(keyword) ||
    o.customerName.toLowerCase().includes(keyword)
  );
  renderOrders(filtered);
});

// ================== MODAL THỐNG KÊ ==================
const modal = document.getElementById("statsModal");
const openBtn = document.getElementById("openStats");
const closeBtn = document.querySelector(".close");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  renderStats();
});
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

function renderStats() {
  const stats = { "Đang giao": 0, "Hoàn thành": 0, "Đã hủy": 0 };
  orders.forEach(o => stats[o.status]++);
  const ctx = document.getElementById("statsChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(stats),
      datasets: [{
        data: Object.values(stats),
        backgroundColor: ["#4A90E2", "#27AE60", "#E74C3C"],
      }]
    },
    options: { responsive: true }
  });
}

// ================== KHỞI TẠO ==================
renderOrders();
