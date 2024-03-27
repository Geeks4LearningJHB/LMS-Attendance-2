import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAreaComponent } from './content-area.component';

describe('ContentAreaComponent', () => {
  let component: ContentAreaComponent;
  let fixture: ComponentFixture<ContentAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
