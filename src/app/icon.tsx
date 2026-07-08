export const size = { width: 32, height: 32 };
export const contentType = "image/svg+xml";

export default function Icon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="8" fill="#A47148"/>
    <g fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 12h14l-1 13H10L9 12Z"/>
      <path d="M12.5 12V10a3.5 3.5 0 0 1 7 0v2"/>
    </g>
  </svg>`;
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
