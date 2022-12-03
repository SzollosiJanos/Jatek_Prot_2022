const startScene = new Phaser.Scene('Start');

startScene.create = function() {
    this.gameW = this.sys.game.config.width;
    this.gameH = this.sys.game.config.height;

    const titleBox = this.add.rectangle(this.gameW / 2, 200, 200, 400, 0xFFFFFF, 1);
    const title = this.add.text(0, 0, 'Sakk', { font: 'bold 64px Arial', color: '#000', align: 'center' });
    Phaser.Display.Align.In.Center(title, titleBox);

    const buttonBox = this.add.rectangle(this.gameW / 2, 300, 200, 100, 0xFFFFFF, 1);
    this.buttonText = this.add.text(0, 0, 'Játék indítása', { font: 'bold 20px Arial', color: '#000', align: 'center' });
    Phaser.Display.Align.In.Center(this.buttonText, buttonBox);

    this.buttonText.setInteractive();
    this.buttonText.on('pointerover', () => this.buttonText.setColor('#0076b8'));
    this.buttonText.on('pointerout', () => this.buttonText.setColor('#000'));
    this.buttonText.on('pointerdown', () => this.scene.start('Game'));
}
