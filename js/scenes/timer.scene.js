const timerScene = new Phaser.Scene('Timer');

const AVAILABLE_TIME_MS = 600 * 1000;

function clockStr(milliseconds) {
  const seconds = Math.ceil(milliseconds / 1000);
  const minutesPart = Math.floor(seconds / 60);
  const secondsPart = seconds % 60;
  const minutesStr = String(minutesPart).padStart(2, '0');
  const secondsStr = String(secondsPart).padStart(2, '0');
  return `${minutesStr}:${secondsStr}`;
}

timerScene.countdown = function() {
  this.updateTimes();
  this.updateClocks();

  if (this.blackTimeMs < AVAILABLE_TIME_MS && this.whiteTimeMs < AVAILABLE_TIME_MS) {
    const elapsedSec = Math.round((this.blackTimeMs + this.whiteTimeMs) / 1000);
    const timeout = Math.min(
      this.startTimeMs + (elapsedSec + 1) * 1000 - performance.now(),
      AVAILABLE_TIME_MS - this.whiteTimeMs,
      AVAILABLE_TIME_MS - this.blackTimeMs
    );
    setTimeout(() => this.countdown(), timeout);
  } else {
    this.showWinner();
    gameScene.scene.start('Start');
  }
}

timerScene.updateTimes = function() {
  const isBlack = this.player == 0;

  if (isBlack) {
    this.blackTimeMs = performance.now() - this.startTimeMs - this.whiteTimeMs;
  } else {
    this.whiteTimeMs = performance.now() - this.startTimeMs - this.blackTimeMs;
  }
}

timerScene.updateClocks = function() {
  this.blackClock.setText(clockStr(AVAILABLE_TIME_MS - this.blackTimeMs));
  this.whiteClock.setText(clockStr(AVAILABLE_TIME_MS - this.whiteTimeMs));
}

timerScene.create = function () {
  this.player = 1;
  this.whiteClock = this.add.text(config.width - 100, config.height - 65, clockStr(AVAILABLE_TIME_MS), { font: 'bold 32px Arial', fill: 'green', align: 'right' });
  this.blackClock = this.add.text(config.width - 100, 20, clockStr(AVAILABLE_TIME_MS), { font: 'bold 32px Arial', fill: 'green', align: 'right' });
  this.startTimeMs = performance.now();
  this.whiteTimeMs = 0;
  this.blackTimeMs = 0;
  this.countdown();
};

timerScene.switchPlayer = function() {
  this.updateTimes();
  this.updateClocks();
  this.player = (this.player + 1) % 2;
}

timerScene.showWinner = function() {
  const isBlack = this.player == 0;

  if (isBlack) {
    this.whiteClock.setX(config.width - 300);
    this.whiteClock.setText('Világos nyert!');
  } else {
    this.blackClock.setX(config.width - 300);
    this.blackClock.setText('Sötét nyert!');
  }
}
