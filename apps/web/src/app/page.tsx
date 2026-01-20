import Testimony from "@/components/testimony";
import FeaturesSection from "@/components/features-section";
import BenefitsSection from "@/components/benefits-section";
import StatsSection from "@/components/stats-section";
import HowItWorksSection from "@/components/how-it-works-section";
import CTASection from "@/components/cta-section";
import DocumentOrganizer from "@/components/document-organizer";
import IconParty from "@/components/ui/icons/party";

export default function Home() {
  return (
    <main className="relative rounded-b-3xl drop-shadow-2xl z-10 overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="bg-[url('/images/background_home.png')] bg-cover bg-center min-h-screen flex-col gap-6 md:gap-11 flex items-center justify-center px-4 md:px-0 md:pt-0 relative">
        <div className="flex flex-col gap-4 md:gap-5 justify-center items-center max-w-4xl w-full relative z-10">
          <div className="backdrop-blur-md text-primary-foreground flex items-center border-white/40 border gap-2.5 bg-primary-foreground/15 rounded-full pr-4 md:pr-5 pl-3 md:pl-3.75 py-2  text-xs md:text-[13px]">
            <IconParty className="w-4 h-4 md:w-5 md:h-5 shrink-0" />{" "}
            <span className="whitespace-nowrap">
              Scopri il nostro nuovo portale NotarShare Doc!
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl text-primary-foreground lg:text-6xl font-semibold text-balance w-full max-w-4xl text-center px-4 md:px-0">
            Trasformiamo il tuo passato cartaceo nel tuo futuro digitale
          </h1>
        </div>
        <button className="flex px-5 py-2.75 cursor-pointer leading-none bg-primary text-primary-foreground rounded-full text-lg transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 relative z-10">
          Parla con noi
        </button>
        {/* Gradient overlay - transparent at bottom to background at top */}
        <div className="absolute bottom-0 bg-linear-to-b from-transparent to-[#1C1C1C] via-[#1C1C1C]/70 to-100% from-10% via-60% left-0 right-0 h-[30%] pointer-events-none z-5" />
        <div className="absolute top-0 bg-linear-to-t from-transparent to-[#1C1C1C]/50 to-100% from-10% via-60% left-0 right-0 h-[40%] pointer-events-none z-5" />
        <Testimony />
      </section>

      <DocumentOrganizer />

      
      {/* <div className="flex flex-col"> 
        <div className="relative">
          <FeaturesSection />
         
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border/40 to-transparent" aria-hidden="true" />
        </div>

     
        <div className="relative">
          <StatsSection />   
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border/40 to-transparent" aria-hidden="true" />
        </div>

     
        <BenefitsSection />
  
        <HowItWorksSection />

       
        
      </div> */}
      <div className="relative">
     
     <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border/40 to-transparent" aria-hidden="true" />
     <CTASection />
   </div>
    </main>
  );
}
