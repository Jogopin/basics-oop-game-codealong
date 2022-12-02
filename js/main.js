class Game {
  constructor() {
    this.player = null;
    this.obstaclesArray = [];

    // if we play with this time unit and the delay of intercalID01 we can
    // start a general Interval and find multiples of the delay to make the
    // increase of time  by 1s(so it will make things easier if we have a lot
    // of time conditions)
    this.timeUnit = 1;

    this.time = 0;
  }
  start() {
    this.player = new Player();
    this.attachEventListeners();

    const intervalID01 = setInterval(() => {
      this.time = this.time + this.timeUnit;
      //create obstacles
      if (this.time % (40 * this.timeUnit) === 0) {
        this.obstaclesArray.push(new Obstacle());
      }
      //move down
      this.obstaclesArray.forEach((obstacleInstance) => {
        obstacleInstance.moveDown();
        //detect collition
        this.detectCollition(obstacleInstance);
        //remove element
        this.removeObstacleIfOutside(obstacleInstance);
      });
    }, 16.66);
  }
  attachEventListeners() {
    
    document.addEventListener(`keydown`, (event) =>{
      if (event.key === "ArrowRight") {
        this.player.moveRight();
      } else if (event.key === "ArrowLeft") {
        this.player.moveLeft();
      }
    });
  }
  detectCollition(obstacleInstance){
    if (
        this.player.positionX <
          obstacleInstance.positionX + obstacleInstance.width &&
        this.player.positionX + this.player.width >
          obstacleInstance.positionX &&
        this.player.positionY <
          obstacleInstance.positionY + obstacleInstance.height &&
        this.player.height + this.player.positionY >
          obstacleInstance.positionY
      ) {
        console.log("collision detected!!");
        //this.gameOver()
      }
  }
  removeObstacleIfOutside(obstacleInstance){
     //check if we need to remove an obstacle verticaly
     if (obstacleInstance.positionY + obstacleInstance.height < 0) {
        obstacleInstance.domElement.remove();

        this.obstaclesArray.shift();
      }
  }
  gameOver(){
    location.href = `gameover.html`; // to redirect to another page
  }
}

class Player {
  constructor() {
    // size of the player
    this.width = 8;
    this.height = 8 * (4 / 3);

    //positon x and y in %

    this.positionX = 50 - this.width / 2;
    this.positionY = 0;

    //bonus( with margin on the board)

    //measurement units

    this.unitsY = `%`;
    this.unitsX = `%`;

    //movement of the player
    this.movementAmount = 1.5;

    // creating the element in the html
    this.domElement = null; // carefull: create DomElement will assignt a diferent value to dom.Element
    this.createDomElement();
  }
  createDomElement() {
    //step1 create the element
    this.domElement = document.createElement(`div`);

    //step2 add content or modify
    this.domElement.id = `player`;

    //step2.1 defining the size

    //we have a fixed board, so our player and other objects
    //are define by the % of the board
    this.domElement.style.height = this.height + `%`;

    this.domElement.style.width = this.width + `%`; // I` want to force it to be a square but i dont know how

    //step2.2  position of the player
    //this.domElement.style.position = `absolute` // this property is better in the css document
    this.domElement.style.left = this.positionX + `%`;
    this.domElement.style.bottom = this.positionY + this.unitsY;

    //step3
    const boardElm = document.getElementById(`board`);
    boardElm.appendChild(this.domElement);
  }
  moveLeft() {
    if (this.positionX - this.movementAmount > 0) {
      this.positionX -= this.movementAmount;
    } else if (this.positionX - this.movementAmount <= 0) {
      this.positionX = 0;
    }
    this.domElement.style.left = this.positionX + `%`;
    console.log(this.positionX);
  }
  moveRight() {
    if (this.positionX + this.width + this.movementAmount < 100) {
      this.positionX += this.movementAmount;
    } else if (this.positionX + this.width + this.movementAmount >= 100) {
      this.positionX = 100 - this.width;
    }

    this.domElement.style.left = this.positionX + `%`;
    console.log(this.positionX);
  }
}

class Obstacle {
  constructor() {
    this.width =  1.5 * (Math.random() + 0.5);
    this.height =  1.5 * (Math.random() + 0.5);

    //positon x and y in %
    this.positionY = 100 - this.height;
    this.positionX = Math.random() * 100;
    //randomize the creation of obstacles inside the board in the X axis
    if (this.positionX < 0) this.positionX = 0;
    if (this.positionX + this.width > 100) this.positionX = 100 - this.width;

    this.unitsY = `%`;
    this.unitsX = `%`;

    this.movementAmount = 0.3;

    // creating the element in the html
    this.domElement = null; // carefull: create DomElement will assignt a diferent value to dom.Element
    this.createDomElement();
  }
  createDomElement() {
    //step1 create the element
    this.domElement = document.createElement(`div`);

    //step2 add content or modify
    this.domElement.className = `obstacle`;

    //step2.1 defining the size
    this.domElement.style.margin = 0;

    this.domElement.style.height = this.height + this.unitsY;

    this.domElement.style.width = this.width + this.unitsX;

    //step2.2  position of obstacle

    this.domElement.style.left = this.positionX + this.unitsX;
    this.domElement.style.bottom = this.positionY + this.unitsY;
    
    //step3
    const boardElm = document.getElementById(`board`);
    boardElm.appendChild(this.domElement);
}

moveDown() {
    this.positionY -= this.movementAmount;
    this.domElement.style.bottom = this.positionY + this.unitsY;
}
}

const game = new Game();
game.start()




