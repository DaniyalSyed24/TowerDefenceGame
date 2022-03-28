class Wave {

    constructor() {
        //this.enemyData = []
        this.waveEnemies = []
    }

    addEnemy(sprite,hp,speed,reward) {
        var t = {
            "sprite": sprite,
            "hp": hp,
            "speed": speed,
            "reward": reward
        }
        this.waveEnemies.push(t);
    }
    
}