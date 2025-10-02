export default function PublicLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Antique+Olive:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="min-h-screen w-full grid grid-rows-[auto_1fr]">
        <main className="w-full flex-1 flex items-center justify-center">{props.children}</main>
      </div>
    </>
  );
}

