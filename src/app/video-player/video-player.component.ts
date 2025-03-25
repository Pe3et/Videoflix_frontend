import { Component, ElementRef, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import videojs from 'video.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastMessagesService } from '../services/toast-messages.service';

@Component({
  selector: 'app-video-player',
  imports: [RouterLink, CommonModule, FormsModule],
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
  toastService = inject(ToastMessagesService);
  token: string | null = sessionStorage.getItem('token');
  player: any;
  videoJSON: any;
  selectedResolution: string = "";

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
          this.getDeviceResolution();
          this.initializePlayer()
        }
      });
    }
  }

  /** Initializes the Player and calls the fucntion to add the the overlay. */
  initializePlayer() {
    this.player = videojs(this.videoJSPlayer.nativeElement, {
      sources: [{ src: this.videoJSON['processed_' + this.selectedResolution], type: 'video/mp4' }],
      controls: false,
      autoplay: true,
      fluid: true
    });
    this.addOverlay()
  }

  /** Adds the overlay with it's control bar to the player. */
  addOverlay() {
    const overlay = document.getElementById('overlay');
    const playerContainer = this.player.el();
    playerContainer.appendChild(overlay);
    this.addSeekBar();
    this.addAudioButton()
  }

  /** Adds the seekbar to the control bar. */
  addSeekBar() {
    const seekBar = this.player.controlBar.progressControl.seekBar;
    const seekBarElement = seekBar.el();
    this.seekBarContainer.nativeElement.appendChild(seekBarElement);
  }

  /** Adds the audio button to the control bar. */
  addAudioButton() {
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

  /** Handles the manual change of resolution. */
  changeResolution(event: any): void {
    const resolution = event.target.value;
    if (this.player) {
      this.player.src({ src: this.videoJSON['processed_' + resolution], type: 'video/mp4' });
      this.toastService.showToast('Resolution successfully changed to ' + resolution + '.')
    }
  }

  /** Automaticall get's the fitting video src depending on the device-resolution. */
  getDeviceResolution() {
    const deviceResolutionHeight = window.screen.height * (window.devicePixelRatio || 1);
    if (deviceResolutionHeight >= 1080) {
      this.selectedResolution = "1080p"
    } else if (deviceResolutionHeight >= 720) {
      this.selectedResolution = "720p"
    } else if (deviceResolutionHeight >= 360) {
      this.selectedResolution = "360p"
    } else {
      this.selectedResolution = "120p"
    }
  }
}
