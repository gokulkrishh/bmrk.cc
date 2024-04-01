import Image from 'next/image';
import Link from 'next/link';

import Footer from 'components/home/footer';

export default function TermsPage() {
  return (
    <div className="flex flex-col mx-auto w-full homepage after:bg-grid sm:max-w-4xl pt-5 h-fit px-4">
      <header className="flex justify-between items-center">
        <h1 className="font-semibold text-xl flex items-center">
          <Link
            className="flex text-primary items-center active:opacity-80"
            href="/"
          >
            <Image
              src="/icons/icon.svg"
              width={40}
              height={40}
              alt=" it"
              className="mr-2.5 rounded-full"
              priority
            />
            Bookmark It.
          </Link>
        </h1>
      </header>
      <main className="w-full flex flex-col px-2 my-6">
        <h2 className="font-semibold text-xl my-2">Terms &amp; Conditions</h2>
        <p className="my-1 leading-7">
          By downloading or using the app, chrome extension and website, these
          terms will automatically apply to you – you should make sure therefore
          that you read them carefully before using the app. You’re not allowed
          to copy or modify the app, any part of the app, or our trademarks in
          any way. You’re not allowed to attempt to extract the source code of
          the app, and you also shouldn’t try to translate the app into other
          languages or make derivative versions. The app itself, and all the
          trademarks, copyright, database rights, and other intellectual
          property rights related to it, still belong to Bookmark It. under
          their licenses provide.
        </p>
        <p className="my-1 leading-7">
          Bookmark It. (&quot;bmrk.cc&quot;, &quot;we&quot;, &quot;us&quot;,
          and/or &quot;our&quot;) built the Bookmark It. is committed to
          ensuring that the app is as useful and efficient as possible. For that
          reason, we reserve the right to make changes to the app or to charge
          for its services, at any time and for any reason. We will never charge
          you for the app or its services without making it very clear to you
          exactly what you’re paying for.
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
          The app does use third-party services that declare their Terms and
          Conditions. Link to Terms and Conditions of third-party service
          providers used by the app
        </p>
        <ul className="px-6 my-1 list-disc leading-7">
          <li>
            <a
              className="cursor-pointer text-blue-700 underline"
              href="https://policies.google.com/privacy?hl=en-US"
            >
              Google Analytics
            </a>
          </li>
        </ul>
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
          Bookmark It. may update our Terms and Conditions from time to time.
          Thus, you are advised to review this page periodically for any
          changes. I will notify you of any changes by posting the new Terms and
          Conditions on this page.
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
      <Footer />
    </div>
  );
}
