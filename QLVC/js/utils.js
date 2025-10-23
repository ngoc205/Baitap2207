// Định dạng ngày (dd/mm/yyyy hh:mm)
export function formatDate(date) {
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, "0")}/${
    (d.getMonth() + 1).toString().padStart(2, "0")
  }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
}

// Kiểm tra dữ liệu rỗng
export function validateInput(...fields) {
  return fields.every(f => f && f.trim() !== "");
}
