import { ChangeDetectionStrategy, Component, ComponentRef, ElementRef, HostListener, Inject } from '@angular/core';
import { DOCUMENT, NgComponentOutlet } from '@angular/common';
import { PopupInstance } from './popup.service';

@Component({
  selector: 'rm-popup-container',
  standalone: true,
  imports: [
    NgComponentOutlet,
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent {
  /**
   * The component that is to be shown in the popup.
   * @protected
   */
  protected component: any;

  /**
   * Reference to a popup instance.
   * @protected
   */
  protected popupInstance?: PopupInstance<any>;

  /**
   * Constructor.
   * @param document
   * @param elementRef
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef
  ) { }

  /**
   * Attach a component into the popup.
   * @param popupInstance
   * @param component
   */
  attach<T>(
    popupInstance: PopupInstance<T>,
    component: ComponentRef<T>
  ) {
    this.component = component;
    this.popupInstance = popupInstance;
    this.document.body.style.overflow = 'hidden';
  }

  /**
   * Called by the user if the user clicks the close icon.
   */
  onClose() {
    this.close();
  }

  /**
   * This function is designed to close the popup if the popup container is clicked but not any component within in.
   * @param event
   */
  @HostListener('click', ['$event'])
  onClick(
    event: any
  ) {
    if (event.target.localName === this.elementRef.nativeElement.localName) {
      this.close();
    }
  }

  /**
   * Called when the user presses the escape key and closes the popup.
   * @param event
   * @private
   */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeyPressed(
    event: any
  ) {
    this.close();
  }

  /**
   * Close
   */
  private close() {
    this.popupInstance?.close();
    this.document.body.style.overflow = 'auto';
  }
}
