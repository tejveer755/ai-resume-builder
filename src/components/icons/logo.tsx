import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 12L12 22" />
      <path d="M12 12L6 6" />
      <path d="M12 12L18 6" />
      <path d="M12 2L12 6" />
      <path d="M12 12L2 12" />
      <path d="M12 12L22 12" />
    </svg>
  );
}
