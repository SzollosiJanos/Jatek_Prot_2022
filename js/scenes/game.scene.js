const gameScene = new Phaser.Scene('Game');

gameScene.init = function () {
    this.pickedpiece = null;
    this.currentlyPick = 0;           //1==white          0==black
};

gameScene.create = function () {
    this.bg = this.add.group();
    this.createBg();

    this.bg.setDepth(1);
    this.pieces_black = this.add.group();
    this.pieces_white = this.add.group();

    this.overlay = this.add.group();

    this.restartgame();
    this.pieces_black.setDepth(3);
    this.pieces_white.setDepth(3);
    this.bg.getChildren().forEach((item, i) => {
        item.on('pointerdown', () => {
            this.pickplace(item);
        });
    });

    this.pieces_black.getChildren().forEach((item, i) => {
        item.on('pointerover', () => {
            item.alpha = 0.7;
        });
        item.on('pointerout', () => {
            item.alpha = 1;
        });
        item.on('pointerdown', () => {
            this.pickpiece(item);
        });
    });

    this.pieces_white.getChildren().forEach((item, i) => {
        item.on('pointerover', () => {
            item.alpha = 0.7;
        });
        item.on('pointerout', () => {
            item.alpha = 1;
        });
        item.on('pointerdown', () => {
            this.pickpiece(item);
        });
    });
    this.switchPlayer();

    this.moveSound = this.sound.add('moveSound');
    this.hitSound = this.sound.add('hitSound');
};


gameScene.switchPlayer = function () {
    this.currentlyPick = (this.currentlyPick + 1) % 2;
    if (this.currentlyPick == 1) {
        this.pieces_black.getChildren().forEach((item, i) => {
            item.disableInteractive()
        });

        this.pieces_white.getChildren().forEach((item, i) => {
            item.setInteractive();
        });
    } else {
        this.pieces_black.getChildren().forEach((item, i) => {
            item.setInteractive();
        });

        this.pieces_white.getChildren().forEach((item, i) => {
            item.disableInteractive()
        });
    }

}


gameScene.pickplace = function (item) {
    if (this.pickedpiece == null) {
        return;
    }
    const { allowmovement, allowdestroy } = this.checkMovement(item);
    this.doMovement(item, allowmovement, allowdestroy);
}


gameScene.isClear = function (X, Y) {
    let result = 0;
    this.pieces_white.getChildren().forEach((item2, i) => {
        if (X == item2.pieceX && Y == item2.pieceY) {
            if (this.currentlyPick == 1) {
                result = 1;
            } else {
                this.destroypiece = item2;
                result = 2;
            }

        }
    });
    this.pieces_black.getChildren().forEach((item2, i) => {
        if (X == item2.pieceX && Y == item2.pieceY) {
            if (this.currentlyPick == 1) {
                this.destroypiece = item2;
                result = 2;
            } else {
                result = 1;
            }
        }
    });
    return result;
}

gameScene.checkMovement = function (place) {
    if (this.pickedpiece == null) {
        return;
    }
    let allowmovement = false;
    let allowdestroy = false;
    this.destroypiece = null;
    switch (this.pickedpiece.type) {
        case 'paraszt':
            if (this.currentlyPick == 1) {
                if (this.pickedpiece.alreadyMoved) {
                    if (this.isClear(place.px, place.py) == 0 && place.py + 1 == this.pickedpiece.pieceY && place.px == this.pickedpiece.pieceX) {
                        allowmovement = true;
                    }
                } else {
                    if (this.isClear(place.px, place.py) == 0 && place.py + 1 == this.pickedpiece.pieceY && place.px == this.pickedpiece.pieceX) {
                        allowmovement = true;
                    } else if (this.isClear(place.px, place.py) == 0 && this.isClear(place.px, place.py + 1) == 0 && place.py + 2 == this.pickedpiece.pieceY && place.px == this.pickedpiece.pieceX) {
                        allowmovement = true;
                    }
                }


                if (this.isClear(place.px, place.py) == 2 && place.py + 1 == this.pickedpiece.pieceY && (place.px + 1 == this.pickedpiece.pieceX || place.px - 1 == this.pickedpiece.pieceX)) {
                    allowdestroy = true;
                }
            } else {
                if (this.pickedpiece.alreadyMoved) {
                    if (this.isClear(place.px, place.py) == 0 && place.py - 1 == this.pickedpiece.pieceY && place.px == this.pickedpiece.pieceX) {
                        allowmovement = true;
                    }
                } else {
                    if (this.isClear(place.px, place.py) == 0 && place.py - 1 == this.pickedpiece.pieceY && place.px == this.pickedpiece.pieceX) {
                        allowmovement = true;
                    } else if (this.isClear(place.px, place.py) == 0 && this.isClear(place.px, place.py - 1) == 0 && place.py - 2 == this.pickedpiece.pieceY && place.px == this.pickedpiece.pieceX) {
                        allowmovement = true;
                    }
                }

                if (this.isClear(place.px, place.py) == 2 && place.py - 1 == this.pickedpiece.pieceY && (place.px + 1 == this.pickedpiece.pieceX || place.px - 1 == this.pickedpiece.pieceX)) {
                    allowdestroy = true;
                }
            }
            break;
        case 'bastya':
            allowmovement = true;
            if (this.isClear(place.px, place.py) == 0) {
                if (place.px != this.pickedpiece.pieceX && place.py != this.pickedpiece.pieceY) {
                    allowmovement = false;
                }
                if (place.px == this.pickedpiece.pieceX) {
                    if (place.py > this.pickedpiece.pieceY) {
                        for (i = 0; i < place.py - this.pickedpiece.pieceY; i++) {
                            if (this.isClear(place.px, this.pickedpiece.pieceY + i + 1) != 0) {
                                allowmovement = false;
                            }
                        }
                    } else {
                        for (i = 0; i < this.pickedpiece.pieceY - place.py; i++) {
                            if (this.isClear(place.px, this.pickedpiece.pieceY - i - 1) != 0) {
                                allowmovement = false;
                            }
                        }
                    }
                } else {
                    if (place.px > this.pickedpiece.pieceX) {
                        for (i = 0; i < place.px - this.pickedpiece.pieceX; i++) {
                            if (this.isClear(this.pickedpiece.pieceX + i + 1, place.py) != 0) {
                                allowmovement = false;
                            }
                        }
                    } else {
                        for (i = 0; i < this.pickedpiece.pieceX - place.px; i++) {
                            if (this.isClear(this.pickedpiece.pieceX - i - 1, place.py) != 0) {
                                allowmovement = false;
                            }
                        }
                    }
                }
            } else if (this.isClear(place.px, place.py) == 2) {
                allowdestroy = true;
                if (place.px != this.pickedpiece.pieceX && place.py != this.pickedpiece.pieceY) {
                    allowmovement = false;
                    allowdestroy = false;
                }
                if (place.px == this.pickedpiece.pieceX) {
                    if (place.py > this.pickedpiece.pieceY) {
                        for (i = 1; i < place.py - this.pickedpiece.pieceY; i++) {
                            if (this.isClear(place.px, this.pickedpiece.pieceY + i) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    } else {
                        for (i = 1; i < this.pickedpiece.pieceY - place.py; i++) {
                            if (this.isClear(place.px, this.pickedpiece.pieceY - i) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    }
                } else {
                    if (place.px > this.pickedpiece.pieceX) {
                        for (i = 1; i < place.px - this.pickedpiece.pieceX; i++) {
                            if (this.isClear(this.pickedpiece.pieceX + i, place.py) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    } else {
                        for (i = 1; i < this.pickedpiece.pieceX - place.px; i++) {
                            if (this.isClear(this.pickedpiece.pieceX - i, place.py) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    }
                }
            } else {
                allowmovement = false;
                allowdestroy = false;
            }
            break;
        case 'futo':
            allowmovement = true;
            if (this.isClear(place.px, place.py) == 0) {
                if(Math.abs(place.px - this.pickedpiece.pieceX) != Math.abs(place.py - this.pickedpiece.pieceY)){
                    allowmovement = false;
                }
                if ((place.px == this.pickedpiece.pieceX || place.py == this.pickedpiece.pieceY)) {
                    allowmovement = false;
                }
                if ((Math.abs(this.pickedpiece.pieceY - place.py) != Math.abs(this.pickedpiece.pieceX - place.px))) {
                    allowmovement = false;
                }

                if (place.py > this.pickedpiece.pieceY) {
                    if (place.px > this.pickedpiece.pieceX) {
                        for (i = 0; i < place.py - this.pickedpiece.pieceY; i++) {
                            if (this.isClear(this.pickedpiece.pieceX + i + 1, this.pickedpiece.pieceY + i + 1) != 0) {
                                allowmovement = false;
                            }
                        }
                    } else {
                        for (i = 0; i < place.py - this.pickedpiece.pieceY; i++) {
                            if (this.isClear(this.pickedpiece.pieceX - i - 1, this.pickedpiece.pieceY + i + 1) != 0) {
                                allowmovement = false;
                            }
                        }
                    }
                } else {
                    if (place.px > this.pickedpiece.pieceX) {
                        for (i = 0; i < this.pickedpiece.pieceY - place.py; i++) {
                            if (this.isClear(this.pickedpiece.pieceX + i + 1, this.pickedpiece.pieceY - i - 1) != 0) {
                                allowmovement = false;
                            }
                        }
                    } else {
                        for (i = 0; i < this.pickedpiece.pieceY - place.py; i++) {
                            if (this.isClear(this.pickedpiece.pieceX - i - 1, this.pickedpiece.pieceY - i - 1) != 0) {
                                allowmovement = false;
                            }
                        }
                    }
                }


            } else if (this.isClear(place.px, place.py) == 2) {
                allowdestroy = true;
                if(Math.abs(place.px - this.pickedpiece.pieceX) != Math.abs(place.py - this.pickedpiece.pieceY)){
                    allowmovement = false;
                    allowdestroy = false;
                }
                if (place.px == this.pickedpiece.pieceX || place.py == this.pickedpiece.pieceY) {
                    allowmovement = false;
                    allowdestroy = false;
                }

                if (place.py > this.pickedpiece.pieceY) {
                    if (place.px > this.pickedpiece.pieceX) {
                        for (i = 1; i < place.py - this.pickedpiece.pieceY; i++) {
                            if (this.isClear(this.pickedpiece.pieceX + i, this.pickedpiece.pieceY + i) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    } else {
                        for (i = 1; i < place.py - this.pickedpiece.pieceY; i++) {
                            if (this.isClear(this.pickedpiece.pieceX - i, this.pickedpiece.pieceY + i) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    }
                } else {
                    if (place.px > this.pickedpiece.pieceX) {
                        for (i = 1; i < this.pickedpiece.pieceY - place.py; i++) {
                            if (this.isClear(this.pickedpiece.pieceX + i, this.pickedpiece.pieceY - i) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    } else {
                        for (i = 1; i < this.pickedpiece.pieceY - place.py; i++) {
                            if (this.isClear(this.pickedpiece.pieceX - i, this.pickedpiece.pieceY - i) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    }
                }
            } else {
                allowmovement = false;
            }
            break;
        case 'kiralyno':
            allowmovement = true;
            if (this.isClear(place.px, place.py) == 0) {
                
                if (place.px != this.pickedpiece.pieceX && place.py != this.pickedpiece.pieceY) {
                    allowmovement = false;
                }
                if (place.px == this.pickedpiece.pieceX) {
                    if (place.py > this.pickedpiece.pieceY) {
                        for (i = 0; i < place.py - this.pickedpiece.pieceY; i++) {
                            if (this.isClear(place.px, this.pickedpiece.pieceY + i + 1) != 0) {
                                allowmovement = false;
                            }
                        }
                    } else {
                        for (i = 0; i < this.pickedpiece.pieceY - place.py; i++) {
                            if (this.isClear(place.px, this.pickedpiece.pieceY - i - 1) != 0) {
                                allowmovement = false;
                            }
                        }
                    }
                } else {
                    if (place.px > this.pickedpiece.pieceX) {
                        for (i = 0; i < place.px - this.pickedpiece.pieceX; i++) {
                            if (this.isClear(this.pickedpiece.pieceX + i + 1, place.py) != 0) {
                                allowmovement = false;
                            }
                        }
                    } else {
                        for (i = 0; i < this.pickedpiece.pieceX - place.px; i++) {
                            if (this.isClear(this.pickedpiece.pieceX - i - 1, place.py) != 0) {
                                allowmovement = false;
                            }
                        }
                    }
                }
            } else if (this.isClear(place.px, place.py) == 2) {
                allowdestroy = true;
                if (place.px != this.pickedpiece.pieceX && place.py != this.pickedpiece.pieceY) {
                    allowmovement = false;
                    allowdestroy = false;
                }
                if (place.px == this.pickedpiece.pieceX) {
                    if (place.py > this.pickedpiece.pieceY) {
                        for (i = 1; i < place.py - this.pickedpiece.pieceY; i++) {
                            if (this.isClear(place.px, this.pickedpiece.pieceY + i) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    } else {
                        for (i = 1; i < this.pickedpiece.pieceY - place.py; i++) {
                            if (this.isClear(place.px, this.pickedpiece.pieceY - i) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    }
                } else {
                    if (place.px > this.pickedpiece.pieceX) {
                        for (i = 1; i < place.px - this.pickedpiece.pieceX; i++) {
                            if (this.isClear(this.pickedpiece.pieceX + i, place.py) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    } else {
                        for (i = 1; i < this.pickedpiece.pieceX - place.px; i++) {
                            if (this.isClear(this.pickedpiece.pieceX - i, place.py) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    }
                }
            } else {
                allowmovement = false;
            }
            if (allowmovement || allowdestroy) {
                break;
            }
            allowmovement = true;
            if (this.isClear(place.px, place.py) == 0) {
                if(Math.abs(place.px - this.pickedpiece.pieceX) != Math.abs(place.py - this.pickedpiece.pieceY)){
                    allowmovement = false;
                }
                if ((place.px == this.pickedpiece.pieceX || place.py == this.pickedpiece.pieceY)) {
                    allowmovement = false;
                }
                if ((Math.abs(this.pickedpiece.pieceY - place.py) != Math.abs(this.pickedpiece.pieceX - place.px))) {
                    allowmovement = false;
                }

                if (place.py > this.pickedpiece.pieceY) {
                    if (place.px > this.pickedpiece.pieceX) {
                        for (i = 0; i < place.py - this.pickedpiece.pieceY; i++) {
                            if (this.isClear(this.pickedpiece.pieceX + i + 1, this.pickedpiece.pieceY + i + 1) != 0) {
                                allowmovement = false;
                            }
                        }
                    } else {
                        for (i = 0; i < place.py - this.pickedpiece.pieceY; i++) {
                            if (this.isClear(this.pickedpiece.pieceX - i - 1, this.pickedpiece.pieceY + i + 1) != 0) {
                                allowmovement = false;
                            }
                        }
                    }
                } else {
                    if (place.px > this.pickedpiece.pieceX) {
                        for (i = 0; i < this.pickedpiece.pieceY - place.py; i++) {
                            if (this.isClear(this.pickedpiece.pieceX + i + 1, this.pickedpiece.pieceY - i - 1) != 0) {
                                allowmovement = false;
                            }
                        }
                    } else {
                        for (i = 0; i < this.pickedpiece.pieceY - place.py; i++) {
                            if (this.isClear(this.pickedpiece.pieceX - i - 1, this.pickedpiece.pieceY - i - 1) != 0) {
                                allowmovement = false;
                            }
                        }
                    }
                }


            } else if (this.isClear(place.px, place.py) == 2) {
                allowdestroy = true;
                if(Math.abs(place.px - this.pickedpiece.pieceX) != Math.abs(place.py - this.pickedpiece.pieceY)){
                    allowmovement = false;
                    allowdestroy = false;
                }
                if (place.px == this.pickedpiece.pieceX || place.py == this.pickedpiece.pieceY) {
                    allowmovement = false;
                    allowdestroy = false;
                }

                if (place.py > this.pickedpiece.pieceY) {
                    if (place.px > this.pickedpiece.pieceX) {
                        for (i = 1; i < place.py - this.pickedpiece.pieceY; i++) {
                            if (this.isClear(this.pickedpiece.pieceX + i, this.pickedpiece.pieceY + i) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    } else {
                        for (i = 1; i < place.py - this.pickedpiece.pieceY; i++) {
                            if (this.isClear(this.pickedpiece.pieceX - i, this.pickedpiece.pieceY + i) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    }
                } else {
                    if (place.px > this.pickedpiece.pieceX) {
                        for (i = 1; i < this.pickedpiece.pieceY - place.py; i++) {
                            if (this.isClear(this.pickedpiece.pieceX + i, this.pickedpiece.pieceY - i) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    } else {
                        for (i = 1; i < this.pickedpiece.pieceY - place.py; i++) {
                            if (this.isClear(this.pickedpiece.pieceX - i, this.pickedpiece.pieceY - i) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    }
                }
            } else {
                allowmovement = false;
                allowdestroy = false;
            }
            break;
        case 'kiraly':
            allowmovement = true;
            if (Math.abs(this.pickedpiece.pieceX - place.px) == 2 && Math.abs(this.pickedpiece.pieceY - place.py) == 0) {
                if(this.pickedpiece.alreadyMoved == true){
                    allowmovement = false;
                    allowdestroy = false;
                    break;
                }
                if(place.px > this.pickedpiece.pieceX && this.isClear(8, 8) == 2){
                    allowmovement = false;
                    allowdestroy = false;
                    break;
                }
            }
            if (Math.abs(this.pickedpiece.pieceX - place.px) > 1 || Math.abs(this.pickedpiece.pieceY - place.py) > 1) {
                allowmovement = false;
                allowdestroy = false;
                break;
            }
            if (this.isClear(place.px, place.py) == 0) {
                if (place.px != this.pickedpiece.pieceX && place.py != this.pickedpiece.pieceY) {
                    allowmovement = false;
                }
                if (place.px == this.pickedpiece.pieceX) {
                    if (place.py > this.pickedpiece.pieceY) {
                        if (this.isClear(place.px, this.pickedpiece.pieceY + 1) != 0) {
                            allowmovement = false;
                        }
                    } else {
                        if (this.isClear(place.px, this.pickedpiece.pieceY - 1) != 0) {
                            allowmovement = false;
                        }
                    }
                } else {
                    if (place.px > this.pickedpiece.pieceX) {
                        if (this.isClear(this.pickedpiece.pieceX + i, place.py) != 0) {
                            allowmovement = false;
                        }
                    } else {
                        if (this.isClear(this.pickedpiece.pieceX - i, place.py) != 0) {
                            allowmovement = false;
                        }
                    }
                }
            } else if (this.isClear(place.px, place.py) == 2) {
                allowdestroy = true;
                if (place.px != this.pickedpiece.pieceX && place.py != this.pickedpiece.pieceY) {
                    allowmovement = false;
                    allowdestroy = false;
                }
                if (place.px == this.pickedpiece.pieceX) {
                    if (place.py > this.pickedpiece.pieceY) {
                        if (this.isClear(place.px, this.pickedpiece.pieceY + 1) != 0) {
                            allowmovement = false;
                            allowdestroy = false;
                        }
                    } else {
                        if (this.isClear(place.px, this.pickedpiece.pieceY - 1) != 0) {
                            allowmovement = false;
                            allowdestroy = false;
                        }
                    }
                } else {
                    if (place.px > this.pickedpiece.pieceX) {
                        if (this.isClear(this.pickedpiece.pieceX + 1, place.py) != 0) {
                            allowmovement = false;
                            allowdestroy = false;
                        }
                    } else {
                        if (this.isClear(this.pickedpiece.pieceX - 1, place.py) != 0) {
                            allowmovement = false;
                            allowdestroy = false;
                        }
                    }
                }
            } else {
                allowmovement = false;
                allowdestroy = false;
            }
            if (allowmovement || allowdestroy) {
                break;
            }
            allowmovement = true;
            if (this.isClear(place.px, place.py) == 0) {
                if ((place.px == this.pickedpiece.pieceX || place.py == this.pickedpiece.pieceY)) {
                    allowmovement = false;
                }
                if ((Math.abs(this.pickedpiece.pieceY - place.py) != Math.abs(this.pickedpiece.pieceX - place.px))) {
                    allowmovement = false;
                }

                if (place.py > this.pickedpiece.pieceY) {
                    if (place.px > this.pickedpiece.pieceX) {
                        if (this.isClear(this.pickedpiece.pieceX + 1, this.pickedpiece.pieceY + 1) != 0) {
                            allowmovement = false;
                        }
                    } else {
                        if (this.isClear(this.pickedpiece.pieceX - 1, this.pickedpiece.pieceY + 1) != 0) {
                            allowmovement = false;
                        }
                    }
                } else {
                    if (place.px > this.pickedpiece.pieceX) {
                        if (this.isClear(this.pickedpiece.pieceX + 1, this.pickedpiece.pieceY - 1) != 0) {
                            allowmovement = false;
                        }
                    } else {
                        if (this.isClear(this.pickedpiece.pieceX - 1, this.pickedpiece.pieceY - 1) != 0) {
                            allowmovement = false;
                        }
                    }
                }


            } else if (this.isClear(place.px, place.py) == 2) {
                allowdestroy = true;
                if (place.px == this.pickedpiece.pieceX || place.py == this.pickedpiece.pieceY) {
                    allowmovement = false;
                    allowdestroy = false;
                }

                if (place.py > this.pickedpiece.pieceY) {
                    if (place.px > this.pickedpiece.pieceX) {
                        if (this.isClear(this.pickedpiece.pieceX + 1, this.pickedpiece.pieceY + 1) != 0) {
                            allowmovement = false;
                            allowdestroy = false;
                        } else {
                            if (this.isClear(this.pickedpiece.pieceX - 1, this.pickedpiece.pieceY + 1) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    } else {
                        if (place.px > this.pickedpiece.pieceX) {
                            if (this.isClear(this.pickedpiece.pieceX + 1, this.pickedpiece.pieceY - 1) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        } else {
                            if (this.isClear(this.pickedpiece.pieceX - 1, this.pickedpiece.pieceY - 1) != 0) {
                                allowmovement = false;
                                allowdestroy = false;
                            }
                        }
                    }
                } else {
                    allowmovement = false;
                    allowdestroy = false;
                }

            }
            break;
        case 'csiko':
            allowmovement = true;
            if (this.isClear(place.px, place.py) == 0) {
                if (Math.abs(this.pickedpiece.pieceX - place.px) + Math.abs(this.pickedpiece.pieceY - place.py) != 3) {
                    allowmovement = false;
                }
                if (this.pickedpiece.pieceX == place.px || this.pickedpiece.pieceY == place.py) {
                    allowmovement = false;
                }
            } else if (this.isClear(place.px, place.py) == 2) {
                allowdestroy = true;
                if (Math.abs(this.pickedpiece.pieceX - place.px) + Math.abs(this.pickedpiece.pieceY - place.py) != 3) {
                    allowmovement = false;
                    allowdestroy = false;
                }
                if (this.pickedpiece.pieceX == place.px || this.pickedpiece.pieceY == place.py) {
                    allowmovement = false;
                    allowdestroy = false;
                }
            } else {
                allowmovement = false;
                allowdestroy = false;
            }
            break;
    }

    return {
        allowmovement: allowmovement,
        allowdestroy: allowdestroy,
    }
}


gameScene.doMovement = function(place, allowmovement, allowdestroy) {
    if (allowmovement && allowdestroy == false) {
        this.pickedpiece.alreadyMoved = true;
        this.moveSound.play();
        this.tweens.add({
            targets: this.pickedpiece,
            x: (place.px - 1) * (config.width / 8) + (config.width / 8) / 2,
            y: (place.py - 1) * (config.width / 8) + (config.width / 8) / 2,
            duration: 300,
            ease: 'Quint.easeInOut',
        })
        this.pickedpiece.pieceX = place.px;
        this.pickedpiece.pieceY = place.py;
        this.pickpiece(this.pickedpiece);
        this.switchPlayer();
    } else if (allowdestroy) {
        this.pickedpiece.alreadyMoved = true;
        this.pickedpiece.alpha = 0;
        this.hitSound.play();
        this.tweens.add({
            targets: this.destroypiece,
            angle: -90,
            duration: 300,
            ease: 'Quint.easeInOut',
            onComplete: () => {
                this.destroypiece.destroy();
                this.destroypiece = null;

                this.pickedpiece.alpha = 1;
                this.pickedpiece.x = (place.px - 1) * (config.width / 8) + (config.width / 8) / 2;
                this.pickedpiece.y = (place.py - 1) * (config.width / 8) + (config.width / 8) / 2;
                this.pickedpiece.pieceX = place.px;
                this.pickedpiece.pieceY = place.py;

                this.pickpiece(this.pickedpiece);
                this.switchPlayer();
            },
        });
    }
}


gameScene.pickpiece = function (item) {
    if (this.currentlyPick != item.color) {
        return;
    }
    if (this.pickedpiece === item) {
        item.scaleX -= 0.02;
        item.scaleY -= 0.02;
        this.pickedpiece = null;
        if (this.currentlyPick == 1) {
            this.pieces_white.getChildren().forEach((item2, i) => {
                item2.on('pointerover', () => {
                    item2.alpha = 0.7;
                });
            });
        } else {
            this.pieces_black.getChildren().forEach((item2, i) => {
                item2.on('pointerover', () => {
                    item2.alpha = 0.7;
                });
            });
        }
    } else {
        if (this.pickedpiece != null) {
            return;
        }
        this.pickedpiece = item;
        item.scaleX += 0.02;
        item.scaleY += 0.02;
        if (this.currentlyPick == 1) {
            this.pieces_white.getChildren().forEach((item2, i) => {
                item2.on('pointerover', () => {
                    item2.alpha = 1;
                    if (item2 === item) {
                        item2.alpha = 0.7;
                    }
                });
            });
        } else {
            this.pieces_black.getChildren().forEach((item2, i) => {
                item2.on('pointerover', () => {
                    item2.alpha = 1;
                    if (item2 === item) {
                        item2.alpha = 0.7;
                    }
                });
            });
        }
    }
}

gameScene.createBg = function () {
    for (i = 0; i < 8; i++) {
        let newbg;

        for (k = 0; k < 4; k++) {
            newbg = this.add.sprite(((i) % 2) * (config.width / 8) + ((config.width / 8) * 2 * k), 0 + i * (config.width / 8), 'background1').setOrigin(0, 0);
            newbg.scaleX = 1 - (1 - ((config.width / 8) / 1024));
            newbg.scaleY = 1 - (1 - ((config.width / 8) / 1024));
            newbg.px = k * 2 + 2;
            if (((-1) ** i) == 1) {
                newbg.px--;
            }
            newbg.py = i + 1;
            newbg.setInteractive();
            this.bg.add(newbg);
        }

        for (k = 0; k < 4; k++) {
            newbg = this.add.sprite(((i + 1) % 2) * (config.width / 8) + ((config.width / 8) * 2 * k), 0 + i * (config.width / 8), 'background2').setOrigin(0, 0);
            newbg.scaleX = 1 - (1 - ((config.width / 8) / 1024));
            newbg.scaleY = 1 - (1 - ((config.width / 8) / 1024));
            newbg.px = k * 2 + 1;
            if (((-1) ** i) == 1) {
                newbg.px++;
            }
            newbg.py = i + 1;
            newbg.setInteractive();
            this.bg.add(newbg);
        }
        this.text = this.add.text(10, (config.width / 8) / 2 + (config.width / 8) * i, i + 1, {
            font: 30 * (config.width / 750) + 'px Arial',
            fill: '#ff0000'
        });
        this.text.setOrigin(0.5);
        this.text.setDepth(5);
        this.text = this.add.text((config.width / 8) / 2 + (config.width / 8) * i, (config.width / 8) * 8 - 10, String.fromCharCode('A'.charCodeAt(0) + i), {
            font: 30 * (config.width / 750) + 'px Arial',
            fill: '#ff0000'
        });
        this.text.setOrigin(0.5);
        this.text.setDepth(5);
    }
}



gameScene.restartgame = function () {
    let newpiece;
    let k = 0;
    for (i = 0; i < 8; i++) {
        newpiece = this.add.sprite((config.width / 8) / 2 + i * (config.width / 8), (config.width / 8) / 2 + (config.width / 8), 'Bparaszt');

        newpiece.scaleX = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.scaleY = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.pieceX = i + 1;
        newpiece.pieceY = 2;
        newpiece.color = 0;
        newpiece.type = 'paraszt';
        newpiece.alreadyMoved = false;
        this.pieces_black.add(newpiece);
    }
    for (i = 0; i < 8; i++) {
        newpiece = this.add.sprite((config.width / 8) / 2 + i * (config.width / 8), (config.width / 8) / 2 + (config.width / 8) * 6, 'Wparaszt');

        newpiece.scaleX = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.scaleY = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.pieceX = i + 1;
        newpiece.pieceY = 7;
        newpiece.color = 1;
        newpiece.type = 'paraszt';
        newpiece.alreadyMoved = false;
        this.pieces_white.add(newpiece);
    }
    for (i = 0; i < 2; i++) {
        newpiece = this.add.sprite((config.width / 8) / 2 + (i * (config.width / 8) * (7 - k * 2)) + (config.width / 8) * k, (config.width / 8) / 2, 'Bbastya');

        newpiece.scaleX = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.scaleY = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.pieceX = i * (7 - k * 2) + 1;
        newpiece.pieceY = 1;
        newpiece.color = 0;
        newpiece.type = 'bastya';
        newpiece.alreadyMoved = false;
        this.pieces_black.add(newpiece);
    }
    for (i = 0; i < 2; i++) {
        newpiece = this.add.sprite((config.width / 8) / 2 + (i * (config.width / 8) * (7 - k * 2)) + (config.width / 8) * k, (config.width / 8) / 2 + 7 * (config.width / 8), 'Wbastya');

        newpiece.scaleX = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.scaleY = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.pieceX = i * (7 - k * 2) + 1;
        newpiece.pieceY = 8;
        newpiece.color = 1;
        newpiece.type = 'bastya';
        newpiece.alreadyMoved = false;
        this.pieces_white.add(newpiece);
    }
    k++;
    for (i = 0; i < 2; i++) {
        newpiece = this.add.sprite((config.width / 8) / 2 + (i * (config.width / 8) * (7 - k * 2)) + (config.width / 8) * k, (config.width / 8) / 2, 'Bcsiko');

        newpiece.scaleX = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.scaleY = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.pieceX = i * (7 - k * 2) + 2;
        newpiece.pieceY = 1;
        newpiece.color = 0;
        newpiece.type = 'csiko';
        newpiece.alreadyMoved = false;
        this.pieces_black.add(newpiece);
    }
    for (i = 0; i < 2; i++) {
        newpiece = this.add.sprite((config.width / 8) / 2 + (i * (config.width / 8) * (7 - k * 2)) + (config.width / 8) * k, (config.width / 8) / 2 + 7 * (config.width / 8), 'Wcsiko');

        newpiece.scaleX = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.scaleY = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.pieceX = i * (7 - k * 2) + 2;
        newpiece.pieceY = 8;
        newpiece.color = 1;
        newpiece.type = 'csiko';
        newpiece.alreadyMoved = false;
        this.pieces_white.add(newpiece);
    }
    k++;
    for (i = 0; i < 2; i++) {
        newpiece = this.add.sprite((config.width / 8) / 2 + (i * (config.width / 8) * (7 - k * 2)) + (config.width / 8) * k + 8, (config.width / 8) / 2 + 8, 'Bfuto');

        newpiece.scaleX = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.scaleY = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.pieceX = i * (7 - k * 2) + 3;
        newpiece.pieceY = 1;
        newpiece.color = 0;
        newpiece.type = 'futo';
        newpiece.alreadyMoved = false;
        this.pieces_black.add(newpiece);
    }
    for (i = 0; i < 2; i++) {
        newpiece = this.add.sprite((config.width / 8) / 2 + (i * (config.width / 8) * (7 - k * 2)) + (config.width / 8) * k + 8, (config.width / 8) / 2 + 7 * (config.width / 8) + 8, 'Wfuto');

        newpiece.scaleX = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.scaleY = 1 - (1 - ((config.width / 8) / 1024));
        newpiece.pieceX = i * (7 - k * 2) + 3;
        newpiece.pieceY = 8;
        newpiece.color = 1;
        newpiece.type = 'futo';
        newpiece.alreadyMoved = false;
        this.pieces_white.add(newpiece);
    }
    k++;
    i++;
    const KIRALY_GRAPHICS_CORRECTION = 0.8;
    newpiece = this.add.sprite((config.width / 8) / 2 + (i * (config.width / 8) * (7 - k * 2)) + (config.width / 8), (config.width / 8) / 2, 'Bkiraly');

    newpiece.scaleX = (1 - (1 - ((config.width / 8) / 1024))) * KIRALY_GRAPHICS_CORRECTION;
    newpiece.scaleY = (1 - (1 - ((config.width / 8) / 1024))) * KIRALY_GRAPHICS_CORRECTION;
    newpiece.pieceX = 5;
    newpiece.pieceY = 1;
    newpiece.color = 0;
    newpiece.type = 'kiraly';
    newpiece.alreadyMoved = false;
    this.pieces_black.add(newpiece);
    i--;
    newpiece = this.add.sprite((config.width / 8) / 2 + (i * (config.width / 8) * (7 - k * 2)) + (config.width / 8) * 2, (config.width / 8) / 2 + 7 * (config.width / 8), 'Wkiraly');

    newpiece.scaleX = (1 - (1 - ((config.width / 8) / 1024))) * KIRALY_GRAPHICS_CORRECTION;
    newpiece.scaleY = (1 - (1 - ((config.width / 8) / 1024))) * KIRALY_GRAPHICS_CORRECTION;
    newpiece.pieceX = 5;
    newpiece.pieceY = 8;
    newpiece.color = 1;
    newpiece.type = 'kiraly';
    newpiece.alreadyMoved = false;
    this.pieces_white.add(newpiece);
    const KIRALYNO_GRAPHICS_CORRECTION = 0.8;
    newpiece = this.add.sprite((config.width / 8) / 2 + (config.width / 8) * k, (config.width / 8) / 2, 'Bkiralyno');

    newpiece.scaleX = (1 - (1 - ((config.width / 8) / 1024))) * KIRALYNO_GRAPHICS_CORRECTION;
    newpiece.scaleY = (1 - (1 - ((config.width / 8) / 1024))) * KIRALYNO_GRAPHICS_CORRECTION;
    newpiece.pieceX = 4;
    newpiece.pieceY = 1;
    newpiece.color = 0;
    newpiece.type = 'kiralyno';
    newpiece.alreadyMoved = false;
    this.pieces_black.add(newpiece);
    k++;
    newpiece = this.add.sprite((config.width / 8) / 2 + (config.width / 8) * (k - 1), (config.width / 8) / 2 + 7 * (config.width / 8), 'Wkiralyno');

    newpiece.scaleX = (1 - (1 - ((config.width / 8) / 1024))) * KIRALYNO_GRAPHICS_CORRECTION;
    newpiece.scaleY = (1 - (1 - ((config.width / 8) / 1024))) * KIRALYNO_GRAPHICS_CORRECTION;
    newpiece.pieceX = 4;
    newpiece.pieceY = 8;
    newpiece.color = 1;
    newpiece.type = 'kiralyno';
    newpiece.alreadyMoved = false;
    this.pieces_white.add(newpiece);

}
