import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-x py-20 md:py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold">This page took a wrong turn.</h1>
      <p className="mt-4 text-ink-muted max-w-md mx-auto">Let&apos;s get you back on the road.</p>
      <Link href="/" className="btn btn-primary btn-lg mt-8">Back to home</Link>
    </section>
  );
}
