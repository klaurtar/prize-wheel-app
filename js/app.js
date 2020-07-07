(function app() {
  const prizeWheel = new PrizeWheel();
  const $prizeWheelElement = prizeWheel.renderPrizeWheel();

  document.body.appendChild($prizeWheelElement);
})();
