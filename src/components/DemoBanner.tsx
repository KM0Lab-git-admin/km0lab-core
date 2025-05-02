import Link from 'next/link';

export const DemoBanner = () => (
  <div className="sticky top-0 z-50 bg-gray-900 p-4 text-center text-lg font-semibold text-gray-100 [&_a:hover]:text-indigo-500 [&_a]:text-pink-400">
    Live Demo of Next.js Boilerplate -
    {' '}
    <Link href="/sign-up">Explore the Authentication</Link>
  </div>
);
