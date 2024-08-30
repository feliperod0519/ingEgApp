import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngEgComponent } from './ing-eg.component';

describe('IngEgComponent', () => {
  let component: IngEgComponent;
  let fixture: ComponentFixture<IngEgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngEgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngEgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
