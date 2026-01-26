import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Inicializa entorno de pruebas
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true }
  }
);

// 👇 Importa tus pruebas manualmente aquí
import './app/main/ayudasocial/components/modal-create-socialhelppost/modal-create-socialhelppost.component.spec';
import './app/main/alquiler/components/modal-create-rentpost/modal-create-rentpost.component.spec';
import './app/main/myprofile/myposts/myposts.component.spec';
import './app/main/myprofile/myfavorites/myfavorites.component.spec';
import './app/main/myprofile/tyc/tyc.component.spec';
import './app/main/alquiler/alquiler.component.spec';
import './app/main/suscription/suscription.component.spec';
import './app/app.component.spec';
// Agrega más archivos si tienes otras pruebas
