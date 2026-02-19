export default function PublicLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Antique+Olive:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="h-dvh-fallback w-full grid grid-rows-1 overflow-hidden bg-gradient-white-beige">
        <main className="flex min-h-0 h-full w-full flex-col overflow-hidden">{props.children}</main>
      </div>
    </>
  );
}
