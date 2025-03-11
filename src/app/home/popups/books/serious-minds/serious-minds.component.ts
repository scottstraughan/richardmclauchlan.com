import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'rm-serious-minds-popup',
  templateUrl: './serious-minds.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  styleUrl: './serious-minds.component.scss'
})
export class SeriousMindsComponent implements OnInit {
  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle(`Serious Minds - ${AppComponent.title}`);
  }
}
