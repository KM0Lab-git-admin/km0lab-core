import Image from 'next/image';

export default function PublicLayout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full grid grid-rows-[auto_1fr]">
      <header className="w-full flex items-center justify-center py-2">
        <Image
          src="/assets/images/logo1.svg"
          alt="KM0 LAB Logo"
          width={160}
          height={30}
          className="h-8 w-auto sm:h-10"
          priority
        />
      </header>
      <main className="w-full flex-1 flex items-center justify-center">{props.children}</main>
    </div>
  );
}

