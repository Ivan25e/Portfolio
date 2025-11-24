import Phaser from "phaser";
import { useEffect, useRef, useState } from "react";

class ShooterScene extends Phaser.Scene {
    player!: Phaser.Physics.Arcade.Sprite;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    space!: Phaser.Input.Keyboard.Key;

    enemies: Phaser.GameObjects.Rectangle[] = [];
    bullets: Phaser.GameObjects.Rectangle[] = [];

    score = 0;
    isGameOver = false;
    spawnTimer!: Phaser.Time.TimerEvent;
    wKey!: Phaser.Input.Keyboard.Key;

    constructor() {
        super("ShooterScene");
    }

    create() {
        this.isGameOver = false;
        this.score = 0;

        this.enemies = [];
        this.bullets = [];

        this.events.emit("ready");

        this.physics.world.setBounds(0, 0, 400, 400);

        this.player = this.physics.add.sprite(50, 350, "__WHITE")
            .setOrigin(0.5)
            .setDisplaySize(30, 30)
            .setTint(0x4ade80);

        const body = this.player.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        body.setGravityY(600);
        body.setVelocity(0); 

        this.space = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.wKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.space.removeAllListeners();

        this.space.on("down", () => {
            if (!this.isGameOver) this.shoot();
        });

        this.spawnTimer = this.time.addEvent({
            delay: 1500,
            loop: true,
            callback: () => this.spawnEnemy()
        });
    }

    shoot() {
        const bullet = this.add.rectangle(this.player.x + 20, this.player.y, 12, 6, 0xffffff);
        this.physics.add.existing(bullet);
        this.bullets.push(bullet);
    }

    spawnEnemy() {
        if (this.isGameOver) return;

        const y = Phaser.Math.Between(250, 350);
        const enemy = this.add.rectangle(420, y, 30, 30, 0xff5252);
        this.physics.add.existing(enemy);
        this.enemies.push(enemy);
    }

    update() {
        if (this.isGameOver) return;

        const body = this.player.body as Phaser.Physics.Arcade.Body;

        if (this.wKey.isDown && body.blocked.down) {
            this.player.setVelocityY(-520);
        }

        this.bullets.forEach((b, i) => {
            b.x += 8;
            if (b.x > 420) {
                b.destroy();
                this.bullets.splice(i, 1);
            }
        });

        this.enemies.forEach((e, i) => {
            e.x -= 3;

            if (Phaser.Geom.Intersects.RectangleToRectangle(e.getBounds(), this.player.getBounds())) {
                this.gameOver();
            }

            if (e.x < -20) {
                e.destroy();
                this.enemies.splice(i, 1);
            }
        });

        this.bullets.forEach((b, bi) => {
            this.enemies.forEach((e, ei) => {
                if (Phaser.Geom.Intersects.RectangleToRectangle(b.getBounds(), e.getBounds())) {
                    b.destroy();
                    e.destroy();
                    this.bullets.splice(bi, 1);
                    this.enemies.splice(ei, 1);

                    this.score += 50;
                    this.events.emit("score", this.score);
                }
            });
        });
    }

    gameOver() {
        if (this.isGameOver) return;

        this.isGameOver = true;
        this.spawnTimer.remove();

        this.add.text(200, 180, "GAME OVER", {
            fontSize: "32px",
            color: "#fff"
        }).setOrigin(0.5);

        this.add.text(200, 240, "Try Again", {
            fontSize: "20px",
            backgroundColor: "#444",
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
            color: "#fff"
        })
            .setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", () => this.scene.restart());
    }
}

export default function ShooterDemo() {
    const gameRef = useRef<HTMLDivElement>(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!gameRef.current) return;

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 400,
            height: 400,
            backgroundColor: "#1a1a1a",
            parent: gameRef.current,
            physics: { default: "arcade" },
            scene: [ShooterScene]
        };

        const game = new Phaser.Game(config);

        game.events.on("ready", () => {
            const scene = game.scene.getScene("ShooterScene");
            scene.events.on("score", setScore);
        });

        return () => game.destroy(true);
    }, []);

    return (
        <>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
                Jump with <b>W</b> key— Shoot with <b>SPACE</b>.<br /><br />
                SCORE: <b>{score}</b>
            </div>

            <div
                ref={gameRef}
                style={{ width: "400px", margin: "0 auto", padding: "20px" }}
            />
        </>
    );
}