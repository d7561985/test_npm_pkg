import Phaser from 'phaser'
import 'phaser/plugins/spine/dist/SpinePlugin';

import HelloWorldScene from './scene/one'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [HelloWorldScene],
    plugins: {
        scene: [
            // @ts-ignore
            {key: 'SpinePlugin', plugin: window.SpinePlugin, sceneKey: 'spine'}
        ]
    }
}

export default new Phaser.Game(config)