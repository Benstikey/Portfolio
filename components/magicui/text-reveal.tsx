import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Cover } from "@/components/ui/cover"; // Ensure the path is correct

interface TextRevealByWordProps {
  text: string;
  highlights?: { start: number; end: number; Component: React.ElementType }[];
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  highlights = [],
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex flex-col h-[50%] items-start justify-center bg-transparent gap-8"
        }
      >
        <h4>~ tldr?</h4>
        <h2
          ref={targetRef}
          className={
            "flex flex-wrap text-2xl mb-20 font-medium dark:text-white/20 md:text-3xl lg:text-4xl xl:text-5xl"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;

            // Check if this word should be highlighted
            const highlight = highlights.find(
              (h) => i >= h.start && i < h.end
            );
            const WordComponent = highlight ? highlight.Component : "span";

            // Apply Cover only to the last word
            const isLastWord = i === words.length - 1;

            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {isLastWord ? (
                  <Cover className="inline-block">
                    <WordComponent>{word}</WordComponent>
                  </Cover>
                ) : (
                  <WordComponent>{word}</WordComponent>
                )}
              </Word>
            );
          })}
        </h2>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-slate-600 dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
