export default function PublicLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Antique+Olive:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="h-dvh-fallback w-full grid grid-rows-1 overflow-hidden">
        <main className="w-full h-full overflow-hidden">{props.children}</main>
      </div>
    </>
  );
}
