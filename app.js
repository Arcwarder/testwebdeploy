var x = document.getElementById("myAudio");
    x.volume = 0.2

    function callback(){
    alert(window.orientation);
    if(window.innerHeight > window.innerWidth){
        alert("Rotate You Phone");
    }
}

window.addEventListener('orientationchange', callback, true);

const audio = document.querySelector('video')
const canvas = document.querySelector('canvas')

const ctx = canvas.getContext('2d')
const context = new AudioContext()
const analyser = context.createAnalyser()
const source = context.createMediaElementSource(audio)

const fbc_array = new Uint8Array(analyser.frequencyBinCount)

window.addEventListener('load', ()=>{
    source.connect(analyser)
    analyser.connect(context.destination)

    loop()
}, false)

function loop() {
    window.requestAnimationFrame(loop)
    analyser.getByteFrequencyData(fbc_array)

    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = `#ff0000`

    let bar_x
    let bar_width
    let bar_height
    let bars = 100

    for (let i = 0; i < bars; i++) {
        bar_x = i * 3
        bar_width = 2
        bar_height = -(fbc_array[i] / 2)
        ctx.fillRect(bar_x, canvas.height,bar_width,bar_height)
    }
}