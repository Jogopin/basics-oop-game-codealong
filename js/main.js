

class Player{
    constructor(){

        // size of the player
        this.width = 10;
        this.height = 10;

        //positon x and y in % 
        
        this.positionX = 50 -(this.width/2);
        this.positionY = 0

        //bonus( with margin on the board)
           
        //measurement units
        
            this.unitsY= `vh` 
            this.unitsX = `vw`

           
        
        //movement of the player
        this.movementAmount = 10
        
        // creating the element in the html
        this.domElement = null; // carefull: create DomElement will assignt a diferent value to dom.Element
        this.createDomElement();
        

    }
    createDomElement(){

        //step1 create the element
        this.domElement=document.createElement(`div`);
        
        //step2 add content or modify
        this.domElement.id= `player`;

        //step2.1 defining the size
            this.domElement.style.margin=0
           
            // we use % so the player is always relative to the screen
            this.domElement.style.height =  this.height + this.unitsY
            
            this.domElement.style.width = this.width + this.unitsX // I` want to force it to be a square but i dont know how
            
            //with margin on the board
            //first attempt: doesnt work :(
            // const playerSizeHeight = domElement.style.height
            // console.log(playerSizeHeight) 
            // domElement.style.width = playerSizeHeight
        
        //step2.2  position of the player
        this.domElement.style.position = `absolute`
        this.domElement.style.left =this.positionX + this.unitsX
        this.domElement.style.bottom = this.positionY + this.unitsY


        //step3
        const boardElm= document.getElementById(`board`);
        boardElm.appendChild(this.domElement);
    }
    moveLeft(){
        if(this.positionX>0){
            this.positionX -= this.movementAmount
            
        }
        this.domElement.style.left = this.positionX + this.unitsX
        //not working for moving the element to the left
        // const PlayerElm=document.querySelector(`#player`)
        // console.log(this.positionX)
        // PlayerElm.style.left=this.positionX


    }   
    moveRight(){
        if(this.positionX<100){
            this.positionX += this.movementAmount
            }
        
        this.domElement.style.left = this.positionX + this.unitsX

    }
    


}

//***************************************/

const player = new Player();
document.addEventListener(`keydown`,function(event){

    if(event.key === "ArrowRight"){
        player.moveRight();

    }else if(event.key === "ArrowLeft"){
        player.moveLeft();

    }
})


/********************************Pruebas */
// console.log("horizontal position...", player.positionX)

// player.moveLeft();
// player.moveRight();
// player.moveRight();
// console.log("horizontal position...", player.positionX)
