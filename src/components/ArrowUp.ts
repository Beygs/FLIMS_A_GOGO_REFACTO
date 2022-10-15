class ArrowUp {
  destroy: () => void;

  constructor() {
    this.destroy = () => {};
  }

  render() {
    return /*html*/ `
      <div class="arrow-up">
        <i class="fas fa-long-arrow-alt-up"></i>
      </div>
    `;
  }

  hydrate() {
    const $arrowUp = document.querySelector(".arrow-up")!;

    const handleClick = () =>
      window.scroll({ top: 0, left: 0, behavior: "smooth" });

    $arrowUp.addEventListener("click", handleClick);

    return () => $arrowUp.removeEventListener("click", handleClick);
  }
}

export default ArrowUp;
