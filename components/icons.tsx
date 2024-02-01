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
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      fill="#CB0001"
      stroke="none"
    >
      <path
        d="M2395 4674 c-16 -2 -72 -9 -124 -15 -201 -23 -436 -95 -646 -198
-552 -270 -971 -786 -1119 -1380 -46 -184 -60 -302 -61 -516 0 -217 10 -309
55 -500 178 -756 784 -1371 1539 -1559 978 -245 1987 225 2426 1129 99 203
154 377 191 610 23 137 25 464 5 605 -99 700 -542 1308 -1176 1615 -292 142
-549 203 -880 210 -99 2 -193 2 -210 -1z m312 -934 c306 -40 513 -268 513
-565 0 -96 -18 -172 -61 -257 -36 -70 -121 -165 -193 -214 l-49 -33 54 -24
c118 -53 230 -160 290 -279 162 -321 -21 -716 -381 -825 -48 -14 -133 -17
-647 -20 l-593 -4 0 1115 0 1116 498 0 c273 0 529 -5 569 -10z m1166 -1596
c60 -20 139 -92 168 -152 17 -35 23 -65 24 -117 0 -117 -58 -209 -168 -267
-65 -35 -173 -32 -250 6 -64 31 -126 100 -148 163 -18 52 -15 160 5 206 32 72
113 145 186 168 43 13 135 10 183 -7z"
      />
    </g>
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
      width="17"
      height="17"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 14.5V18H1V7L9 2L17 7V18H11.5V14.5C11.5 13.1193 10.3807 12 9 12C7.6193 12 6.5 13.1193 6.5 14.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

export const FavIcon = ({
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
        height="22"
        viewBox="0 0 24 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.4052 7.31329L12.0002 0.177734L8.59533 7.31329L0.756836 8.34655L6.49098 13.7898L5.05144 21.564L12.0002 17.7926L18.9491 21.564L17.5095 13.7898L23.2437 8.34655L15.4052 7.31329Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2.5L14.792 8.15717L21.035 9.06434L16.5175 13.4678L17.584 19.6857L12 16.75L6.41604 19.6857L7.48248 13.4678L2.96497 9.06434L9.20802 8.15717L12 2.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const SettingsIcon = ({
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
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.85498 2.58067L8.5754 0H11.4246L13.145 2.58067L15.9478 1.93388L18.0661 4.05225L17.4193 6.85498L20 8.5754V11.4246L17.4193 13.145L18.0661 15.9478L15.9478 18.0661L13.145 17.4193L11.4246 20H8.5754L6.85498 17.4193L4.05225 18.0661L1.93388 15.9478L2.58067 13.145L0 11.4246V8.5754L2.58067 6.85498L1.93388 4.05225L4.05225 1.93388L6.85498 2.58067ZM6.5 10C6.5 8.067 8.067 6.5 10 6.5C11.933 6.5 13.5 8.067 13.5 10C13.5 11.933 11.933 13.5 10 13.5C8.067 13.5 6.5 11.933 6.5 10Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.3 3.7L4.375 3.025L3.025 4.375L3.7 7.3L1 9.1V10.9L3.7 12.7L3.025 15.625L4.375 16.975L7.3 16.3L9.1 19H10.9L12.7 16.3L15.625 16.975L16.975 15.625L16.3 12.7L19 10.9V9.1L16.3 7.3L16.975 4.375L15.625 3.025L12.7 3.7L10.9 1H9.1L7.3 3.7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

export const TagsIcon = ({
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
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 10.4142V0H10.4142L20.4142 10L10 20.4142L0 10.4142ZM5.5 7C6.32843 7 7 6.32843 7 5.5C7 4.67157 6.32843 4 5.5 4C4.67157 4 4 4.67157 4 5.5C4 6.32843 4.67157 7 5.5 7Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.4 5.5H5.6M6 5.5C6 5.77614 5.77614 6 5.5 6C5.22386 6 5 5.77614 5 5.5C5 5.22386 5.22386 5 5.5 5C5.77614 5 6 5.22386 6 5.5ZM1 1V10L10 19L19 10L10 1H1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
};
