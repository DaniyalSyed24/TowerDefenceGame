let Enemy = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:
        function Enemy(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'EnemyOrc');    


            this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
            this.hp = 0;
            this.speed = 1 / 10000;
            this.reward = 10; //currency reward for destroying enemy
        },

    setHP: function(hp) {
        this.hp = hp;
    },
    setSpeed: function(speed) {
        this.speed = speed;
    },
    setReward: function (reward) {
        this.reward = reward;
    },
    startOnPath: function () {
        this.follower.t = 0;
        //this.hp = 100;

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
        //this.follower.t += ENEMY_SPEED * delta;
        this.follower.t += this.speed * delta;
        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        if (this.follower.t >= 1) {
            LIVES -= 1;
            this.scene.events.emit("updateLives");
            enemiesAlive -= 1;
            this.setActive(false);
            this.setVisible(false);
        }
    },
})

let Turret = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:
        function Turret(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'turretSprites', 'turrett1v1');
            this.nextTic = 0;
            this.cost = 100; //cost to place turret

            //upgrades
            this.fireRate = 1000; //higher number means SLOWER firing rate
            this.range = 200;
            //this.bulletDamage;

            this.type = 1;
            this.version = 1;

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
            this.addBullet(this.x, this.y, angle, this.type);
            this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
        }
    },
    update: function (time, delta) {
        if (time > this.nextTic) {
            this.fire();
            this.nextTic = time + this.fireRate;
        }
    },
    addBullet: function (x, y, angle, type) {
        let bullet = bullets.get();
        if (bullet) {
            bullet.setTexture('bulletSprites', type);
            bullet.fire(x, y, angle);
        }
    },
    sell: function (turret) {
        map[turret.i][turret.j] = 0; //clear map square
        CURRENCY += Math.round(turret.cost / 2);

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
            if (turret.version < 4) {
                turret.version += 1;
            }
            let turretStart = "turrett";
            let turretType = turret.type.toString();
            let turretMid = "v";
            let turretVer = turret.version.toString();
            let newTurret = turretStart.concat(turretType, turretMid, turretVer);
            CURRENCY -= turret.fireRateCost;
            this.scene.events.emit("updateCurrency");
            turret.fireRate -= 150;
            turret.fireRateCost = Math.round(75 + (turret.fireRateCost * 1.5));
            turret.cost += Math.round(turret.fireRateCost / 4);       
            console.log(newTurret);
            turret.setTexture('turretSprites', newTurret);
        }
    },
    upgradeRange: function (turret) {
        
        if (CURRENCY >= turret.rangeCost && !(turret.range >= 500)) {
            if (turret.type < 4) {
                turret.type += 1;
            }          
            let turretStart = "turrett";
            let turretType = turret.type.toString();
            let turretMid = "v";
            let turretVer = turret.version.toString();
            let newTurret = turretStart.concat(turretType, turretMid, turretVer);
            CURRENCY -= turret.rangeCost;
            this.scene.events.emit("updateCurrency");
            turret.range += 100;
            turret.rangeCost = Math.round(50 + (turret.rangeCost * 2.5));
            turret.cost += Math.round(turret.rangeCost / 4);
            turret.setTexture('turretSprites', newTurret);
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
        this.setRotation(angle);

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
