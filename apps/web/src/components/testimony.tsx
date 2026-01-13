import { Marquee } from "./ui/marquee";
import IconGoogle from "./ui/icons/google";
import IconDiscord from "./ui/icons/discord";
import IconTikTok from "./ui/icons/tiktok";
import IconYoutube from "./ui/icons/youtube";

export default function Testimony() {
  return (
    <div className="flex z-10 flex-col absolute w-full justify-center items-center bottom-8 left-0 right-0">
      <div className="max-w-md w-full flex flex-col gap-3.75 justify-center items-center">
        <h2 className="opacity-70">Più di 350 clienti si affidano a noi</h2>
        <Marquee className="w-full [&_svg]:size-8 [&_svg]:hover:cursor-pointer [&_svg]:transition-colors [&_svg]:duration-300">
          <div className="flex gap-2.5 items-center mx-4">
            <IconGoogle /> Google
          </div>
          <div className="flex gap-2.5 items-center mx-4">
            <IconDiscord /> Discord
          </div>
          <div className="flex gap-2.5 items-center mx-4 ">
            <IconTikTok /> TikTok
          </div>
          <div className="flex gap-2.5 items-center mx-4 ">
            <IconYoutube /> Youtube
          </div>
        </Marquee>
      </div>
    </div>
  );
}
