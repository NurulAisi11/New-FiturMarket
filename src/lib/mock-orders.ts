export interface OrderStatus {
  status: "Pesanan Dibuat" | "Diproses oleh Penjual" | "Dalam Pengiriman" | "Tiba di Tujuan"
  date: string
  location: string
}

export interface MockOrder {
  id: string
  customerName: string
  total: number
  statusHistory: OrderStatus[]
}

export const mockOrders: MockOrder[] = [
  {
    id: "FTM-12345",
    customerName: "Budi Santoso",
    total: 5250000,
    statusHistory: [
      { status: "Pesanan Dibuat", date: "2024-05-20T10:00:00Z", location: "Jakarta" },
      { status: "Diproses oleh Penjual", date: "2024-05-20T14:30:00Z", location: "Gudang Jakarta" },
      { status: "Dalam Pengiriman", date: "2024-05-21T09:00:00Z", location: "Pusat Sortir, Jakarta" },
    ],
  },
  {
    id: "FTM-67890",
    customerName: "Citra Lestari",
    total: 2995000,
    statusHistory: [
      { status: "Pesanan Dibuat", date: "2024-05-19T18:00:00Z", location: "Surabaya" },
      { status: "Diproses oleh Penjual", date: "2024-05-20T11:00:00Z", location: "Gudang Surabaya" },
      { status: "Dalam Pengiriman", date: "2024-05-20T17:00:00Z", location: "Pusat Sortir, Surabaya" },
      { status: "Tiba di Tujuan", date: "2024-05-22T13:00:00Z", location: "Kantor Agen, Surabaya" },
    ],
  },
]

/**
 * Finds an order by its ID. Simulates a network request.
 * @param id The ID of the order to find.
 * @returns A Promise that resolves to the MockOrder or null if not found.
 */
export function findOrderById(id: string): Promise<MockOrder | null> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const order = mockOrders.find((o) => o.id.toLowerCase() === id.toLowerCase())
      resolve(order || null)
    }, 1000)
  })
}