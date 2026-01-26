(function (window) {
  window.__env = window.__env || {};

  // Configuración del entorno para desarrollo
  window.__env.base_url = 'http://localhost:3000/api';
  window.__env.secretkey = 'clave-super-secreta';
  window.__env.featureFlag = true;
})(this);
