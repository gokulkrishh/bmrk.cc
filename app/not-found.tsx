import Header from 'components/header';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-dvh border-r border-neutral-200">
        <p className="m-4 text-center text-lg my-10">This page doesn’t exist</p>
      </div>
    </>
  );
}
