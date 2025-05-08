import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'rm-the-bagpipes-popup',
  templateUrl: './the-bagpipes.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  styleUrls: [
    '../serious-minds/serious-minds.component.scss',
    '../the-bagpipes/the-bagpipes.component.scss'
  ]
})
export class TheBagpipesComponent implements OnInit {
  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle(`The Bagpipes (coming soon!) - ${AppComponent.title}`);

  }
}
