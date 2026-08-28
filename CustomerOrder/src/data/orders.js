export const orders = [
  {
    id: "ORD-1001",
    customer: {
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 201-4567",
    },
    shipping: {
      address: "123 Maple Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    date: "2025-06-01",
    status: "Completed",
    amount: 249.99,
    products: [
      { name: "Wireless Headphones", quantity: 1, price: 149.99 },
      { name: "Phone Case", quantity: 2, price: 24.99 },
      { name: "USB-C Cable", quantity: 2, price: 25.01 },
    ],
  },
  {
    id: "ORD-1002",
    customer: {
      name: "Bob Martinez",
      email: "bob.martinez@email.com",
      phone: "+1 (555) 302-7890",
    },
    shipping: {
      address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
    date: "2025-06-03",
    status: "Pending",
    amount: 89.5,
    products: [
      { name: "Mechanical Keyboard", quantity: 1, price: 89.5 },
    ],
  },
  {
    id: "ORD-1003",
    customer: {
      name: "Carol Smith",
      email: "carol.smith@email.com",
      phone: "+1 (555) 403-2345",
    },
    shipping: {
      address: "789 Pine Road",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "United States",
    },
    date: "2025-06-05",
    status: "Cancelled",
    amount: 175.0,
    products: [
      { name: "Bluetooth Speaker", quantity: 1, price: 99.0 },
      { name: "Speaker Stand", quantity: 2, price: 38.0 },
    ],
  },
  {
    id: "ORD-1004",
    customer: {
      name: "David Lee",
      email: "david.lee@email.com",
      phone: "+1 (555) 504-6789",
    },
    shipping: {
      address: "321 Elm Street",
      city: "Houston",
      state: "TX",
      zip: "77001",
      country: "United States",
    },
    date: "2025-06-07",
    status: "Pending",
    amount: 420.0,
    products: [
      { name: "Monitor 27\"", quantity: 1, price: 350.0 },
      { name: "Monitor Arm", quantity: 1, price: 70.0 },
    ],
  },
  {
    id: "ORD-1005",
    customer: {
      name: "Eva Brown",
      email: "eva.brown@email.com",
      phone: "+1 (555) 605-3456",
    },
    shipping: {
      address: "654 Cedar Lane",
      city: "Phoenix",
      state: "AZ",
      zip: "85001",
      country: "United States",
    },
    date: "2025-06-09",
    status: "Completed",
    amount: 59.99,
    products: [
      { name: "Laptop Stand", quantity: 1, price: 39.99 },
      { name: "Microfiber Cloth (3-pack)", quantity: 1, price: 20.0 },
    ],
  },
  {
    id: "ORD-1006",
    customer: {
      name: "Frank Wilson",
      email: "frank.wilson@email.com",
      phone: "+1 (555) 706-9012",
    },
    shipping: {
      address: "987 Birch Blvd",
      city: "Philadelphia",
      state: "PA",
      zip: "19101",
      country: "United States",
    },
    date: "2025-06-11",
    status: "Pending",
    amount: 310.0,
    products: [
      { name: "Ergonomic Mouse", quantity: 1, price: 60.0 },
      { name: "Wrist Rest Pad", quantity: 1, price: 25.0 },
      { name: "Desk Lamp", quantity: 1, price: 45.0 },
      { name: "Webcam HD", quantity: 1, price: 180.0 },
    ],
  },
  {
    id: "ORD-1007",
    customer: {
      name: "Grace Kim",
      email: "grace.kim@email.com",
      phone: "+1 (555) 807-5678",
    },
    shipping: {
      address: "246 Walnut Way",
      city: "San Antonio",
      state: "TX",
      zip: "78201",
      country: "United States",
    },
    date: "2025-06-13",
    status: "Completed",
    amount: 134.97,
    products: [
      { name: "Smart Plug (3-pack)", quantity: 1, price: 34.99 },
      { name: "Extension Cord", quantity: 2, price: 49.99 },
    ],
  },
  {
    id: "ORD-1008",
    customer: {
      name: "Henry Davis",
      email: "henry.davis@email.com",
      phone: "+1 (555) 908-1234",
    },
    shipping: {
      address: "135 Spruce Court",
      city: "San Diego",
      state: "CA",
      zip: "92101",
      country: "United States",
    },
    date: "2025-06-15",
    status: "Cancelled",
    amount: 220.0,
    products: [
      { name: "Gaming Headset", quantity: 1, price: 120.0 },
      { name: "Controller Charging Dock", quantity: 1, price: 100.0 },
    ],
  },
];

export const getOrderById = (id) => orders.find((o) => o.id === id);

export const getStats = () => ({
  total: orders.length,
  pending: orders.filter((o) => o.status === "Pending").length,
  completed: orders.filter((o) => o.status === "Completed").length,
  cancelled: orders.filter((o) => o.status === "Cancelled").length,
});
