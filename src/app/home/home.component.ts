import {
  afterNextRender,
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { take, tap } from 'rxjs';
import { PopupService } from '../shared/popup/popup.service';
import { SeriousMindsComponent } from './popups/books/serious-minds/serious-minds.component';
import { TheBagpipesComponent } from './popups/books/the-bagpipes/the-bagpipes.component';
import { TheIndefinableSchoolComponent } from './popups/books/the-indefinable-school/the-indefinable-school.component';
import { isPlatformBrowser, isPlatformServer, NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { HaldaneComponent } from './popups/books/haldane/haldane.component';

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
      .subscribe();

    this.activatedRoute.params
      .pipe(
        tap(params => {
          if (params['bookName']) {
            this.showBook(params['bookName']);
          }
        }),
      )
      .subscribe();
  }

  private showBook(bookName: string) {
    let obs = undefined;

    if (bookName == 'serious-minds') {
      obs = this.popupService.show(SeriousMindsComponent);
    } else if (bookName == 'the-bagpipes') {
      obs = this.popupService.show(TheBagpipesComponent);
    } if (bookName == 'the-indefinable-school') {
      obs = this.popupService.show(TheIndefinableSchoolComponent);
    } if (bookName == 'haldane') {
      obs = this.popupService.show(HaldaneComponent);
    }

    if (obs) {
      obs.onClose()
        .pipe(
          tap(() => {
            this.title.setTitle(AppComponent.title);
            this.router.navigate(['/']).then();
          }),
          take(1)
        )
        .subscribe();
    }
  }
}
