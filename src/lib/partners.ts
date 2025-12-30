
import { StaticImageData } from "next/image";
const placeholderLogo = "/placeholder-logo.svg";

export interface Partner {
  id: string;
  name: string;
  logo: StaticImageData | string;
  profile: string;
}

export const partners: Partner[] = [
  {
    id: "1",
    name: "Tech Innovators Inc.",
    logo: placeholderLogo,
    profile: "Perusahaan terkemuka di industri teknologi, menyediakan solusi inovatif untuk masa depan yang lebih baik.",
  },
  {
    id: "2",
    name: "Creative Minds Co.",
    logo: placeholderLogo,
    profile: "Agensi desain yang membantu merek menciptakan identitas visual yang unik dan menarik.",
  },
  {
    id: "3",
    name: "Green Solutions Ltd.",
    logo: placeholderLogo,
    profile: "Organisasi lingkungan yang berdedikasi untuk mempromosikan praktik berkelanjutan.",
  },
  {
    id: "4",
    name: "Local Artisans Collective",
    logo: placeholderLogo,
    profile: "Komunitas pengrajin lokal yang menciptakan produk indah buatan tangan.",
  },
];
