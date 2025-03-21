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
  @ViewChild('target', { static: true }) target!: ElementRef;
  @ViewChild('progressBar', { static: true }) progressBar!: ElementRef;
  @ViewChild('innerProgress', { static: true }) innerProgress!: ElementRef;
  videoId: string | null = null;
  router = inject(Router);
  apiService = inject(ApiService);
  token: string | null = sessionStorage.getItem('token');
  player: any;
  videoJSON: any;

  constructor(private route: ActivatedRoute) { }

  /** Stores the videoId from URL-param in a variable and starts the database request. */
  async ngOnInit(): Promise<void> {
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

  /** Initializes the Player. */
  initializePlayer() {
    this.player = videojs(this.target.nativeElement, {
      sources: [{ src: this.videoJSON.original_file, type: 'video/mp4' }],
      controls: false,
      autoplay: true,
      fluid: true
    });
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

  /** Play button Logic */
  changePlayState() {
    if(this.player.paused()) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
}
