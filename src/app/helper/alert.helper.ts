import { Injectable } from '@angular/core';

export type typeAlert = 'success' | 'warning' | 'error';

export const MESSAGE_ERROR = 'Ocurrió un error al procesar su solicitud. Inténtelo nuevamente.';
export const NOT_FOUND = 'No se encontraron resultados a su búsqueda. Inténtelo nuevamente.';

declare const $: any; // AdminLTE Toasts usa jQuery

@Injectable({ providedIn: 'root' })
export class AlertHelper {
  private mapToAdminlteClass(type: typeAlert): string {
    switch (type) {
      case 'success':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'error':
      default:
        return 'bg-danger';
    }
  }

  private mapTitle(type: typeAlert): string {
    switch (type) {
      case 'success':
        return 'OK';
      case 'warning':
        return 'Atención';
      case 'error':
      default:
        return 'Error';
    }
  }

  private showToast(message: string, type: typeAlert = 'success', delay = 3000): void {
    // Si AdminLTE/jQuery no está disponible, fallback a console
    if (typeof $ === 'undefined' || !$('.toastsDefaultTopRight').length && !$.fn?.Toasts) {
      console[type === 'error' ? 'error' : 'log'](message);
      return;
    }

    // AdminLTE Toasts
    $(document).Toasts('create', {
      class: this.mapToAdminlteClass(type),
      title: this.mapTitle(type),
      body: message,
      autohide: true,
      delay: delay,
      position: 'topRight',
      // icon opcional:
      // icon: 'fas fa-check fa-lg'
    });
  }

  /** Uso general */
  notify(message: string, type: typeAlert = 'success', duration = 3000): void {
    this.showToast(message, type, duration);
  }

  notifyError(message: string, type: typeAlert = 'warning', duration = 3000): void {
    this.showToast(message, type, duration);
  }

  /** Errores HTTP comunes */
  error(code: number = 500): void {
    switch (code) {
      case 401:
        this.notify('Requiere autorización para esta operación.', 'warning');
        break;
      case 403:
        this.notify('No tiene permisos suficientes.', 'warning');
        break;
      case 404:
        this.notify('No se encontró la información solicitada.', 'warning');
        break;
      case 500:
      default:
        this.notify('Ocurrió un error inesperado. Inténtelo más tarde.', 'error', 3000);
        break;
    }
  }

  /** Formulario inválido */
  formInvalid(): void {
    this.notify('El formulario contiene errores. Verifica los campos.', 'warning');
  }
}
