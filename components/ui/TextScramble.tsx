import React, { useEffect, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>/?';

export const TextScramble: React.FC<TextScrambleProps> = ({ text, className, trigger = true }) => {
  const [displayedText, setDisplayedText] = useState(text);

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) =>
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2; // Speed control
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span className={className}>{displayedText}</span>;
};