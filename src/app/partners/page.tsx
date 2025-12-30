
import { Header } from "@/components/header";
import { PartnerCard } from "@/components/partner-card";
import { partners } from "@/lib/partners";

export default function PartnersPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 to-transparent">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
                Our Partners
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                We are proud to collaborate with these amazing organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
