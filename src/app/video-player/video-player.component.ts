import { Component, ElementRef, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import videojs from 'video.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-player',
  imports: [RouterLink, CommonModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.sass', '../../../node_modules/video.js/dist/video-js.css'],
  encapsulation: ViewEncapsulation.None
})

export class VideoPlayerComponent {
  @ViewChild('videoJSPlayer', { static: true }) videoJSPlayer!: ElementRef;
  @ViewChild('seekBarContainer', { static: true }) seekBarContainer!: ElementRef;
  @ViewChild('volumeElement', { static: true }) volumeElement!: ElementRef;
  videoId: string | null = null;
  router = inject(Router);
  apiService = inject(ApiService);
  token: string | null = sessionStorage.getItem('token');
  player: any;
  videoJSON: any;

  constructor(private route: ActivatedRoute) { }

  /** Stores the videoId from URL-param in a variable and starts the database request.
   * If tehre's no token for the request, the user get's redirected to login.
   */
  async ngOnInit(): Promise<void> {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
    else {
      this.route.paramMap.subscribe(async params => {
        this.videoId = params.get('videoID');
        if (!this.videoId) {
          this.router.navigate(['video-offer'])
        } else {
          await this.getVideo();
          this.initializePlayer()
        }
      });
    }
  }

  /** Initializes the Player and appends the custom overlay, built-in seekbar and audio-button as a child. */
  initializePlayer() {
    this.player = videojs(this.videoJSPlayer.nativeElement, {
      sources: [{ src: this.videoJSON.original_file, type: 'video/mp4' }],
      controls: false,
      autoplay: true,
      fluid: true
    });
    const overlay = document.getElementById('overlay');
    const playerContainer = this.player.el();
    playerContainer.appendChild(overlay)
    const seekBar = this.player.controlBar.progressControl.seekBar;
    const seekBarElement = seekBar.el();
    this.seekBarContainer.nativeElement.appendChild(seekBarElement);

    const existingAudioButton = this.player.controlBar.getChild('VolumePanel');
    this.player.controlBar.removeChild('VolumePanel');
    this.volumeElement.nativeElement.appendChild(existingAudioButton.el());
  }

  /** Destroys the player. */
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  /** Single GET from Database containing the video data (including links to different resolutions) */
  async getVideo(){
    this.videoJSON = await this.apiService.get('videos/' + this.videoId, this.token);
  }

  /** Play button logic. */
  togglePlayState() {
    if(this.player.paused()) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  /** If a click on the vide screen isn't in the footer area, then the play-button-logic is called. */
  videoScreenClickHandler(event: any) {
    if(event.target.closest('footer') === null) {
      this.togglePlayState()
    }
  }

  /** Fullscreen button logic. */
  toggleFullscreen() {
    if(this.player.isFullscreen()) {
      this.player.exitFullscreen();
    } else {
      this.player.requestFullscreen();
    }
  }
}
