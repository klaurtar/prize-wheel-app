class PrizeWheel {
  constructor() {
    this.$prizeWheelContainer = document.createElement('div');

    this.spinning = true;

    this.$prizeWheelContainer.innerHTML = ejs.render(prizeWheelTemplate, {
      color: this.colorToWin,
      spinning: this.spinning,
    });

    this.$prizeWheel = this.$prizeWheelContainer.querySelector('.prize-wheel');

    this.$timerDisplay = this.$prizeWheelContainer.querySelector(
      '#time-display'
    );

    this.colors = [];
    this.stop = false;

    this.getColors();

    this.numberToWin = this.numberToChooseColor(this.colors);

    this.colorToWin = this.colors[this.numberToWin];

    console.log('To win, land on this color: ', this.colorToWin);

    this.getColorToWin = () => {
      return this.colorToWin;
    };

    this.setUpListeners();
  }

  createClock() {
    return Math.floor(Math.random() * 15) + 5;
  }

  getAngle(matrixValue) {
    console.log(matrixValue);
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

  getColors() {
    const colorArr = this.$prizeWheel.querySelectorAll('div');
    colorArr.forEach((div) => {
      this.colors.push(div.className);
    });
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
        this.$prizeWheel.className += ' rotate';

        const time = this.createClock();

        this.startTimer(time);
      } else if (button.className === 'stopButton') {
        this.stop = true;
      }
    });
  }

  startTimer(time) {
    let timeLeft = time;
    const countDown = setInterval(() => {
      if (timeLeft && !this.stop) {
        this.$timerDisplay.innerText =
          'Wheel will stop in ' + timeLeft + ' seconds';

        timeLeft = timeLeft - 1;
      } else {
        const st = window.getComputedStyle(this.$prizeWheel, null);
        const transformValue = st.getPropertyValue('transform');
        const angle = this.getAngle(transformValue);

        this.$prizeWheel.style.transform = `rotate(${angle}deg)`;

        this.$prizeWheel.classList.remove('rotate');

        if (angle >= 0 && angle <= 90) {
          console.log('This is Red!');
          if (this.colorToWin === 'red') {
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
          console.log('This is Green!');
          if (this.colorToWin === 'green') {
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
          console.log('This is Yellow!');
          if (this.colorToWin === 'yellow') {
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
          console.log('This is Blue!');
          if (this.colorToWin === 'blue') {
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

        clearInterval(countDown);
        this.stop = false;
      }
    }, 1000);
  }
}
