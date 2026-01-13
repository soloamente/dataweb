import Testimony from "@/components/testimony";
import IconParty from "@/components/ui/icons/party";

export default function Home() {
  return (
    <main className="bg-[url('/images/background_home.png')] bg-cover bg-center min-h-screen flex-col gap-6 md:gap-11 flex items-center justify-center px-4 md:px-0  md:pt-0">
      <div className="flex flex-col gap-4 md:gap-5 justify-center items-center max-w-4xl w-full">
        <div className="backdrop-blur-md cursor-pointer flex items-center border-white/40 border gap-2.5 bg-primary-foreground/15 rounded-full pr-4 md:pr-5 pl-3 md:pl-3.75 py-2 text-foreground text-xs md:text-[13px]">
          <IconParty className="w-4 h-4 md:w-5 md:h-5 shrink-0" />{" "}
          <span className="whitespace-nowrap">
            Scopri il nostro nuovo portale NotarShare Doc!
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-balance w-full max-w-4xl text-center px-4 md:px-0">
          Trasformiamo il tuo passato cartaceo nel tuo futuro digitale
        </h1>
      </div>
      <button className="flex px-5 py-2.75 cursor-pointer leading-none bg-primary-foreground text-primary rounded-full font-lg transition-colors hover:bg-primary-foreground/90">
        Parla con noi
      </button>
      {/* Gradient overlay - transparent at bottom to background at top */}
      <div className="fixed bottom-0 bg-linear-to-b from-transparent to-[#1C1C1C] via-[#1C1C1C]/70 to-100% from-10% via-60% left-0 right-0 h-[30%] pointer-events-none z-5" />
      <div className="fixed top-0 bg-linear-to-t from-transparent to-[#1C1C1C]/50 to-100% from-10% via-60% left-0 right-0 h-[40%] pointer-events-none z-5" />
      <Testimony />
    </main>
  );
}
