import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'rm-the-indefinable-school-popup',
  templateUrl: './the-indefinable-school.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  styleUrl: '../serious-minds/serious-minds.component.scss'
})
export class TheIndefinableSchoolComponent implements OnInit {
  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle(`The Indefinable School (coming soon!) - ${AppComponent.title}`);
  }
}
