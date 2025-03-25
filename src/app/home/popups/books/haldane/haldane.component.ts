import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'rm-the-bagpipes-popup',
  templateUrl: './haldane.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  styleUrl: '../serious-minds/serious-minds.component.scss'
})
export class HaldaneComponent implements OnInit {
  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle(`Haldane - ${AppComponent.title}`);
  }
}
