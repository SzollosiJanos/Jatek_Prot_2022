const WINDOW_SIZE = 750;

const config = {
    type: Phaser.AUTO,
    width: WINDOW_SIZE,
    height: WINDOW_SIZE,
    backgroundColor: '#ffffff',
    pixelArt: false,
    scene: [loadingScene, gameScene]
};

const game = new Phaser.Game(config);