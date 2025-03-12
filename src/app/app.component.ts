import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'rm-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    NgOptimizedImage
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  static readonly title: string = 'Richard McLauchlan';
}
