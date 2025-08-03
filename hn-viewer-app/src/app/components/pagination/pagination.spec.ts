import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagination } from './pagination';

describe('Pagination', () => {
  let component: Pagination;
  let fixture: ComponentFixture<Pagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit next page', () => {
    spyOn(component.pageChange, 'emit');
    component.page = 1;
    component.next();
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should emit previous page', () => {
    spyOn(component.pageChange, 'emit');
    component.page = 2;
    component.prev();
    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should not emit previous when on first page', () => {
    spyOn(component.pageChange, 'emit');
    component.page = 1;
    component.prev();
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });
});
