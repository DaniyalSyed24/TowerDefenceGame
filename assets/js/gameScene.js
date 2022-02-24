let gameScene = Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function gameScene() {
            Phaser.Scene.call(this, { key: "gameScene" });
        },

    preload: function () {
        this.load.atlas('sprites', 'assets/media/spritesheet.png', 'assets/media/spritesheet.json');
        this.load.atlas('turretSprites', 'assets/media/turrets.png', 'assets/media/turretsheet.json');
        this.load.image('EnemyOrc', 'assets/media/small orc.png');
        this.load.image('bullet', 'assets/media/bullet.png');
        this.load.image('gameBack', 'assets/media/level1-background.png');

        this.generateWave();
    },

    create: function () {
        console.log("game created");

        this.add.image(320,256,'gameBack');

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

    calculateWaveStrength: function () {
        waveStrength = 5 + Math.round(waveStrength + Math.sqrt((CURRENT_WAVE + 3) * waveStrength))
        console.log(waveStrength);
    },
    generateWave: function () {
        this.calculateWaveStrength();
        enemiesLeft = waveStrength;
    },


    /* ---------- OBJECTS ----------*/

    Enemy, Turret, Bullet,

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
    }
});
