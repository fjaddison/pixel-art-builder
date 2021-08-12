const root = document.querySelector('svg')

var pixelBoardDimensions = 32

const colors = ['#18470C', '#319C28', '#DEB03B', '#D68431', '#BB422B', '#4F210F', '#FFD79F', '#FFFFFF', '#000000']

var colorIndex = 0
var colorChoice = colors[colorIndex]

var randMatrix = []

for (i = 0; i < 900; i++) {
    randMatrix.push(Math.floor(Math.random() * 4))
}

var x =  0
var y = 0

const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
root.appendChild(svgContainer)
svgContainer.setAttribute('height', `${pixelBoardDimensions * 3}`)
svgContainer.setAttribute('width', `${pixelBoardDimensions * 3}`)
svgContainer.setAttribute('class', 'download-container')

for (i = 0; i < Math.pow(pixelBoardDimensions, 2); i++) {
    let pixel = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    pixel.setAttribute('x', x)
    pixel.setAttribute('y', y)
    pixel.setAttribute('width', '3')
    pixel.setAttribute('height', '3')
    pixel.setAttribute('fill', '#FFD79F')
    // pixel.setAttribute('fill', colors[randMatrix[i]])
    x += 3
    if (x == pixelBoardDimensions * 3) {
        x = 0
        y += 3
    }
    svgContainer.appendChild(pixel)
}

const palette = document.querySelector('.palette')

// code to fill the background of the palette squares to the colors in the colors array
const paletteSquares = document.querySelectorAll('input[type="color"]')
for (i = 0; i < colors.length; i++) {
    paletteSquares[i].value = colors[i]
}

paletteSquares[0].style.backgroundColor = 'rgba(0,0,0,0.4)'

colorCircle = document.querySelector('.color-choice-circle')
colorCircle.style.backgroundColor = colorChoice

const changeColor = e => {
    colorChoice = e.target.value
    colorIndex = parseInt(e.target.id[e.target.id.length - 1]) - 1
    colorCircle.style.backgroundColor = e.target.value
    paletteSquares.forEach(x => {
        if (x == e.target) {
            x.style.backgroundColor = 'rgba(0,0,0,0.4)'
        } else if (x != e.target) {
            x.style.backgroundColor = 'white'
        }
    })

}

paletteSquares.forEach(ps => {
    ps.addEventListener('click', changeColor)
    ps.addEventListener('change', changeColor)
})

const pixels = document.querySelectorAll('rect')

pixels.forEach(x => {
    x.addEventListener('click', e => {
        e.target.setAttribute('fill', colorChoice)
    })
})

const clearButton = document.querySelector('#clear-btn')

clearButton.addEventListener('click', _ => {
    // pixels.forEach(p => p.setAttribute('fill', colors[0]))
    pixels.forEach(p => p.setAttribute('fill', '#FFD79F'))
})

document.body.addEventListener('keydown', e => {
    if (e.key == 'ArrowRight') {
        colorIndex == 3 ? colorIndex = 0 : colorIndex += 1
    }
    if (e.key == 'ArrowLeft') {
        colorIndex == 0 ? colorIndex = 3 : colorIndex -= 1
    }
    colorChoice = colors[colorIndex]
    colorCircle.style.backgroundColor = colorChoice
    paletteSquares.forEach(ps => {
        if (ps == paletteSquares[colorIndex]) {
            ps.style.backgroundColor = 'rgba(0,0,0,0.4)'
        } else if (ps != paletteSquares[colorIndex]) {
            ps.style.backgroundColor = 'white'
        }
    })
})
