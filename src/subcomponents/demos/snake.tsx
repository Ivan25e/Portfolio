import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";

class Scene extends Phaser.Scene {
    snake: Phaser.Geom.Point[] = [];
    direction: Phaser.Geom.Point = new Phaser.Geom.Point(1, 0);
    food: Phaser.Geom.Point = new Phaser.Geom.Point(12, 12);
    gridSize = 20;
    graphics!: Phaser.GameObjects.Graphics;

    isGameOver = false;
    restartButton!: Phaser.GameObjects.Text;
    score = 0;

    constructor() {
        super("SnakeScene");
    }

    create() {
        this.resetGame();

        this.graphics = this.add.graphics();

        this.restartButton = this.add.text(200, 200, "Try Again", {
            fontSize: "24px",
            color: "#fff",
            backgroundColor: "#444",
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        })
            .setOrigin(0.5)
            .setInteractive()
            .setVisible(false)
            .on("pointerdown", () => {
                this.scene.restart();
            });

        this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
            if (this.isGameOver) return;
            switch (event.key.toLowerCase()) {
                case "w":
                    if (this.direction.y === 0)
                        this.direction = new Phaser.Geom.Point(0, -1);
                    break;
                case "s":
                    if (this.direction.y === 0)
                        this.direction = new Phaser.Geom.Point(0, 1);
                    break;
                case "a":
                    if (this.direction.x === 0)
                        this.direction = new Phaser.Geom.Point(-1, 0);
                    break;
                case "d":
                    if (this.direction.x === 0)
                        this.direction = new Phaser.Geom.Point(1, 0);
                    break;
            }
        });

        this.time.addEvent({
            delay: 150,
            callback: this.updateSnake,
            loop: true
        });
    }

    resetGame() {
        this.isGameOver = false;
        this.snake = [new Phaser.Geom.Point(8, 8)];
        this.direction = new Phaser.Geom.Point(1, 0);
        this.food = new Phaser.Geom.Point(12, 12);
        this.score = 0;
        this.events.emit("score", this.score);
    }

    triggerGameOver() {
        this.isGameOver = true;
        this.restartButton.setVisible(true);
        this.direction = new Phaser.Geom.Point(0, 0);
    }

    updateSnake = () => {
        if (this.isGameOver) return;

        const head = new Phaser.Geom.Point(
            this.snake[0].x + this.direction.x,
            this.snake[0].y + this.direction.y
        );

        if (
            head.x < 0 || head.y < 0 ||
            head.x >= 400 / this.gridSize ||
            head.y >= 400 / this.gridSize ||
            this.snake.some(seg => seg.x === head.x && seg.y === head.y)
        ) {
            this.triggerGameOver();
            return;
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.placeFood();
            this.score += 50;
            this.events.emit("score", this.score);
        } else {
            this.snake.pop();
        }

        this.draw();
    };

    placeFood() {
        this.food = new Phaser.Geom.Point(
            Phaser.Math.Between(0, 19),
            Phaser.Math.Between(0, 19)
        );
    }

    draw() {
        this.graphics.clear();

        this.graphics.fillStyle(0x8aff80);
        this.snake.forEach(seg => {
            this.graphics.fillRect(
                seg.x * this.gridSize,
                seg.y * this.gridSize,
                this.gridSize,
                this.gridSize
            );
        });

        this.graphics.fillStyle(0xff00aa);
        this.graphics.fillRect(
            this.food.x * this.gridSize,
            this.food.y * this.gridSize,
            this.gridSize,
            this.gridSize
        );
    }
}

export default function SnakeDemo() {
    const gameRef = useRef<HTMLDivElement>(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!gameRef.current) return;

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 400,
            height: 400,
            parent: gameRef.current,
            backgroundColor: "#1d1d1d",
            scene: [Scene]
        };

        const game = new Phaser.Game(config);

        game.events.on("ready", () => {
            const scene = game.scene.getScene("SnakeScene");
            scene.events.on("score", setScore);
        });

        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
                Use <b>WASD</b> keys to move.<br/><br/>
                SCORE: <b>{score}</b>
            </div>
            <div 
                ref={gameRef} 
                style={{ width: "400px", margin: "0 auto", padding: "20px" }}
            />
        </>
    );
}