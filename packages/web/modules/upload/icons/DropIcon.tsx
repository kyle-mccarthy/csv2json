import { motion } from "framer-motion";
import { SVGProps } from "react";

const variants = {
  plus: {
    vline: "M7.25 2.75 L7.25 2.75 7.25 12.5",
    hline:
      "M2.5 7.5 C 2.5 7.5 12.5 7.5 12.5 7.5 M2.5 7.5 C 2.5 7.5 12.5 7.5 12.5 7.5",
  },
  arrow: {
    vline: "M7.25 2.5 L7.25 2.5 7.25 12.5",
    hline:
      "M3.5 8.5 C 3.5 8.5 7.25 12.75 7.25 12.75 M7.25 12.75 C 7.25 12.75 11.25 8.75 11.25 8.75",
  },
  check: {
    vline: "M 7.25 12.5 L 7.5 12.5 13 2.5",
    hline: "M2.5 8.5 C 2.5 8.5 7.25 12.75 7.25 12.75 M7.25 12.75 C7.25 12.75 2.5 8.5 2.5 8.5"
  }
};

type Variant = "plus" | "arrow" | "check";

interface Props {
  variant?: Variant;
}

const DropIcon = ({ variant = 'plus', ...props }: Props & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15 15"
      xmlSpace="preserve"
      stroke="currentColor"
      fill="transparent"
      {...props}
    >
      <motion.path
        animate={{
          d: variants[variant].vline,
        }}
        transition={{
          duration: 0.125,
          ease: "easeInOut",
        }}
        d={variants[variant].vline}
        fill="none"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <motion.path
        animate={{
          d: variants[variant].hline,
        }}
        transition={{
          duration: 0.125,
          ease: "easeInOut",
        }}
        d={variants[variant].hline}
        fill="none"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DropIcon;
