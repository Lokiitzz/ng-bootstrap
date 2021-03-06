import {TestBed, ComponentFixture} from '@angular/core/testing';

import {NgbModalWindow} from './modal_window';
import {ModalDismissReasons} from './modal_dismiss_reasons';

describe('ngb-modal-dialog', () => {

  let fixture: ComponentFixture<NgbModalWindow>;

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [NgbModalWindow]});
    fixture = TestBed.createComponent(NgbModalWindow);
  });

  describe('basic rendering functionality', () => {

    it('should render default modal window', () => {
      fixture.detectChanges();

      const modalEl: Element = fixture.nativeElement;
      const dialogEl: Element = fixture.nativeElement.querySelector('.modal-dialog');

      expect(modalEl).toHaveCssClass('modal');
      expect(dialogEl).toHaveCssClass('modal-dialog');
    });

    it('should render default modal window with a specified size', () => {
      fixture.componentInstance.size = 'sm';
      fixture.detectChanges();

      const dialogEl: Element = fixture.nativeElement.querySelector('.modal-dialog');
      expect(dialogEl).toHaveCssClass('modal-dialog');
      expect(dialogEl).toHaveCssClass('modal-sm');
    });
  });

  describe('dismiss', () => {

    it('should dismiss on backdrop click by default', (done) => {
      fixture.detectChanges();

      fixture.componentInstance.dismissEvent.subscribe(($event) => {
        expect($event).toBe(ModalDismissReasons.BACKDROP_CLICK);
        done();
      });

      fixture.nativeElement.querySelector('.modal-dialog').click();
    });

    it('should ignore backdrop clicks when configured to do so', (done) => {
      fixture.componentInstance.backdrop = false;
      fixture.detectChanges();

      fixture.componentInstance.dismissEvent.subscribe(($event) => {
        expect($event).toBe(ModalDismissReasons.BACKDROP_CLICK);
        done(new Error('Should not trigger dismiss event'));
      });

      fixture.nativeElement.querySelector('.modal-dialog').click();
      setTimeout(done, 200);
    });

    it('should dismiss on esc press by default', (done) => {
      fixture.detectChanges();

      fixture.componentInstance.dismissEvent.subscribe(($event) => {
        expect($event).toBe(ModalDismissReasons.ESC);
        done();
      });

      fixture.debugElement.triggerEventHandler('keyup.esc', {});
    });
  });

});
