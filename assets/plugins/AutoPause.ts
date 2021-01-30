import MediaPlayer from '../MediaPlayer';

class AutoPause {
    private threshold: number;
    player: MediaPlayer;
    
    constructor(){
        this.threshold = 0.25
        this.handleIntersection = this.handleIntersection.bind(this)//Mantener el this a la instancia del plugin y no al objeto que la usa, en este caso window 
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
    }
    run(player){
        this.player = player
        const observer = new IntersectionObserver(this.handleIntersection, {
            threshold: this.threshold //umbral del objeto en el contenedor para realizar el aviso, si ha pasado
            //el umbral dejando el video este avisara y si se acerca al umbral llegando al video tambien avisara, en este caso 25%     
        })
        //API del DOM para observar la posición a la quee sta el observador
        //Primer elemento un handler que avisa una intersección del elemento observado y 
        //el segundo un elemento de configuracion
        observer.observe(this.player.media)//el observador empezara a observar el media, siendo el contenedor la pantalla
        document.addEventListener("visibilitychange", this.handleVisibilityChange)// metodo para saber si el usuario
        //se encuentra en la pestaña(sitio web) o no.
    }
    private handleIntersection(entries: IntersectionObserverEntry[]){//handler hecho un metodo para ser agregado a la clase, recibe los entries u objetos a observar
        const entry = entries[0]// entry unico en la lista
        
        const isVisible = entry.intersectionRatio >= this.threshold;

        if (isVisible){
            this.player.play()
        }
        else{
            this.player.pause()
        }
    }
    private handleVisibilityChange(){
        const isVisible = document.visibilityState ===  "visible";
        
        if (isVisible){
            this.player.play()
        }
        else{
            this.player.pause()
        }
    }
}

export default AutoPause