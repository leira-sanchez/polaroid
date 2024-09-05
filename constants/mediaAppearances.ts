import { Url } from "next/dist/shared/lib/router/router";

export type MediaType = "podcast" | "tv" | "radio" | "event";

type MediaAppearances = {
  type: MediaType;
  image: string;
  imageAlt: string;
  language: "en" | "es";
  links: {
    spotify?: Url;
    applePodcasts?: Url;
    site: Url;
    youtube?: string;
    youtubeId?: string;
    iframe?: string;
  };
  mediaLink: string;
  mediaTitle: string;
  summary: string;
  title: string;
  publishDate: string;
};

const MEDIA_APPEARANCES: MediaAppearances[] = [
  {
    type: "podcast",
    image:
      "https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/staging/podcast_uploaded_nologo400/39884326/39884326-1701403695364-9eeece2003e93.jpg",
    imageAlt:
      "Logo en blanco y negro que dice Todos Somos Geeks en letras pixeladas",
    language: "es",
    links: {
      site: "https://www.youtube.com/watch?v=qeR1r_2hrP0",
      youtube: "https://www.youtube.com/watch?v=qeR1r_2hrP0",
      youtubeId: "qeR1r_2hrP0",
      iframe: "https://www.youtube.com/embed/qeR1r_2hrP0?si=rm3lQmUtLdHZq20g",
      spotify:
        "https://podcasters.spotify.com/pod/show/todossomosgeeks/episodes/Leira-Snchez--Ingeniera-de-Software--Trabajar-en-Startups-y-Ganar-100k-desde-Puerto-Rico--TSG-09-e2jojj9/a-ab99iae",
      applePodcasts:
        "https://podcasts.apple.com/us/podcast/leira-s%C3%A1nchez-ingeniera-de-software-trabajar-en/id1719223098?i=1000655864583",
    },
    mediaLink: "https://terminal34pr.com/",
    mediaTitle: "Todos Somos Geeks",
    summary: `En este episodio de Todos Somos Geeks, Leira Sánchez, fundadora de Mofongo Jobs, comparte su transición de la ingeniería mecánica a la ingeniería de software, revelando cómo logró que le pagaran por estudiar y cómo ha conseguido trabajos remotos que le permiten ganar más de $100,000 desde Puerto Rico. Descubre sus consejos para trabajar en startups, las preguntas clave en entrevistas, y mucho más. Una guía esencial para cualquiera que busque éxito en el mundo tecnológico.`,
    title:
      "Leira Sánchez | Ingeniera de Software, Trabajar en Startups y Ganar +100k desde Puerto Rico | TSG 09",
    publishDate: "May 16, 2024",
  },
  {
    type: "podcast",
    image: "/dinamica-digital.png",
    imageAlt: "Se puede ganar sobre $150,000 en Puerto Rico",
    language: "es",
    links: {
      site: "https://www.instagram.com/dinamicadigital_podcast/",
      youtube: "https://www.youtube.com/watch?v=QuHV5XzvcX4",
      youtubeId: "QuHV5XzvcX4",
      iframe: "https://www.youtube.com/embed/qeR1r_2hrP0?si=rm3lQmUtLdHZq20g",
      spotify:
        "https://open.spotify.com/episode/5fFr36YoAKCg3HHr1Gr5Fs?si=b_6J2Tr6RUanSiMkWQco3Q",
      applePodcasts:
        "https://podcasts.apple.com/us/podcast/1-ganar-sobre-%24100-000-de-salario-en-puerto-rico/id1744960594?i=1000654703759",
    },
    mediaLink: "https://www.instagram.com/dinamicadigital_podcast/",
    mediaTitle: "Dinámica Digital",
    summary: `En esta entrevista, me siento con Leira Sanchez, la visionaria fundadora de la innovadora plataforma de trabajo @mofongojobs. Juntos exploramos una amplia gama de temas, desde la influencia de la tecnología en el mundo laboral hasta los desafíos y ventajas del trabajo remoto en Puerto Rico. Leira comparte su inspiradora experiencia como 'solo founder' y ofrece valiosas perspectivas sobre la importancia de la transparencia salarial en el mercado laboral actual. Si estás interesado en conocer más sobre estos temas y disfrutas de conversaciones que despiertan la mente, este episodio es para ti.`,
    title:
      "1: Trabajo Remoto y Transparencia Salarial con Leira Sanchez de Mofongo Jobs (@mofongojobs)",
    publishDate: "Apr 29, 2024",
  },
  {
    type: "radio",
    image: "",
    imageAlt: "",
    language: "es",
    links: {
      site: "https://programacionradial.pucpr.edu/atrio-de-los-gentiles/",
      youtube: "https://www.youtube.com/watch?v=Yg5s9iXB0io",
      youtubeId: "Yg5s9iXB0io",
      iframe: "https://www.youtube.com/embed/Yg5s9iXB0io?si=NgPnI6wMDqZ4OTAb",
      spotify:
        "https://open.spotify.com/episode/0u45Tix4h3bzgsOCfRohG8?si=t829AxhwR2CWdZsfI47mRw",
      applePodcasts: "",
    },
    mediaLink: "https://programacionradial.pucpr.edu/atrio-de-los-gentiles/",
    mediaTitle: "Huella del Futuro - Atrio de los Gentiles",
    summary: `Conoce más sobre la creadora de la plataformaMofongo Jobs`,
    title: "Conoce más sobre la creadora de la plataforma Mofongo Jobs",
    publishDate: "Mar 26, 2024",
  },
  {
    type: "podcast",
    image:
      "https://podcast.urbital.io/assets/static/a37c24332eee1701b48011a8ffc8b3d1c63f9616a94340548ec8c22c5d8efdb3.8db9597.cd4d1bf498b40afa6320b86a1d94a4c5.png",
    imageAlt: "Un grupo de personas en una mesa",
    language: "es",
    links: {
      site: "https://podcast.urbital.io/episodios/s3-e9-parte-2-que-alternativas-hay-para-vivir-sin-tapon-desde-encontrar-trabajo-remoto-hasta-atender-el-componente-de-vivienda-y-urbanismo",
      spotify:
        "https://open.spotify.com/episode/38yo2T8SbBRgG6HwN4iVG3?si=FRnzMn7mRFeqmnhH0bxePQ",
      applePodcasts:
        "https://podcasts.apple.com/us/podcast/s3-e9-parte-2-qu%C3%A9-alternativas-hay-para-vivir-sin-tap%C3%B3n/id1616661964?i=1000605641443",
    },
    mediaLink: "https://urbital.io/",
    mediaTitle: "Urbital",
    summary: `Hablamos con Leira Sanchez, programadora y creadora de MofongoJobs, que tiene sobre 300 plazas disponibles de trabajo remoto. Conversamos además con Victor Ramirez, programador y estudiante de planificación, y proponente de alternatives que fomenten el desarrollo urbano sostenible. Es crucial encontrar vivienda asequible en la zona donde uno trabaja. Una reforma tributaria con un impuesto sobre el valor del suelo previene el desuso de estructuras que llevan décadas abandonadas. La causa subyacente del tapón es vivir en un lugar donde dependes del automóvil. Si el tapón no ha llegado a tu área o si lo alivian por ensanchamiento, va a regresar eventualmente. ¡Elaboramos sobre esto y mucho más en este episodio!`,
    title: "¿Qué alternativas hay para vivir sin tapón?",
    publishDate: "Mar 23, 2023",
  },
  {
    type: "podcast",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/ca/d9/28/cad928ca-14a1-b26b-5dbb-f21a043affce/mza_11916753909105969573.jpg/626x0w.webp",
    imageAlt: "Logo de Café on a Budget con las caras de los hosts",
    language: "es",
    links: {
      site: "https://www.cafeonabudget.com/blog/episodio-138-como-trabajar-desde-pr-con-salario-de-silicon-valley-leira-sanchez",
      youtube: "https://youtu.be/vizzXkJm-Gs?si=mJjtg663q-lXgoW9",
      youtubeId: "vizzXkJm-Gs",
      iframe: "https://www.youtube.com/embed/vizzXkJm-Gs?si=gCo_EdiWlGxGE9Kb",
      spotify:
        "https://open.spotify.com/episode/5bdPHUXi9bfziaeoygFgbD?si=waD9lEErQd2KUDKiqMw0Uw&nd=1&dlsi=98acd81a9d824906",
      applePodcasts:
        "https://podcasts.apple.com/mx/podcast/138-c%C3%B3mo-trabajar-desde-pr-con-salario-de-silicon/id1501460947?i=1000586937335",
    },
    mediaLink: "https://www.cafeonabudget.com/",
    mediaTitle: "Café on a Budget",
    summary: `En este episodio tenemos a Leira Sánchez, una joven profesional Ing. Mecánico y de Software que logró lo que muchos puertorriqueños quisieran, un empleo remoto desde PR con salario de Silicon Valley.


    Así como lo lees, Leira lo logró y regresó a PR, con mucha seguridad y gran conocimiento está transformando la forma en que se buscan oportunidades de trabajos BIEN PAGOS en la isla por medio de su proyecto MofongoJobs.com.
    
    
    Leira nos cuenta su historia, y nos cuenta todo lo que debemos hacer y aprender para hacer lo mismo que ella hizo.
    
    
    ¡Escúchala que te va a cambiar la vida!`,
    title:
      "Episodio 138: ¿Cómo Trabajar Desde PR con Salario de Silicon Valley? | Leira Sánchez",
    publishDate: "Feb 23, 2023",
  },
  {
    type: "event",
    image:
      "https://yt3.ggpht.com/ytc/AIdro_mICLNKofgViVlj_lQiUAmxQkUcFgF9JkCTepVf2bwNOQ=s88-c-k-c0x00ffffff-no-rj",
    imageAlt:
      "Logo de Indie Hackers PR - cuadro azul con las letras IH y la bandera de PR",
    language: "es",
    links: {
      site: "https://www.cafeonabudget.com/blog/episodio-138-como-trabajar-desde-pr-con-salario-de-silicon-valley-leira-sanchez",
      youtube: "https://www.youtube.com/watch?v=nQFd_VvKxQI",
      youtubeId: "nQFd_VvKxQI",
      iframe: "https://www.youtube.com/embed/nQFd_VvKxQI?si=3w6t6Un_op0vzjiF",
    },
    mediaLink: "https://www.indiehackerspr.com/",
    mediaTitle: "Indie Hackers PR",
    summary: `Presentación de Leira Sánchez Quiñones para la comunidad de Indie Hackers Puerto Rico. `,
    title:
      "MofongoJobs, la plataforma para encontrar trabajos en tecnología que puedes hacer desde casa y PR",
    publishDate: "Feb 14, 2023",
  },
];

export default MEDIA_APPEARANCES;
