export function useMyScroll() {
  const scrollToElement = (el: HTMLElement) => {
    el.scrollIntoView({ behavior: "smooth" });
  };

  return {
    scrollToElement,
  };
}
