import React, { useEffect, useRef } from 'react';

class TextScramble {
  el: HTMLElement;
  chars: string;
  frameRequest: number | undefined;
  frame: number;
  queue: Array<{ from: string; to: string; start: number; end: number; char?: string }>;
  resolve!: () => void;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.frame = 0;
    this.queue = [];
    this.update = this.update.bind(this);
  }

  setText(newText: string) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));

    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 10); // Reduced start duration for quicker entry
      const end = start + Math.floor(Math.random() * 20 + 10); // Shorter end duration for faster reveal
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest!);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.2) { // Reduced randomization for smoother transition
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
      this.el.innerHTML = output; // Final output without random characters
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const TextScrambleComponent: React.FC = () => {
  const paragraphsRef = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const paragraphs = [
      "I'm Wassim, a web developer with expertise in Webflow and Framer, specializing in low-code solutions.",
      "As someone who embraces minimalism, I focus on creating clean, impactful digital experiences.",
      "Currently helping businesses create unique web experiences.",
      'Connect with me on <a href="https://www.linkedin.com/in/wassimbenchekroun/" target="_blank" style="text-decoration: underline;">Linkedin</a> or <a href="#contact-form" style="text-decoration: underline;">reach out</a> via email.'
    ];

    paragraphsRef.current.forEach((paragraph, index) => {
      const fx = new TextScramble(paragraph);
      setTimeout(() => {
        fx.setText(paragraphs[index]);
      }, index * 500);
    });
  }, []);

  const setRef = (el: HTMLParagraphElement | null, index: number) => {
    if (el) {
      paragraphsRef.current[index] = el;
    }
  };

  return (
    <div style={{ minHeight: '240px', overflow: 'hidden' }}>
      <p ref={(el) => setRef(el, 0)} style={{ margin: '0 0 16px 0' }}></p>
      <p ref={(el) => setRef(el, 1)} style={{ margin: '0 0 16px 0' }}></p>
      <p ref={(el) => setRef(el, 2)} style={{ margin: '0 0 16px 0' }}></p>
      <p ref={(el) => setRef(el, 3)} style={{ margin: '0' }}></p>
    </div>
  );
};


export default TextScrambleComponent;
