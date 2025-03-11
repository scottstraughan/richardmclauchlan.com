import { afterNextRender, AfterViewInit, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { take, tap } from 'rxjs';
import { PopupService } from '../shared/popup/popup.service';
import { SeriousMindsComponent } from './popups/books/serious-minds/serious-minds.component';
import { TheBagpipesComponent } from './popups/books/the-bagpipes/the-bagpipes.component';
import { TheIndefinableSchoolComponent } from './popups/books/the-indefinable-school/the-indefinable-school.component';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'rm-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly bgImage: WritableSignal<string> = signal('./assets/books/serious-minds.webp');
  readonly messageSent: WritableSignal<boolean> = signal(false);

  constructor(
    private popupService: PopupService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    this.activatedRoute.queryParams
      .pipe(
        tap(params => {
          if (params['sent'] == "yes") {
            this.messageSent.set(true);
          }
        })
      )
      .subscribe()

    this.activatedRoute.params
      .pipe(
        tap(params => {
          if (params['bookName']) {
            setTimeout(() =>
              this.showBook(params['bookName']));
          }
        }),
      )
      .subscribe();
  }

  onMouseOver(image: string) {
    this.bgImage.set(image);
  }

  private showBook(bookName: string) {
    let obs = undefined;

    if (bookName == 'serious-minds') {
      obs = this.popupService.show(SeriousMindsComponent);
    } else if (bookName == 'the-bagpipes') {
      obs = this.popupService.show(TheBagpipesComponent);
    } if (bookName == 'the-indefinable-school') {
      obs = this.popupService.show(TheIndefinableSchoolComponent);
    }

    if (obs) {
      obs.onClose()
        .pipe(
          tap(() => {
            this.title.setTitle('Richard McLauchlan (Author)');

            this.router.navigate(['/'])
              .then();
          }),
          take(1)
        )
        .subscribe();
    }
  }
}
