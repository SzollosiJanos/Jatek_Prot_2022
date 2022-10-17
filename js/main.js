const WINDOW_SIZE = 750;

const config = {
    type: Phaser.AUTO,
    width: WINDOW_SIZE,
    height: WINDOW_SIZE,
    backgroundColor: '#ffffff',
    pixelArt: false,
    scene: [loadingScene, homeScene, gameScene]
};

const game = new Phaser.Game(config);




/*
TO DO LIST


overlay
csiko
futo
kiraly
kiralyno
sakk
sakk matt
hangok
rosálás
en passant
paraszt átváltozás
bábúk generálása kóddal
bábú leütési animáció
game over screen
home screen
*/