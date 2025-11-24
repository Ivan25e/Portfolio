import Phaser from "phaser";
import { useEffect, useRef, useState } from "react";

class Scene extends Phaser.Scene {
    score = 0;
    bubbleTimer!: Phaser.Time.TimerEvent;
    isGameOver = false;

    constructor() {
        super("Scene");
    }

    create() {
        this.score = 0;
        this.isGameOver = false;

        this.game.events.emit("ready-bubble");

        this.bubbleTimer = this.time.addEvent({
            delay: 800,
            loop: true,
            callback: () => this.spawnCircle()
        });
    }

    spawnCircle() {
        if (this.isGameOver) return;

        const isBomb = Math.random() < 0.15;
        const x = Phaser.Math.Between(40, 360);
        const y = Phaser.Math.Between(40, 360);

        const circle = this.add.circle(x, y, 15);

        if (isBomb) {
            circle.setStrokeStyle(4, 0xff0000);
        } else {
            circle.setStrokeStyle(4, 0x3b82f6);
        }

        circle.setInteractive({ useHandCursor: true });

        this.tweens.add({
            targets: circle,
            alpha: 0,
            duration: 1400,
            onComplete: () => {
                if (!isBomb && !this.isGameOver) {
                    this.score = Math.max(0, this.score - 10);
                    this.events.emit("score", this.score);
                }
                circle.destroy();
            }
        });

        circle.on("pointerdown", () => {
            if (isBomb) {
                this.gameOver();
            } else {
                this.score += 50;
                this.events.emit("score", this.score);
                circle.destroy();
            }
        });
    }

    gameOver() {
        if (this.isGameOver) return;

        this.isGameOver = true;
        this.bubbleTimer.remove();

        const txt = this.add.text(200, 200, "GAME OVER", {
            color: "#fff",
            fontSize: "32px"
        }).setOrigin(0.5);

        const restart = this.add.text(200, 260, "Try Again", {
            color: "#fff",
            fontSize: "20px",
            backgroundColor: "#444",
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        })  .setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.restart();
            });
        this.score = 0;
        this.events.emit("score", this.score);
    }
}

export default function BubblePopDemo() {
    const gameRef = useRef<HTMLDivElement>(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!gameRef.current) return;

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 400,
            height: 400,
            parent: gameRef.current,
            backgroundColor: "#111",
            scene: [Scene]
        };

        const game = new Phaser.Game(config);

        game.events.on("ready-bubble", () => {
            const scene = game.scene.getScene("Scene");
            scene.events.on("score", setScore);
        });

        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
                Click the <b style={{ color: "#3B82F6" }}>blue circles</b> only!<br />
                If you pop a bubble, you earn 50 points, but if you miss one, you lose 10 points.<br />
                Avoid the <b style={{ color: "red" }}>red bombs</b>.<br /><br />
                SCORE: <b>{score}</b>
            </div>

            <div
                ref={gameRef}
                style={{ width: "400px", margin: "0 auto", padding: "20px" }}
            />
        </>
    );
}