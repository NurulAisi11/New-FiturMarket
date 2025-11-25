
import { StaticImageData } from "next/image";
import partnerLogo1 from "@/public/placeholder-logo.svg";
import partnerLogo2 from "@/public/placeholder-logo.svg";
import partnerLogo3 from "@/public/placeholder-logo.svg";
import partnerLogo4 from "@/public/placeholder-logo.svg";

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
    logo: partnerLogo1,
    profile: "A leading company in the tech industry, providing innovative solutions for a better future.",
  },
  {
    id: "2",
    name: "Creative Minds Co.",
    logo: partnerLogo2,
    profile: "A design agency that helps brands to create unique and compelling visual identities.",
  },
  {
    id: "3",
    name: "Green Solutions Ltd.",
    logo: partnerLogo3,
    profile: "An environmental organization dedicated to promoting sustainable practices.",
  },
  {
    id: "4",
    name: "Local Artisans Collective",
    logo: partnerLogo4,
    profile: "A community of local artisans who create beautiful and handcrafted products.",
  },
];
