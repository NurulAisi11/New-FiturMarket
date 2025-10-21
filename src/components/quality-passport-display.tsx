import { ShieldCheck, Fingerprint, Factory, Award, MapPin } from "lucide-react"
import type { QualityPassport } from "@/lib/types"

interface QualityPassportDisplayProps {
  passport: QualityPassport
}

export function QualityPassportDisplay({ passport }: QualityPassportDisplayProps) {
  return (
    <div className="mt-8 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight">
          <ShieldCheck className="h-7 w-7 text-primary" />
          Dokumen Keaslian Digital
        </h3>
        <p className="text-sm text-muted-foreground">
          Paspor Kualitas untuk produk premium Anda.
        </p>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Fingerprint className="h-5 w-5 flex-shrink-0 text-muted-foreground mt-1" />
            <div>
              <h4 className="font-semibold">Token Digital Unik</h4>
              <p className="text-sm text-muted-foreground font-mono">{passport.tokenId}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 flex-shrink-0 text-muted-foreground mt-1" />
            <div>
              <h4 className="font-semibold">Asal-usul</h4>
              <p className="text-sm text-muted-foreground">{passport.origin}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Factory className="h-5 w-5 flex-shrink-0 text-muted-foreground mt-1" />
            <div>
              <h4 className="font-semibold">Proses Pembuatan</h4>
              <p className="text-sm text-muted-foreground">{passport.manufacturingProcess}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 flex-shrink-0 text-muted-foreground mt-1" />
            <div>
              <h4 className="font-semibold">Sertifikasi</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {passport.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}