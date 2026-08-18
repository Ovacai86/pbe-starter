import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 bg-white p-8 dark:bg-zinc-950">
      <Image
        src="/alaimo-labs-logo.svg"
        alt="Alaimo Labs"
        width={220}
        height={31}
        priority
        className="dark:invert"
      />
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        Hola, bienvenida/o 👋
      </h1>
      <p className="max-w-md text-center text-zinc-600 dark:text-zinc-400">
        Este es tu punto de partida para{" "}
        <span className="font-medium text-zinc-900 dark:text-zinc-100">
          Product Building Essentials
        </span>
        . Si estás viendo esta página, tu entorno funciona.
      </p>
    </main>
  );
}
