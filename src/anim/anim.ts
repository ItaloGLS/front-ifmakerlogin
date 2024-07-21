export function setupNavbarScroll(): void {
    const navbar: HTMLElement | null = document.querySelector('.navbar');
  
    if (navbar) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    } else {
      console.error('Navbar element not found');
    }
  }