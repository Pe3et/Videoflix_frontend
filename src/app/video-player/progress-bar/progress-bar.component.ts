import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.sass'
})
export class ProgressBarComponent {
  @Input() currentValue: number = 0;
  @Input() maxValue: number = 100;
  progressPercentage: number = 0;

  ngOnChanges() {
    this.progressPercentage = (this.currentValue / this.maxValue) * 100
  }
}
