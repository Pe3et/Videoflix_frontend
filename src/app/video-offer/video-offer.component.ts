import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-offer',
  imports: [FooterComponent, CommonModule],
  templateUrl: './video-offer.component.html',
  styleUrl: './video-offer.component.sass'
})
export class VideoOfferComponent {

}
