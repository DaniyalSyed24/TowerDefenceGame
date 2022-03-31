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
for (var i = 0; i < 24; i++) { //var i = 0; i < 24; i++
    waves[0].addEnemy("EnemyOrc", 100, 1 / 10000, 5);
}
waves[0].enemySpawnSpeed = 1000;

//wave 2
for (var i = 0; i < 36; i++) {
    waves[1].addEnemy("EnemyOrc", 100, 1 / 7000, 5); // ok
}
waves[1].enemySpawnSpeed = 1000;

//wave 3
for (var i = 0; i < 42; i++) {
    waves[2].addEnemy("EnemyOrc", 150, 1 / 10000, 5); //ok
}
waves[2].enemySpawnSpeed = 750;

//wave 4
for (var i = 0; i < 50; i++) {
    waves[3].addEnemy("EnemyOrc", 200, 1 / 7000, 5); //ok
}
waves[3].enemySpawnSpeed = 1000;

//wave 5
for (var i = 0; i < 35; i++) {
    waves[4].addEnemy("EnemyOrc", 200, 1 / 10000, 10); //ok
    waves[4].addEnemy("EnemyOrc", 100, 1 / 5000, 5);
}
waves[4].enemySpawnSpeed = 800;

//wave 6
for (var i = 0; i < 60; i++) {
    waves[5].addEnemy("EnemyOrc", 150, 1 / 10000, 5); //ok
}
waves[5].enemySpawnSpeed = 500;

//wave 7
for (var i = 0; i < 100; i++) {
    waves[6].addEnemy("EnemyOrc", 250, 1/12000, 10) //ok
}
waves[6].enemySpawnSpeed = 700;

//wave 8
for (var i = 0; i < 130; i++) {
    waves[7].addEnemy("EnemyOrc", 200, 1 / 8000, 10); //ok
}
waves[7].enemySpawnSpeed = 700;

//wave 9
for (var i = 0; i < 45; i++) {
    waves[8].addEnemy("EnemyOrc", 200, 1 / 8000, 10); //ok
    waves[8].addEnemy("EnemyOrc", 200, 1 / 8000, 10);
    waves[8].addEnemy("EnemyOrc", 50, 1 / 2500, 5);
    waves[8].addEnemy("EnemyOrc", 100, 1 / 4000, 5);
}
waves[8].enemySpawnSpeed = 500;

//wave 10
waves[9].addEnemy("EnemyOrc", 2000, 1 / 40000, 250); //should lose more health...
for (var i = 0; i < 100; i++) {
    waves[9].addEnemy("EnemyOrc", 200, 1 / 8000, 10);
    waves[9].addEnemy("EnemyOrc", 200, 1 / 8000, 10);
    waves[9].addEnemy("EnemyOrc", 100, 1 / 2500, 5);
}
waves[9].enemySpawnSpeed = 600;

//wave 11
for (var i = 0; i < 175; i++) {
    waves[10].addEnemy("EnemyOrc", 150, 1 / 5000, 10);
}
waves[10].enemySpawnSpeed = 300;

//wave 12
for (var i = 0; i < 200; i++) {
    waves[11].addEnemy("EnemyOrc", 650, 1 / 10000, 10); //ok
    waves[11].addEnemy("EnemyOrc", 150, 1 / 3750, 10);
}
waves[11].enemySpawnSpeed = 300;

//wave 13
for (var i = 0; i < 150; i++) {
    waves[0].addEnemy("EnemyOrc", 550, 1 / 10000, 10); //ok
}
waves[0].enemySpawnSpeed = 300;

//wave 14
for (var i = 0; i < 230; i++) {
    waves[13].addEnemy("EnemyOrc", 1000, 1 / 10000, 15);
    waves[13].addEnemy("EnemyOrc", 2500, 1 / 6000, 10);
    waves[13].addEnemy("EnemyOrc", 4000, 1 / 6000, 10);
    waves[13].addEnemy("EnemyOrc", 2000, 1 / 6000, 10);
}
waves[13].enemySpawnSpeed = 550;

//wave 15
for (var i = 0; i < 100; i++) {
    waves[14].addEnemy("EnemyOrc", 150000, 10 / 2500, 25);
    waves[14].addEnemy("EnemyOrc", 30000, 10 / 2500, 25);
}
waves[14].enemySpawnSpeed = 250;

//wave 16
for (var i = 0; i < 175; i++) {
    waves[15].addEnemy("EnemyOrc", 1000000, 10 / 2000000, 5);
    waves[15].addEnemy("EnemyOrc", 5000000, 10 / 2000000, 5);
}
for (var i = 0; i < 115; i++) {
    waves[15].addEnemy("EnemyOrc", 10000000, 1 / 400000, 10);
}
waves[15].enemySpawnSpeed = 400;

//wave 17
for (var i = 0; i < 120; i++) {
    waves[16].addEnemy("EnemyOrc", 500000000, 1 / 150000000, 20);
}
waves[16].enemySpawnSpeed = 350;

//wave 18
for (var i = 0; i < 250; i++) {
    waves[17].addEnemy("EnemyOrc", 150, 1 / 4000, 15);
}
waves[17].enemySpawnSpeed = 200;

//wave 19
for (var i = 0; i < 100; i++) {
    waves[16].addEnemy("EnemyOrc", 500000000, 1 / 150000000, 100);
}
for (var i = 0; i < 100; i++) {
    waves[18].addEnemy("EnemyOrc", 500, 1 / 12000, 15);
}
for (var i = 0; i < 100; i++) {
    waves[18].addEnemy("EnemyOrc", 300, 1 / 5000, 15);
}
waves[18].enemySpawnSpeed = 350;


//wave 20
waves[19].addEnemy("EnemyOrc", 10000, 1 / 40000, 1000);
for (var i = 0; i < 200; i++) {
    waves[19].addEnemy("EnemyOrc", 4000000000, 1 / 4000, 2000);
}
waves[19].addEnemy("EnemyOrc", 100000000, 1 / 40000, 1000);
for (var i = 0; i < 199; i++) {
    waves[19].addEnemy("EnemyOrc", 4000000, 1 / 4000, 10000);
    waves[19].addEnemy("EnemyOrc", 40000, 1 / 25000, 10000);
}
for (var i = 0; i < 199; i++) {
    waves[19].addEnemy("EnemyOrc", 4000000, 1 / 4000, 10000);
    waves[19].addEnemy("EnemyOrc", 4000000, 1 / 25000, 10000);
}
waves[19].addEnemy("EnemyOrc", 40000, 1 / 25000, 10000);
