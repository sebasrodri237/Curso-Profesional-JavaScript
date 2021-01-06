import MediaPlayer from './MediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js'//Plugin que crearemos para hacer autoplay

const video = document.querySelector("video")// Toma el primer elemento que coincida con
//lo especificado, prefiero usar getElementsByClassName
const button = document.getElementById("playButton")
// prefiero usar getElementsById
const buttonMute = document.getElementById("muteButton")

const player = new MediaPlayer({el: video, plugins: [//new AutoPlay()
]});// Objeto de tipo MediaPlayer que se crea recibiendo un objeto

button.onclick = () => player.tooglePlay() //Arrow function para reproducir y pausar el video
buttonMute.onclick = () => player.toogleMute()
     // Cuando se de click, el objeto
// player ejecuta su metodo play, que ejecuta el metodo play de los HTMLMediaElement

//del DOM tiene una API, en este caso un metodo de API de los video es play</script>