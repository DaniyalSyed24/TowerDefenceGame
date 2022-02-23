var UIScene = Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function UIScene() {
        Phaser.Scene.call(this, { key: "UIScene", active: true });

        //UI variables
        //this.currency = 200;
        //this.lives = 100;
        //this.wave = 1;
    },
    create: function() {
        var currencyInfo = this.add.text(500, 10, "Currency: 200", { font: "24px Arial", fill: "#FFFFFF" });
        var livesInfo = this.add.text(500, 50, "Lives: 100", { font: "24px Arial", fill: "#FFFFFF" });
        var waveInfo = this.add.text(500, 90, "Wave: 1", { font: "24px Arial", fill: "#FFFFFF" });

        var gameOverText = this.add.text(180, 170, "", { font: "48px Arial", fill: "#FFFFFF" });

        //tower popup
        var selectedTurret;
        var towerText = this.add.text(10, 500, "Turret", { font: "32px Arial", fill: "#FFFFFF" });
        var sellButton = this.add.text(10, 540, "Sell for ", { font: "24px Arial", fill: "#FF0000" });
        var closeButton = this.add.text(300, 500, "Close", { font: "32px Arial", fill: "#FF0000" });
        var upgradeFireRate = this.add.text(10, 580, "Upgrade FIRING RATE for ", { font: "24px Arial", fill: "#0000FF" });
        var upgradeRange = this.add.text(10, 620, "Upgrade TURRET RANGE for ", { font: "24px Arial", fill: "#0000FF" });

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
            sellButton.setText("Sell for " + selectedTurret.cost / 2 + " currency");
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
            sellButton.setText("Sell for " + selectedTurret.cost / 2 + " currency");
        });

        closeButton.setInteractive({
            useHandCursor: true
        });
        closeButton.on("pointerup", () => {
            towerText.setVisible(false);
            sellButton.setVisible(false);
            closeButton.setVisible(false);
            upgradeFireRate.setVisible(false);
            upgradeRange.setVisible(false);
        });

        towerText.setVisible(false);
        sellButton.setVisible(false);
        closeButton.setVisible(false);
        upgradeFireRate.setVisible(false);
        upgradeRange.setVisible(false);

        var game = this.scene.get("GameScene");

        game.events.on("updateCurrency", function() {
            currencyInfo.setText("Currency: " + CURRENCY);
        }, this);

        game.events.on("updateLives", function() {
            livesInfo.setText("Lives: " + LIVES);
        }, this);

        game.events.on("updateWave", function() {
            waveInfo.setText("Wave: " + CURRENT_WAVE);
        }, this);

        game.events.on("gameOver", function() {
            gameOverText.setText("GAME OVER");
            //add a restart button later
        }, this);

        game.events.on("clickedTurret", function(turret) {
            //towerText.setVisible(!towerText.visible);
            //console.log("clicked turret at " + turret.i + ", " + turret.j);
            selectedTurret = turret;
            //console.log(selectedTurret);
            towerText.setVisible(true);
            sellButton.setVisible(true);
            closeButton.setVisible(true);
            upgradeFireRate.setVisible(true);
            upgradeRange.setVisible(true);
            sellButton.setText("Sell for " + turret.cost / 2 + " currency");

            if (turret.fireRate <= 400) {
                upgradeFireRate.setText("FIRING RATE MAXED");
            }
            else {
                upgradeFireRate.setText("Upgrade FIRING RATE for " + turret.fireRateCost + " currency");
            }

            upgradeRange.setText("Upgrade TURRET RANGE for " + turret.rangeCost + " currency");

            //upgradeFireRate.setVisible(!upgradeFireRate.visible);
            //upgradeRange.setVisible(!upgradeRange.visible);
        }, this);
    }
});
