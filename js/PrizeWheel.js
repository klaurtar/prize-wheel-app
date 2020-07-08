class PrizeWheel {
  constructor() {
    this.$prizeWheelContainer = document.createElement('div');

    this.$stopBtn = undefined;
    this.$prizeWheel = undefined;
    this.$timerDisplay = undefined;
    this.$newGameButton = undefined;

    this.spinning = false;

    this.colors = [];

    this.getColors(CSS_COLOR_NAMES, 4);

    this.colorToWin = this.selectColorRandomly(this.colors);

    this.renderWheel(this.colors, this.colorToWin, this.spinning);

    this.setUpListeners();
  }

  renderWheel(colors, colorToWin, spinning) {
    this.$prizeWheelContainer.innerHTML = ejs.render(prizeWheelTemplate, {
      colors,
      colorToWin,
      spinning,
    });
    this.cacheDOMElements();
  }

  newGame() {
    this.spinning = false;

    this.colors = [];

    this.getColors(CSS_COLOR_NAMES, 4);

    this.colorToWin = this.selectColorRandomly(this.colors);

    this.renderWheel(this.colors, this.colorToWin, this.spinning);
  }

  cacheDOMElements() {
    this.$stopBtn = this.$prizeWheelContainer.querySelector('.stopButton');
    this.$prizeWheel = this.$prizeWheelContainer.querySelector('.prize-wheel');

    this.$timerDisplay = this.$prizeWheelContainer.querySelector(
      '#time-display'
    );
    this.$newGameButton = this.$prizeWheelContainer.querySelector(
      '.new-game-button'
    );
  }

  selectColorRandomly(arr) {
    const index = this.numberToChooseColor(arr);
    const winningColor = arr[index];

    return winningColor;
  }

  start() {
    this.$newGameButton.dataset.active = 'false';
    this.$stopBtn.dataset.active = 'true';
    this.rotateTheWheel();
  }

  stop() {
    this.$newGameButton.dataset.active = 'true';
    this.$stopBtn.dataset.active = 'false';
    this.stopTheWheel();
  }

  rotateTheWheel() {
    this.$prizeWheel.dataset.spinning = 'true';
  }

  stopTheWheel() {
    this.$prizeWheel.dataset.spinning = 'false';
  }

  createClock() {
    return Math.floor(Math.random() * 8) + 5;
  }

  getAngle(matrixValue) {
    const values = matrixValue.split('(')[1].split(')')[0].split(',');

    const a = values[0];
    const b = values[1];
    const c = values[2];
    const d = values[3];

    const scale = Math.sqrt(a * a + b * b);

    console.log('Scale ' + scale);

    const sin = b / scale;

    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

    console.log('Rotate: ' + angle + 'deg');

    return angle;
  }

  getColors(arr, num) {
    for (let i = 0; i < num; i++) {
      const index = this.numberToChooseColor(arr);
      this.colors.push(arr[index]);
    }
  }

  numberToChooseColor(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  renderPrizeWheel() {
    return this.$prizeWheelContainer;
  }

  setUpListeners() {
    this.$prizeWheelContainer.addEventListener('click', (e) => {
      const button = e.target;

      if (button.className === 'spinButton') {
        this.spinning = true;
        this.start();
        const time = this.createClock();
        this.startTimer(time);

        const st = window.getComputedStyle(this.$prizeWheel, null);
        const animationalue = st.getPropertyValue('animation');
        console.log(animationalue);
      } else if (button.className === 'stopButton') {
        this.spinning = false;
      } else if (button.className === 'new-game-button') {
        this.newGame();
      }
    });
  }

  evaluateWinOrLose() {
    const st = window.getComputedStyle(this.$prizeWheel, null);
    const transformValue = st.getPropertyValue('transform');
    const angle = this.getAngle(transformValue);

    this.$prizeWheel.style.transform = `rotate(${angle}deg)`;

    this.stop();

    if (angle >= 0 && angle <= 90) {
      console.log('this is ' + this.colors[0]);
      if (this.colorToWin === this.colors[0]) {
        this.$timerDisplay.innerText = 'You Won! Congratulations';

        EventManager.publish(
          'prizeWheelWinOrLose',
          `<h1>You Won! Congrats!</h1>`
        );
      } else {
        this.$timerDisplay.innerText = 'Sorry, you lost!';
        EventManager.publish(
          'prizeWheelWinOrLose',
          `<h1>You Lost! Sorry!</h1>`
        );
      }
    } else if (angle >= 90 && angle <= 180) {
      console.log('this is ' + this.colors[2]);
      if (this.colorToWin === this.colors[2]) {
        this.$timerDisplay.innerText = 'You Won! Congratulations';
        EventManager.publish(
          'prizeWheelWinOrLose',
          `<h1>You Won! Congrats!</h1>`
        );
      } else {
        this.$timerDisplay.innerText = 'Sorry, you lost!';
        EventManager.publish(
          'prizeWheelWinOrLose',
          `<h1>You Lost! Sorry!</h1>`
        );
      }
    } else if (angle >= -180 && angle <= -90) {
      console.log('this is ' + this.colors[3]);
      if (this.colorToWin === this.colors[3]) {
        this.$timerDisplay.innerText = 'You Won! Congratulations';
        EventManager.publish(
          'prizeWheelWinOrLose',
          `<h1>You Won! Congrats!</h1>`
        );
      } else {
        this.$timerDisplay.innerText = 'Sorry, you lost!';
        EventManager.publish(
          'prizeWheelWinOrLose',
          `<h1>You Lost! Sorry!</h1>`
        );
      }
    } else if (angle >= -90 && angle <= 0) {
      console.log('this is ' + this.colors[1]);
      if (this.colorToWin === this.colors[1]) {
        this.$timerDisplay.innerText = 'You Won! Congratulations';
        EventManager.publish(
          'prizeWheelWinOrLose',
          `<h1>You Won! Congrats!</h1>`
        );
      } else {
        this.$timerDisplay.innerText = 'Sorry, you lost!';
        EventManager.publish(
          'prizeWheelWinOrLose',
          `<h1>You Lost! Sorry!</h1>`
        );
      }
    }
  }

  startTimer(time) {
    let timeLeft = time;
    const countDown = setInterval(() => {
      if (timeLeft >= 0 && this.spinning) {
        this.$timerDisplay.innerText =
          'Wheel will stop in ' + Math.ceil(timeLeft) + ' seconds';

        timeLeft = timeLeft - 0.1;
      } else {
        this.evaluateWinOrLose();

        clearInterval(countDown);
      }
    }, 100);
  }
}
