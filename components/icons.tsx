import { StarIcon, TagIcon, TagsIcon } from 'lucide-react';

import { cn } from 'lib/utils';

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

export const ExtensionsIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="44"
    height="44"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
  </svg>
);

export const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={cn('mr-1.5 h-5 w-5 text-green-600', className)}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const EmptyBookmarkState = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col h-80 justify-center items-center">
      <svg
        className={cn('text-primary', className)}
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
        No bookmarks yet
      </h3>
      <p className="mt-2 text-muted-foreground">
        Click {"'"}Add{"'"} to save your bookmarks.
      </p>
    </div>
  );
};

export const EmptyFavoriteState = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col h-80 justify-center items-center">
      <StarIcon className="text-primary w-8 h-8" />
      <h3 className="text-primary mt-3 tracking-wide font-medium">
        No favorites yet!
      </h3>
      <p className="mt-2 text-muted-foreground">Add bookmarks as favorite.</p>
    </div>
  );
};

export const EmptyTagsState = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col h-80 justify-center items-center">
      <TagsIcon className="text-primary w-10 h-10" />
      <h3 className="text-primary mt-3 tracking-wide font-medium">
        No bookmark with tags yet!
      </h3>
      <p className="mt-2 text-muted-foreground">
        Create and Organize with tags.
      </p>
    </div>
  );
};

export const EmptyTagState = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col h-80 justify-center items-center">
      <TagIcon className="text-primary w-8 h-8" />
      <h3 className="text-primary mt-3 tracking-wide font-medium">
        No bookmarks!
      </h3>
      <p className="mt-2 text-muted-foreground">Add bookmarks to this tag.</p>
    </div>
  );
};
