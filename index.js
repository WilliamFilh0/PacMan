const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//sets the canvas size
canvas.width = innerWidth
canvas.height = innerWidth

//sets the limit
class Boundary {
  constructor({ position }) {
    this.position = position
    this.width = 40
    this.height = 40
  }

  //draw a filled rectangle on the canvas
  draw() {
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const map = [
  
]


map.forEach((row, i )  => {
  row.forEach((symbol, j) => {
    console.log(symbol)
    switch(symbol){
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x:40 * j,
              y:40 * i
            }
          })
        )
        break
    }
  })
})


boundaries.forEach(boundary => {
  boundary.draw();
});






//27:03