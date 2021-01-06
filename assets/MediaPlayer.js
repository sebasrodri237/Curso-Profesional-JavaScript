function MediaPlayer(config){// Recibe un objeto de configuración

    this.media = config.el//Especificando quien sera el this.media, en este caso video
    this.plugins = config.plugins || [];// Establecer plugins e inicializarlos
    this._initPlugins();//Invocación del metodo para iniciarlizar plugins
} //Clase (recordar que en JS no hay clases)
//en realidad es un objeto y pasamos su herencia prototipal

MediaPlayer.prototype._initPlugins = function(){
    this.plugins.forEach(plugin => {
        plugin.run(this);//Para cada plugin, lo que hara sera correrlo(pudo ser cualquier nombre no solo run) enviando la instancia (el video y su info)
    });
}

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
MediaPlayer.prototype.mute = function(){
    this.media.muted = true; 
}
MediaPlayer.prototype.unmute = function(){
    this.media.muted = false; 
}
MediaPlayer.prototype.toogleMute = function(){//Metodo mutear/no mutear segun propiedad muted
    
    if(this.media.muted){
        this.unmute();
    }
    else{
        this.mute();
    }// El metodo pausa al HTMLMediaElement(al video)
}
export default MediaPlayer;