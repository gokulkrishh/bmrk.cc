export function ExternalLinkIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function GoogleIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`${className} mr-2`}
      width="18"
      height="18"
      viewBox="0 0 256 262"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        fill="#4285F4"
      />
      <path
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        fill="#34A853"
      />
      <path
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
        fill="#FBBC05"
      />
      <path
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        fill="#EB4335"
      />
    </svg>
  );
}

export const MoreIcon = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <g>
      <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
    </g>
  </svg>
);

export const Logo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="512"
    height="512"
    fill="none"
    viewBox="0 0 512 512"
  >
    <g clipPath="url(#clip0_6_3)">
      <g filter="url(#filter0_dddddd_6_3)">
        <circle cx="256" cy="256" r="212" fill="#CB0001"></circle>
      </g>
      <path
        fill="#fff"
        d="M257.205 137.28c14.08 0 25.28 2.133 33.6 6.4 10.027 5.12 17.707 12.16 23.04 21.12 5.547 8.96 8.32 18.987 8.32 30.08 0 10.453-2.773 20.16-8.32 29.12-5.547 8.747-13.12 15.68-22.72 20.8 11.52 4.053 21.227 11.093 29.12 21.12 7.893 10.027 11.84 21.333 11.84 33.92 0 11.093-2.88 21.333-8.64 30.72-5.547 9.173-13.013 16.427-22.4 21.76-4.693 2.56-9.92 4.48-15.68 5.76-5.76 1.28-13.44 1.92-23.04 1.92h-98.56V137.28h93.44zM348.405 324.68c0-7.893 2.773-14.613 8.32-20.16 5.76-5.76 12.693-8.64 20.8-8.64 8.107 0 14.933 2.88 20.48 8.64 5.76 5.547 8.64 12.267 8.64 20.16 0 7.893-2.88 14.72-8.64 20.48-5.547 5.76-12.373 8.64-20.48 8.64-7.893 0-14.72-2.88-20.48-8.64-5.76-5.76-8.64-12.587-8.64-20.48z"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_dddddd_6_3"
        width="584"
        height="584"
        x="-36"
        y="-40"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="-0.111"></feOffset>
        <feGaussianBlur stdDeviation="1.107"></feGaussianBlur>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_6_3"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="-0.266"></feOffset>
        <feGaussianBlur stdDeviation="2.66"></feGaussianBlur>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0503198 0"></feColorMatrix>
        <feBlend
          in2="effect1_dropShadow_6_3"
          result="effect2_dropShadow_6_3"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="-0.501"></feOffset>
        <feGaussianBlur stdDeviation="5.009"></feGaussianBlur>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0417275 0"></feColorMatrix>
        <feBlend
          in2="effect2_dropShadow_6_3"
          result="effect3_dropShadow_6_3"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="-0.893"></feOffset>
        <feGaussianBlur stdDeviation="8.935"></feGaussianBlur>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.035 0"></feColorMatrix>
        <feBlend
          in2="effect3_dropShadow_6_3"
          result="effect4_dropShadow_6_3"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="-1.671"></feOffset>
        <feGaussianBlur stdDeviation="16.711"></feGaussianBlur>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0282725 0"></feColorMatrix>
        <feBlend
          in2="effect4_dropShadow_6_3"
          result="effect5_dropShadow_6_3"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="-4"></feOffset>
        <feGaussianBlur stdDeviation="40"></feGaussianBlur>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0196802 0"></feColorMatrix>
        <feBlend
          in2="effect5_dropShadow_6_3"
          result="effect6_dropShadow_6_3"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect6_dropShadow_6_3"
          result="shape"
        ></feBlend>
      </filter>
      <clipPath id="clip0_6_3">
        <path fill="#fff" d="M0 0H512V512H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export const HomeIcon = ({
  className,
  isActive,
}: {
  className: string;
  isActive?: boolean;
}) => {
  if (isActive) {
    return (
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 0.8208L0 6.4458V19H6.5V14.5C6.5 13.1193 7.6193 12 9 12C10.3807 12 11.5 13.1193 11.5 14.5V19H18V6.4458L9 0.8208Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H8.2C8.48003 21 8.62004 21 8.727 20.9455C8.82108 20.8976 8.89757 20.8211 8.9455 20.727C9 20.62 9 20.48 9 20.2V13.6C9 13.0399 9 12.7599 9.10899 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75992 12 10.0399 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V20.2C15 20.48 15 20.62 15.0545 20.727C15.1024 20.8211 15.1789 20.8976 15.273 20.9455C15.38 21 15.52 21 15.8 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
