import { Component, OnInit, Input } from '@angular/core';

declare var $:any;

@Component({
  selector: 'audio-bar',
  templateUrl: './audio-bar.component.html',
  styleUrls: ['./audio-bar.component.scss']
})
export class AudioBarComponent implements OnInit {
  @Input() audioSrc: any = '../../assets/audio/ANIELLO - Nano (Original Mix) -- Future House.mp3';
  audio: any = new Audio();
  isPaused: any = true;

  constructor() { }

  ngOnInit() {
    $('input[type="range"]').change(function () {
        var val:any = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

        $(this).css('background-image',
                    '-webkit-gradient(linear, left top, right top, '
                    + 'color-stop(' + val + ', #2c3e50), '
                    + 'color-stop(' + val + ', #C5C5C5)'
                    + ')'
                    );
    });

    if (this.audioSrc) {
      this.audio.src = this.audioSrc;
      this.audio.load();
      // this.audio.play();
      // this.isPaused = false;
      this.audio.volume = 0.15;
    }
  }

  toggleAudioPlay() {
    this.isPaused = !this.isPaused;
    if (this.audioSrc && this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  changeVolume(value) {
    this.audio.volume = (value * 0.01);
  }
}
