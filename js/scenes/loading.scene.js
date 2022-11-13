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
    this.createPieces();
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


loadingScene.createPieces = function() {
    const bParasztGraphics = this.make.graphics({x: 0, y: 0, add: false});
    bParasztGraphics.lineStyle(30, 0xFFFFFF, 1.0);
    bParasztGraphics.fillStyle(0x000000, 1.0);
    bParasztGraphics.beginPath();
    bParasztGraphics.arc(512, 952, 400, 0, Math.PI, true);
    bParasztGraphics.closePath();
    bParasztGraphics.fillPath();
    bParasztGraphics.strokePath();
    bParasztGraphics.fillCircle(512, 450, 230);
    bParasztGraphics.strokePath();
    bParasztGraphics.fillCircle(512, 190, 120);
    bParasztGraphics.strokePath();
    bParasztGraphics.generateTexture('Bparaszt', 1024, 1024);

    const wParasztGraphics = this.make.graphics({x: 0, y: 0, add: false});
    wParasztGraphics.lineStyle(30, 0x000000, 1.0);
    wParasztGraphics.fillStyle(0xFFFFFF, 1.0);
    wParasztGraphics.beginPath();
    wParasztGraphics.arc(512, 952, 400, 0, Math.PI, true);
    wParasztGraphics.closePath();
    wParasztGraphics.fillPath();
    wParasztGraphics.strokePath();
    wParasztGraphics.fillCircle(512, 450, 230);
    wParasztGraphics.strokePath();
    wParasztGraphics.fillCircle(512, 190, 120);
    wParasztGraphics.strokePath();
    wParasztGraphics.generateTexture('Wparaszt', 1024, 1024);
}

loadingScene.create = function () {
    this.scene.start('Home');
};