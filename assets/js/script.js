let path;
let turrets;
let enemies;

let ENEMY_SPEED = 1 / 10000;
let CURRENT_WAVE = 1;
let LIVES = 100;
let BULLET_DAMAGE = 50;

let CURRENCY = 200;

let waveStrength = 10; //default value
let enemiesLeft;       //amount of enemies left to spawn in the current wave
let enemiesAlive = 0;  //enemies currently alive

let map = [[0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, -1, -1, -1, -1, -1, -1, -1, 0, 0],
[0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
[0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
[0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
[0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1, 0, 0]];


var GameScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function GameScene() {
            Phaser.Scene.call(this, { key: "GameScene" })
        },
    preload: function () {
        this.load.atlas('sprites', 'assets/media/spritesheet.png', 'assets/media/spritesheet.json');
        this.load.image('bullet', 'assets/media/bullet.png');

        this.generateWave();
    },
    create: function () {
        let graphics = this.add.graphics();
        this.drawLines(graphics);
        path = this.add.path(96, -32);
        path.lineTo(96, 164);
        path.lineTo(480, 164);
        path.lineTo(480, 544);

        graphics.lineStyle(2, 0xffffff, 1);
        path.draw(graphics);

        enemies = this.physics.add.group({ classType: this.Enemy, runChildUpdate: true });

        turrets = this.add.group({ classType: this.Turret, runChildUpdate: true });

        bullets = this.physics.add.group({ classType: this.Bullet, runChildUpdate: true });

        this.nextEnemy = 0;

        this.physics.add.overlap(enemies, bullets, this.damageEnemy);

        this.input.on('pointerdown', this.placeTurret);
        //this.input.on("pointerdown", this.handleClick);
    },
    update: function (time, delta) {
        if (time > this.nextEnemy && LIVES > 0 && enemiesLeft > 0) {
            let enemy = enemies.get();
            if (enemy) {
                enemiesLeft -= 1;
                enemiesAlive += 1;
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                //console.log(enemiesLeft);

                //this.nextEnemy = time + 2000;
                this.nextEnemy = time + 1000;
                //this.nextEnemy = time + 250;
            }
        }

        if (enemiesLeft <= 0 && enemiesAlive <= 0) {
            CURRENT_WAVE += 1;
            this.events.emit("updateWave");
            this.generateWave();
        }
        if (LIVES <= 0) {
            let enemyUnits = enemies.getChildren();
            for (let i = 0; i < enemyUnits.length; i++) {
                if (enemyUnits[i].active) {
                    enemyUnits[i].setActive(false);
                    enemyUnits[i].setVisible(false);
                }
            }
            this.events.emit("gameOver");
        }
    },

    //handleClick: function () {
    //    if (!this.turretHover) {
    //        this.scene.events.emit("clickedOffTurret");
    //    }
    //},

    calculateWaveStrength: function () {
        waveStrength = 5 + Math.round(waveStrength + Math.sqrt((CURRENT_WAVE + 3) * waveStrength))
        console.log(waveStrength);
    },
    generateWave: function () {
        this.calculateWaveStrength();
        enemiesLeft = waveStrength;
    },

    //objects
    Enemy: new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:
            function Enemy(scene) {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');

                this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
                this.hp = 0;
                this.reward = 10; //currency reward for destroying enemy
            },

        startOnPath: function () {
            this.follower.t = 0;
            this.hp = 100;

            path.getPoint(this.follower.t, this.follower.vec);

            this.setPosition(this.follower.vec.x, this.follower.vec.y);
        },

        receiveDamage: function (damage) {
            this.hp -= damage;

            // if hp drops below 0 we deactivate this enemy
            if (this.hp <= 0) {
                CURRENCY += this.reward;
                //updateCurrency();
                this.scene.events.emit("updateCurrency");
                this.setActive(false);
                this.setVisible(false);
                enemiesAlive -= 1;

            }
        },

        update: function (time, delta) {
            this.follower.t += ENEMY_SPEED * delta;
            path.getPoint(this.follower.t, this.follower.vec);

            this.setPosition(this.follower.vec.x, this.follower.vec.y);

            if (this.follower.t >= 1) {
                LIVES -= 1;
                this.scene.events.emit("updateLives");
                enemiesAlive -= 1;
                this.setActive(false);
                this.setVisible(false);
            }
        }

    }),

    turretHover: false,

    Turret: new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:
            function Turret(scene) {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
                this.nextTic = 0;
                this.cost = 100; //cost to place turret

                //upgrades
                this.fireRate = 1000; //higher number means SLOWER firing rate
                this.range = 200;
                //this.bulletDamage;

                //upgrade costs;
                this.fireRateCost = 50;
                this.rangeCost = 50;
            },
        place: function (i, j) {
            this.i = i;
            this.j = j;
            this.y = i * 64 + 64 / 2;
            this.x = j * 64 + 64 / 2;
            map[i][j] = 1;
        },
        getEnemy: function (x, y, distance) {
            let enemyUnits = enemies.getChildren();
            for (let i = 0; i < enemyUnits.length; i++) {
                if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
                    return enemyUnits[i];
            }
            return false;
        },
        fire: function () {

            let enemy = this.getEnemy(this.x, this.y, this.range);
            if (enemy) {
                let angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
                this.addBullet(this.x, this.y, angle);
                this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
            }
        },
        update: function (time, delta) {
            if (time > this.nextTic) {
                this.fire();
                this.nextTic = time + this.fireRate;
            }
        },
        addBullet: function (x, y, angle) {
            let bullet = bullets.get();
            if (bullet) {
                bullet.fire(x, y, angle);
            }
        },
        sell: function (turret) {
            map[turret.i][turret.j] = 0; //clear map square
            CURRENCY += turret.cost / 2;

            turret.scene.events.emit("updateCurrency");
            //clear upgrades/reset costs
            turret.fireRate = 1000;
            turret.range = 200;
            turret.cost = 100;
            turret.fireRateCost = 50;
            turret.rangeCost = 50;

            turret.setActive(false);
            turret.setVisible(false);
        },
        upgradeFiringRate: function (turret) {
            //console.log(turret.fireRate);
            //console.log(turret);
            if (CURRENCY >= turret.fireRateCost && !(turret.fireRate <= 400)) {
                CURRENCY -= turret.fireRateCost;
                this.scene.events.emit("updateCurrency");
                turret.fireRate -= 150;
                turret.fireRateCost = Math.round(75 + (turret.fireRateCost * 1.5));
                turret.cost += Math.round(turret.fireRateCost / 4);
            }
        },
        upgradeRange: function (turret) {
            if (CURRENCY >= turret.rangeCost && !(turret.range >= 500)) {
                CURRENCY -= turret.rangeCost;
                this.scene.events.emit("updateCurrency");
                turret.range += 100;
                turret.rangeCost = Math.round(50 + (turret.rangeCost * 2.5));
                turret.cost += Math.round(turret.rangeCost / 4);
            }
        }

    }),

    Bullet: new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:
            function Bullet(scene) {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

                this.incX = 0;
                this.incY = 0;
                this.lifespan = 0;

                this.speed = Phaser.Math.GetSpeed(600, 1);
            },

        fire: function (x, y, angle) {
            this.setActive(true);
            this.setVisible(true);
            //  Bullets fire from the middle of the screen to the given x/y
            this.setPosition(x, y);

            //  we don't need to rotate the bullets as they are round
            //    this.setRotation(angle);

            this.dx = Math.cos(angle);
            this.dy = Math.sin(angle);

            this.lifespan = 1000;
        },

        update: function (time, delta) {
            this.lifespan -= delta;

            this.x += this.dx * (this.speed * delta);
            this.y += this.dy * (this.speed * delta);

            if (this.lifespan <= 0) {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    }),

    damageEnemy: function (enemy, bullet) {
        // only if both enemy and bullet are alive
        if (enemy.active === true && bullet.active === true) {
            // we remove the bullet right away
            bullet.setActive(false);
            bullet.setVisible(false);

            // decrease the enemy hp with BULLET_DAMAGE
            enemy.receiveDamage(BULLET_DAMAGE);
        }
    },

    drawLines: function (graphics) {
        graphics.lineStyle(1, 0x0000ff, 0.8);
        for (let i = 0; i < 8; i++) {
            graphics.moveTo(0, i * 64);
            graphics.lineTo(640, i * 64);
        }
        for (let j = 0; j < 10; j++) {
            graphics.moveTo(j * 64, 0);
            graphics.lineTo(j * 64, 512);
        }
        graphics.strokePath();
    },

    canPlaceTurret: function (i, j) {
        return map[i][j] === 0;
    },

    placeTurret: function (pointer) {
        let i = Math.floor(pointer.y / 64);
        let j = Math.floor(pointer.x / 64);
        //if (this.canPlaceTurret(i, j)) {
        if (map[i][j] === 0) {
            let turret = turrets.get();
            if (turret) {
                if (CURRENCY >= turret.cost) {
                    turret.setActive(true);
                    turret.setVisible(true);
                    turret.place(i, j);
                    turret.setInteractive({
                        useHandCursor: true
                    });
                    //turret.on("pointerover", () => { console.log("hovered over turret"); turretHover = true; });
                    //turret.on("pointerout", () => { console.log("left turret"); turretHover = false; })
                    turret.on("pointerdown", () => { this.scene.events.emit("clickedTurret", turret) });
                    CURRENCY -= turret.cost
                    this.scene.events.emit("updateCurrency");
                }
                else { //this technically works but is really bad, has to be a better way to do this (towers stack on top left without this block)
                    turret.setActive(false);
                    turret.setVisible(false);
                }
            }
        }
    },

    
});

var UIScene = Phaser.Class({
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
        })

        towerText.setVisible(false);
        sellButton.setVisible(false);
        closeButton.setVisible(false);
        upgradeFireRate.setVisible(false);
        upgradeRange.setVisible(false);

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
        }, this)

        game.events.on("clickedTurret", function (turret) {
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
                upgradeFireRate.setText("FIRING RATE MAXED")
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



const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: window.innerWidth,
    height: window.innerHeight,

    physics: {
        default: 'arcade'
    },
    //scene: [{
    //    key: 'main',
    //    preload: preload,
    //    create: create,
    //    update: update
    //}, UIScene]
    scene: [GameScene, UIScene]
};

const game = new Phaser.Game(config);
