let path;
let turrets;
let enemies;

var xhr = new XMLHttpRequest()
xhr.onload = function () {
    var data = JSON.parse(this.responseText)

    // You can now use the data
    console.log(data)
}
xhr.open('GET', 'process/badges.php')
xhr.send()

let ENEMY_SPEED = 1 / 10000;
let CURRENT_WAVE = 1;
let LIVES = 100;
let BULLET_DAMAGE = 50;

let CURRENCY = 200;

let waveStrength = 10; //default value
let enemiesLeft;       //amount of enemies left to spawn in the current wave
let enemiesAlive = 0;  //enemies currently alive

let map =  [[0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, -1, -1, -1, -1, -1, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, 0, 0]];


const buttonBackgroundColor = '#363636'
const textColor = 'white';
const goldColor = '#F39C12';

class Button {
    constructor(x, y, label, scene, callback, paddingWidth, paddingHeight,
        buttonBackgroundColour = "#363636", textColour="white", activeBGColour="#F39C12") {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(paddingWidth, paddingHeight)
            .setStyle({ backgroundColor: buttonBackgroundColour, fontSize: '25px', })
            .setColor('white')
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: textColour, backgroundColor: activeBGColour }))
            .on('pointerout', () => button.setStyle({ fill: textColour, backgroundColor: buttonBackgroundColour }));
    }
}


const config = {
    type: Phaser.AUTO,  
    parent: 'game',
    width: 800,
    height: 640,
    physics: {
        default: 'arcade'
    },
    scene: [mainMenuScene, badgeScene, registerScene, loginScene, gameScene, instructionsScene, UIScene]
};

const game = new Phaser.Game(config);