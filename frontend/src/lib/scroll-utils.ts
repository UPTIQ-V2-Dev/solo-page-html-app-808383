export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export const getCurrentSection = (): string => {
  const sections = ['hero', 'features', 'about', 'contact'];
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        return sectionId;
      }
    }
  }

  return 'hero'; // default
};