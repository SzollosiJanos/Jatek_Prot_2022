const loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function () {
    this.load.image('background1', 'assets/tile1.png');
    this.load.image('background2', 'assets/tile2.png');
    this.load.image('overlay', 'assets/overlay.png');
    // this.load.image('Wparaszt', 'assets/paraszt_white.png');
    // this.load.image('Bparaszt', 'assets/paraszt_black.png');
    this.load.image('Wfuto', 'assets/futo_white.png');
    this.load.image('Bfuto', 'assets/futo_black.png');
    // this.load.image('Wkiraly', 'assets/king_white.png');
    // this.load.image('Bkiraly', 'assets/king_black.png');
    this.load.image('Wkiralyno', 'assets/kiralyno_white.png');
    this.load.image('Bkiralyno', 'assets/kiralyno_black.png');
    this.load.image('Wcsiko', 'assets/csiko_white.png');
    this.load.image('Bcsiko', 'assets/csiko_black.png');
    // this.load.image('Wbastya', 'assets/bastya_white.png');
    // this.load.image('Bbastya', 'assets/bastya_black.png');

    this.barW = 500;
    this.barH = 30;
    this.gameW = this.sys.game.config.width;
    this.gameH = this.sys.game.config.height;

    this.barBg = this.add.graphics();
    this.barBg.fillStyle(0x000000, 0.3);
    this.barBg.fillRect(
        this.gameW / 2 - this.barW / 2,
        this.gameH / 2 - this.barH / 2,
        this.barW,
        this.barH
    );
    this.progressBar = this.add.graphics();
    this.progressBar_progress = 0;
    this.newprogressbar();
    this.load.on('progress', (progress) => {
        this.newprogressbar();
    });

    
    this.createPieces();
};


loadingScene.createPieces = function() {
    let piece;

    piece = this.newBlackPiece();
    drawPiece(piece, 'paraszt');
    piece.generateTexture('Bparaszt', 1024, 1024);
    this.newprogressbar();

    piece = this.newWhitePiece();
    drawPiece(piece, 'paraszt');
    piece.generateTexture('Wparaszt', 1024, 1024);
    this.newprogressbar();

    piece = this.newBlackPiece();
    drawPiece(piece, 'bastya');
    piece.generateTexture('Bbastya', 1024, 1024);
    this.newprogressbar();

    piece = this.newWhitePiece();
    drawPiece(piece, 'bastya');
    piece.generateTexture('Wbastya', 1024, 1024);
    this.newprogressbar();

    piece = this.newBlackPiece();
    drawPiece(piece, 'kiraly');
    piece.generateTexture('Bkiraly', 1200, 1200);
    this.newprogressbar();

    piece = this.newWhitePiece();
    drawPiece(piece, 'kiraly');
    piece.generateTexture('Wkiraly', 1200, 1200);
    this.newprogressbar();
};


loadingScene.newBlackPiece = function() {
    const BLACK_COLOR = 0x000000;
    const WHITE_COLOR = 0xFFFFFF;

    const piece = this.make.graphics({x: 0, y: 0, add: false});
    piece.lineStyle(30, WHITE_COLOR, 1.0);
    piece.fillStyle(BLACK_COLOR, 1.0);

    return piece;
};


loadingScene.newWhitePiece = function() {
    const BLACK_COLOR = 0x000000;
    const WHITE_COLOR = 0xFFFFFF;

    const piece = this.make.graphics({x: 0, y: 0, add: false});
    piece.lineStyle(30, BLACK_COLOR, 1.0);
    piece.fillStyle(WHITE_COLOR, 1.0);

    return piece;
};


function drawPiece(piece, type) {
    let path;

    switch(type) {
        case 'paraszt':
            piece.beginPath();
            piece.arc(511, 952, 400, 0, Math.PI, true);
            piece.closePath();
            piece.fillPath();
            piece.strokePath();
            piece.fillCircle(512, 450, 230);
            piece.strokePath();
            piece.fillCircle(512, 190, 120);
            piece.strokePath();
            break;

        case 'bastya':
            // draw bottom slabs
            piece.fillRect(112, 872, 800, 80);
            piece.strokeRect(112, 872, 800, 80);
            piece.fillRect(192, 752, 640, 120);
            piece.strokeRect(192, 752, 640, 120);
            piece.beginPath();
            piece.moveTo(192, 752);
            piece.lineTo(232, 652);
            piece.lineTo(792, 652);
            piece.lineTo(832, 752);
            piece.closePath();
            piece.fillPath();
            piece.strokePath();
            // draw middle
            piece.fillRect(232, 302, 560, 350);
            piece.strokeRect(232, 302, 560, 350);
            // draw top
            piece.beginPath();
            piece.moveTo(232, 302);
            piece.lineTo(192, 202);
            piece.lineTo(832, 202);
            piece.lineTo(792, 302);
            piece.closePath();
            piece.fillPath();
            piece.strokePath();
            piece.beginPath();
            piece.moveTo(192, 202);
            piece.lineTo(192, 72);
            piece.lineTo(272, 72);
            piece.lineTo(272, 122);
            piece.lineTo(472, 122);
            piece.lineTo(472, 72);
            piece.lineTo(552, 72);
            piece.lineTo(552, 122);
            piece.lineTo(752, 122);
            piece.lineTo(752, 72);
            piece.lineTo(832, 72);
            piece.lineTo(832, 202);
            piece.closePath();
            piece.fillPath();
            piece.strokePath();
            break;

        case 'kiraly':
            // draw cross
            path = new Phaser.Curves.Path();
            path.moveTo(575, 400);
            path.lineTo(575, 150);
            path.lineTo(500, 150);
            path.lineTo(500, 100);
            path.lineTo(575, 100);
            path.lineTo(575, 25);
            path.lineTo(625, 25);
            path.lineTo(625, 100);
            path.lineTo(700, 100);
            path.lineTo(700, 150);
            path.lineTo(625, 150);
            path.lineTo(625, 400);
            piece.fillPoints(path.getPoints());
            piece.strokePath();

            // draw middle bump
            path = new Phaser.Curves.Path();
            addQuadBezier(path, 375, 550, 600, -150, 825, 550);
            piece.fillPoints(path.getPoints());
            piece.strokePath();

            // draw side bumps
            path = new Phaser.Curves.Path();
            path.moveTo(600, 800);
            path.lineTo(600, 550);
            addQuadBezier(path, 600, 550, 375, 175, 150, 325);
            addQuadBezier(path, 150, 325, -75, 475, 300, 760);
            piece.fillPoints(path.getPoints());
            piece.strokePath();

            path = new Phaser.Curves.Path();
            path.moveTo(600, 800);
            path.lineTo(600, 550);
            addQuadBezier(path, 600, 550, 825, 175, 1050, 325);
            addQuadBezier(path, 1050, 325, 1275, 475, 900, 760);
            piece.fillPoints(path.getPoints());
            piece.strokePath();

            // draw bottom rings
            path = new Phaser.Curves.Path();
            path.moveTo(300, 880);
            path.lineTo(300, 760);
            addQuadBezier(path, 300, 760, 600, 610, 900, 760);
            path.lineTo(900, 880);
            piece.fillPoints(path.getPoints());
            piece.strokePath();

            path = new Phaser.Curves.Path();
            path.moveTo(300, 1000);
            path.lineTo(300, 880);
            addQuadBezier(path, 300, 880, 600, 730, 900, 880);
            path.lineTo(900, 1000);
            piece.fillPoints(path.getPoints());
            piece.strokePath();

            path = new Phaser.Curves.Path();
            addQuadBezier(path, 300, 1000, 600, 1150, 900, 1000);
            addQuadBezier(path, 900, 1000, 600, 850, 300, 1000);
            piece.fillPoints(path.getPoints());
            piece.strokePath();

            break;
    }
}


function addQuadBezier(path, p0X, p0Y, p1X, p1Y, p2X, p2Y) {
    const p0 = new Phaser.Math.Vector2(p0X, p0Y);
    const p1 = new Phaser.Math.Vector2(p1X, p1Y);
    const p2 = new Phaser.Math.Vector2(p2X, p2Y);
    path.add(new Phaser.Curves.QuadraticBezier(p0, p1, p2));
}


loadingScene.newprogressbar = function(){
    this.progressBar.clear();
    this.progressBar.fillStyle(0x28D139, 1);
    this.progressBar.fillRect(
        this.gameW / 2 - this.barW / 2,
        this.gameH / 2 - this.barH / 2,
            (this.progressBar_progress/15) * this.barW,
            this.barH
    )
    this.progressBar_progress++;
};


loadingScene.create = function () {
    this.scene.start('Home');
};
