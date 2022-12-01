

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
        this.movementAmount = 2
        
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
        


    }   
    moveRight(){
        if(this.positionX<(100-this.width)){
            this.positionX += this.movementAmount
            }
        
        this.domElement.style.left = this.positionX + this.unitsX

    }
    


}

//***************************************/
//********************************************************** */
//***************************************************************************** */


class Obstacle{
    constructor(){
        this.width = player.width*0.5
        this.height= player.height*0.5
        
        //positon x and y in % 
        
        this.positionX = Math.random()*100 -(this.width);
        this.positionY = 100 -this.height
        
        this.unitsY= `vh` 
        this.unitsX = `vw`
        
        this.movementAmount = 2
        
        // creating the element in the html
        this.domElement = null; // carefull: create DomElement will assignt a diferent value to dom.Element
        this.createDomElement();
    }
    createDomElement(){
        
        //step1 create the element
        this.domElement=document.createElement(`div`);
        
        //step2 add content or modify
        this.domElement.className= `obstacle`;
        
        //step2.1 defining the size
        this.domElement.style.margin=0
        
        
        this.domElement.style.height =  this.height + this.unitsY
        
        this.domElement.style.width = this.width + this.unitsX 
        
        
        //step2.2  position of the player
        this.domElement.style.position = `absolute`
        this.domElement.style.left =(this.positionX) + this.unitsX
        this.domElement.style.bottom = this.positionY + this.unitsY
        
        
        //step3
        const boardElm= document.getElementById(`board`);
        boardElm.appendChild(this.domElement);
    }

    moveDown(){
        if(this.positionY>0){
            this.positionY--;
            this.domElement.style.bottom =this.positionY + this.unitsY
        }
        
        
    }

}




const player = new Player();
const obstaclesArray=[]



//attach event listeners
document.addEventListener(`keydown`,function(event){

    if(event.key === "ArrowRight"){
        player.moveRight();

    }else if(event.key === "ArrowLeft"){
        player.moveLeft();

    }
})




// *************move obstacles****************//

// *******************one way
// setInterval(()=>{obstaclesArray.push(new Obstacle())},1000)
// setInterval(()=>{obstaclesArray.forEach((elem)=>elem.moveDown())},50)


//*********************bonus, doing it in the same interval

// if we play with this time unit and the delay of intercalID01 we can 
// start a general Interval and find multiples of the delay to make the
// increase of time  by 1s(so it will make things easier if we have a lot 
// of time conditions) 
let timeUnit=1


let time = 0


const intervalID01=setInterval(()=>{
    
    time =time+timeUnit


    //create obstacles
    if(time%(40*timeUnit) ===0){
        obstaclesArray.push(new Obstacle())
    }
   
    
    obstaclesArray.forEach((obstacleInstance)=>{
        obstacleInstance.moveDown()
        
           //detect if there's a collision between player and current obstacle
        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.height + player.positionY > obstacleInstance.positionY
        ) {
            console.log("collision detected!!");
        }
    
    })
    

    
},50)






/********************************Pruebas */
// console.log("horizontal position...", player.positionX)

// player.moveLeft();
// player.moveRight();
// player.moveRight();
// console.log("horizontal position...", player.positionX)
