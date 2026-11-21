export const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const titleLineVariants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};
