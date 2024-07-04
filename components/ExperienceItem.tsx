import { FC } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Separator } from "./ui/separator";
interface ExperienceItemProps {
  company: string;
  duration: string;
  isLast?: boolean;
  jobTitle: string;
  isSamePrevCompany: boolean;
  isSameNextCompany: boolean;
  responsibilities: string[];
  links?: {
    web?: string;
    ios?: string;
    android?: string;
  };
}

const CompanyLogos: { [key: string]: JSX.Element } = {
  "Capital One": (
    <svg
      aria-label="Capital One"
      width={100}
      viewBox="0 0 418 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M283.7 108.5h-.1c-17.8 12.6-38.8 25.8-61.5 39.7l-.9.5a.7.7 0 1 0 .8 1.1l.7-.4c19.3-10 41.4-21.9 63.6-34.2l.4-.2a24.7 24.7 0 0 1-3-6.5Zm116.8-94.6c-28-30.9-208.6-3.1-285.3 13.7l-1.8.4a.8.8 0 0 0-.6.8.6.6 0 0 0 .8.5l1.8-.3C179 17.7 311.3 2 339.7 30.2c8.7 8.6 6.7 19.7-3.4 32.8a25.7 25.7 0 0 1 11 15.8c39.3-26.1 65.7-51.1 53.2-64.9Z"
        fill="#cc2427"
      />
      <g fill="#013d5b">
        <path d="M133 84.3a10.4 10.4 0 0 0-6.1 2 9.4 9.4 0 0 0-3.3 6c-.6 3.1-.3 5.2.9 6.6a7.1 7.1 0 0 0 5.3 2 10.2 10.2 0 0 0 4.4-.9 8.1 8.1 0 0 0 3.3-2.8 12.5 12.5 0 0 0 1.9-4.6c.5-2.8.1-4.8-1.2-6.2a6.7 6.7 0 0 0-5.2-2.1zm-31.1 38.8 8.3-46.8h15l-1.2 6a14.2 14.2 0 0 1 6.3-4.5 27 27 0 0 1 9.7-2c3.9 0 6.3.2 9.2 1.7a12.4 12.4 0 0 1 6 6.6 16.8 16.8 0 0 1 .8 9.5 20.7 20.7 0 0 1-8.4 13.7c-4.6 3.3-8.7 4.2-14.6 4.2a20.4 20.4 0 0 1-5.3-.6 12.1 12.1 0 0 1-3.4-1.3 15.5 15.5 0 0 1-2.8-2.6l-2.8 16.1zM275 111h-17.4l8.8-48.6 16.9.4zm-86.8-35.1 1.2-7.1 17.8-3.8-1.9 10.9h8.8l-1.7 7.1h-8.5l-5.1 28h-17.3l5.2-28h-6.5l1.3-7h6.7zM49.6 98.5a62.3 62.3 0 0 1-14.2 1.5c-8.1 0-14.6-4-14.2-11.5.2-4.9 6.1-15.3 20.9-15.3a24.3 24.3 0 0 1 13.3 3.6l2.1-12.1a40.3 40.3 0 0 0-16.8-2.8c-19.5.2-38.2 9-40.5 27s20 22.9 29.9 22.9c5.7 0 11.7-.3 17.2-.8zM239.3 95l-2.9.8-6.7 1.2a10.8 10.8 0 0 0-4.5 1.4 3 3 0 0 0-1.5 2.2 2.2 2.2 0 0 0 .9 2.4c.9.6 2.3.8 4.3.8a16.1 16.1 0 0 0 4.4-.6 10.2 10.2 0 0 0 3.6-1.9 5.1 5.1 0 0 0 1.5-2.3 22.4 22.4 0 0 0 .9-4zm18.4-11.5c-.1 1.7-.4 3.3-.8 5.8l-3.1 17.5a3.2 3.2 0 0 0 1.7 3.6v.6h-17.9v-4.5a36 36 0 0 1-8.6 3.7 32.2 32.2 0 0 1-8.6 1c-5.7 0-9-.6-11.3-2.6s-3.4-3.4-3.3-6.2a9.5 9.5 0 0 1 2.2-5.2 13.3 13.3 0 0 1 4.7-3.3 25.4 25.4 0 0 1 7.1-2c3.2-.5 7.6-1 13.5-1.5a24 24 0 0 0 5.8-1.3c1.2-.5 1.7-1 1.9-2s-.2-2.8-2.6-3.3c-6.4-1.3-18.4.8-24.6 2.3l3.3-9a161.7 161.7 0 0 1 23.9-2c12.7.1 16.8 3.8 16.7 8.4zM155.5 111l6.2-34.9h17.1l-6.2 34.9zm7.2-42.9c.5-2.9 5-5.2 10.1-5.2s8.7 2.3 8.2 5.2-5 5.2-10.1 5.2-8.7-2.4-8.2-5.2zM85.5 94.9a13 13 0 0 1-2.9.8L76 96.9a10.8 10.8 0 0 0-4.6 1.4 3.2 3.2 0 0 0-1.5 2.3 2.1 2.1 0 0 0 1 2.3 7.3 7.3 0 0 0 4.2.9 16.2 16.2 0 0 0 4.4-.7 10.2 10.2 0 0 0 3.6-1.9 5.1 5.1 0 0 0 1.5-2.3 14.7 14.7 0 0 0 .9-4zm18.4-11.4c-.1 1.7-.4 3.2-.8 5.8l-3.1 17.4a3.2 3.2 0 0 0 1.7 3.6v.7H83.8v-4.4a40.2 40.2 0 0 1-8.6 3.6 31.8 31.8 0 0 1-8.5 1.1c-5.8 0-9.1-.6-11.3-2.6s-3.5-3.4-3.4-6.3a9.6 9.6 0 0 1 2.2-5.1 13.5 13.5 0 0 1 4.7-3.4 28.9 28.9 0 0 1 7.2-2c3.1-.5 7.5-1 13.4-1.5a15.7 15.7 0 0 0 5.8-1.3c1.3-.5 1.7-1 1.9-2s-.2-2.8-2.6-3.3c-6.4-1.2-18.4.8-24.6 2.4l3.3-9.1a162.8 162.8 0 0 1 23.9-2c12.7 0 16.8 3.7 16.7 8.4zM344.6 88.2l3.9-.4c1.3 0 2.4.3 2.5 1.5s-1.3 6-1.6 7.3l-2.7 11.7c-1 4.8-2.2 9.8-3.2 13.8h6.8l3.8-18.6c11.8-12.2 16.3-16.2 19-16.2a2 2 0 0 1 2.2 2.2c.1 2.1-1.3 7-1.7 8.4l-4 13.5c-.8 3.1-1.5 5.8-1.4 7.8s1.9 4.3 4.5 4.3c5 0 8.7-5.2 11.8-10.3l-.9-1.7c-1.3 2-4.2 6.5-6.6 6.5-.7 0-1.4-.5-1.4-1.7a20.5 20.5 0 0 1 1-5.5l4.4-15.9c1.1-4.4 1.7-7.2 1.7-8.7s-1.9-4.3-4.5-4.3c-4.5 0-10.5 3.3-23.1 17.8h-.2l1.6-7.1c.9-3.9 1.7-7.9 2.5-10.7a114.5 114.5 0 0 1-14.5 4.1zm66.9.4c-.1-2.8-1.5-4.7-4.4-4.7-7 0-14.4 13.7-15.7 19.2 11.4 0 20.4-6.8 20.1-14.5zm1.5 21.5 1.3.9c-3.4 6.9-10.3 12.5-18.5 12.5-6.7 0-12.1-4.4-12.4-12.7-.6-15 13.5-28.9 24.9-28.9 4.9 0 9.5 2.2 9.7 7.5.4 11.9-16.3 15.5-27.3 15.7a14.3 14.3 0 0 0-.4 4.4c.2 5 3.2 9.1 9.3 9.1s10.7-4.3 13.4-8.5zm-117.9-9.7c.3 10.9 7.2 19.8 16.2 19.8 17.4 0 24.8-21.4 24.3-35.7-.4-10.9-7.4-19.8-16.4-19.8-15 0-24.7 21.3-24.1 35.7zm-9.2-.6c-.7-18.6 13.9-37.6 35-37.6 14.2 0 23.4 9.5 23.9 23.9.7 19.6-12.9 37.6-35 37.6-14.2 0-23.4-9.4-23.9-23.9z" />
      </g>
    </svg>
  ),
  "Welcome (YC W20)": (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 13.8667C0 6.20832 6.20832 0 13.8667 0C21.525 0 27.7333 6.20832 27.7333 13.8667V32H20.2667H12.8H0V23.4667V18.6667V13.8667ZM2.13333 23.4667V29.8667H10.6667V23.4667C10.6667 21.1103 8.75642 19.2 6.4 19.2C4.04359 19.2 2.13333 21.1103 2.13333 23.4667ZM12.8 29.8667V23.4667C12.8 19.932 9.93462 17.0667 6.4 17.0667C4.76084 17.0667 3.26561 17.6829 2.13333 18.6963V18.6667C2.13333 14.2484 5.71506 10.6667 10.1333 10.6667C14.5516 10.6667 18.1333 14.2484 18.1333 18.6667V29.8667H12.8ZM25.6 29.8667H20.2667V18.6667C20.2667 13.0702 15.7298 8.53333 10.1333 8.53333C6.94016 8.53333 4.09195 10.0103 2.23459 12.3183C2.99238 6.57 7.9114 2.13333 13.8667 2.13333C20.3468 2.13333 25.6 7.38653 25.6 13.8667V29.8667Z"
        fill="black"
      />
    </svg>
  ),
  "Jam – Podcasts & Short Audio": (
    <svg
      role="img"
      height={32}
      viewBox="0 0 69 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M65.0946 0H3.90542C1.74852 0 0 1.71139 0 3.82251V28.1775C0 30.2886 1.74852 32 3.90542 32H65.0946C67.2515 32 69 30.2886 69 28.1775V3.82251C69 1.71139 67.2515 0 65.0946 0Z"
        fill="url(#paint0_linear_5764_21612)"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.7976 22.6197C28.7976 23.0047 28.6 23.2939 28.2066 23.4873C27.8132 23.6807 26.8289 23.7765 25.2553 23.7765H24.0751C23.2492 23.7539 22.8344 23.4873 22.8344 22.9786C22.8344 22.8705 22.854 22.7521 22.8932 22.6197L27.3682 8.45164C27.5338 7.88192 28.4024 7.59619 29.9778 7.59619H32.3399C33.9135 7.59619 34.7839 7.88192 34.9494 8.45164L39.4245 22.6197C39.4637 22.7503 39.4832 22.8705 39.4832 22.9786C39.4832 23.4873 39.0703 23.7521 38.2443 23.7765H37.0641C35.4888 23.7765 34.5133 23.6807 34.136 23.4873C33.7817 23.3026 33.6037 23.0361 33.6037 22.6893V22.6197H28.7976ZM31.1597 14.6349L30.1326 17.9975H32.1868L31.1597 14.6349ZM46.1709 15.6855V22.6197C46.1709 23.3897 45.7775 23.7748 44.9907 23.7748H41.4484C40.6616 23.7748 40.2682 23.3897 40.2682 22.6197V8.75131C40.2682 7.98123 40.6616 7.59619 41.4484 7.59619H44.9676C45.7704 7.59619 46.3293 7.8314 46.6444 8.30181L49.715 12.7968L52.7375 8.3593C53.0846 7.85056 53.6417 7.59619 54.4143 7.59619H57.9797C58.7665 7.59619 59.1599 7.98123 59.1599 8.75131V22.6197C59.1599 23.3897 58.7665 23.7748 57.9797 23.7748H54.4374C53.6506 23.7748 53.2573 23.3897 53.2573 22.6197V15.6855C51.6837 18.4278 50.6993 19.9453 50.3059 20.238C50.1084 20.3843 49.9125 20.4575 49.715 20.4575C49.5174 20.4575 49.2717 20.3478 48.9762 20.1282C48.6808 19.9087 47.7462 18.4278 46.1727 15.6855H46.1709ZM18.97 7.7269H22.5123V7.72516C23.2759 7.72516 23.6693 8.1102 23.6924 8.88027L23.6622 14.9538L23.6586 15.8144C23.6586 19.8182 22.361 22.3322 19.771 23.3636C19.7532 23.3706 19.7349 23.3785 19.7167 23.3863C19.6984 23.3941 19.6802 23.402 19.6624 23.4089C15.6591 24.9317 12.6882 23.909 10.755 20.3304L10.2032 19.3094C9.83475 18.6299 9.99852 18.109 10.6945 17.7484L13.8256 16.1281C14.5198 15.7674 15.0521 15.9277 15.4205 16.6089L15.9724 17.6299C16.1254 17.9121 16.364 18.0707 16.679 18.1195C17.4178 18.0742 17.7898 17.3529 17.7898 15.9434V8.88202C17.7898 8.11194 18.1832 7.7269 18.97 7.7269Z"
        fill="white"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_5764_21612"
          x1="0"
          y1="16.0001"
          x2="69"
          y2="16.0001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#6900BC"></stop>
          <stop offset="1" stopColor="#DA01BE"></stop>
        </linearGradient>
      </defs>
    </svg>
  ),
  "Mofongo Jobs": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 400 87.867"
      height={32}
    >
      <defs>
        <path
          id="a"
          fill="#080404"
          d="M295.897 17.425c1.37 3.57-1.99 7.505-5.326 6.237-.656-.25-.649-.125.034.6 3.744 3.969 9.919-1.505 6.628-5.875-.551-.732-1.514-1.425-1.336-.962M339 26.265v9.098l.639-.806c.351-.444.764-.91.917-1.036.252-.207.277-.97.277-8.291v-8.063H339v9.098m-208.167-3.473v3.959l-1.791.002c-3.823.003-5.709 1.121-5.709 3.383v.697l1.125-.004c1.082-.005 1.141-.026 1.542-.567.908-1.225 2.809-1.827 5.471-1.733l1.53.054-.001-4.77v-4.771l-.521-.104a6.593 6.593 0 0 0-1.083-.105h-.563v3.959M26.5 33.403c0 .68-.045 1.374-.101 1.542-.056.168.112.042.372-.278.261-.321.794-.929 1.185-1.351.962-1.038.926-1.149-.373-1.149H26.5v1.236m153.97.264c-.029.825-.042 1.5-.028 1.5.014 0 .171-.244.348-.542.178-.298.673-.928 1.1-1.399.978-1.081.984-1.059-.295-1.059h-1.071l-.054 1.5m59.325 14.541-.049 16.042-.457 1.665c-2.744 10-13.999 14.727-26.382 11.08-2.569-.757-2.574-.758-2.574-.386 0 .802 5.064 2.505 9.167 3.083 3.901.549 10.075-.12 12.477-1.353.15-.077.76-.377 1.356-.667.596-.291 1.384-.69 1.75-.888.857-.462 4.064-3.664 4.541-4.534 1.281-2.34 1.902-4.222 2.2-6.667.276-2.265.165-14.199-.153-16.444-.193-1.362-.194-1.878-.002-3.333.143-1.08.249-3.944.285-7.681l.058-5.958h-2.168l-.049 16.041M44.684 33.338c.238.318.559.822.712 1.12.304.589.558.69.714.282.108-.281-.516-1.027-1.36-1.625l-.5-.355.434.578m84.983 2.995v3.5h-6.334v24.5h-9v1.838l5.625-.044 5.625-.044.043-12.208.043-12.208 2.54-.002 2.541-.002.461-1.207c.445-1.167.46-1.31.458-4.414l-.002-3.209h-2v3.5m-64.31-2.8c2.097 2.946 2.223 4.002 2.225 18.634l.001 12.083-4.633.044-4.634.045.05.872.051.872 5.63.044 5.631.044-.032-12.627c-.039-15.619-.164-16.38-3.182-19.418-1.18-1.187-1.746-1.491-1.107-.593m229.596 17.509c-.051 16.06-.085 17.978-.335 18.888-1.228 4.475-4.162 6.712-8.826 6.731l-1.459.006v.663c0 .872.189.92 3.584.92h2.666l1.295-.618c2.464-1.177 3.952-3.151 4.628-6.138.303-1.343.319-2.298.323-19.869l.004-18.458h-1.823l-.057 17.875m-93.885-17.16c1.937 2.539 1.989 2.993 2.054 17.66l.056 12.791H194v1.834h11.333v-7.71c0-5.129-.061-7.904-.183-8.291-.295-.94-.374-5.722-.118-7.166.498-2.816-.659-6.257-2.872-8.542-1.142-1.179-1.828-1.541-1.092-.576m185.339 1.703c.326.481 1.426 3.026 1.426 3.3 0 .034-.543.269-1.208.522-1.783.678-3.035 1.16-3.09 1.191-.048.027.632 2.099.724 2.208.026.031.297-.052.602-.184.306-.131.968-.394 1.472-.584 2.822-1.063 3.334-1.28 3.334-1.413 0-.678-1.43-3.399-2.298-4.373-1.013-1.136-1.518-1.487-.962-.667m-222.556.185c4.807 5.423 5.622 14.057 1.933 20.48-4.805 8.368-16.99 11.426-26.502 6.652-1.418-.711-1.194-.332.414.699 3.445 2.211 6.467 3.098 10.892 3.196 2.918.065 3.517.012 5.912-.527 5.848-1.315 10.642-5.395 12.656-10.77.502-1.339.527-11.086.032-12.516-.887-2.561-3.135-5.711-5.253-7.359l-.685-.533.601.678m196.908.48c4.239 6.333 3.841 17.119-.843 22.797-3.944 4.781-11.284 6.404-16.666 3.684l-1.167-.589.576.597c3.136 3.253 10.128 3.988 14.9 1.566 3.711-1.883 6.922-6.184 6.243-8.363-.342-1.099-.322-1.149.55-1.427.884-.282 1.227-1.885 1.215-5.682-.019-5.576-1.678-10.014-4.891-13.083l-.698-.667.781 1.167m-84.849 0c6.392 7.851 4.729 19.936-3.501 25.442-6.171 4.128-14.94 4.607-21.493 1.173-.687-.36-1.249-.633-1.249-.605 0 .178 2.223 1.685 3.37 2.283 9.743 5.086 22.543 1.657 27.005-7.233 2.292-4.567 2.515-11.395.496-15.238a15.07 15.07 0 0 1-.355-.739c-.795-1.773-2.721-4.191-4.427-5.555l-.66-.528.814 1m-171.787.289c4.679 6.121 4.87 14.829.461 21.044-5.313 7.491-16.931 9.815-25.876 5.177-.756-.392-1.375-.692-1.375-.666 0 .084 2.336 1.747 2.9 2.063 1.422.799 2.025 1.081 3.267 1.528 5.965 2.145 13.465 1.354 18.704-1.973 9.276-5.891 10.315-20.575 1.95-27.554l-.89-.741.859 1.122m269.46-.367c-3.018 1.163-3.898 4.612-1.65 6.465.733.604.99.676.74.207-.773-1.444.57-3.88 2.645-4.798 1.158-.513 4.175-.508 5.14.007.798.425.66.067-.289-.75-1.649-1.421-4.543-1.918-6.586-1.131m-61.746.105c-3.875.761-6.719 3.969-7.439 8.39-.768 4.725.655 9.543 3.435 11.621.575.43.579.43.25.033-1.987-2.408-2.612-8.122-1.299-11.888 1.732-4.973 6.286-7.48 11.371-6.26.773.185 1.488.405 1.589.489.788.654 1.095.435.339-.242-2.213-1.984-5.16-2.75-8.246-2.143m14.908.498c4.062 5.3 4.203 14.626.312 20.507-4.549 6.875-14.301 8.967-21.605 4.635l-1.035-.614.497.524c5.69 5.985 17.274 5.27 23.018-1.422 3.208-3.738 4.764-10.59 3.498-15.405a173.76 173.76 0 0 1-.444-1.718c-.4-1.6-1.878-4.194-3.466-6.083-.987-1.174-1.611-1.516-.775-.424m19.813-.593c-6 1.003-9.38 8.674-6.905 15.669.688 1.944 2.916 5.136 3.309 4.742.043-.042-.031-.186-.164-.319-1.775-1.775-2.552-8.393-1.382-11.774 1.96-5.667 7.801-8.31 12.732-5.76.761.394.496-.025-.542-.857-1.849-1.481-4.513-2.124-7.048-1.701M86.25 39.559c-1.362.512-2.212 1.081-3.12 2.091-2.444 2.718-2.657 8.028-.439 10.917.529.69 1.825 1.824 2.147 1.879.102.017.1-.006-.006-.057-.685-.337-1.532-3.177-1.532-5.139 0-3.019 1.178-5.393 3.575-7.206 1.329-1.005 4.594-1.371 6.332-.711 1.083.412 1.082.412.694-.019-1.676-1.862-5.208-2.672-7.651-1.755m60.333 0c-6.035 2.266-7.029 10.967-1.686 14.768.303.215.291.156-.097-.507-2.187-3.732-1.196-9.303 2.039-11.464 2.082-1.39 5.321-1.837 6.968-.961.906.482.792.187-.242-.624-2.001-1.571-4.753-2.048-6.982-1.212m73.392.003c-4.7 1.933-4.97 10.472-.422 13.36l.47.298-.449-.805c-2.238-4.008-.953-9.602 2.54-11.055 1.073-.447 3.864-.513 4.817-.115l.586.245-.383-.473c-1.39-1.713-4.831-2.413-7.159-1.455m38.341 0c-5.471 1.932-7.024 9.624-2.789 13.813 1.007.996 1.965 1.625 1.268.833-1.647-1.874-1.917-6.239-.563-9.102 1.514-3.2 5.802-4.988 9.052-3.775l.966.361-.495-.518c-1.727-1.808-4.922-2.5-7.439-1.612M110.167 40.75v.917H112v-1.834h-1.833v.917m-78.88-.388c-1.702.593-2.803 1.926-3.759 4.551l-.426 1.17-.093 9.084-.092 9.083-4.634.044-4.634.045.051.872.05.872 5.612.044 5.612.044.072-8.544c.082-9.592.134-10.075 1.362-12.56.911-1.842 2.817-3.234 4.43-3.234.62 0 .756-.248.417-.765-.708-1.081-2.155-1.338-3.968-.706m20.44-.019c-1.938.614-3.323 2.43-4.093 5.366-.342 1.306-.364 1.805-.425 9.999l-.064 8.625h-8.978v1.834H49.5l.005-8.292c.003-4.56.069-8.779.146-9.375.468-3.612 2.622-6.328 5.255-6.624.936-.106 1.031-.233.653-.873-.6-1.015-1.969-1.251-3.832-.66m134.444-.076c-2.239.602-3.689 2.048-4.648 4.637l-.437 1.179-.085 9.084-.084 9.083-4.634.044-4.634.045.051.872.05.872 5.614.044 5.614.044.065-8.627c.061-8.03.089-8.714.404-9.878 1.033-3.82 3.353-5.822 6.809-5.874l1.062-.016-.284-.494c-.648-1.127-2.787-1.573-4.863-1.015m183.173 8.459c1.632 1.528 2.812 1.973 8.739 3.296.825.184 1.831.443 2.235.575 1.022.334 1.063.15.146-.66-.876-.775-2.002-1.199-4.714-1.778-3.467-.741-5.036-1.181-6.167-1.732l-1.166-.568.927.867m17.156.398c0 .104.07.233.156.286.576.356 1.224 2.869 1.225 4.757.008 8.348-10.3 12.847-18.881 8.24l-.75-.403.833.759c2.925 2.664 7.611 3.734 12.314 2.814 7.097-1.39 10.699-8.977 6.921-14.577-.673-.999-1.818-2.18-1.818-1.876m-16.378 5.849c-.264.105-.241.191.235.863.639.903 1.785 1.935 1.57 1.414-.076-.183-.296-.8-.491-1.371-.364-1.07-.559-1.204-1.314-.906M339 61.058v2.109h-4.333v1.666h6.166v-1.887c0-1.826-.014-1.901-.439-2.292a8.92 8.92 0 0 1-.917-1.054l-.477-.65v2.108m-111.083-.643c-2.662 3.232-10.272 3.911-14.917 1.331l-.75-.417.75.668c3.301 2.94 9.801 4.012 13.959 2.302 1.409-.58 1.409-.579 1.34-2.752l-.049-1.537-.333.405"
        />
      </defs>
      <g fill-rule="evenodd">
        <path
          fill="#040404"
          d="M289.913 15.074c-2.426 1.205-3.394 4.25-2.081 6.541.459.8 1.406 1.718 1.773 1.718.086 0 .289.225.451.499.162.274.459.587.66.694.252.135.196.027-.183-.352-.622-.622-.612-.759.038-.512 2.657 1.01 6.184-1.973 5.685-4.808-.167-.953-.601-2.187-.769-2.187-.085 0-.154-.085-.154-.19 0-1.286-3.719-2.249-5.42-1.403m42.754 24.176v23.917H339V58.95l.477.65c.263.357.675.832.917 1.054.425.391.439.466.439 2.288v1.884l-3.125.049-3.125.049 3.209.038L341 65v-1.75c0-1.056.066-1.75.167-1.75.091 0 .166.075.166.167 0 .091.073.166.161.166.088 0 .445.285.792.633.347.348.443.418.214.154l-.417-.48 1.167.591c5.379 2.721 12.722 1.097 16.666-3.684 4.531-5.493 5.077-16.165 1.143-22.342-.73-1.146-.705-1.249.108-.455.366.358.666.614.666.569 0-.046-.348-.417-.774-.826-.425-.409-.711-.631-.634-.493.12.215.1.218-.143.021-.155-.126-.282-.298-.282-.383 0-.213-1.61-1.805-1.825-1.805-.096 0-.175-.063-.175-.141 0-.322-2.406-1.597-4.083-2.163-3.514-1.188-10.484-.43-11.917 1.295-.046.055-.289.231-.54.391l-.457.291-.045-7.962-.045-7.961-.04 8.105c-.036 7.33-.066 8.126-.317 8.333-.153.126-.566.592-.917 1.036l-.639.806v-20.03h-6.333V39.25m-209.25-22.144c-2.572.409-5.75 1.573-6.985 2.557-3.096 2.468-4.432 5.241-4.432 9.2v1.97h-4.167V40h2.15l.05.875.05.875.959.05.958.05V64.5h2.149l.061.875.062.875.031-.958.03-.959h9v-24.5h6.334v-7h2l.002 3.209c.002 3.104-.013 3.247-.458 4.414l-.461 1.207-2.583.039-2.584.039 2.558.05c2.2.044 2.544.086 2.461.303-1.305 3.401-.858 9.689.933 13.137 1.176 2.265 4.161 5.936 4.826 5.936.077 0 .284.131.46.291 1.067.968 1.975 1.667 1.598 1.229-.291-.337-.185-.311.852.21 6.736 3.381 15.275 2.916 21.39-1.164 7.962-5.312 9.862-16.836 4.091-24.816-.53-.734-.954-1.371-.941-1.417.012-.046-.034-.087-.103-.091-.068-.004-.519-.395-1-.87-2.087-2.057-6.184-4.14-9.041-4.597-.321-.051-1.034-.174-1.584-.272-3.19-.57-9.705.249-11.495 1.444-.181.121-.426.219-.544.219-.186 0-.569.205-2.349 1.25-.612.36-2.284 1.691-2.85 2.268-1.021 1.043-2.638 3.18-2.888 3.818-.054.136-.103-1.159-.111-2.877l-.013-3.125h-2.166v-1.834h-1.917c-1.827 0-2.077-.059-1.792-.428.069-.089.001-.029-.151.133-.211.225-.54.295-1.375.295h-1.099v-.697c0-2.262 1.886-3.38 5.709-3.383l1.791-.002v-7.918h.563c.309 0 .796.047 1.081.104l.518.104.047 4.854.047 4.855.039-4.937.039-4.936-.625-.103a8.86 8.86 0 0 0-1.167-.105c-.537-.002-.542-.01-.542-.814 0-.808-.002-.812-.625-.915-1.102-.182-5.243-.081-6.791.166m173.325 7.269-.659.708.709-.658c.389-.363.708-.682.708-.709 0-.126-.145 0-.758.659m-169.69 4.917c-.175.16-.235.238-.134.173.101-.065.367-.191.591-.281.258-.103.307-.167.134-.173-.15-.006-.416.12-.591.281m-91.635.15c-3.684.474-5.792 1.748-8.643 5.227-.262.32-.431.444-.375.276.056-.168.101-.859.101-1.534v-1.229l1.125-.058 1.125-.059-1.125-.032L26.5 32v-1.833H15.333v34.285l5.625-.072c3.094-.039 5.714-.099 5.822-.132.147-.046.213-2.347.259-9.113l.062-9.052.426-1.17c.654-1.791 1.101-2.564 1.984-3.423 2.011-1.96 5.673-1.93 5.913.048.026.208.126.716.224 1.129.115.488.179 4.433.181 11.291l.004 10.542h2.15l.061.875.061.875.031-.958.031-.959h8.978l.064-8.625c.072-9.596.118-10.038 1.306-12.416 1.239-2.479 4.273-3.962 6.217-3.039.565.268 1.19 1.136 1.018 1.414-.057.091-.024.166.073.166.123 0 .177 3.461.177 11.309v11.31l5.625-.072c3.094-.039 5.723-.102 5.843-.141.355-.113.179-24-.19-25.806-.428-2.093-1.048-3.674-1.921-4.9-.209-.293-.337-.533-.285-.533.204 0-1.197-1.299-1.905-1.767-3.373-2.227-8.772-2.377-12.584-.351l-.666.356c-.651.35-2.178 1.571-2.91 2.327l-.742.767-.591-.541-.591-.541.564.614c.35.381.526.713.464.875-.157.409-.412.309-.71-.281-.151-.298-.385-.668-.521-.822-.135-.155-.2-.356-.144-.447.057-.091.015-.22-.092-.287-.133-.081-.152-.045-.059.114.075.129-.232-.156-.682-.632-.817-.863-1.936-1.717-2.25-1.717-.09 0-.337-.113-.548-.251-.871-.571-4.281-1.155-5.688-.974m52.083.015c-2.194.098-5.622.856-7.057 1.562-.353.173-.728.316-.834.318-.106.002-.38.15-.609.33-.229.179-.548.327-.708.329-.161.002-.292.067-.292.144 0 .077-.196.229-.436.339-1.039.473-4.897 4.072-4.897 4.567 0 .074-.133.277-.295.451-.357.383-1.705 2.946-1.705 3.241 0 .116-.116.442-.257.726-.141.283-.321.838-.399 1.234l-.141.719-.046-1c-.147-3.177-.239 5.18-.153 13.779l.101 10.054.05-7.5c.032-4.761.102-7.226.193-6.75.183.966.676 2.341 1.036 2.89.155.238.284.528.286.646.002.118.15.402.33.631.179.229.327.472.329.539.015.499 2.637 3.428 3.921 4.381.366.272.704.532.75.579.301.305.872.719.785.57-.057-.1.511.138 1.263.528 8.938 4.634 20.558 2.307 25.869-5.181 4.28-6.033 4.206-14.925-.171-20.66-.618-.809-.706-1.008-.371-.835.242.124-.378-.461-1.86-1.755-.577-.504-1.135-.946-1.241-.983a.681.681 0 0 1-.295-.226c-.24-.368-4.249-2.457-4.714-2.457-.123 0-.499-.115-.835-.255-1.292-.54-5.378-1.053-7.597-.955m102.083.035c-2.024.245-4.159.953-5.433 1.802-1.215.81-1.21.809-2.442.743l-1.208-.064v-1.806h-11.167l-.026 6.375c-.014 3.506-.001 6.487.03 6.625.223.995.153 11.448-.081 12.032-.29.725-.329 1.006-.089.634.106-.165.162 1.26.164 4.184l.002 4.435 5.625-.072c3.094-.039 5.715-.099 5.824-.133.151-.047.212-2.28.251-9.113l.051-9.051.438-1.179c1.425-3.842 5.184-5.9 8.314-4.554 1.828.787 1.826.773 1.829 13.55l.002 10.651 1.776-.109c.976-.06 3.567-.109 5.755-.109h3.98l-.056-12.791c-.064-14.641-.098-14.935-1.991-17.592-.209-.293-.381-.593-.381-.666 0-.331-2.118-2.006-3.209-2.539-1.975-.962-5.616-1.536-7.958-1.253m69.917-.035c-2.501.109-6.274 1.061-8.231 2.078-2.028 1.053-3.253 1.942-4.686 3.401-1.753 1.786-1.705 1.726-2.543 3.166-.207.357-.445.76-.528.898-.33.544-.845 1.688-.845 1.877 0 .11-.145.576-.322 1.036-1.004 2.609-.989 8.112.029 11.17.321.964 1.724 3.913 1.944 4.084.058.045.239.291.4.544.762 1.197 3.9 4.122 4.422 4.122.085 0 .279.19.431.422.153.232.346.38.429.328.084-.052.662.16 1.285.471 6.47 3.233 15.086 2.677 21.124-1.362 8.091-5.413 9.844-17.065 3.779-25.126-.283-.376-.477-.722-.431-.768.047-.046-.049-.188-.211-.316-.275-.215-.278-.209-.046.091.137.178-.275-.198-.917-.835-1.288-1.278-2.595-2.204-4.518-3.203-2.6-1.35-7.074-2.23-10.565-2.078m-43.126.364c-2.885.62-4.868 1.684-6.868 3.685-1.007 1.006-1.446 1.564-2.298 2.913-.364.578-1.051 2.13-1.401 3.164-.185.55-.411 1.09-.502 1.2-.09.11-.145.372-.121.583.024.211-.055 1.054-.175 1.874-.246 1.673-.157 5.959.143 6.926.117.375.195 3.338.22 8.333l.039 7.751.086-7c.085-6.894.091-6.987.371-6.118.324 1.004 1.533 3.482 1.892 3.879.132.146.24.328.24.405 0 .161.083.256 1.649 1.876.643.664 1.22 1.208 1.283 1.208.064 0 .525.356 1.026.792 1.201 1.044 2 1.599 1.042.723l-.75-.686.75.417c4.622 2.568 11.676 1.992 14.782-1.207l.551-.568-.002 1.723c-.003 1.988-.013 2.012-1.002 2.461-.41.186-.648.339-.529.341.119.002.438-.11.708-.25 1.139-.589-.228 2.02-1.446 2.76-.355.216-.683.441-.729.501-1.199 1.549-8.858 1.095-12.938-.766-1.103-.503-1.263-.431-1.691.759a408.46 408.46 0 0 1-.694 1.917c-.168.458-.4 1.095-.516 1.416a19.46 19.46 0 0 1-.356.917c-1.382 3.172-1.299 3.676.716 4.328 6.249 2.023 10.433 2.518 14.979 1.775 7.797-1.274 12.624-5.261 14.456-11.938l.457-1.665.049-16.042.049-16.041 1.12-.032 1.119-.033-1.041-.059-1.042-.059v-1.817h-11.026l.054 1.227.055 1.228-.666-.536c-1.277-1.028-3.135-1.847-5.151-2.273-1.923-.406-4.983-.402-6.892.008m94.376.768c-1.446.229-3.28.784-3.869 1.169-.203.133-.449.242-.545.242-.146 0-1.009.509-1.753 1.034-2.369 1.672-4.318 4.125-5.6 7.049-3.013 6.874-1.058 15.468 4.72 20.748.942.862 1.489 1.321 1.214 1.02l-.5-.548 1.035.614c7.304 4.332 17.056 2.24 21.605-4.635 3.895-5.887 3.75-15.206-.32-20.518-.345-.45-.521-.762-.391-.692.484.261-2.513-2.526-3.208-2.983-.397-.261-.91-.602-1.141-.758a3.81 3.81 0 0 0-.834-.411c-.227-.07-.505-.201-.617-.29-.112-.09-.449-.226-.75-.304-.3-.077-.884-.249-1.296-.382-1.918-.616-5.168-.765-7.75-.355m62.409-.012c-.6.108-1.342.323-1.65.477-.308.154-.642.279-.743.279-.337 0-2.675 1.598-3.349 2.289-1.535 1.572-2.539 3.463-2.756 5.194-.228 1.811-.285 2.844-.154 2.763.068-.042.127.091.131.297.006.392.656 3.149.681 2.893.015-.15.681.624.681.792 0 .133 1.068 1.215 2.5 2.533.688.632.965.845.617.471l-.633-.679 1.133.555c1.099.538 2.678.98 6.133 1.718 3.275.699 5.639 1.854 5.348 2.612-.048.126-.03.229.04.229.432 0 .641 1.671.336 2.689-.858 2.863-6.639 4.009-9.2 1.825-.17-.145-.342-.241-.382-.214-.244.168-1.855-1.676-1.966-2.25-.033-.175-.181-.605-.327-.954-.146-.35-.266-.823-.266-1.051 0-.329-.059-.389-.291-.293-.161.067-.592.219-.959.338-.366.119-1.175.404-1.796.633l-1.131.418.082-.612c.076-.576.07-.571-.101.091-.155.599-.271.731-.785.895-.86.274-.882.323-.587 1.316.146.492.29 1.02.319 1.172.057.295.472 1.095.992 1.914.358.562.78 1.046 1.495 1.712 2.078 1.938 2.6 2.407 3.026 2.721.268.197.074-.025-.43-.494l-.917-.852.75.403c8.577 4.608 18.895.105 18.88-8.24-.009-4.585-2.62-7.783-7.463-9.142-1.682-.472-4.119-1.034-4.46-1.029-1.744.026-4.426-1.358-4.975-2.568-1.981-4.361 5.019-7.623 9.074-4.229.797.668 1.944 2.653 1.944 3.366 0 .548.175.632.816.39.443-.167.561-.159.702.047.136.198.152.181.081-.085-.076-.282.069-.393.947-.722 2.44-.914 3.287-1.251 3.287-1.31 0-.282-1.104-2.826-1.444-3.326-.236-.348-.308-.532-.159-.409.559.464.238.014-.605-.848-2.259-2.309-4.102-3.299-6.944-3.731-1.828-.277-3.978-.275-5.522.006m-84.531 19.131-.045 18.375-.371.797c-.723 1.553-2.301 2.268-4.543 2.06l-1.169-.109v2.733c0 3.197-.241 2.892 2.404 3.043 5.215.298 8.4-1.891 9.714-6.677.251-.913.284-2.88.335-19.805l.057-18.792h-6.338l-.044 18.375M182.667 32.267c0 .055-.35.487-.777.959-.427.471-.922 1.101-1.1 1.399-.177.298-.334.542-.348.542-.014 0-.001-.675.028-1.5l.054-1.5h1.071c.589 0 1.072.045 1.072.1M296.914 51.25c0 9.992.02 14.104.044 9.138.025-4.966.025-13.141 0-18.167-.024-5.026-.044-.963-.044 9.029m-95.247-17.365c0 .029.243.273.541.542l.542.49-.49-.542c-.456-.505-.593-.618-.593-.49m185.304 1.907c.179.252.499.608.71.791.211.184.09-.023-.268-.458-.716-.872-.954-1.05-.442-.333M67.917 36c.142.275.296.5.342.5.045 0-.033-.225-.176-.5-.142-.275-.296-.5-.342-.5-.045 0 .033.225.176.5m97.243.708c.408.436.765.792.791.792.126 0-.007-.15-.743-.84l-.791-.743.743.791m111.757.125c.451.459.858.834.904.834.046 0-.286-.375-.738-.834-.451-.458-.858-.833-.904-.833-.046 0 .286.375.738.833m38.773-.569a9.203 9.203 0 0 1 4.393 2.155c.459.411.712.705.563.654-.149-.051.059.262.463.695 2.58 2.771 3.086 9.57 1.004 13.5-2.175 4.105-6.661 6.064-10.866 4.746-1.192-.373-2.58-1.027-2.58-1.214 0-.073-.104-.133-.23-.133s-.332-.132-.458-.292c-.212-.27-.204-.273.104-.045.338.251.262.124-.399-.663-.039-.046-.023.048.034.208.158.439-.11.351-.596-.194-2.438-2.737-3.423-6.718-2.724-11.014.97-5.959 5.681-9.465 11.292-8.403m34.237-.006c2.123.438 4.699 1.919 4.473 2.57-.046.135-.033.194.03.131.176-.176 1.006.958 1.558 2.125 1.877 3.972 1.648 8.941-.606 13.166-2.068 3.877-8.953 5.302-12.054 2.495-.15-.135-.31-.207-.357-.16-.401.401-2.622-2.768-3.318-4.734-3.059-8.644 2.569-17.185 10.274-15.593m12.493 1.558c.336.468.645.851.687.851.115 0-.919-1.467-1.121-1.593-.098-.06.098.274.434.742m-256.769-.233c.096.184.408.596.694.917.44.494.467.506.176.083-.529-.767-1.077-1.397-.87-1M278.5 38.667c.29.366.566.666.611.666.046 0-.154-.3-.444-.666-.291-.367-.566-.667-.612-.667-.046 0 .155.3.445.667M69.023 38.5c0 .137.065.4.144.583.09.21.143.241.143.084 0-.138-.065-.4-.143-.584-.091-.21-.144-.241-.144-.083m98.122.583c.09.184.286.484.435.667l.272.333-.164-.333a4.33 4.33 0 0 0-.435-.667l-.271-.333.163.333m-76.116.483c1.435.507 3.26 1.768 3.049 2.109-.042.068.033.165.165.216.133.051.412.415.62.809 2.458 4.657 1.051 10.122-3.094 12.02-3.626 1.66-8.128.138-9.767-3.302-3.203-6.721 2.468-14.167 9.027-11.852m60.428.024c1.06.393 3.18 1.829 2.986 2.022-.047.047.098.291.321.541 2.48 2.783 2.175 8.367-.61 11.171-2.325 2.342-7.425 2.797-9.036.805l-.307-.379.195.397c.184.373.176.383-.127.166-7.414-5.277-1.804-17.83 6.578-14.723m73.324-.093c.516.181 1.171.491 1.454.689.543.378 1.528 1.489 1.098 1.239-.137-.08-.084.037.119.261 1.412 1.553 1.54 6.464.239 9.124-1.752 3.58-7.787 3.768-9.97.311-1.786-2.829-1.815-7.655-.059-9.865 1.524-1.918 4.544-2.664 7.119-1.759m38.253.054c1.822.667 3.394 2.013 4.098 3.51 1.933 4.11.999 8.829-2.172 10.974-2.246 1.521-5.078 1.828-7.162.777-.34-.172-.734-.312-.876-.312-.614 0-2.513-2.205-3.086-3.583-2.75-6.616 2.946-13.655 9.198-11.366m46.283.824c-.414.39-.857.858-.986 1.042-.128.183.026.07.342-.25.315-.321.799-.787 1.075-1.035.276-.249.461-.455.412-.459-.05-.003-.429.312-.843.702M112 40.75v.917h-1.833v-1.834H112v.917m-22.625.365c.16.042.423.042.583 0 .161-.042.029-.076-.291-.076-.321 0-.452.034-.292.076m2.333 0c.161.042.423.042.584 0 .16-.042.029-.076-.292-.076s-.452.034-.292.076m58 0c.161.042.423.042.584 0 .16-.042.029-.076-.292-.076s-.452.034-.292.076m2.334 0c.16.042.423.042.583 0 .16-.042.029-.076-.292-.076s-.452.034-.291.076m71 0c.16.042.423.042.583 0 .16-.042.029-.076-.292-.076s-.452.034-.291.076m2.585.003c.207.04.507.038.667-.003.159-.042-.011-.075-.377-.073-.367.002-.497.036-.29.076m35.748-.003c.16.042.423.042.583 0 .161-.042.029-.076-.291-.076-.321 0-.452.034-.292.076m2.5 0c.16.042.423.042.583 0 .161-.042.029-.076-.291-.076-.321 0-.452.034-.292.076m108.675.718c0 .504.031.711.069.459a3.608 3.608 0 0 0 0-.917c-.038-.252-.069-.046-.069.458m-29.841-.125c-.236.298-.567.959-.481.959.04 0 .227-.263.417-.584.344-.583.375-.768.064-.375m-196.158.838c-.384.295-.867.762-1.073 1.037-.281.376-.19.326.365-.2.407-.385.928-.851 1.157-1.036.68-.549.309-.384-.449.199m111.022.662-.49.542.542-.49c.505-.456.618-.593.49-.593-.029 0-.273.243-.542.541m-226.007.167c-.511.554-1.109 1.343-.79 1.042.356-.336 1.427-1.584 1.359-1.584-.038 0-.294.244-.569.542m20.34 0-.489.542.541-.49c.505-.456.619-.594.49-.594-.029 0-.273.244-.542.542m229.117-.042c0 .138.065.4.144.584.09.21.143.241.143.083 0-.138-.065-.4-.143-.583-.091-.21-.144-.241-.144-.084m-172 .167c0 .137.065.4.144.583.09.21.143.241.143.084 0-.138-.065-.4-.143-.584-.091-.21-.144-.241-.144-.083m76.455.124c-.592.714-.667.915-.155.414.307-.301.522-.582.477-.626-.044-.045-.189.051-.322.212m71.087.798c-.152.232-.247.452-.209.489.037.037.193-.153.348-.422.344-.599.242-.649-.139-.067m84.542.946a2.88 2.88 0 0 0-.088.715c.008.184.083.041.167-.316.163-.693.093-1.042-.079-.399m-85.345.727c-.061.244-.079.476-.04.516.039.039.121-.129.183-.373.061-.244.079-.476.04-.515-.039-.04-.122.128-.183.372m26.022.738c.051.688.12 1.282.154 1.32.117.131.043-1.236-.102-1.903-.108-.494-.121-.343-.052.583M109.75 49.25c0 1.833.051 2.996.113 2.583.062-.412.112-1.575.112-2.583 0-1.008-.05-2.171-.112-2.583-.062-.413-.113.75-.113 2.583m108.811-1.5c0 .917.028 1.27.062.786s.033-1.234-.001-1.667c-.034-.432-.062-.036-.061.881m113.232.417c.047 1.146.113 2.114.147 2.152.108.125.03-2.378-.103-3.319-.083-.581-.099-.153-.044 1.167m-188.02-1.132c-.056.21-.093.644-.083.965.014.445.05.367.151-.333.139-.962.106-1.278-.068-.632m-94.023.632c-.064.379-.081.724-.039.766.043.043.128-.234.189-.616s.079-.727.039-.767c-.04-.04-.125.238-.189.617m256.303 1.5c0 .595.031.839.068.541a5.297 5.297 0 0 0 0-1.083c-.037-.298-.068-.054-.068.542m-122.946.52c-.059.566-.091 4.524-.072 8.796l.035 7.767.09-8.75c.049-4.812.082-8.77.072-8.795-.009-.025-.065.417-.125.982m-153.999.418c-.059.703-.093 4.624-.074 8.712l.033 7.433.093-8.667c.051-4.766.085-8.686.075-8.711-.011-.025-.068.53-.127 1.233m114.575.409c.009.313.079.757.156.986.09.269.105.092.044-.5-.108-1.049-.224-1.331-.2-.486m138.091.969c-.063.678-.082 1.265-.042 1.304.104.104.318-2.052.231-2.316-.041-.122-.126.334-.189 1.012m49.94-.233c.002.458.034.626.072.373a2.94 2.94 0 0 0-.002-.834c-.04-.205-.071.003-.07.461m9.298.597c.006.222.079.553.162.736.106.233.121.132.05-.333-.118-.774-.229-.985-.212-.403m-85.343.084c.002.175.079.431.172.569.123.183.139.115.057-.25-.137-.613-.232-.746-.229-.319M84.417 53.833c.142.275.296.5.342.5.045 0-.033-.225-.176-.5-.142-.275-.296-.5-.342-.5-.045 0 .033.225.176.5m305.288.667c0 .321.035.452.077.292a1.402 1.402 0 0 0 0-.584c-.042-.16-.077-.029-.077.292m-280.61.095c-.061.244-.079.476-.04.516.039.039.122-.129.183-.373s.079-.476.04-.515c-.039-.04-.121.128-.183.372m172 .167c-.061.244-.079.476-.04.515.039.04.122-.128.183-.372s.079-.476.04-.516c-.039-.039-.121.129-.183.373m89.686.013c.201.043.399.225.439.404.058.254.069.242.052-.051-.016-.278-.132-.385-.439-.405-.347-.023-.355-.014-.052.052m19.104 1.308c.001.55.032.755.069.456.037-.3.036-.75-.002-1-.038-.251-.068-.006-.067.544M167.167 59.25c-.284.413-.479.75-.433.75.046 0 .316-.337.599-.75.284-.413.479-.75.433-.75-.046 0-.316.337-.599.75m110.175 1.798c-.775.844-1.158 1.31-.852 1.035.962-.863 2.523-2.603 2.311-2.577-.028.004-.685.698-1.459 1.542m-172.508.425c-.962.978-1.375 1.465-.917 1.083.771-.643 1.396-1.274 2.407-2.431.794-.908.227-.395-1.49 1.348m222.012.004c-1.73 1.766-1.638 1.779.208.027.804-.762 1.784-1.889 1.582-1.819-.029.01-.834.816-1.79 1.792m33.982.481-.911.959.958-.911c.89-.847 1.035-1.006.911-1.006-.026 0-.457.431-.958.958m26.084.746c-.639.662-.937 1.019-.662.793.714-.587 2.052-1.997 1.896-1.997-.039 0-.595.542-1.234 1.204m-309.004-.052c.125.203 1.592 1.236 1.592 1.122 0-.042-.383-.351-.851-.687-.468-.336-.801-.532-.741-.435m61.842 1.101c.183.149.483.345.667.435l.333.164-.333-.272a4.33 4.33 0 0 0-.667-.435l-.333-.163.333.271m204 0c.183.149.483.345.667.435l.333.164-.333-.272a4.33 4.33 0 0 0-.667-.435l-.333-.163.333.271m-91.75.322c0 .046.225.199.5.342.275.142.5.221.5.175 0-.046-.225-.2-.5-.342-.275-.142-.5-.221-.5-.175m-170.667.814c0 .043.242.163.538.266.296.103.465.119.375.035-.19-.178-.913-.416-.913-.301m137.917.102c.507.138 2.03.228 1.903.113-.038-.035-.595-.105-1.236-.156-.736-.059-.982-.043-.667.043M224 65l-.75.117.667.005c.366.003.891-.052 1.166-.122.667-.17.008-.17-1.083 0m17.872.5c0 .321.034.452.076.292a1.37 1.37 0 0 0 0-.584c-.042-.16-.076-.029-.076.292m-143.789.167c-.21.09-.241.143-.083.143.138 0 .4-.065.583-.143.21-.091.241-.144.084-.144-.138 0-.4.065-.584.144m214.084-.009c.416.142 1.45.23 1.319.113-.038-.034-.444-.105-.903-.158-.562-.065-.697-.05-.416.045m6.416.009c-.446.113-.455.127-.083.127.229 0 .642-.057.917-.127.446-.114.455-.128.083-.128a4.54 4.54 0 0 0-.917.128m34 0c-.805.11-.81.115-.166.131a7.08 7.08 0 0 0 1.333-.122c.851-.176.092-.182-1.167-.009m22.084-.009c.416.142 1.45.23 1.319.113-.038-.034-.444-.105-.903-.158-.562-.065-.697-.05-.416.045m6.25.009-.5.127.5.008c.275.004.65-.057.833-.135l.333-.144-.333.008a4.784 4.784 0 0 0-.833.136m-31.792.117c.206.04.544.04.75 0 .206-.039.037-.072-.375-.072-.413 0-.581.033-.375.072m-263.875.549c.183.079.483.141.667.139.268-.004.251-.031-.084-.139-.57-.182-1.008-.182-.583 0m10.583 0c-.33.106-.347.134-.083.134.183 0 .521-.06.75-.134.33-.105.347-.133.083-.133-.183 0-.52.06-.75.133m49.75 0c.184.079.484.144.667.144h.333l-.333-.144a2.042 2.042 0 0 0-.667-.143h-.333l.333.143m10.584 0c-.33.106-.348.134-.084.134.184 0 .521-.06.75-.134.33-.105.348-.133.084-.133-.184 0-.521.06-.75.133m101.083 0c.183.079.483.141.667.139.268-.004.251-.031-.084-.139-.57-.182-1.008-.182-.583 0m10.667 0c-.425.183.013.183.583 0 .335-.107.351-.134.083-.138a1.958 1.958 0 0 0-.666.138m-178.292.624c.665.032 1.752.032 2.417 0 .664-.032.12-.057-1.209-.057-1.329 0-1.873.025-1.208.057m60.333 0c.665.032 1.752.032 2.417 0 .665-.032.121-.057-1.208-.057-1.33 0-1.873.025-1.209.057m111.743 0c.615.032 1.665.032 2.333 0 .669-.031.166-.058-1.117-.058-1.284 0-1.831.026-1.216.058m-20.606 1.972c-.061.244-.079.476-.04.515.039.039.122-.128.183-.373.061-.244.079-.476.04-.515-.039-.039-.121.128-.183.373m55.331 2.83c-.063.335-.081.642-.04.682.041.041.125-.199.188-.534.063-.334.081-.641.04-.682-.041-.041-.125.2-.188.534m-58.931 3.033-1.078 1.125 1.125-1.079c.618-.593 1.125-1.099 1.125-1.125 0-.123-.17.034-1.172 1.079m56.578 1.416-.49.542.542-.49c.298-.269.542-.512.542-.541 0-.129-.138-.016-.594.489m-80.823 2.125c.183.079.446.144.583.144.158 0 .127-.053-.083-.144a1.854 1.854 0 0 0-.583-.143c-.158 0-.127.053.083.143m72.176.022c.27.058 1.353.106 2.407.106s2.138-.048 2.408-.106c.269-.058-.814-.105-2.408-.105-1.593 0-2.677.047-2.407.105M215.417 79c.183.079.483.141.666.138.268-.004.252-.031-.083-.138-.57-.183-1.008-.183-.583 0m14.5 0c-.21.09-.241.143-.084.143.138 0 .4-.064.584-.143.21-.09.241-.143.083-.143-.138 0-.4.064-.583.143m-11.334.676c.367.076.855.134 1.084.129.267-.007.177-.059-.25-.148-.367-.076-.854-.133-1.084-.128-.267.006-.177.059.25.147m8.084-.009c-.443.093-.483.125-.167.135.229.007.717-.05 1.083-.126.556-.115.584-.137.167-.135a6.568 6.568 0 0 0-1.083.126"
        />
        <use xlinkHref="#a" />
        <use xlinkHref="#a" />
        <use xlinkHref="#a" />
        <use xlinkHref="#a" />
      </g>
    </svg>
  ),
};

const ExperienceItem: FC<ExperienceItemProps> = ({
  company,
  duration,
  isLast,
  jobTitle,
  links,
  responsibilities,
  isSamePrevCompany,
  isSameNextCompany,
}) => {
  return (
    <div className="max-w-full px-6 pt-6 ">
      <div className="pb-2">
        <div className="flex flex-col justify-between items-center">
          {!isSamePrevCompany && (
            <div className="flex flex-col sm:flex-row gap-4 w-full items-center">
              {CompanyLogos[company]}
              <h4 className="text-lg text-center sm:text-left w-full font-bold">
                {company}
              </h4>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-2 mb-2 justify-between w-full text-gray-600">
            <p className="text-md italic text-gray-600">{jobTitle}</p>
            <p>{duration}</p>
          </div>
        </div>
      </div>
      <div className={`${isLast ? "mb-4" : ""}`}>
        <ul className="list-disc sm:pl-4 list-inside space-y-2 text-gray-700">
          {responsibilities?.map((responsibility: string) => (
            <li key={responsibility}>
              <Markdown
                className="inline"
                components={{
                  p: ({ node, ...props }) => <span {...props} />,
                }}
                rehypePlugins={[rehypeRaw]}
              >
                {responsibility}
              </Markdown>
            </li>
          ))}

          {links && links.web ? (
            <li className=" list-none">
              <Link
                className="text-wrap break-words hover:underline text-violet-600"
                href={links?.web}
              >
                {links?.web}
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
      {!isLast && !isSamePrevCompany && !isSameNextCompany && (
        <Separator className="mt-4" />
      )}
    </div>
  );
};

export default ExperienceItem;
