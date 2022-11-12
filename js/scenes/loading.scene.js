const loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function () {
    this.load.image('background1', 'assets/tile1.png');
    this.load.image('background2', 'assets/tile2.png');
    this.load.image('overlay', 'assets/overlay.png');
    // this.load.image('Wparaszt', 'assets/paraszt_white.png');
    // this.load.image('Bparaszt', 'assets/paraszt_black.png');
    this.load.image('Wfuto', 'assets/futo_white.png');
    this.load.image('Bfuto', 'assets/futo_black.png');
    this.load.image('Wkiraly', 'assets/king_white.png');
    this.load.image('Bkiraly', 'assets/king_black.png');
    this.load.image('Wkiralyno', 'assets/kiralyno_white.png');
    this.load.image('Bkiralyno', 'assets/kiralyno_black.png');
    this.load.image('Wcsiko', 'assets/csiko_white.png');
    this.load.image('Bcsiko', 'assets/csiko_black.png');
    this.load.image('Wbastya', 'assets/bastya_white.png');
    this.load.image('Bbastya', 'assets/bastya_black.png');

    const barW = 500;
    const barH = 30;
    const gameW = this.sys.game.config.width;
    const gameH = this.sys.game.config.height;

    this.barBg = this.add.graphics();
    this.barBg.fillStyle(0x000000, 0.3);
    this.barBg.fillRect(
        gameW / 2 - barW / 2,
        gameH / 2 - barH / 2,
        barW,
        barH
    );

    this.progressBar = this.add.graphics();

    this.load.on('progress', (progress) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x28D139, 1);
        this.progressBar.fillRect(
            gameW / 2 - barW / 2,
            gameH / 2 - barH / 2,
            progress * barW,
            barH
        );
    });
};

loadingScene.create = function () {
    this.scene.start('Home');
};
