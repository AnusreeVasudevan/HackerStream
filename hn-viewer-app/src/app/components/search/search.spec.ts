import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Search } from './search';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [Search]
    }).compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search query', () => {
    spyOn(component.search, 'emit');
    component.query = 'Angular';
    component.submit();
    expect(component.search.emit).toHaveBeenCalledWith('Angular');
  });
});
