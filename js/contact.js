
// Contact page specific functionality

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

// Initialize contact form
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value.trim();
      
      // Validate form
      if (!name || !email || !phone || !subject || !message) {
        showToast('Por favor, completa todos los campos requeridos.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showToast('Por favor, introduce un correo electrónico válido.', 'error');
        return;
      }
      
      // In a real application, this would send the form data to a server
      // For this demo, we'll just show a success message
      showToast('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.', 'success');
      
      // Reset form
      contactForm.reset();
    });
  }
}

// Helper: Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper: Show toast notification (if not already defined in main.js)
if (typeof showToast !== 'function') {
  function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
      
      // Add toast container styles
      const style = document.createElement('style');
      style.textContent = `
        .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        .toast {
          padding: 12px 20px;
          margin-top: 10px;
          border-radius: 4px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease-out forwards;
        }
        .toast-success {
          background-color: #4CAF50;
        }
        .toast-error {
          background-color: #F44336;
        }
        .toast-info {
          background-color: #1EAEDB;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
}

// Enhance form fields with validation
document.querySelectorAll('.contact-form-container input, .contact-form-container textarea, .contact-form-container select').forEach(element => {
  element.addEventListener('blur', () => {
    validateField(element);
  });
});

// Field validation
function validateField(field) {
  if (field.required && !field.value.trim()) {
    field.classList.add('error');
    return false;
  }
  
  if (field.type === 'email' && field.value.trim() && !isValidEmail(field.value.trim())) {
    field.classList.add('error');
    return false;
  }
  
  field.classList.remove('error');
  return true;
}
