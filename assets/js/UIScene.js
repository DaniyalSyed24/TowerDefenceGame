let UIScene = Phaser.Class({
    Extends: Phaser.Scene,   
    initialize:
        function UIScene() {
            Phaser.Scene.call(this, { key: "UIScene" });

            //UI variables
            //this.currency = 200;
            //this.lives = 100;
            //this.wave = 1;
        },
    preload: function() {
        this.load.atlas('turretSprites', 'assets/media/turrets.png', 'assets/media/turretsheet.json');
        this.load.atlas('badgeSprites', 'assets/media/badgesheet.png', 'assets/media/badgesheet.json');
        this.load.atlas('greyBadges', 'assets/media/greybadgesheet.png', 'assets/media/greybadgesheet.json');
    },
    create: function () {
        console.log("test UI");

        var gbadge1 = this.add.image(675, 275, 'greyBadges', 'gbadge1');
        var gbadge2 = this.add.image(675, 325, 'greyBadges', 'gbadge2');
        var gbadge3 = this.add.image(675, 375, 'greyBadges', 'gbadge3');
        var gbadge4 = this.add.image(675, 425, 'greyBadges', 'gbadge4');
        var gbadge5 = this.add.image(750, 275, 'greyBadges', 'gbadge5');
        var gbadge6 = this.add.image(750, 325, 'greyBadges', 'gbadge6');
        var gbadge7 = this.add.image(750, 375, 'greyBadges', 'gbadge7');
        var gbadge8 = this.add.image(750, 425, 'greyBadges', 'gbadge8');
        var badge1 = this.add.image(675, 275, 'badgeSprites', '01');
        var badge2 = this.add.image(675, 325, 'badgeSprites', '02');
        var badge3 = this.add.image(675, 375, 'badgeSprites', '03');
        var badge4 = this.add.image(675, 425, 'badgeSprites', '04');
        var badge5 = this.add.image(750, 275, 'badgeSprites', '05');
        var badge6 = this.add.image(750, 325, 'badgeSprites', '06');
        var badge7 = this.add.image(750, 375, 'badgeSprites', '07');
        var badge8 = this.add.image(750, 425, 'badgeSprites', '08');

        gbadge1.setVisible(true);
        gbadge2.setVisible(true);
        gbadge3.setVisible(true);
        gbadge4.setVisible(true);
        gbadge5.setVisible(true);
        gbadge6.setVisible(true);
        gbadge7.setVisible(true);
        gbadge8.setVisible(true);

        if (badges[0] == 1) {
            badge1.setVisible(true);
        } else {
            badge1.setVisible(false);
        }

        if (badges[1] == 1) {
            badge2.setVisible(true);
        } else {
            badge2.setVisible(false);
        }

        if (badges[2] == 1) {
            badge3.setVisible(true);
        } else {
            badge3.setVisible(false);
        }

        if (badges[3] == 1) {
            badge4.setVisible(true);
        } else {
            badge4.setVisible(false);
        }

        if (badges[4] == 1) {
            badge5.setVisible(true);
        } else {
            badge5.setVisible(false);
        }

        if (badges[5] == 1) {
            badge6.setVisible(true);
        } else {
            badge6.setVisible(false);
        }

        if (badges[6] == 1) {
            badge7.setVisible(true);
        } else {
            badge7.setVisible(false);
        }

        if (badges[7] == 1) {
            badge8.setVisible(true);
        } else {
            badge8.setVisible(false);
        }
        
        

        //tower costs
        var turretCost = 100;

        let currencyInfo = this.add.text(645, 10, "Currency: " + CURRENCY, { font: "18px Arial", fill: "#FFFFFF", stroke: '#000000', strokeThickness: 5 });
        let livesInfo = this.add.text(645, 50, "Lives: " + LIVES, { font: "18px Arial", fill: "#FFFFFF", stroke: '#000000', strokeThickness: 5 });
        let waveInfo = this.add.text(645, 90, "Wave: 1", { font: "18px Arial", fill: "#FFFFFF", stroke: '#000000', strokeThickness: 5 });

        //game over screen
        let gameOverText = this.add.text(180, 170, "", { font: "48px Arial", fill: "#FFFFFF", stroke: '#000000', strokeThickness: 5 });
        gameOverText.setVisible(false);
        let retryButton = this.add.text(290, 220, "Retry", { font: "24px Arial", fill: "#FFFFFF", stroke: '#000000', strokeThickness: 5 });
        retryButton.setVisible(false);
        retryButton.setInteractive({ useHandCursor: true });
        retryButton.on("pointerup", () => {
            game.reset();
            gameOverText.setVisible(false);
            retryButton.setVisible(false);
            //titleScreenButton.setVisible(false);
        })
        //let titleScreenButton = this.add.text(300, 220, "Title Screen", { font: "24px Arial", fill: "#FFFFFF" });
        //titleScreenButton.setVisible(false);
        //titleScreenButton.setInteractive({ useHandCursor: true });
        //titleScreenButton.on("pointerup", () => {
        //    gameOverText.setVisible(false);
        //    retryButton.setVisible(false);
        //    titleScreenButton.setVisible(false);
        //    game.reset();
        //    game.scene.stop("gameScene");
        //    //game.scene.stop("UIScene");
        //    this.scene.switch("mainMenuScene");
        //    console.log("to title screen");
        //}, this);

        //tower popup
        var selectedTurret;
        var towerText = this.add.text(10, 510, "Turret", { font: "32px Arial", fill: "#FFFFFF", stroke: '#000000', strokeThickness: 5 });
        var sellButton = this.add.text(10, 550, "Sell for ", { font: "24px Arial", fill: "#FF0000", stroke: '#000000', strokeThickness: 5 });
        var closeButton = this.add.text(300, 510, "Close", { font: "32px Arial", fill: "#FF0000", stroke: '#000000', strokeThickness: 5 });
        var upgradeFireRate = this.add.text(10, 580, "Upgrade FIRING RATE for ", { font: "24px Arial", fill: "#0000FF", stroke: '#000000',strokeThickness: 5 });
        var upgradeRange = this.add.text(10, 610, "Upgrade TURRET RANGE for ", { font: "24px Arial", fill: "#0000FF", stroke: '#000000',strokeThickness: 5 });

        //tower popup: targeting
        var targetingHeader = this.add.text(500, 510, "Targeting:", { font: "32px Arial", fill: "#FFFFFF", stroke: '#000000',strokeThickness: 5 });
        var targetingFirst = this.add.text(500, 545, "First", { font: "20px Arial", fill: "#00FF00", stroke: '#000000', strokeThickness: 5 });
        var targetingLast = this.add.text(500, 567, "Last", { font: "20px Arial", fill: "#FF0000", stroke: '#000000',strokeThickness: 5 });
        var targetingStrong = this.add.text(500, 589, "Strongest", { font: "20px Arial", fill: "#FF0000", stroke: '#000000',strokeThickness: 5 });
        var targetingWeak = this.add.text(500, 611, "Weakest", { font: "20px Arial", fill: "#FF0000", stroke: '#000000',strokeThickness: 5 });

        targetingFirst.setInteractive({ useHandCursor: true });
        targetingLast.setInteractive({ useHandCursor: true });
        targetingStrong.setInteractive({ useHandCursor: true });
        targetingWeak.setInteractive({ useHandCursor: true });

        sellButton.setInteractive({
            useHandCursor: true
        });
        sellButton.on("pointerup", () => {
            selectedTurret.sell(selectedTurret);
            towerText.setVisible(false);
            sellButton.setVisible(false);
            closeButton.setVisible(false);
            upgradeFireRate.setVisible(false);
            upgradeRange.setVisible(false);
            turretOutline.setVisible(false);

            targetingHeader.setVisible(false);
            targetingFirst.setVisible(false);
            targetingLast.setVisible(false);
            targetingStrong.setVisible(false);
            targetingWeak.setVisible(false);
        });

        upgradeFireRate.setInteractive({ useHandCursor: true });
        upgradeFireRate.on("pointerup", () => {
            selectedTurret.upgradeFiringRate(selectedTurret);
            if (selectedTurret.fireRate <= 400) {
                upgradeFireRate.setText("FIRING RATE MAXED");
                upgradeFireRate.setInteractive(false);
            }
            else {
                upgradeFireRate.setText("Upgrade FIRING RATE for " + selectedTurret.fireRateCost + " currency");
            }
            sellButton.setText("Sell for " + Math.round(selectedTurret.cost / 2) + " currency");
        });

        upgradeRange.setInteractive({ useHandCursor: true });
        upgradeRange.on("pointerup", () => {
            selectedTurret.upgradeRange(selectedTurret);
            if (selectedTurret.range >= 500) {
                upgradeRange.setText("RANGE MAXED");
                upgradeRange.setInteractive(false);
            }
            else {
                upgradeRange.setText("Upgrade RANGE for " + selectedTurret.rangeCost + " currency");
            }
            sellButton.setText("Sell for " + Math.round(selectedTurret.cost / 2) + " currency");
        })

        closeButton.setInteractive({
            useHandCursor: true
        });
        closeButton.on("pointerup", () => {
            towerText.setVisible(false);
            sellButton.setVisible(false);
            closeButton.setVisible(false);
            upgradeFireRate.setVisible(false);
            upgradeRange.setVisible(false);
            turretOutline.setVisible(false);
            
            targetingHeader.setVisible(false);
            targetingFirst.setVisible(false);
            targetingLast.setVisible(false);
            targetingStrong.setVisible(false);
            targetingWeak.setVisible(false);
        })

        targetingFirst.on("pointerup", () => {
            targetingFirst.setColor("#00FF00");
            targetingLast.setColor("#FF0000");
            targetingStrong.setColor("#FF0000");
            targetingWeak.setColor("#FF0000");
            selectedTurret.targetingMode = 0;
        })

        targetingLast.on("pointerup", () => {
            targetingFirst.setColor("#FF0000");
            targetingLast.setColor("#00FF00");
            targetingStrong.setColor("#FF0000");
            targetingWeak.setColor("#FF0000");
            selectedTurret.targetingMode = 1;
        })

        targetingStrong.on("pointerup", () => {
            targetingFirst.setColor("#FF0000");
            targetingLast.setColor("#FF0000");
            targetingStrong.setColor("#00FF00");
            targetingWeak.setColor("#FF0000");
            selectedTurret.targetingMode = 2;
        })

        targetingWeak.on("pointerup", () => {
            targetingFirst.setColor("#FF0000");
            targetingLast.setColor("#FF0000");
            targetingStrong.setColor("#FF0000");
            targetingWeak.setColor("#00FF00");
            selectedTurret.targetingMode = 3;
        })

        towerText.setVisible(false);
        sellButton.setVisible(false);
        closeButton.setVisible(false);
        upgradeFireRate.setVisible(false);
        upgradeRange.setVisible(false);

        targetingHeader.setVisible(false);
        targetingFirst.setVisible(false);
        targetingLast.setVisible(false);
        targetingStrong.setVisible(false);
        targetingWeak.setVisible(false);

        //wave play button
        var playText = this.add.text(675, 540, "Start\nWave", { font: "36px Arial", fill: "#00FF00", align: "center", stroke: '#000000', strokeThickness: 5 });
        playText.setVisible(true);
        playText.setInteractive({ useHandCursor: true });
        playText.on("pointerup", () => {
            game.startWave();
        })

        //turret outline
        var turretOutline = this.add.rectangle(0, 0, 64, 64, 0xFFFFFF, 0.4);
        turretOutline.setVisible(false);

        //tower sidebar
        var activeSelectedSprite = this.add.image(0,0,"turretSprites","turrett1v1");
        this.input.on("pointermove", function (pointer) {
            activeSelectedSprite.x = pointer.x;
            activeSelectedSprite.y = pointer.y;
        });
        activeSelectedSprite.setVisible(false);
        var turretName = this.add.text(10, 510, "Turret", { font: "32px Arial", fill: "#FFFFFF", stroke: '#000000',strokeThickness: 5 });
        turretName.setVisible(false);
        var costText = this.add.text(250, 518, "Cost: ", { font: "24px Arial", fill: "#FFFF00", stroke: '#000000',strokeThickness: 5 });
        costText.setVisible(false);
        var turretDescription;
        var turretCancelText = this.add.text(450, 510, "Cancel", { font: "32px Arial", fill: "#FF0000", stroke: '#000000',strokeThickness: 5 });
        var errorNoMoney = this.add.text(10, 550, "Cannot afford!", { font: "24px Arial", fill: "#FF0000", stroke: '#000000',strokeThickness: 5 });
        errorNoMoney.setVisible(false);
        turretCancelText.setVisible(false);
        turretCancelText.setInteractive({ useHandCursor: true });
        turretCancelText.on("pointerup", () => {
            game.turretSelected = false;
            turretName.setVisible(false);
            costText.setVisible(false);
            errorNoMoney.setVisible(false);
            activeSelectedSprite.setVisible(false);
            turretCancelText.setVisible(false);
        })
        
        var turretIcon = this.add.image(675, 175, "turretSprites", "turett1v1");
        turretIcon.setVisible(true);
        turretIcon.setInteractive({ useHandCursor: true });
        turretIcon.on("pointerup", () => {
            //clear selected tower info
            towerText.setVisible(false);
            sellButton.setVisible(false);
            closeButton.setVisible(false);
            upgradeFireRate.setVisible(false);
            upgradeRange.setVisible(false);
            turretOutline.setVisible(false);

            targetingHeader.setVisible(false);
            targetingFirst.setVisible(false);
            targetingLast.setVisible(false);
            targetingStrong.setVisible(false);
            targetingWeak.setVisible(false);

            errorNoMoney.setVisible(false);

            //toggle tower information
            turretName.setText("Turret");
            turretName.setVisible(!turretName.visible);
            costText.setText("Cost: " + turretCost);
            costText.setVisible(!costText.visible);
            turretCancelText.setVisible(!turretCancelText.visible);
            if (CURRENCY >= turretCost) {
                //set flag
                game.turretSelected = !game.turretSelected;

                //follow mouse
                activeSelectedSprite.setVisible(!activeSelectedSprite.visible);
            }
            else if (turretName.visible) {
                //throw up some warning text
                errorNoMoney.setVisible(true);
            }
        })

        console.log(this);
        let game = this.scene.get("gameScene");
        console.log(game);

        game.events.on("updateCurrency", function () {
            currencyInfo.setText("Currency: " + CURRENCY);
        }, this);

        game.events.on("updateLives", function () {
            livesInfo.setText("Lives: " + LIVES);
        }, this);

        game.events.on("updateWave", function () {
            playText.setVisible(true);
            waveInfo.setText("Wave: " + CURRENT_WAVE);
        }, this)

        game.events.on("gameOver", function () {
            gameOverText.setText("GAME OVER");
            gameOverText.setVisible(true);
            retryButton.setVisible(true);
            //titleScreenButton.setVisible(true);
            
        }, this)

        game.events.on("waveStarted", function () {
            playText.setVisible(false);
        })

        game.events.on("placedTurret", function () {
            turretName.setVisible(false);
            costText.setVisible(false);
            activeSelectedSprite.setVisible(false);
            turretCancelText.setVisible(false);
            game.turretSelected = false;
        })

        game.events.on("clickedTurret", function (turret) {
            //if the user is placing a turret, cancel that
            game.turretSelected = false;
            turretName.setVisible(false);
            costText.setVisible(false);
            activeSelectedSprite.setVisible(false);
            turretCancelText.setVisible(false);
            errorNoMoney.setVisible(false);

            //towerText.setVisible(!towerText.visible);

            //console.log("clicked turret at " + turret.i + ", " + turret.j);

            console.log(turret);
            selectedTurret = turret;

            //outline turret
            turretOutline.setPosition(selectedTurret.x, selectedTurret.y);
            turretOutline.setVisible(true);
            

            //console.log(selectedTurret);

            towerText.setVisible(true);
            sellButton.setVisible(true);
            closeButton.setVisible(true);
            upgradeFireRate.setVisible(true);
            upgradeRange.setVisible(true);

            targetingHeader.setVisible(true);
            targetingFirst.setVisible(true);
            targetingLast.setVisible(true);
            targetingStrong.setVisible(true);
            targetingWeak.setVisible(true);

            sellButton.setText("Sell for " + Math.round(turret.cost / 2) + " currency");

            if (turret.fireRate <= 400) {
                upgradeFireRate.setText("FIRING RATE MAXED")
            }
            else {
                upgradeFireRate.setText("Upgrade FIRING RATE for " + turret.fireRateCost + " currency");
            }

            if (turret.range >= 500) {
                upgradeRange.setText("RANGE MAXED");
            }
            else {
                upgradeRange.setText("Upgrade TURRET RANGE for " + turret.rangeCost + " currency");
            }

            switch (selectedTurret.targetingMode) {
                case 0:
                    targetingFirst.setColor("#00FF00");
                    targetingLast.setColor("#FF0000");
                    targetingStrong.setColor("#FF0000");
                    targetingWeak.setColor("#FF0000");
                    break;
                case 1:
                    targetingFirst.setColor("#FF0000");
                    targetingLast.setColor("#00FF00");
                    targetingStrong.setColor("#FF000");
                    targetingWeak.setColor("#FF0000");
                    break;
                case 2:
                    targetingFirst.setColor("#FF0000");
                    targetingLast.setColor("#FF0000");
                    targetingStrong.setColor("#00FF00");
                    targetingWeak.setColor("#FF0000");
                    break;
                case 3:
                    targetingFirst.setColor("#FF0000");
                    targetingLast.setColor("#FF0000");
                    targetingStrong.setColor("#FF0000");
                    targetingWeak.setColor("#00FF00");
                    break;
                default:
                    console.log("This turret somehow has an invalid targeting mode");
            }

            //upgradeFireRate.setVisible(!upgradeFireRate.visible);
            //upgradeRange.setVisible(!upgradeRange.visible);
        }, this);

        game.events.on("gameWon", function () {
            gameOverText.setText("You win!");
            gameOverText.setVisible(true);
            retryButton.setVisible(true);
            //if we have time we could give the player rewards here
        });
    }

});
