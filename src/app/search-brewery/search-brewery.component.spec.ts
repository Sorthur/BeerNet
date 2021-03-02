import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBreweryComponent } from './search-brewery.component';

describe('SearchBreweryComponent', () => {
  let component: SearchBreweryComponent;
  let fixture: ComponentFixture<SearchBreweryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBreweryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBreweryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
