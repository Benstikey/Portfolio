"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";

import SideNav from '@/components/ui/SideNav';

import DesignIcon from "@/assets/icons/design-icon.svg";
import DevelopmentIcon from "@/assets/icons/magic-wand-icon.svg";
import DesignDevIcon from "@/assets/icons/des-dev-icon.svg";

import TextScrambleComponent from "@/components/ui/TextScramble";

import Card from "@/components/ui/card";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { FlipWords } from "@/components/ui/flip-words";

import VideoContainer from "@/components/ui/VideoContainer";
import PrimaryButton from "@/components/ui/PrimaryButton";

import TextReveal from "@/components/magicui/text-reveal";

import GridWithIcons from "@/components/ui/GridWithIcons";

import ExpandableComponent from "@/components/ui/ExpandableComponent";
import { Book, Sofa, Shirt, Timer, Film } from "lucide-react";

import HobbyCard from "@/components/ui/HobbyCard";
import CustomIcon from "@/components/ui/CustomIcon";

import ContactForm from "@/components/ContactForm";

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const words = ["developer", "designer", "expert"];
  const stacks = {
    Design: [
      { name: "Figma", description: "Design Tool", iconSlug: "figma", url: "https://www.figma.com/" },
      { name: "Adobe XD", description: "Design Tool", iconSlug: "adobexd", url: "https://adobexdplatform.com/" },
    ],
    Development: [
      { name: "Webflow", description: "Website Builder", iconSlug: "webflow", url: "https://webflow.com/" },
      { name: "Framer", description: "Website Builder", iconSlug: "framer", url: "https://www.framer.com/" },
      { name: "Wordpress", description: "Website Builder", iconSlug: "wordpress", url: "https://wordpress.org/" },
      { name: "Next.js", description: "React Framework", iconSlug: "nextdotjs", url: "https://nextjs.org/" },
      { name: "React", description: "Front-end JavaScript Library", iconSlug: "react", url: "https://reactjs.org/" },
      { name: "Tailwind CSS", description: "CSS Framework", iconSlug: "tailwindcss", url: "https://tailwindcss.com/" },
      { name: "HTML5", description: "Markup Language", iconSlug: "html5", url: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5" },
      { name: "CSS3", description: "Style Sheet Language", iconSlug: "css3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "JavaScript", description: "Programming Language", iconSlug: "javascript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "TypeScript", description: "Superset of JavaScript", iconSlug: "typescript", url: "https://www.typescriptlang.org/" },
    ],
    Productivity: [
      { name: "Slack", description: "Collaboration & Messaging", iconSlug: "slack", url: "https://slack.com/" },
      { name: "ClickUp", description: "Project Management & Productivity", iconSlug: "clickup", url: "https://clickup.com/" },
      { name: "Linear", description: "Issue Tracking & Project Management", iconSlug: "linear", url: "https://linear.app/" },
      { name: "Notion", description: "All-in-One Workspace & Note-Taking", iconSlug: "notion", url: "https://www.notion.so/" },
      { name: "GitHub", description: "Code Hosting & Collaboration", iconSlug: "github", url: "https://github.com/" },
    ],
    "Automation & AI": [
      { name: "Zapier", description: "Automation & Workflow Integration", iconSlug: "zapier", url: "https://zapier.com/" },
      { name: "OpenAI", description: "AI Models & Language Processing", iconSlug: "openai", url: "https://openai.com/" },
      { name: "Perplexity", description: "AI-Powered Answer Engine", iconSlug: "perplexity", url: "https://www.perplexity.ai/" },
    ],
  };

  const LogoB = require('@/public/Logo-Dark-Blue.svg').default;

  const ChessKnightIcon: React.FC<{ size?: number }> = ({ size = 150 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 20h12M8 18h8M9 14.5V18M15 14.5V18M6.5 9.5L8 14.5h8l1.5-5M6.5 9.5c0-3 1.5-5.5 5.5-6.5 4 1 5.5 3.5 5.5 6.5 0 1.5-0.5 2.5-1 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 7.5c0.5-1.5 2.5-2 3.5-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <>
    <SideNav />
    <main className="max-w-[824px] mx-auto flex flex-col px-4 sm:px-8 md:px-8 md:gap-40 py-40 bg-white scroll-smooth">
      {/* Header */}
      <div id="header" className="flex-col justify-center min-h-fit md:py-0 items-start gap-4 sm:gap-8 inline-flex">
        {/* LP Icon */}
        <div className="relative w-20 h-20 rounded-lg shadow-[1px_2px_5px_0px_rgba(0,0,0,0.2)] flex-col justify-center items-center inline-flex gradient-border">
          <div className="p-2 pr-3 rounded-md flex justify-center items-center">
            <LogoB />
          </div>
        </div>

        <h1>
          Web <FlipWords words={words} />
          specialized in low-code tools.
        </h1>
        <TextScrambleComponent />
      </div>

      {/* Services Section */}
      <div id="services" className="flex-col min-h-fit py-16 md:py-0 justify-center items-start gap-8 inline-flex">
        <h4>~ I can help you with</h4>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-5">
          <Card
            title="Design"
            description="High-quality website design tailored for engaging digital experiences"
            icon={<DesignIcon />}
          >
            <CanvasRevealEffect
              animationSpeed={5.1}
              containerClassName="bg-emerald-900"
            />
          </Card>
          <Card
            title="Development"
            description="Custom-built websites with Webflow or Framer, delivered swiftly"
            icon={<DevelopmentIcon />}
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[
                [236, 72, 153],
                [232, 121, 249],
              ]}
              dotSize={2}
            />
            {/* Radial gradient for the cute fade */}
            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
          </Card>
          <Card
            title="Design & Development"
            description="Comprehensive website development from initial idea to final launch"
            icon={<DesignDevIcon />}
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-sky-600"
              colors={[[125, 211, 252]]}
            />
          </Card>
        </div>
        <PrimaryButton text="Let&apos;s work together" scrollTo="contact-form" />
      </div>

      {/* My Work Section */}
      <div id="work" className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-[98vw] left-0 sm:left-1/2 sm:-translate-x-1/2 relative py-16 sm:py-0 sm:-my-24">
        {" "}
        <VideoContainer
          mobileMarginTop="mt-0"
          mobileMarginBottom="mb-0"
          desktopMarginTop="md:mt-100"
          desktopMarginBottom="md:mb-20"
          videoSrc="/videos/banfana_vid.webm"
          linkHref="https://www.banfana.com/"
        />
        <VideoContainer
          mobileMarginTop="mt-0"
          mobileMarginBottom="mb-0"
          desktopMarginTop="md:mt-60"
          desktopMarginBottom="md:mb-60"
          videoSrc="/videos/angeleno_vid.webm"
          linkHref="https://www.angeleno.com/"
        />
        <VideoContainer
          mobileMarginTop="mt-0"
          mobileMarginBottom="mb-0"
          desktopMarginTop="md:mt-60"
          desktopMarginBottom="md:mb-40"
          videoSrc="/videos/leadmode_vid.webm"
          linkHref="https://leadmode.io/"
        />
        <VideoContainer
          mobileMarginTop="mt-0"
          mobileMarginBottom="mb-0"
          desktopMarginTop="md:mt-60"
          desktopMarginBottom="md:mb-60"
          videoSrc="/videos/rdbrd_vid.webm"
          linkHref="https://www.rdbrd.co/"
        />
        <VideoContainer
          mobileMarginTop="mt-0"
          mobileMarginBottom="mb-0"
          desktopMarginTop="md:mt-100"
          desktopMarginBottom="md:mb-20"
          videoSrc="/videos/digital_launchpad_vid.webm"
          linkHref="https://digital-launchpad-lp.webflow.io/"
        />
      </div>

      {/* TLDR Section */}
      <div id="tldr" className="z-10 flex min-h-[5rem] items-center justify-center bg-white dark:bg-black">
        <TextReveal text="I do branding, UI&UX design and web development at warp&nbsp;speed" />
      </div>

      {/* Stack Section */}
      <div id="stack" className="flex-col justify-center items-start pb-16 md:pb-0 gap-6 inline-flex">
        <h4>~ stack I use</h4>
        <div className="w-full">
          <GridWithIcons stacks={stacks} iconSize={40} />
        </div>
      </div>

      {/* Side Projects Section */}
      <div id="projects" className="flex flex-col min-h-fit py-16 md:py-0 justify-center items-start gap-6">
        <h4>~ side projects</h4>
        <ExpandableComponent
          icon={<Book className="w-full h-full text-blue-500" />}
          title="The Logbook"
          subtitle="web app"
          description="A web app for tracking and logging various personal activities, from movies and concerts to flights and more."
          statusText="live"
          dotColor="#02E297"
          link="https://the-logbook.vercel.app/"
          stack={["figma", "nextdotjs", "react", "typescript", "clerk"]}
        />
        <ExpandableComponent
          icon={<Sofa className="w-full h-full text-purple-500" />}
          title="Homely91"
          subtitle="home furniture online store"
          description="An upscale online platform specializing in luxury furniture. Explore a curated selection of high-end furnishings to elevate your home with elegance and sophistication."
          statusText="discontinued"
          dotColor="#B7B7B7"
          link="https://homely.framer.website/"
          stack={["figma", "framer"]}
        />
        <ExpandableComponent
          icon={<Shirt className="w-full h-full text-yellow-500" />}
          title="SigilCraft"
          subtitle="clothing brand"
          description="An innovative embroidery brand that merges the avant-garde aesthetics of cyber sigilism with the rich cultural motifs of neo tribalism."
          statusText="coming soon"
          dotColor="#FFAC4D"
          stack={["figma", "medusa"]}
        />
      </div>

      {/* Hobbies Section */}
      <div id="hobbies" className="flex flex-col min-h-fit py-16 md:py-0 justify-center items-start gap-6">
        <h4>~ stuff I enjoy</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          <HobbyCard
            title="Chess"
            description="Try your hand at refuting one of my chess gambits. If you manage to do so, you&apos;ll earn a special discount on my services!"
            linkText="Lichess"
            linkUrl="https://lichess.org/@/WassimBenchekroun"
            logo={<CustomIcon iconSlug="lichess" size={32} />}
            backgroundIcon={<ChessKnightIcon size={150} />}
          />
          <HobbyCard
            title="Running"
            description="Take a quick jog with me—I&apos;m training for a half marathon. Drop me kudos if you&apos;re up for joining!"
            linkText="Strava"
            linkUrl="https://strava.app.link/UBRMj3NJPMb"
            logo={<CustomIcon iconSlug="strava" size={32} />}
            backgroundIcon={<Timer size={150} />}
          />
          <HobbyCard
            title="Movies"
            description="Share your thoughts on Interstellar before we start your project—let&apos;s set the stage with a quick movie discussion."
            linkText="Letterboxd"
            linkUrl="https://letterboxd.com/WassimBen/"
            logo={<CustomIcon iconSlug="letterboxd" size={32} />}
            backgroundIcon={<Film size={150} />}
          />
        </div>
      </div>

      {/* Footer Section */}
      <div
        id="contact-form"
        className="flex flex-col min-h-fit py-16 md:py-0 justify-center items-start gap-6"
      >
        <h4>~ reach out</h4>
        <p className="text-balance">
          I&apos;m always excited to team up on creative projects with inspiring
          people. Need a helping hand? I&apos;ve got two ready to go!
        </p>
        <ContactForm />
        <div className="w-full flex justify-end mt-8">
          <div className="flex items-center gap-2">
            <a
              href="https://read.cv/wassimben"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md transition-colors duration-300 hover:bg-yellow-100 hover:text-yellow-600"
            >
              Read.cv
            </a>
            <a
              href="https://www.linkedin.com/in/wassimbenchekroun/"
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md transition-colors duration-300 hover:bg-blue-100 hover:text-blue-600"
            >
              Linkedin
            </a>
            <a
              href="mailto:wassimbenchekroun0@gmail.com"
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md transition-colors duration-300 hover:bg-green-100 hover:text-green-600"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </main>
  </>
  );
}
