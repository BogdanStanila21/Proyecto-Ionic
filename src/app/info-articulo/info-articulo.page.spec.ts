import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoArticuloPage } from './info-articulo.page';

describe('InfoArticuloPage', () => {
  let component: InfoArticuloPage;
  let fixture: ComponentFixture<InfoArticuloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoArticuloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoArticuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
