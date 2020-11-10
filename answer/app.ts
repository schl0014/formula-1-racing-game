/// <reference path="Car.ts" />
/// <reference path="KeyboardListener.ts" />

class Game {
  // Necessary canvas attributes
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  // KeyboardListener so the player can move
  private keyboardListener: KeyboardListener;

  // the state of the game: begin, dice and end
  private gameState: string;
  private winner: string;

  // Car instances, one for each player
  private car1: Car;
  private car2: Car;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.keyboardListener = new KeyboardListener();

    this.car1 = new Car("Bullet", "red", 100, 200);
    this.car2 = new Car("Greek Arrow", "green", 100, 500);
    console.log(this.car1);

    this.gameState = "begin";

    this.loop();
  }

  /**
   * Function to give a number between 1 and 6
   * @returns {number} number - number between 1 and 6
   */
  private rollDice(): number {
    return this.randomNumber(1, 6);
  }

  /**
   * Method for the Game Loop
   * Based on the game state some actions have to be executed
   */
  private loop = () => {
    if (this.gameState == "begin") {
      this.writeTextToCanvas(
        "Press R to Roll the dice",
        30,
        this.canvas.width / 2,
        this.canvas.height - 50
      );
      this.writeTextToCanvas(
        "Phase: begin",
        40,
        this.canvas.width / 2,
        50,
        "center",
        "white"
      );
      if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_R)) {
        this.gameState = "dice";
        this.car1.distance = this.rollDice();
        this.car2.distance = this.rollDice();
      }
    } else if (this.gameState == "dice") {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.writeTextToCanvas(
        `Player 1: ${this.car1.distance}`,
        40,
        this.canvas.width / 2,
        200,
        "center",
        "white"
      );
      this.writeTextToCanvas(
        `Player 2: ${this.car2.distance}`,
        40,
        this.canvas.width / 2,
        500,
        "center",
        "white"
      );
      this.gameState = "end";
    } else if (this.gameState == "end") {
      if (this.car1.distance > this.car2.distance) {
        this.winner = this.car1.name;
      } else if (this.car1.distance < this.car2.distance) {
        this.winner = this.car2.name;
      } else {
        this.winner = "undecided";
      }
      this.writeTextToCanvas(
        `Winner is ${this.winner}`,
        60,
        this.canvas.width / 2,
        this.canvas.height - 50,
        "center",
        "red"
      );
    }
    this.draw();
    requestAnimationFrame(this.loop);
  };

  /**
   * Function to draw all the cars on the canvas
   */
  private draw() {
    this.car1.draw(this.ctx);
    this.car2.draw(this.ctx);
  }

  /**
   * Writes text to the canvas
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "red"
  ) {
    this.ctx.font = `${fontSize}px Minecraft`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
  /**
   * Renders a random number between min and max
   * @param {number} min - minimal time
   * @param {number} max - maximal time
   */
  public randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}

/**
 * Start the game whenever the entire DOM is loaded
 */
let init = () =>
  new Game(document.getElementById("canvas") as HTMLCanvasElement);

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
