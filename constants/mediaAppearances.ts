type MediaAppearances = {
  category: "podcast" | "tv" | "radio" | "event";
  image: string;
  imageAlt: string;
  language: "en" | "es";
  links: string[];
  mediaLink: string;
  mediaTitle: string;
  summary: string;
  title: string;
};

const MEDIA_APPEARANCES: MediaAppearances[] = [
  {
    category: "podcast",
    image: "",
    imageAlt: "",
    language: "en",
    links: [],
    mediaLink: "",
    mediaTitle: "Café on a Budget",
    summary: "",
    title: "Salario de Sillicon Valley en Puerto Rico",
  },
];
