import { Marquee } from "./ui/marquee";
import IconGoogle from "./ui/icons/google";
import IconDiscord from "./ui/icons/discord";
import IconTikTok from "./ui/icons/tiktok";
import IconYoutube from "./ui/icons/youtube";

export default function Testimony() {
  return (
    <div className="flex z-10 flex-col absolute w-full justify-center items-center bottom-4 md:bottom-8 left-0 right-0 px-4">
      <div className="max-w-md w-full flex flex-col gap-3 md:gap-3.75 justify-center items-center">
        <h2 className="opacity-70 text-sm md:text-base text-center">
          Più di 350 clienti si affidano a noi
        </h2>
        <Marquee className="w-full [&_svg]:size-6 md:[&_svg]:size-8 [&_svg]:hover:cursor-pointer [&_svg]:transition-colors [&_svg]:duration-300">
          <div className="flex gap-2 md:gap-2.5 items-center mx-2 md:mx-4">
            <IconGoogle /> <span className="text-sm md:text-base">Google</span>
          </div>
          <div className="flex gap-2 md:gap-2.5 items-center mx-2 md:mx-4">
            <IconDiscord />{" "}
            <span className="text-sm md:text-base">Discord</span>
          </div>
          <div className="flex gap-2 md:gap-2.5 items-center mx-2 md:mx-4">
            <IconTikTok />{" "}
            <span className="text-sm md:text-base">TikTok</span>
          </div>
          <div className="flex gap-2 md:gap-2.5 items-center mx-2 md:mx-4">
            <IconYoutube />{" "}
            <span className="text-sm md:text-base">Youtube</span>
          </div>
        </Marquee>
      </div>
    </div>
  );
}
