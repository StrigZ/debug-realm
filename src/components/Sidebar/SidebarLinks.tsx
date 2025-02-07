import Link from 'next/link';

const navLinks = [
  {
    displayText: 'Top Selling',
  },
  {
    displayText: 'New Releases',
  },
];

type Props = {};
export default function SidebarLinks({}: Props) {
  return (
    <section>
      <ul>
        {navLinks.map(({ displayText }) => (
          <li key={displayText} className="flex gap-4">
            <Link
              href={'/genre/' + displayText}
              className="w-full rounded p-4 text-lg transition-colors hover:bg-slate-600 active:scale-95"
            >
              {displayText}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
