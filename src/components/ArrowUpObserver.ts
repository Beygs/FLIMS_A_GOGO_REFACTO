//   arrowUpObserver.observe(moviesSection.querySelector(".movie")!);

// const arrowHideObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.intersectionRatio > 0.95) {
//         arrowUp.setAttribute("style", "visibility: hidden; opacity: 0");
//       }
//     });
//   },
//   {
//     threshold: [0.95, 1],
//   }
// );

// arrowHideObserver.observe(searchSection);

class ArrowUpObserver {
  #prevRatio: number;
  #showObserver: IntersectionObserver;
  #hideObserver: IntersectionObserver;

  constructor() {
    this.#prevRatio = 0.0;
    this.#showObserver = this.#setShowObserver();
    this.#hideObserver = this.#setHideObserver();
  }

  #setShowObserver() {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > this.#prevRatio) {
            const $arrowUp = document.querySelector(".arrow-up")!;
            $arrowUp.setAttribute(
              "style",
              "visibility: visible; opacity: 1"
            );
          }

          this.#prevRatio = entry.intersectionRatio;
        });
      },
      {
        threshold: [0, 0.5],
      }
    );
  }

  #setHideObserver() {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.95) {
            const $arrowUp = document.querySelector(".arrow-up")!;
            $arrowUp.setAttribute("style", "visibility: hidden; opacity: 0");
          }
        });
      },
      {
        threshold: [0.95, 1],
      }
    );
  }

  observeShow(entry: Element) {
    this.#showObserver.observe(entry);
  }

  observeHide(entry: Element) {
    this.#hideObserver.observe(entry);
  }

  unobserveShow(entry: Element) {
    this.#showObserver.unobserve(entry);
  }

  unobserveHide(entry: Element) {
    this.#hideObserver.unobserve(entry);
  }
}

export default ArrowUpObserver;
