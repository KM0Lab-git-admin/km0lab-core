export default function PublicLayout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full grid grid-rows-[auto_1fr]">
      <main className="w-full flex-1 flex items-center justify-center">{props.children}</main>
    </div>
  );
}

