
document.addEventListener("DOMContentLoaded", () => {
  // Respect visitors who prefer reduced motion.
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  // Add subtle reveal animations to sections and project cards.
  const style = document.createElement("style");

  style.textContent = `
    .scroll-reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }

    .scroll-reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .scroll-reveal {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
  `;

  document.head.appendChild(style);

  const elements = document.querySelectorAll(
    "section, .project-card"
  );

  // Show everything if the browser doesn't support the observer.
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => {
    element.classList.add("scroll-reveal");
    observer.observe(element);
  });
});
