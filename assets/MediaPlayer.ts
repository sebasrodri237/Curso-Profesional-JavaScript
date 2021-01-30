class MediaPlayer {
    media: HTMLMediaElement; // media sera de este tipo
    plugins : Array<any>;
    constructor(config) {

        this.media = config.el; //Especificando quien sera el this.media, en este caso video
        this.plugins = config.plugins || []; // Establecer plugins e inicializarlos
        this.initPlugins(); //Invocación del metodo para iniciarlizar plugins
    }
    //en realidad es un objeto y pasamos su herencia prototipal
    private initPlugins() {
        this.plugins.forEach(plugin => {
            plugin.run(this); //Para cada plugin, lo que hara sera correrlo(pudo ser cualquier nombre no solo run) enviando la instancia (el video y su info)
        });
    }
    play() {
        this.media.play(); // El metodo reproduce al HTMLMediaElement(al video)
    }
    pause() {
        this.media.pause(); // El metodo pausa al HTMLMediaElement(al video)
    }
    tooglePlay() {

        if (this.media.paused) {
            this.play();
        }
        else {
            this.pause();
        } // El metodo pausa al HTMLMediaElement(al video)
    }
    mute() {
        this.media.muted = true;
    }
    unmute() {
        this.media.muted = false;
    }
    toogleMute() {

        if (this.media.muted) {
            this.unmute();
        }
        else {
            this.mute();
        } // El metodo pausa al HTMLMediaElement(al video)
    }
} //Clase (recordar que en JS no hay clases)


export default MediaPlayer;