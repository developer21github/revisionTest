console.log("hello worls...!")

.audio-bar-ctn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0px;
  height: 100px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 10px 1px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.1);
  .audio-bar {
    width: 100%;
    height: 100%;/*
    line-height: 85px;*/
  }
}
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,800);

$background:#f9f9f9;
$foreground:#2c3e50;

$foreground-light:#34495e;


$size:15px;
$ratio:1;

$transition-time:0.3s;

.play {
  display: inline-block;
  width: 0;
	height: 0;
	border-top: $size solid transparent;
	border-bottom: $size solid transparent;
	border-left: ($size*$ratio) solid $foreground;
  position:relative;
  z-index:1;
  transition: all $transition-time;
  -webkit-transition: all $transition-time;
  -moz-transition: all $transition-time;
  margin-right: 15px;
  margin-left: 15px;

  &:before {
    content:'';
    position:absolute;
    top:($size*-1.5);
    left:($size*-2.25);
    bottom:($size*-1.5);
    right:($size*-0.75);
    border-radius:50%;
    border: ($size*0.2) solid $foreground;
    z-index:2;
    transition: all $transition-time;
    -webkit-transition: all $transition-time;
    -moz-transition: all $transition-time;
  }
  &:after {
    content:'';
    opacity:0;
    transition: opacity ($transition-time * 2);
    -webkit-transition: opacity ($transition-time * 2);
    -moz-transition: opacity ($transition-time * 2);
  }

  &:hover, &:focus {
    &:before {
       transform: scale(1.1);
       -webkit-transform: scale(1.1);
       -moz-transform: scale(1.1);
    }
  }

  &.active {
	  border-color:transparent;
    &:after {
      content:'';
      opacity:1;
      width:($size);
      height:($size*1.6);
      background:$foreground;
      position:absolute;
      right: 3.5px;
      top: ($size*-0.8);
      border-left:($size*0.4) solid $foreground;
      border-right:($size*0.4) solid $foreground;
      box-shadow:inset ($size*0.6) 0 0 0 $background;
    }
  }
}

#volume-slider{
  align-items: center;
  display    : inline-block;
  position: relative;
  top: -10px;
  padding: 0;
  margin: 0px auto;
}
.volume-icon{
  cursor          : pointer;
  height          : 40px;
  transform       : rotate(-0deg);
  transform-origin: center left;
  width           : 40px;

  .volume-icon-bg{
    fill      : #2c3e50;
    transition: fill 300ms;
  }

  &:hover .volume-icon-bg{
    fill: #17212b;
  }

}
#circle-mask-shape{
  transform       : scale(0);
  transform-origin: center center;
}
.volume-track{
  background-color: #e1dee5;
  border-radius   : 3px;
  flex            : 1;
  height          : 4px;
  margin-left     : 5px;
  position        : relative;
}
.volume-indicator{
  background-color: #6eaa35;
  border-radius   : 50%;
  height          : 12px;
  left            : 0;
  position        : absolute;
  top             : -4px;
  transition      : visibility 100ms, opacity 100ms;
  width           : 12px;
}


input[type="range"]{
  -webkit-appearance: none;
  -moz-apperance: none;
  border-radius: 6px;
  height: 6px;
  background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0.15, #2c3e50),
      color-stop(0.15, #C5C5C5)
  );
}
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  background-color: #E9E9E9;
  border: 1px solid #CECECE;
  height: 15px;
  width: 15px;
  border-radius: 3px;
}
input[type=range]:focus {
  outline: none;
}


@media (max-width: 500px) {
  .audio-bar-ctn {
    .audio-bar {
      transform: translateX(calc(-50% + 20px));
    }
  }
}

.audio-bar-start-stop {
  margin-top: 35px;
  margin-left: 50px;
}
.slider2{
  margin-top: 40px;
  margin-right: 60px;
}






<div class="audio-bar-ctn">
 <div class="container=fluid">
<div class="row">
  <div class="col-md-3 col-sm-3 col-xs-12">
    <div class="audio-bar">
      <a title="Play video" class="play audio-bar-start-stop" [ngClass]="{'active': !isPaused}" (click)="toggleAudioPlay()"></a>
      <div id="volume-slider">
        <!-- <svg id="volume-icon" class="volume-icon" viewBox="-1 0 33 32">
          <defs>
            <mask id="circle-mask" x="-1" y="0" width="26" height="25">
              <circle cx="-1" cy="16" r="33" fill="white" id="circle-mask-shape" />
            </mask>

            <mask id="volume-mask" x="-1" y="0" width="26" height="25">
              <path d="M22.485 25.985c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 4.094-4.094 4.094-10.755 0-14.849-0.586-0.586-0.586-1.536 0-2.121s1.536-0.586 2.121 0c2.55 2.55 3.954 5.94 3.954 9.546s-1.404 6.996-3.954 9.546c-0.293 0.293-0.677 0.439-1.061 0.439v0zM17.157 23.157c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 2.534-2.534 2.534-6.658 0-9.192-0.586-0.586-0.586-1.536 0-2.121s1.535-0.586 2.121 0c3.704 3.704 3.704 9.731 0 13.435-0.293 0.293-0.677 0.439-1.061 0.439zM13 30c-0.26 0-0.516-0.102-0.707-0.293l-7.707-7.707h-3.586c-0.552 0-1-0.448-1-1v-10c0-0.552 0.448-1 1-1h3.586l7.707-7.707c0.286-0.286 0.716-0.372 1.090-0.217s0.617 0.519 0.617 0.924v26c0 0.404-0.244 0.769-0.617 0.924-0.124 0.051-0.254 0.076-0.383 0.076z" fill="white" mask="url(#circle-mask)"></path>
            </mask>

            <linearGradient id="grad-1" x1="0" x2="1" y1="0" y2="0">
              <stop offset="20%" stop-color="#9a88aa" />
              <stop offset="100%" stop-color="#6e33a5" />
            </linearGradient>
          </defs>

          <path class="volume-icon-bg" fill="#cbc8ce" d="M22.485 25.985c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 4.094-4.094 4.094-10.755 0-14.849-0.586-0.586-0.586-1.536 0-2.121s1.536-0.586 2.121 0c2.55 2.55 3.954 5.94 3.954 9.546s-1.404 6.996-3.954 9.546c-0.293 0.293-0.677 0.439-1.061 0.439v0zM17.157 23.157c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 2.534-2.534 2.534-6.658 0-9.192-0.586-0.586-0.586-1.536 0-2.121s1.535-0.586 2.121 0c3.704 3.704 3.704 9.731 0 13.435-0.293 0.293-0.677 0.439-1.061 0.439zM13 30c-0.26 0-0.516-0.102-0.707-0.293l-7.707-7.707h-3.586c-0.552 0-1-0.448-1-1v-10c0-0.552 0.448-1 1-1h3.586l7.707-7.707c0.286-0.286 0.716-0.372 1.090-0.217s0.617 0.519 0.617 0.924v26c0 0.404-0.244 0.769-0.617 0.924-0.124 0.051-0.254 0.076-0.383 0.076z"></path>

          <rect x="-1" y="0" width="33" height="32" mask="url(#volume-mask)" fill="url(#grad-1)" />
        </svg> -->
        <input type="range" class="audio-bar-add" #volume min="1" max="100" step="1" value="15" (change)="changeVolume(volume.value)">


    </div>
  </div></div>
  <div class="col-md-9 col-sm-9 col-xs-12">
    <div class="progress slider2">
      <div class="progress-bar" role="progressbar" aria-valuenow="50"
           aria-valuemin="0" aria-valuemax="100" style="width:50%">
        <span class="sr-only">70% Complete</span>
      </div>
    </div>

  </div>
</div>
 </div>
</div>
