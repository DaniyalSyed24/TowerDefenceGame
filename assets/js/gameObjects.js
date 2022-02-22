let Enemy = new Phaser.Class({

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

})

let Turret = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:
        function Turret(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
            this.nextTic = 0;
            this.cost = 100; //cost to place turret
        },
    place: function (i, j) {
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

        let enemy = this.getEnemy(this.x, this.y, 200);
        if (enemy) {
            let angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            this.addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
        }
    },
    update: function (time, delta) {
        if (time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
        }
    },
    addBullet: function (x, y, angle) {
        let bullet = bullets.get();
        if (bullet) {
            bullet.fire(x, y, angle);
        }
    }
})

let Bullet = new Phaser.Class({

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
})
