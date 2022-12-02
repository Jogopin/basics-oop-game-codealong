

class Player{
    constructor(){

        // size of the player
        this.width = 8;
        this.height = 8*(4/3);

        //positon x and y in % 
        
        this.positionX = 50 -(this.width/2);
        this.positionY = 0

        //bonus( with margin on the board)
           
        //measurement units
        
            this.unitsY= `%` 
            this.unitsX = `%`

           
        
        //movement of the player
        this.movementAmount = 1.5
        
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
                       
            //we have a fixed board, so our player and other objects
            //are define by the % of the board
            this.domElement.style.height =  this.height + `%`
            
            this.domElement.style.width = this.width + `%` // I` want to force it to be a square but i dont know how
            
        
        
        //step2.2  position of the player
        //this.domElement.style.position = `absolute` // this property is better in the css document
        this.domElement.style.left =this.positionX + `%`
        this.domElement.style.bottom = this.positionY + this.unitsY


        //step3
        const boardElm= document.getElementById(`board`);
        boardElm.appendChild(this.domElement);
    }
    moveLeft(){
        if(this.positionX-this.movementAmount>0){
            this.positionX -= this.movementAmount
            
        }else if (this.positionX-this.movementAmount<=0){
            this.positionX = 0
        }
        this.domElement.style.left = this.positionX + `%`
        console.log(this.positionX)


    }   
    moveRight(){
        
        
        if(this.positionX+this.width+this.movementAmount<(100)){
            this.positionX += this.movementAmount
        }else if(this.positionX+this.width+this.movementAmount>=100){
            this.positionX = 100 -this.width
        }
        
        this.domElement.style.left = this.positionX + `%`
        console.log(this.positionX)
    }
    


}

//***************************************/
//********************************************************** */
//***************************************************************************** */


class Obstacle{
    constructor(){
        this.width = player.width*1.5*(Math.random()+0.5)
        this.height= player.height*1.5*(Math.random()+0.5)
        
        //positon x and y in % 
        this.positionY = 100 -this.height
        this.positionX = Math.random()*100;
        //randomize the creation of obstacles inside the board in the X axis
        if(this.positionX<0) this.positionX=0
        if(this.positionX+this.width>100) this.positionX=100-this.width
        
        
        this.unitsY= `%` 
        this.unitsX = `%`
        
        this.movementAmount = 0.3
        
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
        
        
        //step2.2  position of obstacle
        
        this.domElement.style.left =this.positionX + this.unitsX
        this.domElement.style.bottom = this.positionY + this.unitsY
        
        
        //step3
        const boardElm= document.getElementById(`board`);
        boardElm.appendChild(this.domElement);
    }

    moveDown(){
        
            this.positionY-=this.movementAmount;
            this.domElement.style.bottom =this.positionY + this.unitsY
        
        
        
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
            //locatioon.href=`gameover.html` // to redirect to another page
        }
            //check if we need to remove an obstacle
            if(obstacleInstance.positionY+obstacleInstance.height<0){
                console.log(`remove obstacle `+obstacleInstance)
                obstacleInstance.domElement.remove()
                console.log(obstaclesArray.length)
                obstaclesArray.shift()
            }
    
    })
    

    
},16.66)






/********************************Pruebas */
// console.log("horizontal position...", player.positionX)

// player.moveLeft();
// player.moveRight();
// player.moveRight();
// console.log("horizontal position...", player.positionX)
