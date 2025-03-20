import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastMessagesService } from '../services/toast-messages.service';

interface Video {
  title: string;
  description: string;
  thumbnail: string;
  id: number;
  category: string;
  original_file: string;
  processed_120p: string;
  processed_360p: string;
  processed_720p: string;
  processed_1080p: string;
  created_at: string
}

@Component({
  selector: 'app-video-offer',
  imports: [FooterComponent, CommonModule, RouterLink],
  templateUrl: './video-offer.component.html',
  styleUrls: ['./video-offer.component.sass']
})
export class VideoOfferComponent implements OnInit {
  token: string | null = null;
  videoTitle: string | null = null;
  videoDescription: string | null = null;
  videoThumbnailPath: string | null = null;
  videoID: number | null = null;

  apiService = inject(ApiService);
  messageService = inject(ToastMessagesService);
  videosJSON: any[] = [];
  categories: string[] = []

  constructor(private router: Router) { }

  /** Checks session storage for the auth token and stores it in a variable.
   * If the token is found, it is used to populate the video offer component.
   * If there is no token, there's redirection to login page.
   */
  async ngOnInit(): Promise<void> {
    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      this.router.navigate(['/login']);
    } else {
      this.videosJSON = await this.apiService.get('videos/', this.token);
      this.setHeroVideo(this.videosJSON[0]);
      this.getCategoriesFromVideos()
    }
  }

  /** Sets the hero video based on the first video to the given video in parameter. */
  setHeroVideo(video: Video){
    this.videoTitle = video.title;
    this.videoDescription = video.description;
    this.videoThumbnailPath = video.thumbnail;
    this.videoID = video.id
    window.scrollTo({ top: 0});
  }

  /** Gets all categories present in the videosJSON and puts them into teh categories array.
   *  The purpose of this is to be able to create a row for every category.
   */
  getCategoriesFromVideos() {
    const categoriesJSON = this.videosJSON.map(video => video.category);
    const uniqueCategories = [...new Set(categoriesJSON)];
    this.categories = uniqueCategories;
  }

  /** Filters the videosJSON for a category and returns the filtered array for the video row. */
  getFilteredVideos(category: string) {
    return this.videosJSON.filter(vid => vid.category === category);
  }

  /** Opens the video player with the videoID as URL-Parameter. */
  openVideoPlayer() {
    this.router.navigate(['/video-player/' + this.videoID]);
  }
}
