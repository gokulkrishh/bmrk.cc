import Image from 'next/image';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="flex flex-col mx-auto w-full homepage lex after:bg-grid sm:max-w-4xl pt-5 h-fit px-4">
      <header className="flex justify-between items-center">
        <h1 className="font-medium tracking-tight text-lg flex items-center">
          <Link
            className="flex text-primary items-center active:opacity-80"
            href="/"
          >
            <Image
              src="/icons/icon.svg"
              width={44}
              height={44}
              alt="Bookmark it"
              className="mr-2 "
              priority
            />
            Bookmark It.
          </Link>
        </h1>
      </header>
      <main className="w-full flex flex-col px-2 my-6">
        <h2 className="font-semibold text-xl my-2">Terms &amp; Conditions</h2>
        <p className="my-1 leading-7">
          By downloading or using the app, these terms will automatically apply
          to you – you should make sure therefore that you read them carefully
          before using the app. You’re not allowed to copy or modify the app,
          any part of the app, or our trademarks in any way. You’re not allowed
          to attempt to extract the source code of the app, and you also
          shouldn’t try to translate the app into other languages or make
          derivative versions. The app itself, and all the trademarks,
          copyright, database rights, and other intellectual property rights
          related to it, still belong to bmrk.cc.
        </p>
        <p className="my-1 leading-7">
          bmrk.cc (&quot;bmrk.cc&quot;, &quot;we&quot;, &quot;us&quot;, and/or
          &quot;our&quot;) built the Bookmark It. is committed to ensuring that
          the app is as useful and efficient as possible. For that reason, we
          reserve the right to make changes to the app or to charge for its
          services, at any time and for any reason. We will never charge you for
          the app or its services without making it very clear to you exactly
          what you’re paying for.
        </p>
        <p className="my-1 leading-7">
          The Bookmark It. app stores and processes personal data that you have
          provided to us, to provide my Service. It’s your responsibility to
          keep your phone and access to the app secure. We therefore recommend
          that you do not jailbreak or root your phone, which is the process of
          removing software restrictions and limitations imposed by the official
          operating system of your device. It could make your phone vulnerable
          to malware/viruses/malicious programs, compromise your phone’s
          security features and it could mean that the Bookmark It. app won’t
          work properly or at all.
        </p>
        <p className="my-1 leading-7">
          You should be aware that there are certain things that bmrk.cc will
          not take responsibility for. Certain functions of the app will require
          the app to have an active internet connection. The connection can be
          Wi-Fi or provided by your mobile network provider, but bmrk.cc cannot
          take responsibility for the app not working at full functionality if
          you don’t have access to Wi-Fi, and you don’t have any of your data
          allowance left.
        </p>
        <p className="my-1 leading-7">
          If you’re using the app outside of an area with Wi-Fi, you should
          remember that the terms of the agreement with your mobile network
          provider will still apply. As a result, you may be charged by your
          mobile provider for the cost of data for the duration of the
          connection while accessing the app, or other third-party charges. In
          using the app, you’re accepting responsibility for any such charges,
          including roaming data charges if you use the app outside of your home
          territory (i.e. region or country) without turning off data roaming.
          If you are not the bill payer for the device on which you’re using the
          app, please be aware that we assume that you have received permission
          from the bill payer for using the app.
        </p>
        <p className="my-1 leading-7">
          Along the same lines, bmrk.cc cannot always take responsibility for
          the way you use the app i.e. You need to make sure that your device
          stays charged – if it runs out of battery and you can’t turn it on to
          avail the Service, bmrk.cc cannot accept responsibility.
        </p>
        <p className="my-1 leading-7">
          With respect to bmrk.cc’s responsibility for your use of the app, when
          you’re using the app, it’s important to bear in mind that although we
          endeavor to ensure that it is updated and correct at all times, we do
          rely on third parties to provide information to us so that we can make
          it available to you. bmrk.cc accepts no liability for any loss, direct
          or indirect, you experience as a result of relying wholly on this
          functionality of the app.
        </p>
        <p className="my-1 leading-7">
          At some point, we may wish to update the app. The app is currently
          available on – the requirements for the system(and for any additional
          systems we decide to extend the availability of the app to) may
          change, and you’ll need to download the updates if you want to keep
          using the app. bmrk.cc does not promise that it will always update the
          app so that it is relevant to you and/or works with the version that
          you have installed on your device. However, you promise to always
          accept updates to the application when offered to you, We may also
          wish to stop providing the app, and may terminate use of it at any
          time without giving notice of termination to you. Unless we tell you
          otherwise, upon any termination, (a) the rights and licenses granted
          to you in these terms will end; (b) you must stop using the app, and
          (if needed) delete it from your device.
        </p>
        <h3 className="font-semibold text-lg my-2">
          Changes to This Terms and Conditions
        </h3>
        <p className="my-1 leading-7">
          bmrk.cc may update our Terms and Conditions from time to time. Thus,
          you are advised to review this page periodically for any changes. I
          will notify you of any changes by posting the new Terms and Conditions
          on this page.
        </p>
        <p className="my-1 leading-7">
          This policy is effective as of{' '}
          <span className="font-medium">2024-02-11</span>.
        </p>
        <p className="my-1 leading-7">
          If you have any questions or suggestions about my Privacy Policy, do
          not hesitate to contact me at{' '}
          <a
            className="cursor-pointer text-blue-700 underline"
            href="mailto:support@bmrk.cc"
          >
            support@bmrk.cc
          </a>
          .
        </p>
      </main>
      <footer className="w-full mt-28 p-4 pb-4 flex justify-between text-[13px] border-t text-primary">
        <div className="w-full sm:max-w-4xl px-2 mx-auto flex justify-between items-center">
          <div>&copy; {new Date().getFullYear()} Bookmark It. </div>
          <div className="flex items-center gap-4">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:opacity-85"
              href="https://x.com/@gokul_i"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
                <path
                  fill="currentColor"
                  d="M12.6 0h2.454l-5.36 6.778L16 16h-4.937l-3.867-5.594L2.771 16H.316l5.733-7.25L0 0h5.063l3.495 5.114L12.601 0Zm-.86 14.376h1.36L4.323 1.539H2.865l8.875 12.837Z"
                ></path>
              </svg>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:opacity-85"
              href="https://github.com/gokulkrishh/bmrk.cc"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-[1.15rem] w-[1.15rem]"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C3.582 0 0 3.672 0 8.203c0 3.623 2.292 6.699 5.471 7.783.4.075.546-.178.546-.396 0-.194-.007-.71-.01-1.394-2.226.495-2.696-1.1-2.696-1.1-.363-.948-.888-1.2-.888-1.2-.726-.508.055-.499.055-.499.803.058 1.225.845 1.225.845.714 1.253 1.873.891 2.328.682.074-.53.28-.891.509-1.096-1.776-.207-3.644-.911-3.644-4.054 0-.895.312-1.628.823-2.201-.082-.208-.357-1.042.079-2.17 0 0 .672-.222 2.2.84A7.485 7.485 0 0 1 8 3.967c.68.003 1.364.094 2.003.276 1.527-1.062 2.198-.841 2.198-.841.437 1.129.161 1.963.08 2.17.512.574.822 1.307.822 2.202 0 3.15-1.871 3.844-3.653 4.048.288.253.543.753.543 1.519 0 1.095-.01 1.98-.01 2.25 0 .219.144.474.55.394a8.031 8.031 0 0 0 3.96-2.989A8.337 8.337 0 0 0 16 8.203C16 3.672 12.418 0 8 0Z"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
