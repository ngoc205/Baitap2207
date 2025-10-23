const STORAGE_KEY = "orders";

export function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function loadOrders() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}
