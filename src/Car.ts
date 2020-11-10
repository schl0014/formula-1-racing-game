class Car {
    private image: HTMLImageElement;
    private _name: string;
    private _distance: number;
    private _xPosition: number;
    private _yPosition: number;

    constructor(name:string, colour:string, xPos:number, yPos:number) {
        this._xPosition = xPos;
        this._yPosition = yPos;
        this._name = name;
        this.image = this.loadNewImage(`./assets/img/${colour}-racing-car.png`);
        //console.log(this.image);
    }

    public set distance(distanceRaced : number) {
        this._distance = distanceRaced;
    }
    
    public get distance() : number {
        return this._distance;
    }

    public get xPostition() : number {
        return this._xPosition;
    }

    public get yPostition() : number {
        return this._yPosition;
    }

    public get name() : string {
        return this._name;
    }
    
    /**
    * Draw all the necessary items to the screen
    */
    public draw(ctx:CanvasRenderingContext2D) {
        // draw player
        //console.log(ctx);
        ctx.drawImage(this.image, this._xPosition, this._yPosition);
    }
    
    /**
    * Method to load an image
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}