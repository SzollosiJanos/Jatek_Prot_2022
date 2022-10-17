const homeScene = new Phaser.Scene('Home');

homeScene.create = function () {
    this.bg = this.add.group();
    this.createBg();

    this.bg.on('pointerdown', () => {   //majd megoldani
        //this.scene.start('Game');
    });

    this.text = this.add.text(config.width/2, config.height/2, 'Play Chess', {
        font: '30px Arial'
    });
    this.text.setOrigin(0.5);
    this.text.setDepth(1);

    this.textBg = this.add.graphics();
    this.textBg.fillStyle(0x000000, 0.7);

    const gameW = this.sys.game.config.width;
    const gameH = this.sys.game.config.height;

    this.textBg.fillRect(
        gameW / 2 - this.text.width / 2 - 10,
        this.text.y - this.text.height / 2 - 10,
        this.text.width + 20,
        this.text.height + 20
    );
    this.scene.start('Game');
};



homeScene.createBg = function () {
    for (i = 0; i < 8; i++) {
        let newbg;
        newbg = this.add.group({
            key: 'background1',
            repeat: 4,
            setXY: {
                x: ((i) % 2) * (config.width/8),
                y: 0 + i * (config.width/8),
                stepX: (config.width/8) * 2,
                stepY: 0
            }
        }).setOrigin(0, 0);
        Phaser.Actions.ScaleXY(newbg.getChildren(), -(1-((config.width/8)/1024)), -(1-((config.width/8)/1024)));
        this.bg.add(newbg);
        newbg = this.add.group({
            key: 'background2',
            repeat: 4,
            setXY: {
                x: ((i + 1) % 2) * (config.width/8),
                y: 0 + i * (config.width/8),
                stepX: (config.width/8) * 2,
                stepY: 0
            }
        }).setOrigin(0, 0);
        Phaser.Actions.ScaleXY(newbg.getChildren(), -(1-((config.width/8)/1024)), -(1-((config.width/8)/1024)));
        this.bg.add(newbg);
    }
}