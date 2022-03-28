class Wave {

    constructor() {
        this.enemySpawnSpeed = 1000;
        this.waveEnemies = [];
    }

    addEnemy(sprite, hp, speed, reward) {

        var t = {
            "sprite": sprite,
            "hp": hp,
            "speed": speed,
            "reward": reward
        };
        this.waveEnemies.push(t);
    }

    
    
}

let waves = [];
//populate waves array
for (var i = 0; i < 20; i++) {
    waves.push(new Wave());
}
//fun time, wave data
//wave 1
for (var i = 0; i < 24; i++) {
    waves[0].addEnemy("EnemyOrc", 100, 1 / 10000, 5);
}
waves[0].enemySpawnSpeed = 1000;

//wave 2
for (var i = 0; i < 36; i++) {
    waves[1].addEnemy("EnemyOrc", 100, 1 / 10000, 5);
}
waves[1].enemySpawnSpeed = 1000;

//wave 3
for (var i = 0; i < 42; i++) {
    waves[2].addEnemy("EnemyOrc", 100, 1 / 10000, 5);
}
waves[2].enemySpawnSpeed = 750;

//wave 4
for (var i = 0; i < 50; i++) {
    waves[3].addEnemy("EnemyOrc", 50, 1 / 6000, 5);
}
waves[3].enemySpawnSpeed = 1000;

//wave 5
for (var i = 0; i < 35; i++) {
    waves[4].addEnemy("EnemyOrc", 200, 1 / 10000, 10);
    waves[4].addEnemy("EnemyOrc", 50, 1 / 6000, 5);
}
waves[4].enemySpawnSpeed = 800;

//wave 6
for (var i = 0; i < 100; i++) {
    waves[5].addEnemy("EnemyOrc", 200, 1 / 10000, 10);
}
waves[5].enemySpawnSpeed = 250;

//wave 7
for (var i = 0; i < 100; i++) {
    waves[6].addEnemy("EnemyOrc", 250, 1/12000, 10)
}
waves[6].enemySpawnSpeed = 700;

//wave 8
for (var i = 0; i < 130; i++) {
    waves[7].addEnemy("EnemyOrc", 200, 1 / 8000, 10);
}
waves[7].enemySpawnSpeed = 800;

//wave 9
for (var i = 0; i < 45; i++) {
    waves[8].addEnemy("EnemyOrc", 200, 1 / 8000);
    waves[8].addEnemy("EnemyOrc", 200, 1 / 8000);
    waves[8].addEnemy("EnemyOrc", 50, 1 / 2500);
}
waves[8].enemySpawnSpeed = 700;

//wave 10
waves[9].addEnemy("EnemyOrc", 6000, 1 / 50000, 600);
for (var i = 0; i < 120; i++) {
    waves[9].addEnemy("EnemyOrc", 100, 1 / 10000, 10);
}

//wave 11

//wave 12

//wave 13

//wave 14

//wave 15

//wave 16

//wave 17

//wave 18

//wave 19

//wave 20
