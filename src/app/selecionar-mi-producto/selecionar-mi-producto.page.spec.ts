import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelecionarMiProductoPage } from './selecionar-mi-producto.page';

describe('SelecionarMiProductoPage', () => {
  let component: SelecionarMiProductoPage;
  let fixture: ComponentFixture<SelecionarMiProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionarMiProductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelecionarMiProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
