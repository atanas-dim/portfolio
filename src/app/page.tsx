import { SOCIAL_LINKS } from "@/resources/socialLinks";

export default function Home() {
  return (
    <main className="w-full">
      <section className="w-full h-[100svh] flex justify-center items-center flex-col">
        <h1 className="text-3xl font-extrabold">atanas dimitrov</h1>
        <h2 className="text-2xl font-extrabold mb-2">react developer</h2>
        <div className="flex justify-center gap-2">
          {SOCIAL_LINKS.map((link, index) => {
            return (
              <a
                key={"link-" + index}
                className="w-12 h-12 flex justify-center items-center"
                target="_blank"
                rel="noreferrer"
                href={link.href}
              >
                {link.icon}
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
