"use client";
import "lite-youtube-embed/src/lite-yt-embed.css";

import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import MEDIA_APPEARANCES, { MediaType } from "../constants/mediaAppearances";
import {
  ArrowRightIcon,
  GlobeIcon,
  PodcastIcon,
  RadioReceiverIcon,
  TvIcon,
} from "./icons";
import { CalendarIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";

// Extend the JSX.IntrinsicElements interface inline for this component file
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { videoid: string };
    }
  }
}

function formatString(input: string): string {
  if (input.toLowerCase() === "tv") {
    return "TV";
  }

  if (input.length === 0) {
    return input; // Return empty string if input is empty
  }

  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

const mediaTypeIcons: { [key in MediaType]: JSX.Element } = {
  event: <CalendarIcon />,
  podcast: <PodcastIcon />,
  radio: <RadioReceiverIcon />,
  tv: <TvIcon />,
};

const allAppearances = MEDIA_APPEARANCES.map(
  ({
    type,
    image,
    imageAlt,
    language,
    links,
    mediaLink,
    mediaTitle,
    summary,
    title,
    publishDate,
  }) => {
    return (
      <Card key={title} className="w-full">
        {links?.youtube && links?.youtubeId ? (
          <lite-youtube
            videoid={links.youtubeId}
            style={{
              backgroundImage: `url('https://i.ytimg.com/vi/${links.youtubeId}/hqdefault.jpg')`,
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
              aspectRatio: 16 / 9,
              position: "relative",
            }}
            className="relative rounded-t-lg aspect-video w-full h-full"
          >
            <a href={links.youtube!} title={`${title} on YouTube`}>
              <span className="sr-only">{title}</span>
            </a>
          </lite-youtube>
        ) : (
          <div className="w-full rounded-t-lg relative aspect-video">
            <Image
              src={image}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-t-lg"
              loading="lazy"
            />
          </div>
        )}
        <CardContent className="p-4 justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {mediaTypeIcons[type]}
              <span className="text-sm font-medium">
                {formatString(type)}:{" "}
                <Link
                  className="hover:underline text-violet-500"
                  href={mediaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {mediaTitle}
                </Link>
              </span>
            </div>
            <h3 className="text-lg font-semibold">
              <Link
                className="hover:underline"
                href={links.site}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </Link>
            </h3>
            <p className="text-muted-foreground line-clamp-2">{summary}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon />
              <span>{publishDate}</span>
              <Separator orientation="vertical" className="h-4" />
              <GlobeIcon />
              <span>{language === "en" ? "English" : "Español"}</span>
            </div>
            {(links?.spotify || links?.applePodcasts) && (
              <div className="flex gap-2 items-center">
                <p className="inline-flex items-center gap-2 font-medium text-primary">
                  Listen Now
                  <ArrowRightIcon />
                </p>
                {links?.spotify && (
                  <Link
                    href={links.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="28"
                      height="28"
                      viewBox="0 0 48 48"
                    >
                      <linearGradient
                        id="tS~Tu1dsT5kMXF2Lct~HUa_G9XXzb9XaEKX_gr1"
                        x1="24.001"
                        x2="24.001"
                        y1="-4.765"
                        y2="56.31"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#4caf50"></stop>
                        <stop offset=".489" stopColor="#4aaf50"></stop>
                        <stop offset=".665" stopColor="#43ad50"></stop>
                        <stop offset=".79" stopColor="#38aa50"></stop>
                        <stop offset=".892" stopColor="#27a550"></stop>
                        <stop offset=".978" stopColor="#11a050"></stop>
                        <stop offset="1" stopColor="#0a9e50"></stop>
                      </linearGradient>
                      <path
                        fill="url(#tS~Tu1dsT5kMXF2Lct~HUa_G9XXzb9XaEKX_gr1)"
                        d="M24.001,4c-11.077,0-20,8.923-20,20s8.923,20,20,20c11.076,0,20-8.923,20-20	S35.077,4,24.001,4z"
                      ></path>
                      <path
                        d="M21.224,15.938c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754 c-0.145,1.023-0.877,1.755-1.899,1.755c-0.438,0-0.585-0.146-1.023-0.291c-3.508-2.047-8.769-3.217-13.885-3.217 c-2.631,0-5.262,0.293-7.6,0.877c-0.293,0-0.585,0.146-1.023,0.146c-0.075,0.011-0.149,0.016-0.221,0.016 c-0.905,0-1.533-0.821-1.533-1.77c0-1.023,0.585-1.607,1.315-1.754C14.939,16.231,17.862,15.938,21.224,15.938 M20.785,22.369 c4.97,0,9.793,1.17,13.593,3.507c0.584,0.291,0.877,0.877,0.877,1.461c0,0.878-0.585,1.608-1.462,1.608 c-0.438,0-0.73-0.144-1.023-0.291c-3.068-1.9-7.308-3.071-12.13-3.071c-2.339,0-4.531,0.293-6.139,0.733 c-0.439,0.144-0.585,0.144-0.877,0.144c-0.877,0-1.462-0.73-1.462-1.461c0-0.877,0.439-1.316,1.169-1.607 C15.523,22.808,17.716,22.369,20.785,22.369 M21.223,28.654c4.093,0,7.893,1.021,11.108,2.924 c0.438,0.291,0.731,0.584,0.731,1.314c-0.146,0.586-0.731,1.023-1.315,1.023c-0.292,0-0.585-0.145-0.877-0.292 c-2.777-1.607-6.139-2.484-9.792-2.484c-2.047,0-4.093,0.291-5.993,0.73c-0.292,0-0.731,0.146-0.877,0.146 c-0.731,0-1.169-0.586-1.169-1.17c0-0.73,0.438-1.17,1.023-1.314C16.4,28.945,18.739,28.654,21.223,28.654 M21.224,14.938 c-3.789,0-6.666,0.371-9.317,1.202c-1.254,0.279-2.06,1.341-2.06,2.722c0,1.553,1.112,2.77,2.533,2.77 c0.095,0,0.192-0.005,0.291-0.017c0.319-0.007,0.574-0.065,0.764-0.107c0.068-0.015,0.13-0.035,0.193-0.038h0.123l0.116-0.03 c2.219-0.554,4.763-0.847,7.358-0.847c5.073,0,10.075,1.152,13.381,3.081l0.09,0.053l0.099,0.033 c0.109,0.036,0.195,0.073,0.273,0.105c0.251,0.105,0.563,0.236,1.065,0.236c1.483,0,2.671-1.075,2.889-2.615l0.01-0.07v-0.071 c0-1.171-0.564-2.13-1.549-2.635C33.238,16.313,27.314,14.938,21.224,14.938L21.224,14.938z M20.785,21.369 c-3.291,0-5.651,0.508-7.711,1.057l-0.058,0.015l-0.055,0.022c-1.194,0.476-1.799,1.329-1.799,2.536 c0,1.357,1.104,2.461,2.462,2.461c0.371,0,0.626-0.009,1.189-0.194c1.572-0.429,3.714-0.683,5.827-0.683 c4.441,0,8.562,1.037,11.603,2.921l0.038,0.024l0.04,0.02c0.334,0.168,0.792,0.397,1.471,0.397c1.404,0,2.462-1.121,2.462-2.608 c0-0.996-0.53-1.886-1.387-2.334C31.04,22.659,26.04,21.369,20.785,21.369L20.785,21.369z M21.223,27.654 c-2.547,0-4.969,0.297-7.404,0.907c-1.096,0.27-1.78,1.145-1.78,2.284c0,1.217,0.953,2.17,2.169,2.17 c0.172,0,0.334-0.037,0.522-0.079c0.101-0.023,0.288-0.065,0.357-0.067l0.101-0.003l0.122-0.023 c2.023-0.467,3.963-0.704,5.768-0.704c3.422,0,6.635,0.812,9.291,2.35l0.025,0.015l0.026,0.013 c0.334,0.168,0.792,0.399,1.327,0.399c1.05,0,2.032-0.766,2.285-1.781l0.03-0.119v-0.123c0-1.202-0.595-1.76-1.178-2.147 l-0.022-0.014l-0.022-0.013C29.455,28.713,25.437,27.654,21.223,27.654L21.223,27.654z"
                        opacity=".05"
                      ></path>
                      <path
                        d="M21.224,15.938c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754 c-0.145,1.023-0.877,1.755-1.899,1.755c-0.438,0-0.585-0.146-1.023-0.291c-3.508-2.047-8.769-3.217-13.885-3.217 c-2.631,0-5.262,0.293-7.6,0.877c-0.293,0-0.585,0.146-1.023,0.146c-0.075,0.011-0.149,0.016-0.221,0.016 c-0.905,0-1.533-0.821-1.533-1.77c0-1.023,0.585-1.607,1.315-1.754C14.939,16.231,17.862,15.938,21.224,15.938 M20.785,22.369 c4.97,0,9.793,1.17,13.593,3.507c0.584,0.291,0.877,0.877,0.877,1.461c0,0.878-0.585,1.608-1.462,1.608 c-0.438,0-0.73-0.144-1.023-0.291c-3.068-1.9-7.308-3.071-12.13-3.071c-2.339,0-4.531,0.293-6.139,0.733 c-0.439,0.144-0.585,0.144-0.877,0.144c-0.877,0-1.462-0.73-1.462-1.461c0-0.877,0.439-1.316,1.169-1.607 C15.523,22.808,17.716,22.369,20.785,22.369 M21.223,28.654c4.093,0,7.893,1.021,11.108,2.924 c0.438,0.291,0.731,0.584,0.731,1.314c-0.146,0.586-0.731,1.023-1.315,1.023c-0.292,0-0.585-0.145-0.877-0.292 c-2.777-1.607-6.139-2.484-9.792-2.484c-2.047,0-4.093,0.291-5.993,0.73c-0.292,0-0.731,0.146-0.877,0.146 c-0.731,0-1.169-0.586-1.169-1.17c0-0.73,0.438-1.17,1.023-1.314C16.4,28.945,18.739,28.654,21.223,28.654 M21.224,15.438 c-3.747,0-6.582,0.366-9.188,1.186c-1.042,0.222-1.689,1.078-1.689,2.238c0,1.273,0.893,2.27,2.033,2.27 c0.084,0,0.169-0.005,0.257-0.016c0.28-0.004,0.506-0.055,0.689-0.096c0.119-0.027,0.222-0.05,0.299-0.05h0.061l0.06-0.015 c2.258-0.564,4.844-0.862,7.479-0.862c5.158,0,10.254,1.177,13.633,3.149l0.045,0.026l0.05,0.016 c0.123,0.041,0.221,0.082,0.309,0.119c0.231,0.097,0.47,0.197,0.871,0.197c1.247,0,2.209-0.878,2.394-2.185l0.005-0.035v-0.035 c0-0.985-0.473-1.787-1.298-2.201C33.083,16.794,27.24,15.438,21.224,15.438L21.224,15.438z M20.785,21.869 c-3.054,0-5.24,0.416-7.583,1.04l-0.029,0.008l-0.028,0.011c-0.637,0.254-1.484,0.745-1.484,2.071c0,0.943,0.75,1.961,1.962,1.961 c0.34,0,0.541-0.008,1.033-0.169c1.637-0.447,3.827-0.708,5.983-0.708c4.533,0,8.747,1.064,11.867,2.996 c0.345,0.175,0.725,0.366,1.286,0.366c1.119,0,1.962-0.906,1.962-2.108c0-0.823-0.442-1.554-1.154-1.909 C30.885,23.141,25.965,21.869,20.785,21.869L20.785,21.869z M21.223,28.154c-2.506,0-4.888,0.292-7.283,0.892 c-0.864,0.213-1.401,0.902-1.401,1.799c0,0.821,0.624,1.67,1.669,1.67c0.116,0,0.246-0.029,0.411-0.067 c0.148-0.033,0.351-0.079,0.466-0.079h0.057l0.056-0.013c2.06-0.476,4.038-0.717,5.88-0.717c3.51,0,6.809,0.836,9.542,2.417 c0.331,0.168,0.712,0.359,1.127,0.359c0.827,0,1.601-0.603,1.8-1.402l0.015-0.06v-0.061c0-1.012-0.493-1.424-0.954-1.73 C29.277,29.189,25.348,28.154,21.223,28.154L21.223,28.154z"
                        opacity=".07"
                      ></path>
                      <path
                        fill="#fff"
                        d="M31.747,33.915c-0.292,0-0.585-0.145-0.877-0.292c-2.777-1.607-6.139-2.484-9.792-2.484 c-2.047,0-4.093,0.291-5.993,0.73c-0.292,0-0.731,0.146-0.877,0.146c-0.731,0-1.169-0.586-1.169-1.17 c0-0.73,0.438-1.17,1.023-1.314c2.338-0.586,4.677-0.877,7.161-0.877c4.093,0,7.893,1.021,11.108,2.924 c0.438,0.291,0.731,0.584,0.731,1.314C32.916,33.478,32.331,33.915,31.747,33.915z M33.793,28.945c-0.438,0-0.73-0.144-1.023-0.291 c-3.068-1.9-7.308-3.071-12.13-3.071c-2.339,0-4.531,0.293-6.139,0.733c-0.439,0.144-0.585,0.144-0.877,0.144 c-0.877,0-1.462-0.73-1.462-1.461c0-0.877,0.439-1.316,1.169-1.607c2.192-0.584,4.385-1.023,7.454-1.023 c4.97,0,9.793,1.17,13.593,3.507c0.584,0.291,0.877,0.877,0.877,1.461C35.255,28.215,34.67,28.945,33.793,28.945z M36.132,23.101 c-0.438,0-0.585-0.146-1.023-0.291c-3.508-2.047-8.769-3.217-13.885-3.217c-2.631,0-5.262,0.293-7.6,0.877 c-0.293,0-0.585,0.146-1.023,0.146c-1.023,0.146-1.754-0.73-1.754-1.754c0-1.023,0.585-1.607,1.315-1.754 c2.777-0.877,5.7-1.17,9.062-1.17c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754 C37.886,22.369,37.154,23.101,36.132,23.101z"
                      ></path>
                    </svg>
                  </Link>
                )}

                {links?.applePodcasts && (
                  <Link
                    href={links.applePodcasts}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 300 300"
                      xmlSpace="preserve"
                    >
                      <linearGradient
                        id="a"
                        gradientUnits="userSpaceOnUse"
                        x1="150"
                        y1="0"
                        x2="150"
                        y2="300"
                      >
                        <stop offset="0" style={{ stopColor: "#f452ff" }} />
                        <stop offset="1" style={{ stopColor: "#832bc1" }} />
                      </linearGradient>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill="url(#a)"
                        d="M294.1 260c-2.9 7.4-9.6 17.8-19.2 25.2-5.5 4.2-12.1 8.3-21.1 11-9.6 2.9-21.5 3.8-36.3 3.8h-135c-14.8 0-26.6-1-36.3-3.8-9-2.7-15.6-6.7-21.1-11-9.5-7.3-16.3-17.8-19.2-25.2C.1 245.1 0 228.2 0 217.5v-135C0 71.8.1 54.9 5.9 40c2.9-7.4 9.6-17.8 19.2-25.2 5.5-4.2 12.1-8.3 21.1-11C55.9 1 67.7 0 82.5 0h135c14.8 0 26.6 1 36.3 3.8 9 2.7 15.6 6.7 21.1 11 9.5 7.3 16.3 17.8 19.2 25.2 5.9 14.9 5.9 31.9 5.9 42.5v135c0 10.7-.1 27.6-5.9 42.5z"
                      />
                      <g fill="#FFF">
                        <path d="M175.7 181.1c-.4-3.6-1.6-6.2-4-8.6-4.5-4.7-12.4-7.8-21.7-7.8-9.3 0-17.2 3-21.7 7.8-2.3 2.5-3.6 5-4 8.6-.8 7-.3 13 .5 22.7.8 9.2 2.3 21.5 4.2 33.9 1.4 8.9 2.5 13.7 3.5 17.1 1.7 5.6 7.8 10.4 17.5 10.4s15.9-4.9 17.5-10.4c1-3.4 2.1-8.2 3.5-17.1 1.9-12.5 3.4-24.7 4.2-33.9.9-9.7 1.3-15.7.5-22.7zM174.6 130.1c0 13.6-11 24.6-24.6 24.6s-24.6-11-24.6-24.6c0-13.6 11-24.6 24.6-24.6s24.6 11.1 24.6 24.6z" />
                        <path d="M149.7 33.2C92.3 33.4 45.3 80 44.5 137.4c-.6 46.5 29.1 86.3 70.6 100.9 1 .4 2-.5 1.9-1.5-.5-3.6-1.1-7.2-1.5-10.8-.2-1.3-1-2.3-2.1-2.9-32.8-14.3-55.7-47.2-55.3-85.3.5-50 41.3-90.7 91.2-91.1 51.1-.4 92.8 41 92.8 92 0 37.7-22.8 70.1-55.3 84.4-1.2.5-2 1.6-2.1 2.9l-1.5 10.8c-.2 1.1.9 1.9 1.9 1.5 41.1-14.4 70.6-53.6 70.6-99.6-.2-58.2-47.7-105.6-106-105.5z" />
                        <path d="M147.3 68.2c-37.4 1.4-67.4 32.3-67.9 69.7-.3 24.6 12 46.4 30.9 59.3.9.6 2.2-.1 2.2-1.2-.3-4.3-.3-8.1-.1-12.1.1-1.3-.4-2.5-1.4-3.4-11.5-10.8-18.5-26.2-18.1-43.2.8-30 24.9-54.4 54.9-55.6 32.6-1.3 59.4 24.9 59.4 57.1 0 16.4-7 31.2-18.1 41.7-.9.9-1.4 2.1-1.4 3.4.2 3.9.1 7.7-.1 12-.1 1.1 1.2 1.9 2.2 1.2 18.6-12.7 30.9-34.2 30.9-58.4.1-39.8-33.2-72.1-73.4-70.5z" />
                      </g>
                    </svg>
                  </Link>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

const MediaAppearances = () => {
  const [isClient, setIsClient] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const additionalAppearancesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    const loadLiteYouTube = async () => {
      await import("lite-youtube-embed");
    };
    loadLiteYouTube();
  }, []);

  const toggleAppearances = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (additionalAppearancesRef.current) {
      additionalAppearancesRef.current.style.height = isExpanded
        ? `${additionalAppearancesRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isExpanded]);

  return (
    <Card id="media">
      <CardHeader>
        <CardTitle>Media Appearances</CardTitle>
        <CardDescription>Podcasts, Events, TV, Radio, etc.</CardDescription>
      </CardHeader>
      <CardContent>
        {isClient && (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {allAppearances.slice(0, 3)}
            </ul>
            <div
              ref={additionalAppearancesRef}
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                opacity: isExpanded ? 1 : 0,
                height: "0px",
              }}
            >
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {allAppearances.slice(3)}
              </ul>
            </div>
            {allAppearances.length > 3 && (
              <div className="mt-4 text-center">
                <Button onClick={toggleAppearances}>
                  {isExpanded ? "Hide" : "Show More"}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaAppearances;
