import { cn } from 'lib/utils';

import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

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
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={'currentColor'}
    fill={'none'}
  >
    <path
      d="M11.9959 12H12.0049"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.9998 12H18.0088"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.99981 12H6.00879"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Logo = ({ className }: { className?: string }) => (
  <svg
    className={cn('rounded-full sm:mt-1', className)}
    width="686"
    height="686"
    viewBox="0 0 686 686"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="686" height="686" fill="#CB0001" />
    <path
      d="M450.854 342.973C450.845 342.981 450.856 342.996 450.867 342.99C479.108 326.591 498.043 296.557 498.043 262.152C498.111 211.967 457.863 171.122 407.205 168.273C407.133 168.269 407.076 168.209 407.076 168.136V168.136C407.076 168.061 407.015 168 406.939 168H267C229.288 168 210.431 168 198.716 179.716C187 191.431 187 210.288 187 248V438C187 475.712 187 494.569 198.716 506.284C210.431 518 229.288 518 267 518H406.939C407.015 518 407.076 517.939 407.076 517.864V517.864C407.076 517.791 407.133 517.731 407.205 517.727C457.863 514.878 498.111 474.033 498.111 423.848C498.111 389.415 479.078 359.361 450.867 342.971C450.863 342.969 450.857 342.969 450.854 342.973V342.973Z"
      fill="#FFEEE9"
    />
    <path
      d="M224.5 281.785V191C224.5 172.144 224.5 162.716 230.358 156.858C236.216 151 245.644 151 264.5 151H313.491C332.347 151 341.775 151 347.633 156.858C353.491 162.716 353.491 172.144 353.491 191V281.584C353.491 296.97 353.491 304.663 348.494 307.55C343.497 310.438 336.832 306.595 323.502 298.911L299.303 284.961C294.455 282.167 292.031 280.769 289.369 280.762C286.706 280.756 284.275 282.141 279.413 284.911L254.401 299.162C241.101 306.74 234.451 310.529 229.475 307.638C224.5 304.746 224.5 297.093 224.5 281.785Z"
      fill="#FF652F"
    />
  </svg>
);

export const ExtensionsIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="44"
    height="44"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
  </svg>
);

export const EmptyBookmarkState = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col h-80 justify-center items-center">
      <svg
        className={cn('text-primary w-10 h-10', className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        color={'currentColor'}
        fill={'none'}
      >
        <path
          d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="text-primary mt-3 tracking-wide font-medium">
        You don{"'"}t have any bookmarks yet!
      </h3>
      <p className="mt-1 text-sm text-muted-foreground text-center">
        Just paste or type the url in input box above.
      </p>
    </div>
  );
};

export const EmptyFavoriteState = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col h-80 justify-center items-center">
      <FavIcon className="text-primary w-10 h-10" />
      <h3 className="text-primary mt-3 tracking-wide font-medium">
        No favorites yet!
      </h3>
      <p className="mt-1 text-sm text-muted-foreground text-center">
        To add favorite, click star icon in the bookmark.
      </p>
    </div>
  );
};

export const EmptyTagState = ({
  className,
  tagName,
}: {
  className?: string;
  tagName: string;
}) => {
  return (
    <div
      className={`flex flex-col h-80 justify-center items-center px-4 text-center ${className}`}
    >
      <TagsIcon className="text-primary w-10 h-10" />
      <h3 className="text-primary mt-3 tracking-wide font-medium">
        You don{"'"}t any bookmarks on {tagName} tag yet!
      </h3>
      <p className="mt-1 text-sm text-muted-foreground text-center">
        Assign this tag to your bookmarks to see it here.
      </p>
    </div>
  );
};

export const EmptyBookmarkSharedState = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className="flex flex-col h-80 justify-center items-center">
      <svg
        className={cn('text-primary w-10 h-10', className)}
        width="20"
        height="26"
        viewBox="0 0 20 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 20.2782V6.20199C0 3.27834 0 1.81652 0.90826 0.90826C1.81652 0 3.27834 0 6.20198 0H13.798C16.7217 0 18.1835 0 19.0917 0.90826C20 1.81652 20 3.27834 20 6.20199V20.247C20 22.6326 20 23.8254 19.2252 24.2731C18.4504 24.7207 17.417 24.125 15.3503 22.9336L15.3503 22.9336L11.5982 20.7706C10.8465 20.3373 10.4707 20.1207 10.0579 20.1196C9.64508 20.1186 9.26816 20.3333 8.51433 20.7628L8.51432 20.7629L4.63614 22.9725C2.57394 24.1475 1.54284 24.735 0.771421 24.2867C0 23.8383 0 22.6516 0 20.2782Z"
          fill="currentColor"
        />
      </svg>
      <h3 className="text-primary mt-3 tracking-wide font-medium">
        No Bookmarks
      </h3>
      <p className="mt-1 text-sm text-muted-foreground text-center">
        This tag doesn{"'"}t have any shared bookmarks yet!
      </p>
    </div>
  );
};

export const HouseGlassIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={'currentColor'}
    fill={'none'}
  >
    <path
      d="M17.2014 2H6.79876C5.341 2 4.06202 2.9847 4.0036 4.40355C3.93009 6.18879 5.18564 7.37422 6.50435 8.4871C8.32861 10.0266 9.24075 10.7964 9.33642 11.7708C9.35139 11.9233 9.35139 12.0767 9.33642 12.2292C9.24075 13.2036 8.32862 13.9734 6.50435 15.5129C5.14932 16.6564 3.9263 17.7195 4.0036 19.5964C4.06202 21.0153 5.341 22 6.79876 22L17.2014 22C18.6591 22 19.9381 21.0153 19.9965 19.5964C20.043 18.4668 19.6244 17.342 18.7352 16.56C18.3298 16.2034 17.9089 15.8615 17.4958 15.5129C15.6715 13.9734 14.7594 13.2036 14.6637 12.2292C14.6487 12.0767 14.6487 11.9233 14.6637 11.7708C14.7594 10.7964 15.6715 10.0266 17.4958 8.4871C18.8366 7.35558 20.0729 6.25809 19.9965 4.40355C19.9381 2.9847 18.6591 2 17.2014 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M9 21.6381C9 21.1962 9 20.9752 9.0876 20.7821C9.10151 20.7514 9.11699 20.7214 9.13399 20.6923C9.24101 20.509 9.42211 20.3796 9.78432 20.1208C10.7905 19.4021 11.2935 19.0427 11.8652 19.0045C11.955 18.9985 12.045 18.9985 12.1348 19.0045C12.7065 19.0427 13.2095 19.4021 14.2157 20.1208C14.5779 20.3796 14.759 20.509 14.866 20.6923C14.883 20.7214 14.8985 20.7514 14.9124 20.7821C15 20.9752 15 21.1962 15 21.6381V22H9V21.6381Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const RateLimitState = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col h-80 justify-center items-center">
      <HouseGlassIcon className="text-primary w-10 h-10" />
      <h3 className="text-primary mt-3 tracking-wide font-medium">
        Hold on, too many requests!
      </h3>
      <p className="mt-1 text-sm text-muted-foreground text-center">
        Wait for few seconds and refresh.
      </p>
    </div>
  );
};

export const PublicIcon = ({ className }: { className?: string }) => (
  <Tooltip>
    <TooltipTrigger>
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        color={'currentColor'}
        fill={'none'}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M21 15H3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 9H3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </TooltipTrigger>
    <TooltipContent>This tag has been shared publically</TooltipContent>
  </Tooltip>
);

export const NotFoundIcon = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col h-80 justify-center items-center">
      <h3 className="text-primary mt-3 tracking-wide text-xl font-medium">
        404
      </h3>
      <p className="mt-1 text-sm text-muted-foreground text-center">
        Could not find requested resource.
      </p>
    </div>
  );
};

export const HomeIcon = ({
  className,
  isActive,
}: {
  className?: string;
  isActive?: boolean;
}) => {
  if (isActive) {
    return (
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.10742 2.85356C10.0495 2.16435 10.9512 1.75 12 1.75C13.0488 1.75 13.9505 2.16435 14.8926 2.85357C15.8068 3.52238 16.8365 4.50981 18.1359 5.75572L18.1709 5.78932L20.75 8.17179V13.5565C20.75 15.3942 20.75 16.8498 20.5969 17.989C20.4392 19.1614 20.1071 20.1104 19.3588 20.8588C18.6104 21.6071 17.6614 21.9392 16.489 22.0969C15.3498 22.25 13.8942 22.25 12.0564 22.25H11.9435C10.1058 22.25 8.65018 22.25 7.51098 22.0969C6.33856 21.9392 5.38961 21.6071 4.64124 20.8588C3.89288 20.1104 3.56076 19.1614 3.40314 17.989C3.24997 16.8498 3.24998 15.3942 3.25 13.5564V13.5564V8.17179L5.82911 5.7893L5.86415 5.7557L5.86416 5.75569C7.16348 4.50979 8.19323 3.52238 9.10742 2.85356ZM11.9955 15.75C11.3076 15.75 10.75 16.3096 10.75 17C10.75 17.6904 11.3076 18.25 11.9955 18.25C12.6777 18.25 13.25 17.6883 13.25 17C13.25 16.3117 12.6777 15.75 11.9955 15.75Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.1407 4.26594C9.33333 4.85661 8.38869 5.75951 7.03526 7.05727L2.69211 11.2218C2.29347 11.604 1.66045 11.5907 1.27821 11.1921C0.895967 10.7935 0.909258 10.1604 1.30789 9.77821L5.70301 5.56386C6.99217 4.32768 8.03207 3.33052 8.9598 2.6518C9.92464 1.94593 10.8777 1.5 12 1.5C13.1223 1.5 14.0754 1.94593 15.0402 2.6518C15.9679 3.33053 17.0078 4.32768 18.297 5.56387L22.6921 9.77821C23.0907 10.1604 23.104 10.7935 22.7218 11.1921C22.3396 11.5907 21.7065 11.604 21.3079 11.2218L16.9647 7.05728C15.6113 5.75951 14.6667 4.85662 13.8593 4.26594C13.0766 3.69332 12.5345 3.5 12 3.5C11.4655 3.5 10.9234 3.69332 10.1407 4.26594Z"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      color="currentColor"
      fill="none"
    >
      <path
        d="M12 17H12.009"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 8.5V13.5C20 17.2712 20 19.1569 18.8284 20.3284C17.6569 21.5 15.7712 21.5 12 21.5C8.22876 21.5 6.34315 21.5 5.17157 20.3284C4 19.1569 4 17.2712 4 13.5V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M22 10.5L17.6569 6.33548C14.9902 3.77849 13.6569 2.5 12 2.5C10.3431 2.5 9.00981 3.77849 6.34315 6.33548L2 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const FavIcon = ({
  className,
  isActive,
}: {
  className?: string;
  isActive?: boolean;
}) => {
  if (isActive) {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        color={'currentColor'}
        fill={'none'}
      >
        <path
          d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SearchIcon = ({
  className,
  isActive,
}: {
  className?: string;
  isActive?: boolean;
}) => {
  if (isActive) {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        color={'currentColor'}
        fill={'none'}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7929 16.7929C17.1834 16.4024 17.8166 16.4024 18.2071 16.7929L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L16.7929 18.2071C16.4024 17.8166 16.4024 17.1834 16.7929 16.7929Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11ZM11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M17.5 17.5L22 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const TagsIcon = ({
  className,
  isActive,
}: {
  className?: string;
  isActive?: boolean;
}) => {
  if (isActive) {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        color={'currentColor'}
        fill={'none'}
      >
        <path
          d="M13.8143 6.55502C14.1922 6.37334 14.5706 6.25024 15 6.25024C15.4294 6.25024 15.8078 6.37334 16.1857 6.55502C16.5405 6.72561 16.9443 6.9734 17.4191 7.26476L18.4796 7.91546C18.9288 8.1911 19.3112 8.42569 19.6103 8.65215C19.9293 8.89368 20.1988 9.15821 20.3966 9.51535C20.5938 9.87166 20.6761 10.2416 20.7142 10.6422C20.75 11.0193 20.75 11.4737 20.75 12.0106L20.75 17.9608V17.9609C20.75 18.8814 20.7501 19.6456 20.6704 20.2516C20.5866 20.8888 20.4029 21.4628 19.9505 21.9255C19.4957 22.3906 18.9276 22.5816 18.2967 22.6684C17.7008 22.7503 16.9506 22.7503 16.053 22.7502H13.947C13.0494 22.7503 12.2992 22.7503 11.7033 22.6684C11.0724 22.5816 10.5043 22.3906 10.0496 21.9255C9.59709 21.4628 9.41338 20.8888 9.32962 20.2516C9.24995 19.6456 9.24997 18.8814 9.25 17.9609V17.9608V12.0106V12.0105C9.24999 11.4737 9.24997 11.0193 9.28582 10.6422C9.32388 10.2416 9.40619 9.87166 9.60345 9.51535C9.80118 9.15821 10.0707 8.89368 10.3897 8.65215C10.6888 8.42569 11.0711 8.19111 11.5204 7.91548L11.5204 7.91548L12.5809 7.26476C13.0557 6.97339 13.4595 6.72561 13.8143 6.55502Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.6184 7.2198C11.3249 7.26976 10.9532 7.36953 10.372 7.52719L9.24743 7.83222C8.69715 7.98148 8.34708 8.07742 8.08511 8.17534C7.8401 8.26693 7.74614 8.33469 7.69 8.38882C7.63687 8.44005 7.57352 8.52103 7.48651 8.7411C7.39076 8.98328 7.29759 9.30875 7.14874 9.83549L5.65993 15.104C5.40725 15.9982 5.24811 16.5698 5.18913 17.0038C5.13457 17.4052 5.18979 17.5351 5.23581 17.6107C5.23532 17.6101 5.23567 17.6105 5.23581 17.6107C5.24163 17.6182 5.29443 17.6864 5.44556 17.801C5.59696 17.9158 5.80293 18.0443 6.0554 18.176C6.5609 18.4397 7.19006 18.6834 7.80223 18.8434C8.31467 18.9772 8.62272 19.5057 8.49028 20.0237C8.35784 20.5417 7.83507 20.8531 7.32263 20.7192C6.57731 20.5245 5.81369 20.2302 5.17647 19.8978C4.8576 19.7314 4.55472 19.5475 4.29548 19.3509C4.04864 19.1637 3.78388 18.9225 3.60352 18.6263C3.2341 18.0196 3.20396 17.3753 3.29028 16.7401C3.37009 16.1529 3.56956 15.4471 3.79877 14.6362C3.80482 14.6148 3.81088 14.5934 3.81696 14.5719L5.30577 9.30334C5.30968 9.2895 5.31358 9.2757 5.31746 9.26195C5.451 8.78928 5.57023 8.36722 5.70672 8.02204C5.85591 7.6447 6.04961 7.29299 6.36701 6.98693C6.68139 6.68377 7.03936 6.50055 7.42033 6.35814C7.77516 6.2255 8.21167 6.10712 8.71181 5.97149L9.91549 5.645C10.4449 5.50137 10.9055 5.37641 11.3 5.30924C11.7243 5.237 12.1434 5.21736 12.5852 5.32962C13.3313 5.51916 13.8712 6.02698 14.4552 6.59343C14.8371 6.96386 14.8496 7.57709 14.4832 7.96314C14.1167 8.34918 13.51 8.36184 13.1281 7.99142C12.4877 7.37021 12.2953 7.2537 12.118 7.20865C12.0232 7.18456 11.8921 7.1732 11.6184 7.2198Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.0474 3.5583C12.3983 3.97257 11.7823 4.68666 11.3983 5.61589C11.2708 5.92445 11.1795 6.23131 11.1213 6.52918C11.0208 7.04398 10.5244 7.37933 10.0126 7.27821C9.50076 7.17709 9.16735 6.67779 9.26789 6.163C9.35077 5.73858 9.47914 5.31023 9.65414 4.88672C10.1749 3.62644 11.033 2.59384 12.0356 1.95405C13.0333 1.31738 14.2529 1.0291 15.408 1.44451C16.5764 1.86468 17.3014 2.86878 17.5934 4.00669C17.8843 5.14021 17.77 6.46079 17.2496 7.72017C16.7449 8.94159 15.9239 9.94813 14.9625 10.5912C14.5281 10.8817 13.9419 10.7631 13.6531 10.3262C13.3643 9.88937 13.4822 9.29972 13.9165 9.00921C14.5441 8.58946 15.1337 7.89055 15.5054 6.99099C15.8898 6.06086 15.9396 5.16368 15.7645 4.48155C15.5906 3.80381 15.2195 3.39437 14.7721 3.23347C14.3114 3.06779 13.7015 3.14092 13.0474 3.5583Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M18.058 8.53645L17.058 7.92286C16.0553 7.30762 15.554 7 15 7C14.446 7 13.9447 7.30762 12.942 7.92286L11.942 8.53645C10.9935 9.11848 10.5192 9.40949 10.2596 9.87838C10 10.3473 10 10.9129 10 12.0442V17.9094C10 19.8377 10 20.8019 10.5858 21.4009C11.1716 22 12.1144 22 14 22H16C17.8856 22 18.8284 22 19.4142 21.4009C20 20.8019 20 19.8377 20 17.9094V12.0442C20 10.9129 20 10.3473 19.7404 9.87838C19.4808 9.40949 19.0065 9.11848 18.058 8.53645Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 7.10809C13.3612 6.4951 12.9791 6.17285 12.4974 6.05178C11.9374 5.91102 11.3491 6.06888 10.1725 6.3846L8.99908 6.69947C7.88602 6.99814 7.32949 7.14748 6.94287 7.5163C6.55624 7.88513 6.40642 8.40961 6.10679 9.45857L4.55327 14.8971C4.0425 16.6852 3.78712 17.5792 4.22063 18.2836C4.59336 18.8892 6.0835 19.6339 7.5 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.4947 10C15.336 9.44058 16.0828 8.54291 16.5468 7.42653C17.5048 5.12162 16.8944 2.75724 15.1836 2.14554C13.4727 1.53383 11.3091 2.90644 10.3512 5.21135C10.191 5.59667 10.0747 5.98366 10 6.36383"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const AddIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M12 4V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SettingsIcon = ({
  className,
  isActive,
}: {
  className?: string;
  isActive?: boolean;
}) => {
  if (isActive) {
    return (
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.74975 22.4469C10.0241 22.6444 10.3181 22.7181 10.5977 22.75H13.4023C13.6819 22.7181 13.9759 22.6444 14.2503 22.4469C14.5245 22.2495 14.6873 21.9946 14.8058 21.7402C14.9122 21.5117 15.4485 19.9112 15.4485 19.9112C15.4485 19.9112 15.7104 19.4678 15.9256 19.3266C16.3481 19.0495 16.7744 18.9894 17.0521 19.0495C17.0521 19.0495 18.9336 19.5792 19.1993 19.6213C19.4948 19.6681 19.8181 19.674 20.1524 19.5385C20.4866 19.4031 20.714 19.1739 20.893 18.935L22.3316 16.4526C22.4442 16.1934 22.5272 15.9008 22.4917 15.5633C22.4561 15.2258 22.3138 14.9568 22.1496 14.7266C22.0021 14.5199 20.7592 13.1363 20.5441 12.898C20.5441 12.898 20.2841 12.4993 20.2841 11.9998C20.2841 11.4151 20.5441 11.1019 20.5441 11.1019C20.5441 11.1019 22.0021 9.47998 22.1496 9.2733C22.3138 9.04311 22.4561 8.7741 22.4917 8.4366C22.5272 8.09914 22.4442 7.80652 22.3316 7.54733C22.2304 7.31456 20.893 5.06487 20.893 5.06487C20.714 4.82595 20.4866 4.59685 20.1524 4.46138C19.8181 4.32586 19.4948 4.33183 19.1993 4.3786C18.9336 4.42064 17.382 4.85698 17.0521 4.95035C17.0521 4.95035 16.5227 5.06487 15.9256 4.67329C15.7104 4.53218 15.5437 4.32813 15.4484 4.08872C15.4484 4.08872 14.9122 2.48829 14.8058 2.25981C14.6873 2.00543 14.5245 1.75047 14.2503 1.55308C13.9759 1.3556 13.6819 1.28188 13.4023 1.25H10.5977C10.3181 1.28188 10.0241 1.3556 9.74975 1.55308C9.47551 1.75047 9.31274 2.00543 9.19424 2.25981C9.0878 2.48829 8.55157 4.08872 8.55157 4.08872C8.45627 4.32813 8.28956 4.53218 8.07438 4.67329C7.47727 5.06487 6.94794 4.95035 6.94794 4.95035C6.61796 4.85698 5.06641 4.42064 4.80069 4.3786C4.50518 4.33183 4.18189 4.32586 3.84759 4.46138C3.51342 4.59685 3.28602 4.82595 3.10699 5.06487C3.10699 5.06487 1.76957 7.31456 1.66843 7.54733C1.55583 7.80652 1.47276 8.09914 1.50833 8.4366C1.5439 8.7741 1.68619 9.04311 1.85043 9.2733C1.99791 9.47998 3.45586 11.1019 3.45586 11.1019C3.45586 11.1019 3.71591 11.4151 3.71591 11.9998C3.71591 12.4993 3.45588 12.898 3.45588 12.898C3.24083 13.1363 1.99791 14.5199 1.85044 14.7266C1.68619 14.9568 1.5439 15.2258 1.50833 15.5633C1.47276 15.9008 1.55583 16.1934 1.66844 16.4526L3.10697 18.935C3.28601 19.1739 3.51341 19.4031 3.84761 19.5385C4.18191 19.674 4.50519 19.6681 4.80071 19.6213C5.06643 19.5792 6.94789 19.0495 6.94789 19.0495C7.22563 18.9894 7.65193 19.0495 8.07443 19.3266C8.28957 19.4678 8.55153 19.9112 8.55153 19.9112C8.55153 19.9112 9.0878 21.5117 9.19424 21.7402C9.31274 21.9946 9.47551 22.2495 9.74975 22.4469ZM12.0195 15.5C13.9525 15.5 15.5195 13.933 15.5195 12C15.5195 10.067 13.9525 8.5 12.0195 8.5C10.0865 8.5 8.51953 10.067 8.51953 12C8.51953 13.933 10.0865 15.5 12.0195 15.5Z"
          color="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      color="currentColor"
      fill="none"
    >
      <path
        d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export const UploadIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M12.5 2H12.7727C16.0339 2 17.6645 2 18.7969 2.79784C19.1214 3.02643 19.4094 3.29752 19.6523 3.60289C20.5 4.66867 20.5 6.20336 20.5 9.27273V11.8182C20.5 14.7814 20.5 16.2629 20.0311 17.4462C19.2772 19.3486 17.6829 20.8491 15.6616 21.5586C14.4044 22 12.8302 22 9.68182 22C7.88275 22 6.98322 22 6.26478 21.7478C5.10979 21.3424 4.19875 20.4849 3.76796 19.3979C3.5 18.7217 3.5 17.8751 3.5 16.1818V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 12C20.5 13.8409 19.0076 15.3333 17.1667 15.3333C16.5009 15.3333 15.716 15.2167 15.0686 15.3901C14.4935 15.5442 14.0442 15.9935 13.8901 16.5686C13.7167 17.216 13.8333 18.0009 13.8333 18.6667C13.8333 20.5076 12.3409 22 10.5 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 4.5C4.99153 3.9943 6.29977 2 7 2M9.5 4.5C9.00847 3.9943 7.70023 2 7 2M7 2L7 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UploadArrowIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" />
      <path
        d="M9.5 10.5C9.99153 9.9943 11.2998 8 12 8M14.5 10.5C14.0085 9.9943 12.7002 8 12 8M12 8V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const HelpIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.992 17H12.001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LinkIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M9.5 14.5L14.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.8463 14.6095L19.4558 12C21.5147 9.94113 21.5147 6.60303 19.4558 4.54416C17.397 2.48528 14.0589 2.48528 12 4.54416L9.39045 7.1537M14.6095 16.8463L12 19.4558C9.94113 21.5147 6.60303 21.5147 4.54416 19.4558C2.48528 17.397 2.48528 14.0589 4.54416 12L7.1537 9.39045"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const RefreshIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EmptyTagsState = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col h-80 justify-center items-center">
      <TagsIcon className="text-primary w-10 h-10" />
      <h3 className="text-primary mt-3 tracking-wide font-medium">
        You don{"'"}t have bookmarks with tags yet!
      </h3>
      <p className="mt-1 text-sm text-muted-foreground text-center">
        Create tags and assign to organize your bookmarks.
      </p>
    </div>
  );
};

export const DeleteIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.5 16.5L9.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.5 16.5L14.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const ShareIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M20.3927 8.03168L18.6457 6.51461C17.3871 5.42153 16.8937 4.83352 16.2121 5.04139C15.3622 5.30059 15.642 6.93609 15.642 7.48824C14.3206 7.48824 12.9468 7.38661 11.6443 7.59836C7.34453 8.29742 6 11.3566 6 14.6525C7.21697 13.9065 8.43274 13.0746 9.8954 12.7289C11.7212 12.2973 13.7603 12.5032 15.642 12.5032C15.642 13.0554 15.3622 14.6909 16.2121 14.9501C16.9844 15.1856 17.3871 14.5699 18.6457 13.4769L20.3927 11.9598C21.4642 11.0293 22 10.564 22 9.99574C22 9.4275 21.4642 8.96223 20.3927 8.03168Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5676 3C6.70735 3.00694 4.68594 3.10152 3.39411 4.39073C2 5.78202 2 8.02125 2 12.4997C2 16.9782 2 19.2174 3.3941 20.6087C4.78821 22 7.03198 22 11.5195 22C16.0071 22 18.2509 22 19.645 20.6087C20.6156 19.64 20.9104 18.2603 21 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EditIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M13 4L20 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 22L22 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CheckIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6905 5.77665C20.09 6.15799 20.1047 6.79098 19.7234 7.19048L9.22336 18.1905C9.03745 18.3852 8.78086 18.4968 8.51163 18.4999C8.2424 18.5031 7.98328 18.3975 7.79289 18.2071L4.29289 14.7071C3.90237 14.3166 3.90237 13.6834 4.29289 13.2929C4.68342 12.9024 5.31658 12.9024 5.70711 13.2929L8.48336 16.0692L18.2766 5.80953C18.658 5.41003 19.291 5.39531 19.6905 5.77665Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SunIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      color="currentColor"
      fill="none"
    >
      <path
        d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M11.9955 3H12.0045M11.9961 21H12.0051M18.3588 5.63599H18.3678M5.63409 18.364H5.64307M5.63409 5.63647H5.64307M18.3582 18.3645H18.3672M20.991 12.0006H21M3 12.0006H3.00898"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const MoonIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      color="currentColor"
      fill="none"
    >
      <path
        d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const InfoIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.992 8H12.001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ExportIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UpIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M12 4L12 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 8.99996C17 8.99996 13.3176 4.00001 12 4C10.6824 3.99999 7 9 7 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DownIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M12 20L12 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 15C17 15 13.3176 20 12 20C10.6824 20 7 15 7 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CloseIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M19 5L5 19M5 5L19 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LogoutIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BugIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'currentColor'}
      fill={'none'}
    >
      <path
        d="M3.01321 4.99121C2.89335 6.05121 3.55262 8.42321 6.48936 8.42321"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17.5952 8.38093C18.8358 8.57893 21.1133 7.49893 20.9958 5.00293"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20.993 20.9989C21.0529 19.9429 20.1779 17.5549 17.5991 17.4229"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.45175 17.471C5.65026 17.231 3.01318 18.335 3.01318 20.999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.33002 6.11902C9.354 5.09902 9.84545 2.99902 12.0031 2.99902C13.9209 2.99902 14.5862 4.61902 14.6761 6.11902M6.26143 9.41902C6.3813 8.63902 7.29229 6.81502 9.36598 6.63502C11.4637 6.55582 14.3405 6.58702 14.8799 6.67102C15.587 6.73395 17.2952 7.43902 17.7507 9.41902C17.9125 10.439 17.8286 11.879 17.8526 12.719C17.8166 13.559 17.9208 15.2624 17.7567 16.139C17.6368 17.099 16.9895 18.467 16.1025 19.307C14.784 20.723 11.164 22.211 8.03546 19.451C6.41726 17.891 6.30938 16.379 6.18951 15.779C6.15738 15.4573 6.15887 13.8765 6.16554 12.359C6.14156 11.0462 6.17247 9.78082 6.26143 9.41902Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.01318 12.8989H5.94992"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20.993 12.8989L18.1162 12.8989"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.0034 16.499L12.0034 20.279"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const ArrowRightIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={'currentColor'}
    fill={'none'}
  >
    <path
      d="M20 12L4 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowDownIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={'currentColor'}
    fill={'none'}
  >
    <path
      d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GithubIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={'currentColor'}
    fill={'none'}
  >
    <path
      d="M9.94118 17.8806C9.94118 17.5172 10.0494 17.2013 10.2238 16.9159C10.3434 16.7202 10.2615 16.4424 10.0453 16.381C8.25526 15.8729 7 15.0557 7 12.3453C7 11.6406 7.22356 10.9781 7.61654 10.4015C7.71414 10.2583 7.76181 10.1932 7.77491 10.1217C7.78806 10.05 7.76638 9.97185 7.72543 9.80192C7.58167 9.2054 7.57017 8.57697 7.73081 7.99076C7.78361 7.79807 7.8968 7.68568 8.10166 7.70737C8.3674 7.73552 8.82753 7.86134 9.50999 8.30163C9.77813 8.47463 9.9122 8.56113 10.0303 8.58048C10.1484 8.59983 10.3062 8.5593 10.622 8.47824C11.0537 8.3674 11.4986 8.30789 12 8.30789C12.5014 8.30789 12.9463 8.3674 13.378 8.47824C13.6938 8.5593 13.8516 8.59983 13.9697 8.58048C14.0878 8.56113 14.2219 8.47463 14.49 8.30164C15.1725 7.86134 15.6326 7.73552 15.8983 7.70737C16.1032 7.68568 16.2164 7.79807 16.2692 7.99076C16.4298 8.57696 16.4183 9.20538 16.2746 9.8019C16.2336 9.97185 16.2119 10.05 16.2251 10.1217C16.2382 10.1932 16.2859 10.2583 16.3834 10.4015C16.7764 10.9781 17 11.6406 17 12.3453C17 15.0557 15.7447 15.8729 13.9547 16.381C13.7385 16.4424 13.6566 16.7202 13.7762 16.9159C13.9506 17.2013 14.0588 17.5172 14.0588 17.8806V22.6517C19.011 21.6912 22.75 17.3316 22.75 12.0986C22.75 6.16157 17.9371 1.34863 12 1.34863C6.06294 1.34863 1.25 6.16157 1.25 12.0986C1.25 17.3316 4.98901 21.6912 9.94118 22.6517V19.852C9.88484 19.8454 9.81816 19.8356 9.74225 19.8212C9.52615 19.7802 9.23571 19.7015 8.89714 19.5513C8.21489 19.2487 7.36263 18.6671 6.53685 17.5665C6.28826 17.2352 6.35533 16.7651 6.68665 16.5165C7.01798 16.2679 7.48809 16.335 7.73668 16.6663C8.4109 17.5649 9.06058 17.9829 9.50527 18.1801C9.6822 18.2586 9.83089 18.304 9.94118 18.3302V17.8806Z"
      fill="currentColor"
    />
  </svg>
);
