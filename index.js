const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = innerWidth 
canvas.height = innerWidth 


class Boundary{
  constructor({position} ){
    this.position = position
    this.width = 40
    this.height = 40
  }

  //draw a filled rectangle on the canvas
  draw(){
    c.fillStyle = 'blue'
    c.fillRect (this.position.x,this.position.y,this.width,this.height)
  }
}

