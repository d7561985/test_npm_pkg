import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
    constructor()
    {
        super('hello-world')
    }

    preload()
    {
        this.load.setBaseURL('http://labs.phaser.io')
        this.load.image('logo', 'assets/sprites/phaser.png');
        this.load.setPath('assets/spine/3.8/demos/');

        // @ts-ignore
        this.load.spine('set1', 'demos.json', [ 'atlas1.atlas' ], true);
    }

    create()
    {
        this.add.image(0, 0, 'logo').setOrigin(0);

        // @ts-ignore
        var boy = this.add.spine(400, 600, 'set1.spineboy', 'idle', true);

        console.log(boy.getBounds());
        //
        // this.add.image(400, 300, 'sky')
        //
        // const particles = this.add.particles('red')
        //
        // const emitter = particles.createEmitter({
        //     speed: 100,
        //     scale: { start: 1, end: 0 },
        //     blendMode: 'ADD'
        // })
        //
        // const logo = this.physics.add.image(400, 100, 'logo')
        //
        // logo.setVelocity(100, 200)
        // logo.setBounce(1, 1)
        // logo.setCollideWorldBounds(true)
        //
        // emitter.startFollow(logo)
    }
}