
import MediaPlayer from '../MediaPlayer'
//Al darle sobre la función la convertimos en una clase
class AutoPlay {
    constructor() {
    }
    run(player: MediaPlayer) {
        if(!player.media.muted){
            player.media.muted = true; //Exepcion para dr autoplay a un video, este debe estar mudo
        }
        player.play();
    }
}

export default AutoPlay;