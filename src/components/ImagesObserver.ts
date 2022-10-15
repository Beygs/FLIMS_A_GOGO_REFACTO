class ImagesObserver {
  #observer: IntersectionObserver;

  constructor() {
    this.#observer = this.#setObserver();
  }

  #setObserver(): IntersectionObserver {
    return new IntersectionObserver((entries, imgObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImg = entry.target as HTMLImageElement;
          lazyImg.src = lazyImg.dataset.src as string;
          lazyImg.classList.remove("lazy-image");
          imgObserver.unobserve(lazyImg);
        }
      });
    });
  }

  observe(entry: HTMLImageElement) {
    this.#observer.observe(entry);
  }

  unobserve(entry: HTMLImageElement) {
    this.#observer.unobserve(entry)
  }
}

export default ImagesObserver;
