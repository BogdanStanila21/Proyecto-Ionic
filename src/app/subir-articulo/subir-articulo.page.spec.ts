import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubirArticuloPage } from './subir-articulo.page';

describe('SubirArticuloPage', () => {
  let component: SubirArticuloPage;
  let fixture: ComponentFixture<SubirArticuloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirArticuloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubirArticuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
