import Link from 'next/link';

import { urls } from 'config';

import { cn } from 'lib/utils';

export default function FooterSection() {
  return (
    <div
      className={cn(
        'w-full sm:max-w-4xl mt-28 p-4 flex flex-col sm:flex-row justify-between',
      )}
    >
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold tracking-wide flex items-center gap-2.5">
          <svg
            className={cn('rounded-full')}
            width="36"
            height="36"
            viewBox="0 0 686 686"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="686" height="686" fill="#1c1c1c" />
            <path
              d="M450.854 342.973C450.845 342.981 450.856 342.996 450.867 342.99C479.108 326.591 498.043 296.557 498.043 262.152C498.111 211.967 457.863 171.122 407.205 168.273C407.133 168.269 407.076 168.209 407.076 168.136V168.136C407.076 168.061 407.015 168 406.939 168H267C229.288 168 210.431 168 198.716 179.716C187 191.431 187 210.288 187 248V438C187 475.712 187 494.569 198.716 506.284C210.431 518 229.288 518 267 518H406.939C407.015 518 407.076 517.939 407.076 517.864V517.864C407.076 517.791 407.133 517.731 407.205 517.727C457.863 514.878 498.111 474.033 498.111 423.848C498.111 389.415 479.078 359.361 450.867 342.971C450.863 342.969 450.857 342.969 450.854 342.973V342.973Z"
              fill="#FFEEE9"
            />
            <path
              d="M224.5 281.785V191C224.5 172.144 224.5 162.716 230.358 156.858C236.216 151 245.644 151 264.5 151H313.491C332.347 151 341.775 151 347.633 156.858C353.491 162.716 353.491 172.144 353.491 191V281.584C353.491 296.97 353.491 304.663 348.494 307.55C343.497 310.438 336.832 306.595 323.502 298.911L299.303 284.961C294.455 282.167 292.031 280.769 289.369 280.762C286.706 280.756 284.275 282.141 279.413 284.911L254.401 299.162C241.101 306.74 234.451 310.529 229.475 307.638C224.5 304.746 224.5 297.093 224.5 281.785Z"
              fill="#FF652F"
            />
          </svg>{' '}
          Bookmark It.
        </h2>
        <p className="text-muted-foreground mt-4 text-sm">
          Organize, Discover, and Personalize.
        </p>
      </div>
      <div className="flex sm:gap-20 max-w-xs w-fit max-sm:mt-12 max-sm:w-full max-sm:justify-between">
        <div className="flex flex-col w-fit text-sm">
          <h3 className="font-semibold flex items-center gap-2">Links</h3>
          <div className="flex flex-col gap-2.5 mt-4">
            <Link
              href={urls.github}
              className="hover:underline hover:text-primary active:text-primary text-muted-foreground"
            >
              Github
            </Link>
            <Link
              href={urls.extensions.chrome}
              className="hover:underline  hover:text-primary active:text-primary text-muted-foreground"
            >
              Extensions
            </Link>
            <Link
              href={urls.twitter}
              className="hover:underline hover:text-primary active:text-primary text-muted-foreground"
            >
              Twitter
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-fit text-sm">
          <div className="flex flex-col w-fit">
            <h3 className="font-semibold flex items-center">Legal</h3>
            <div className="flex flex-col gap-2.5 mt-4">
              <Link
                href={'/privacy'}
                className="hover:underline  hover:text-primary active:text-primary text-muted-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href={'/terms'}
                className="hover:underline hover:text-primary active:text-primary text-muted-foreground"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
