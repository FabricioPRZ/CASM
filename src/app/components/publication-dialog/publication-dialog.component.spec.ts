import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationDialogComponent } from './publication-dialog.component';

describe('PublicationDialogComponent', () => {
  let component: PublicationDialogComponent;
  let fixture: ComponentFixture<PublicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
