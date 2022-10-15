class Modal {
  destroy: () => void;

  constructor() {
    this.destroy = () => {};
  }

  render() {
    return /*html*/ `
      <div class="modal">
        <div class="modal__blocker"></div>
        <div class="modal__card">
          <div class="header">
            <img
              src="./assets/no_poster.png"
              alt="Movie Poster"
              class="movie__poster"
            />
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/BT7RhU6DqZ8"
              title="YouTube video player"
              frameborder="0"
              allowfullscreen
            >
            </iframe>
          </div>
          <div class="content"></div>
        </div>
      </div>
    `;
  }

  hydrate() {
    const $main = document.querySelector("main")!;
    const $modal = document.querySelector(".modal")!;
    const $blocker = document.querySelector(".modal__blocker")!;

    const handleBlocker = () => {
      $modal.classList.remove("active");
      $main.classList.remove("blurred");
      document.body.style.overflowY = "auto";
    };

    $blocker.addEventListener("click", handleBlocker);

    return () => $blocker.removeEventListener("click", handleBlocker);
  }
}

export default Modal;
