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
    },
    create: function () {
        console.log("test UI");

        //tower costs
        var turretCost = 100;

        let currencyInfo = this.add.text(645, 10, "Currency: 200", { font: "18px Arial", fill: "#FFFFFF" });
        let livesInfo = this.add.text(645, 50, "Lives: 100", { font: "18px Arial", fill: "#FFFFFF" });
        let waveInfo = this.add.text(645, 90, "Wave: 1", { font: "18px Arial", fill: "#FFFFFF" });

        //game over screen
        let gameOverText = this.add.text(180, 170, "", { font: "48px Arial", fill: "#FFFFFF" });
        gameOverText.setVisible(false);
        let retryButton = this.add.text(210, 220, "Retry", { font: "24px Arial", fill: "#FFFFFF" });
        retryButton.setVisible(false);
        retryButton.setInteractive({ useHandCursor: true });
        retryButton.on("pointerup", () => {
            game.reset();
            gameOverText.setVisible(false);
            retryButton.setVisible(false);
            titleScreenButton.setVisible(false);
        })
        let titleScreenButton = this.add.text(300, 220, "Title Screen", { font: "24px Arial", fill: "#FFFFFF" });
        titleScreenButton.setVisible(false);
        titleScreenButton.setInteractive({ useHandCursor: true });
        titleScreenButton.on("pointerup", () => {
            //gameOverText.setVisible(false);
            //retryButton.setVisible(false);
            //titleScreenButton.setVisible(false);
            //game.reset();
            //game.scene.stop("gameScene");
            //this.scene.start("mainMenuScene");
            console.log("to title screen");
        }, this);

        //tower popup
        var selectedTurret;
        var towerText = this.add.text(10, 510, "Turret", { font: "32px Arial", fill: "#FFFFFF" });
        var sellButton = this.add.text(10, 550, "Sell for ", { font: "24px Arial", fill: "#FF0000" });
        var closeButton = this.add.text(300, 510, "Close", { font: "32px Arial", fill: "#FF0000" });
        var upgradeFireRate = this.add.text(10, 580, "Upgrade FIRING RATE for ", { font: "24px Arial", fill: "#0000FF" });
        var upgradeRange = this.add.text(10, 610, "Upgrade TURRET RANGE for ", { font: "24px Arial", fill: "#0000FF" });

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
        })

        towerText.setVisible(false);
        sellButton.setVisible(false);
        closeButton.setVisible(false);
        upgradeFireRate.setVisible(false);
        upgradeRange.setVisible(false);

        //wave play button
        var playText = this.add.text(675, 540, "Start\nWave", { font: "36px Arial", fill: "#00FF00", align:"center" });
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
        var turretName = this.add.text(10, 510, "Turret", { font: "32px Arial", fill: "#FFFFFF" });
        turretName.setVisible(false);
        var costText = this.add.text(250, 518, "Cost: ", { font: "24px Arial", fill: "#FFFF00" });
        costText.setVisible(false);
        var turretDescription;
        var turretCancelText = this.add.text(450, 510, "Cancel", { font: "32px Arial", fill: "#FF0000" });
        var errorNoMoney = this.add.text(10, 550, "Cannot afford!", { font: "24px Arial", fill: "#FF0000" });
        errorNoMoney.setVisible(false);
        turretCancelText.setVisible(false);
        turretCancelText.setInteractive({ useHandCursor: true });
        turretCancelText.on("pointerup", () => {
            game.turretSelected = false;
            turretName.setVisible(false);
            costText.setVisible(false);
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
            gameOverText.setVisible(true);
            retryButton.setVisible(true);
            titleScreenButton.setVisible(true);
            gameOverText.setText("GAME OVER");
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

            //upgradeFireRate.setVisible(!upgradeFireRate.visible);
            //upgradeRange.setVisible(!upgradeRange.visible);
        }, this);
    }

});
