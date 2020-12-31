
      const video = document.querySelector("video")// Toma el primer elemento que coincida con
      //lo especificado, prefiero usar getElementsByClassName
      const button = document.querySelector("button")
      // prefiero usar getElementsById
      
      function MediaPlayer(config){// Recibe un objeto de configuración

        this.media = config.el//Especificando quien sera el this.media, en este caso video
      } //Clase (recordar que en JS no hay clases)
      //en realidad es un objeto y pasamos su herencia prototipal

      MediaPlayer.prototype.play = function(){//Metodo play de los objetos MediaPlayer
        this.media.play(); // El metodo reproduce al HTMLMediaElement(al video)
      }

      MediaPlayer.prototype.pause = function(){//Metodo pausa de los objetos MediaPlayer
        this.media.pause(); // El metodo pausa al HTMLMediaElement(al video)
      }

      const player = new MediaPlayer({el: video});// Objeto de tipo MediaPlayer que se crea recibiendo un objeto
      
      button.onclick = () => { //Arrow function para reproducir y pausar el video
        if(player.media.paused){
          player.play();
        }else{
          player.pause();
        }
      } // Cuando se de click, el objeto
      // player ejecuta su metodo play, que ejecuta el metodo play de los HTMLMediaElement
      
      //del DOM tiene una API, en este caso un metodo de API de los video es play</script>
