import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="font-display text-display-lg uppercase text-ink">404</p>
        <p className="mt-4 text-ash">This page could not be found.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-ink px-7 py-4 text-sm font-medium text-white hover:bg-pink"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
