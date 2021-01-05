function AutoPlay(){

}
AutoPlay.prototype.run = function(player){
    player.mute()//Exepcion para dr autoplay a un video, este debe estar mudo
    player.play();
}

export default AutoPlay;