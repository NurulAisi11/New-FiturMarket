import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Otorisasi sekarang ditangani oleh layout.tsx
export default async function DashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Selamat datang di Panel Admin FiturMarket.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Ringkasan data dan metrik utama akan ditampilkan di sini.</p>
      </CardContent>
    </Card>
  )
}