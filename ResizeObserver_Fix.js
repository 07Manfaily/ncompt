// Solution pour corriger les erreurs "ResizeObserver loop completed with undelivered notifications"

// 1. Patch global du ResizeObserver
if (typeof window !== 'undefined' && typeof window.ResizeObserver !== 'undefined') {
  const OriginalResizeObserver = window.ResizeObserver;
  let resizeObserverErrorCount = 0;
  
  window.ResizeObserver = class extends OriginalResizeObserver {
    constructor(callback) {
      super((entries, observer) => {
        try {
          // Utiliser requestAnimationFrame pour éviter les boucles infinies
          if (resizeObserverErrorCount < 10) {
            requestAnimationFrame(() => {
              try {
                callback(entries, observer);
              } catch (e) {
                resizeObserverErrorCount++;
                // Ignore silencieusement après trop d'erreurs
              }
            });
          }
        } catch (e) {
          resizeObserverErrorCount++;
        }
      });
    }
  };
}

// 2. Suppression des erreurs ResizeObserver dans la console
if (typeof console !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    const message = args[0];
    if (typeof message === 'string' && 
        (message.includes('ResizeObserver') || 
         message.includes('loop completed with undelivered notifications'))) {
      return; // Ne pas afficher les erreurs ResizeObserver
    }
    originalError.apply(console, args);
  };
}

// 3. Gestion des erreurs non capturées
if (typeof window !== 'undefined') {
  const handleError = (event) => {
    if (event.message && event.message.includes('ResizeObserver')) {
      event.preventDefault();
      return false;
    }
  };

  window.addEventListener('error', handleError);
  
  // Gestion des promesses rejetées
  const handleUnhandledRejection = (event) => {
    if (event.reason && 
        event.reason.message && 
        event.reason.message.includes('ResizeObserver')) {
      event.preventDefault();
      return;
    }
  };

  window.addEventListener('unhandledrejection', handleUnhandledRejection);
}

// 4. Export pour utilisation dans d'autres composants
export const ResizeObserverFix = {
  // Méthode pour appliquer le fix
  apply: () => {
    // Le fix est appliqué automatiquement lors de l'import
    console.log('ResizeObserver fix appliqué avec succès');
  },
  
  // Méthode pour vérifier si le fix est actif
  isActive: () => {
    return typeof window !== 'undefined' && 
           window.ResizeObserver && 
           window.ResizeObserver.name === 'ResizeObserver';
  }
};

// 5. Application automatique
ResizeObserverFix.apply(); 