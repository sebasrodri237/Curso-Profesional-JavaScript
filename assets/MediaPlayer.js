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
MediaPlayer.prototype.tooglePlay = function(){//Metodo pausa/reproducir segun propiedad paused
    if(this.media.paused){
        this.play();
    }
    else{
        this.pause();
    }// El metodo pausa al HTMLMediaElement(al video)
}
export default MediaPlayer;