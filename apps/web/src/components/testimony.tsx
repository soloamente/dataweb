import { Marquee } from "./ui/marquee";
import IconGoogle from "./ui/icons/google";
import IconDiscord from "./ui/icons/discord";
import IconTikTok from "./ui/icons/tiktok";

export default function Testimony() {
  return (
    <div className="flex flex-col absolute w-full justify-center items-center bottom-8 left-0 right-0">
      <div className="w-md flex flex-col gap-3.75 justify-center items-center">
        <h2 className="opacity-70">Più di 350 clienti si affidano a noi</h2>
        <Marquee className="flex [&_svg]:size-8 [&_svg]:hover:cursor-pointer [&_svg]:transition-colors [&_svg]:duration-300">
          {/* <div className="gap-10"> */}
          <div className="flex gap-2.5 items-center mx-4">
            <IconGoogle /> Google
          </div>
          <div className="flex gap-2.5 items-center mx-4">
            <IconDiscord /> Discord
          </div>
          <div className="flex gap-2.5 items-center mx-4 ">
            <IconTikTok /> TikTok
          </div>
          {/* </div> */}
        </Marquee>
      </div>
    </div>
  );
}
