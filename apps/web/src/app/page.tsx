import Testimony from "@/components/testimony";
import IconParty from "@/components/ui/icons/party";

export default function Home() {
  return (
    <main className="bg-[url('/images/background_home.png')] bg-cover bg-center h-screen flex-col gap-11 flex items-center justify-center">
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="backdrop-blur-md cursor-pointer flex items-center border-white/40 border gap-2.5 bg-primary-foreground/15 rounded-full pr-5 pl-3.75 py-2 text-foreground text-[13px]">
          <IconParty /> Scopri il nostro nuovo portale NotarShare Doc!
        </div>
        <h1 className="text-5xl font-semibold text-balance w-3xl text-center">
          Trasformiamo il tuo passato cartaceo nel tuo futuro digitale
        </h1>
      </div>
      <button className="flex px-5 py-2.75  cursor-pointer leading-none bg-primary-foreground text-primary rounded-full font-lg ">
        Parla con noi
      </button>
      <Testimony />
    </main>
  );
}
