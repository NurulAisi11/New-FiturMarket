
import { StaticImageData } from "next/image";
import placeholderLogo from "@/assets/placeholder-logo.svg";

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
    profile: "A leading company in the tech industry, providing innovative solutions for a better future.",
  },
  {
    id: "2",
    name: "Creative Minds Co.",
    logo: placeholderLogo,
    profile: "A design agency that helps brands to create unique and compelling visual identities.",
  },
  {
    id: "3",
    name: "Green Solutions Ltd.",
    logo: placeholderLogo,
    profile: "An environmental organization dedicated to promoting sustainable practices.",
  },
  {
    id: "4",
    name: "Local Artisans Collective",
    logo: placeholderLogo,
    profile: "A community of local artisans who create beautiful and handcrafted products.",
  },
];
