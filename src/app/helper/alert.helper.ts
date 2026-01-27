import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition, SweetAlertResult } from 'sweetalert2';

export type typeAlert = 'success' | 'warning' | 'error' | 'info' | 'question';

export const MESSAGE_ERROR = 'Ocurrió un error al procesar su solicitud. Inténtelo nuevamente.';
export const NOT_FOUND = 'No se encontraron resultados a su búsqueda. Inténtelo nuevamente.';

@Injectable({ providedIn: 'root' })
export class AlertHelper {
  private readonly defaultToastConfig = {
    timer: 3000,
    position: 'top-end' as SweetAlertPosition,
    showConfirmButton: false,
    timerProgressBar: true,
    toast: true,
    didOpen: (toast: HTMLElement) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  };

  private mapToSweetAlertIcon(type: typeAlert): SweetAlertIcon {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      case 'question':
        return 'question';
      default:
        return 'info';
    }
  }

  private mapTitle(type: typeAlert): string {
    switch (type) {
      case 'success':
        return '¡Éxito!';
      case 'warning':
        return 'Atención';
      case 'error':
        return 'Error';
      case 'info':
        return 'Información';
      case 'question':
        return 'Confirmación';
      default:
        return 'Notificación';
    }
  }

  /**
   * Mostrar notificación tipo toast
   */
  private showToast(
    message: string,
    type: typeAlert = 'success',
    delay: number = 3000
  ): void {
    Swal.fire({
      ...this.defaultToastConfig,
      icon: this.mapToSweetAlertIcon(type),
      title: this.mapTitle(type),
      text: message,
      timer: delay,
    });
  }

  /**
   * Mostrar alerta modal (más prominente)
   */
  private showAlert(
    title: string,
    message: string,
    type: typeAlert = 'info',
    confirmButtonText: string = 'Aceptar',
    cancelButtonText: string = 'Cancelar',
    showCancelButton: boolean = false
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: this.mapToSweetAlertIcon(type),
      title: title,
      text: message,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      showCancelButton: showCancelButton,
      customClass: {
        confirmButton: `btn btn-${type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'primary'}`,
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    });
  }

  /**
   * Uso general - Notificación tipo toast
   */
  notify(
    message: string,
    type: typeAlert = 'success',
    duration: number = 3000
  ): void {
    this.showToast(message, type, duration);
  }

  /**
   * Notificación de error - Toast
   */
  notifyError(
    message: string = MESSAGE_ERROR,
    type: typeAlert = 'error',
    duration: number = 5000
  ): void {
    this.showToast(message, type, duration);
  }

  /**
   * Notificación de éxito - Toast
   */
  success(message: string, duration: number = 3000): void {
    this.notify(message, 'success', duration);
  }

  /**
   * Notificación de advertencia - Toast
   */
  warning(message: string, duration: number = 4000): void {
    this.notify(message, 'warning', duration);
  }

  /**
   * Notificación de información - Toast
   */
  info(message: string, duration: number = 3000): void {
    this.notify(message, 'info', duration);
  }

  /**
   * Errores HTTP comunes - Modal
   */
  error(code: number = 500, customMessage?: string): Promise<SweetAlertResult<any>> {
    let title = 'Error';
    let message = 'Ocurrió un error inesperado. Inténtelo más tarde.';
    let type: typeAlert = 'error';

    switch (code) {
      case 401:
        title = 'No autorizado';
        message = 'Requiere autorización para esta operación.';
        type = 'warning';
        break;
      case 403:
        title = 'Acceso denegado';
        message = 'No tiene permisos suficientes.';
        type = 'warning';
        break;
      case 404:
        title = 'No encontrado';
        message = 'No se encontró la información solicitada.';
        type = 'warning';
        break;
      case 400:
        title = 'Solicitud incorrecta';
        message = 'La solicitud contiene errores.';
        type = 'warning';
        break;
      case 422:
        title = 'Datos inválidos';
        message = 'Los datos enviados no son válidos.';
        type = 'warning';
        break;
      case 500:
      default:
        title = 'Error del servidor';
        message = 'Ocurrió un error interno en el servidor.';
        type = 'error';
        break;
    }

    if (customMessage) {
      message = customMessage;
    }

    return this.showAlert(title, message, type);
  }

  /**
   * Formulario inválido - Modal
   */
  formInvalid(): Promise<SweetAlertResult<any>> {
    return this.showAlert(
      'Formulario inválido',
      'El formulario contiene errores. Verifica los campos.',
      'warning'
    );
  }

  /**
   * Confirmación (Sí/No) - Modal
   */
  confirm(
    title: string = '¿Está seguro?',
    message: string = 'Esta acción no se puede deshacer.',
    confirmButtonText: string = 'Sí, continuar',
    cancelButtonText: string = 'Cancelar',
    type: typeAlert = 'question'
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: message,
      icon: this.mapToSweetAlertIcon(type),
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false,
      reverseButtons: true
    });
  }

  /**
   * Confirmación de eliminación - Modal
   */
  confirmDelete(
    itemName?: string,
    confirmButtonText: string = 'Sí, eliminar',
    cancelButtonText: string = 'Cancelar'
  ): Promise<SweetAlertResult<any>> {
    const message = itemName
      ? `¿Está seguro que desea eliminar "${itemName}"? Esta acción no se puede deshacer.`
      : '¿Está seguro que desea eliminar este elemento? Esta acción no se puede deshacer.';

    return Swal.fire({
      title: 'Confirmar eliminación',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false,
      reverseButtons: true
    });
  }

  /**
   * Cargando - Modal
   */
  loading(title: string = 'Procesando', message: string = 'Por favor espere...'): void {
    Swal.fire({
      title: title,
      text: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  }

  /**
   * Cerrar alerta abierta
   */
  close(): void {
    Swal.close();
  }

  /**
   * Notificación personalizada con HTML
   */
  customHtml(
    title: string,
    htmlContent: string,
    icon: typeAlert = 'info',
    confirmButtonText: string = 'Aceptar',
    showCancelButton: boolean = false
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      html: htmlContent,
      icon: this.mapToSweetAlertIcon(icon),
      confirmButtonText: confirmButtonText,
      showCancelButton: showCancelButton,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    });
  }

  /**
   * Notificación de éxito con botón de acción
   */
  successWithAction(
    message: string,
    actionText: string = 'Ver detalles',
    actionCallback?: () => void
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: message,
      showCancelButton: true,
      confirmButtonText: actionText,
      cancelButtonText: 'Cerrar',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed && actionCallback) {
        actionCallback();
      }
      return result;
    });
  }
}
