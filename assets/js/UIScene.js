let UIScene = Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function UIScene() {
            Phaser.Scene.call(this, { key: "UIScene", active: true });

            //UI variables
            //this.currency = 200;
            //this.lives = 100;
            //this.wave = 1;
        },
    create: function () {
        var currencyInfo = this.add.text(500, 10, "Currency: 200", { font: "24px Arial", fill: "#FFFFFF" });
        var livesInfo = this.add.text(500, 50, "Lives: 100", { font: "24px Arial", fill: "#FFFFFF" });
        var waveInfo = this.add.text(500, 90, "Wave: 1", { font: "24px Arial", fill: "#FFFFFF" });

        var gameOverText = this.add.text(180, 170, "", { font: "48px Arial", fill: "#FFFFFF" });

        console.log(this);
        var game = this.scene.get("GameScene");

        game.events.on("updateCurrency", function () {
            currencyInfo.setText("Currency: " + CURRENCY);
        }, this);

        game.events.on("updateLives", function () {
            livesInfo.setText("Lives: " + LIVES);
        }, this);

        game.events.on("updateWave", function () {
            waveInfo.setText("Wave: " + CURRENT_WAVE);
        }, this)

        game.events.on("gameOver", function () {
            gameOverText.setText("GAME OVER");
            //add a restart button later
        })
    }
});