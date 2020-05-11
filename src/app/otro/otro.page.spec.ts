import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtroPage } from './otro.page';

describe('OtroPage', () => {
  let component: OtroPage;
  let fixture: ComponentFixture<OtroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
