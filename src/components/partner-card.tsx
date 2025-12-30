
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Partner } from "@/lib/partners";

interface PartnerCardProps {
  partner: Partner;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Image
          src={partner.logo}
          alt={`${partner.name} logo`}
          width={64}
          height={64}
          className="rounded-full"
        />
        <CardTitle>{partner.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{partner.profile}</p>
      </CardContent>
    </Card>
  );
}
