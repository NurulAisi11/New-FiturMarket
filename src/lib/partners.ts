
import { StaticImageData } from "next/image";

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
    logo: "/placeholder-logo.svg",
    profile: "A leading company in the tech industry, providing innovative solutions for a better future.",
  },
  {
    id: "2",
    name: "Creative Minds Co.",
    logo: "/placeholder-logo.svg",
    profile: "A design agency that helps brands to create unique and compelling visual identities.",
  },
  {
    id: "3",
    name: "Green Solutions Ltd.",
    logo: "/placeholder-logo.svg",
    profile: "An environmental organization dedicated to promoting sustainable practices.",
  },
  {
    id: "4",
    name: "Local Artisans Collective",
    logo: "/placeholder-logo.svg",
    profile: "A community of local artisans who create beautiful and handcrafted products.",
  },
];
