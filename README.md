


# Proy01angular
Este sistema de gestión empresarial en Angular está diseñado para administrar eficientemente la contabilidad, los recursos humanos y la planificación de recursos empresariales de una organización. Proporciona herramientas para la contabilidad financiera, gestión de nóminas, administración de personal, gestión de inventario y procesos de compra y venta.

Características
Módulo de Contabilidad
Registro y seguimiento de transacciones.
Generación de informes financieros (balance general, estado de resultados, etc.).
Gestión de cuentas por pagar y por cobrar.
Herramientas de reconciliación bancaria.
Módulo de Recursos Humanos
Administración de información de empleados.
Gestión de nóminas y pagos.
Herramientas de seguimiento de asistencia y tiempo laborado.
Proceso de reclutamiento y selección.
Módulo ERP
Gestión y seguimiento de inventarios.
Procesos de compra y venta.
Integración con módulos de contabilidad y recursos humanos para flujo de información unificado.
Herramientas de análisis y proyección de demanda.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


i  deploying hosting
i  hosting[tuvistazossr]: beginning deploy...
i  hosting[tuvistazossr]: found 73 files in dist/AppTuVistazoWeb/browser
+  hosting[tuvistazossr]: file upload complete
i  hosting[tuvistazossr]: finalizing version...
+  hosting[tuvistazossr]: version finalized
i  hosting[tuvistazossr]: releasing new version...
+  hosting[tuvistazossr]: release complete

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/tuvistazossr/overview
Hosting URL: https://tuvistazossr.web.app


Remove-Item -Recurse -Force .\functions\dist
Copy-Item -Recurse .\dist .\functions\    
npm run build:ssr