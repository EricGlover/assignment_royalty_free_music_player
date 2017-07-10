var player;
$(document).ready(function() {
  player = new Player();
  player.play(4);
  player.setup_click_listeners();
});


Player = function() {
  var urls = [
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_01_-_Simple_Pleasures.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_02_-_Dead_Disco.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_04_-_Fifteen.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_05_-_Garble_House.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_06_-_Lulla_Bye.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_07_-_Micro_Love.mp3',      //getting an error with this one
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_08_-_Okiirobo_Navigation_System.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_09_-_Satori.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_10_-_Sprite_Heart_Bleeds_No_More.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_11_-_Static_Minimal.mp3'
  ]
  var titles = [
    'Simple Pleasures',
    'Dead Disco',
    'Fifteen',
    'Garble House',
    'Lulla Bye',
    'Micro Love',
    'Okiirobo Navigation System',
    'Satori',
    'Sprite Heart Bleeds No More',
    'Static Minimal'
  ]
  this.tracks = urls.map( function(string, i) {
    var audio = new Audio(string);
    var track = {
      'audio': audio,
      'title': titles[i],
      'format': '.mp3',
      'artist': 'Henry Homesweet'
    }
    return track;
  })

  //make the track elements

  this.$tracks = this.tracks.map( function( element, i ) {

    var $wrapper = $("<div></div>")
      .addClass("track")
      .addClass('off')

    //$wrapper.on("click", this.)

      //create our play button
    var $play = $("<button></button>")
      .addClass("btn play-button")
      .appendTo( $wrapper );

    var $span = $("<span></span>")
      .addClass("glyphicon")
      .addClass("glyphicon-play")
      .appendTo( $play );


      //create our song info
    var $info = $("<div></div>")
      .addClass("track-info")
      .appendTo( $wrapper );

    var $title = $("<p></p>")
      .addClass("track-title")
      .text( element['title'] )
      .appendTo( $info );

    var $artist = $("<p></p>")
      .addClass("track-artist")
      .text( element['artist'] )
      .appendTo( $info );


    //$wrapper.before( $( "#play-bar") )
    $( "#play-bar" ).before( $wrapper )
    return $wrapper
  })
/*
      <div class="track">
        <button class="btn play-button"><span class="glyphicon glyphicon-play"></span></button>
        <div class="track-info">
          <p class="track-title">Dank</p>
          <p class="track-artist">Memez</p>
        </div>
      </div>
*/
  //display them

  //this is the audio file
  this.now_playing = this.tracks[0]['audio'];

  //play next song
  this.next = function(){
    //console.log("NEXT SONG PLZ")
    var _this = window.player;
    console.log(_this)
    var index = _this.get_track_index( _this.now_playing ) + 1
    if ( _this.tracks.length < index ){
      index = 0;
    }
    _this.play( index );
  }
  //play previous song
  this.previous = function(){
    var _this = window.player;
    var index = _this.get_track_index( _this.now_playing ) - 1
    if ( index < 0 ){
      index = 0;
    }
    _this.play( index );
  }

  //start a specific song
  this.play = function(index){
    var _this = window.player;

    //stop the last track
    this.now_playing.pause()
    player.now_playing.currentTime = 0;

    //change the buttons

    //update the play-bar

    _this.tracks[index]['audio'].play();
    _this.now_playing = _this.tracks[index]['audio'];
    _this.now_playing.addEventListener('ended', _this.next, "once")

  }
  //pause song
  this.pause = function(){
    var _this = window.player;
    _this.now_playing.pause();
  }
  //resume playing
  this.resume = function(){
    var _this = window.player;
    _this.now_playing.play();
  }
  this.get_track_index = function( song ) {
    var _this = window.player;
    for( var i = 0; i < _this.tracks.length; i++){
      if ( _this.tracks[i]['audio'] == _this.now_playing['audio'] ){
        return i;
      }
    }
  }

  //setup click listeners
    //do to
  this.setup_click_listeners = function(){
    //console.log(this)
    this.$tracks.forEach( function( $track, i ){
        $track.on("click", function( e ){
            var _this = window.player;
            //console.log( $track )
            _this.clicked( e, $track )
            //_this.play( $track )
        })
    })
  }
  this.clicked = function( e, $track ){
    console.log( e );
    console.log( $track );
    console.log( this )
    //set $track to playing

    //match the track
    var index = 0;
    for( var i = 0; i < this.$tracks.length; i++ ){
      if ( this.$tracks[i] == $track ){
        index = i;
        break;
      }
    }

    //play the track
    this.play( index );
  }



}
