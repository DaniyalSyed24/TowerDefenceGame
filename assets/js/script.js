const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1080,
    height: 720,
    // width: window.innerWidth,
    // height: window.innerHeight,

    physics: {
        default: 'arcade'
    },
    scene: [instructionsScene, gameScene, UIScene]
};

const game = new Phaser.Game(config);