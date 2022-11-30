const loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function () {
    this.load.image('background1', 'assets/tile1.png');
    this.load.image('background2', 'assets/tile2.png');
    this.load.image('overlay', 'assets/overlay.png');
    this.load.image('Wfuto', 'assets/futo_white.png');
    this.load.image('Bfuto', 'assets/futo_black.png');

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

    piece = this.newBlackPiece();
    drawPiece(piece, 'kiralyno');
    piece.generateTexture('Bkiralyno', 1200, 1200);
    this.newprogressbar();

    piece = this.newWhitePiece();
    drawPiece(piece, 'kiralyno');
    piece.generateTexture('Wkiralyno', 1200, 1200);
    this.newprogressbar();

    piece = this.newBlackPiece();
    drawPiece(piece, 'csiko');
    piece.generateTexture('Bcsiko', 1200, 1200);
    this.newprogressbar();

    piece = this.newWhitePiece();
    drawPiece(piece, 'csiko');
    piece.generateTexture('Wcsiko', 1200, 1200);
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

        case 'kiralyno':
            // draw spikes
            piece.beginPath();
            piece.moveTo(300, 760);
            piece.lineTo(200, 400);
            piece.lineTo(400, 750);
            piece.lineTo(400, 350);
            piece.lineTo(500, 700);
            piece.fillPath();
            piece.strokePath();

            piece.beginPath();
            piece.moveTo(550, 700);
            piece.lineTo(600, 300);
            piece.lineTo(650, 700);
            piece.fillPath();
            piece.strokePath();

            piece.beginPath();
            piece.moveTo(900, 760);
            piece.lineTo(1000, 400);
            piece.lineTo(800, 750);
            piece.lineTo(800, 350);
            piece.lineTo(700, 700);
            piece.fillPath();
            piece.strokePath();

            // draw pearls
            piece.fillCircle(180, 350, 50);
            piece.strokePath();
            piece.fillCircle(390, 300, 50);
            piece.strokePath();
            piece.fillCircle(600, 250, 50);
            piece.strokePath();
            piece.fillCircle(1020, 350, 50);
            piece.strokePath();
            piece.fillCircle(810, 300, 50);
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

        case 'csiko':
            // draw ear
            path = new Phaser.Curves.Path();
            path.moveTo(626, 349);
            path.lineTo(584, 267);
            path.lineTo(499, 382);
            piece.fillPoints(path.getPoints());
            piece.strokePath();

            // draw outline
            path = new Phaser.Curves.Path();
            path.moveTo(652, 625);
            addQuadBezier(path, 652, 625, 670, 740, 506, 856);
            addQuadBezier(path, 506, 856, 405, 931, 421, 1011);
            path.lineTo(961, 1010);
            addQuadBezier(path, 961, 1010, 1003, 430, 686, 349);
            path.lineTo(664, 267);
            path.lineTo(599, 332);
            addQuadBezier(path, 599, 332, 420, 408, 418, 478);
            addQuadBezier(path, 418, 478, 415, 520, 307, 649);
            addQuadBezier(path, 307, 649, 272, 790, 369, 782);
            addQuadBezier(path, 369, 782, 402, 762, 409, 725);
            addQuadBezier(path, 409, 725, 402, 762, 369, 782);
            path.lineTo(440, 800);
            addQuadBezier(path, 440, 800, 460, 800, 655, 600);
            piece.fillPoints(path.getPoints());
            piece.strokePath();

            // draw eye
            piece.strokeCircle(500, 470, 10);

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
