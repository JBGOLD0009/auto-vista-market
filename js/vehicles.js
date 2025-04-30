// Vehicle data and functionality

document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedVehicles();
});

// Vehicle data - in a real application, this would come from an API or database
const vehiclesData = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'RAV4',
    year: 2023,
    price: 32900,
    mileage: 0,
    fuel: 'Hybrid',
    transmission: 'Automática',
    image: './assets/images/vehicles/toyota-rav4.jpg',
    badge: 'Nuevo',
    isFeatured: true
  },
  {
    id: 2,
    brand: 'Honda',
    model: 'Civic',
    year: 2022,
    price: 25500,
    mileage: 15000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    image: './assets/images/vehicles/honda-civic.jpg',
    badge: 'Seminuevo',
    isFeatured: true
  },
  {
    id: 3,
    brand: 'Ford',
    model: 'Mustang',
    year: 2021,
    price: 45000,
    mileage: 8000,
    fuel: 'Gasolina',
    transmission: 'Manual',
    image: './assets/images/vehicles/ford-mustang.jpg',
    badge: 'Oferta',
    isFeatured: true
  },
  {
    id: 4,
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 52000,
    mileage: 0,
    fuel: 'Eléctrico',
    transmission: 'Automática',
    image: './assets/images/vehicles/tesla-model3.jpg',
    badge: 'Premium',
    isFeatured: true
  },
  {
    id: 5,
    brand: 'BMW',
    model: 'X5',
    year: 2022,
    price: 68000,
    mileage: 12000,
    fuel: 'Diesel',
    transmission: 'Automática',
    image: './assets/images/vehicles/bmw-x5.jpg',
    badge: 'Lujo',
    isFeatured: true
  },
  {
    id: 6,
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    price: 55000,
    mileage: 5000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    image: './assets/images/vehicles/mercedes-cclass.jpg',
    badge: 'Premium',
    isFeatured: true
  },
  {
    id: 7,
    brand: 'Audi',
    model: 'A3',
    year: 2022,
    price: 42000,
    mileage: 3500,
    fuel: 'Gasolina',
    transmission: 'Automática',
    image: './assets/images/vehicles/audi-a3.jpg',
    badge: 'Premium',
    isFeatured: true
  },
  {
    id: 8,
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2023,
    price: 28500,
    mileage: 0,
    fuel: 'Gasolina',
    transmission: 'Manual',
    image: './assets/images/vehicles/vw-golf.jpg',
    badge: 'Nuevo',
    isFeatured: true
  },
  {
    id: 9,
    brand: 'Nissan',
    model: 'Qashqai',
    year: 2022,
    price: 29800,
    mileage: 7500,
    fuel: 'Gasolina',
    transmission: 'Automática',
    image: './assets/images/vehicles/nissan-qashqai.jpg',
    badge: 'Seminuevo',
    isFeatured: true
  },
  {
    id: 10,
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2023,
    price: 31500,
    mileage: 0,
    fuel: 'Híbrido',
    transmission: 'Automática',
    image: './assets/images/vehicles/hyundai-tucson.jpg',
    badge: 'Nuevo',
    isFeatured: true
  },
  {
    id: 11,
    brand: 'Kia',
    model: 'Sportage',
    year: 2022,
    price: 30400,
    mileage: 5000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    image: './assets/images/vehicles/kia-sportage.jpg',
    badge: 'Oferta',
    isFeatured: true
  },
  {
    id: 12,
    brand: 'Mazda',
    model: 'CX-5',
    year: 2023,
    price: 33900,
    mileage: 0,
    fuel: 'Gasolina',
    transmission: 'Automática',
    image: './assets/images/vehicles/mazda-cx5.jpg',
    badge: 'Nuevo',
    isFeatured: true
  }
];

// Load featured vehicles
function loadFeaturedVehicles() {
  const featuredVehiclesContainer = document.getElementById('featured-vehicles-container');
  if (!featuredVehiclesContainer) return;
  
  const featuredVehicles = vehiclesData.filter(vehicle => vehicle.isFeatured);
  
  if (featuredVehicles.length === 0) {
    featuredVehiclesContainer.innerHTML = '<p>No hay vehículos destacados disponibles actualmente.</p>';
    return;
  }
  
  let html = '';
  
  // Only show the first 6 featured vehicles on the homepage
  const displayVehicles = featuredVehicles.slice(0, 6);
  
  displayVehicles.forEach(vehicle => {
    html += createVehicleCard(vehicle);
  });
  
  featuredVehiclesContainer.innerHTML = html;
  
  // Add event listeners for favorite buttons
  const favoriteButtons = document.querySelectorAll('.btn-favorite');
  favoriteButtons.forEach(button => {
    button.addEventListener('click', toggleFavorite);
  });
  
  // Add event listeners for details buttons
  const detailsButtons = document.querySelectorAll('.btn-details');
  detailsButtons.forEach(button => {
    button.addEventListener('click', showVehicleDetails);
  });
}

// Create vehicle card HTML
function createVehicleCard(vehicle) {
  return `
    <div class="vehicle-card" data-vehicle-id="${vehicle.id}">
      <div class="vehicle-image">
        <img src="${vehicle.image}" alt="${vehicle.brand} ${vehicle.model}">
        ${vehicle.badge ? `<div class="vehicle-badge">${vehicle.badge}</div>` : ''}
      </div>
      <div class="vehicle-info">
        <h3 class="vehicle-title">${vehicle.brand} ${vehicle.model} ${vehicle.year}</h3>
        <div class="vehicle-price">$${formatPrice(vehicle.price)}</div>
        <div class="vehicle-meta">
          <span><img src="./assets/icons/speedometer.svg" alt="Kilometraje"> ${formatMileage(vehicle.mileage)} km</span>
          <span><img src="./assets/icons/fuel.svg" alt="Combustible"> ${vehicle.fuel}</span>
          <span><img src="./assets/icons/gear.svg" alt="Transmisión"> ${vehicle.transmission}</span>
        </div>
        <div class="vehicle-actions">
          <button class="btn-details" data-vehicle-id="${vehicle.id}">Ver Detalles</button>
          <button class="btn-favorite" data-vehicle-id="${vehicle.id}">
            <img src="./assets/icons/heart.svg" alt="Favorito">
          </button>
        </div>
      </div>
    </div>
  `;
}

// Show vehicle details
function showVehicleDetails(e) {
  e.preventDefault();
  const button = e.currentTarget;
  const vehicleId = parseInt(button.getAttribute('data-vehicle-id'));
  
  // Find vehicle data
  const vehicle = vehiclesData.find(v => v.id === vehicleId);
  if (!vehicle) return;
  
  // Check if we're using the React version of the site
  if (window.ReactVehicleDetailsDialog) {
    // Call the React component
    window.openVehicleDetailsDialog(vehicle);
    return;
  }
  
  // If React is not available, use the vanilla JS modal
  // Create modal content
  const modal = document.createElement('div');
  modal.className = 'vehicle-details-modal';
  
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${vehicle.brand} ${vehicle.model} ${vehicle.year}</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-image">
          <img src="${vehicle.image}" alt="${vehicle.brand} ${vehicle.model}">
          ${vehicle.badge ? `<div class="vehicle-badge">${vehicle.badge}</div>` : ''}
        </div>
        <div class="modal-price">$${formatPrice(vehicle.price)}</div>
        <div class="modal-details">
          <div class="detail-item">
            <img src="./assets/icons/speedometer.svg" alt="Kilometraje">
            <span>${formatMileage(vehicle.mileage)} km</span>
          </div>
          <div class="detail-item">
            <img src="./assets/icons/fuel.svg" alt="Combustible">
            <span>${vehicle.fuel}</span>
          </div>
          <div class="detail-item">
            <img src="./assets/icons/gear.svg" alt="Transmisión">
            <span>${vehicle.transmission}</span>
          </div>
          ${vehicle.type ? `
          <div class="detail-item">
            <img src="./assets/icons/car-sale.svg" alt="Tipo">
            <span>${vehicle.type}</span>
          </div>` : ''}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-contact">Contactar</button>
      </div>
    </div>
  `;
  
  // Add modal to the document
  document.body.appendChild(modal);
  
  // Prevent body scrolling
  document.body.style.overflow = 'hidden';
  
  // Add close button event listener
  const closeButton = modal.querySelector('.modal-close');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(modal);
    document.body.style.overflow = '';
  });
  
  // Close on click outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
      document.body.style.overflow = '';
    }
  });
}

// Toggle favorite state
function toggleFavorite(e) {
  const button = e.currentTarget;
  const vehicleId = button.getAttribute('data-vehicle-id');
  
  // Toggle active class
  button.classList.toggle('active');
  
  // In a real application, this would save to localStorage or a database
  if (button.classList.contains('active')) {
    button.innerHTML = `<img src="./assets/icons/heart-filled.svg" alt="Favorito">`;
    showToast(`Vehículo añadido a favoritos`, 'success');
  } else {
    button.innerHTML = `<img src="./assets/icons/heart.svg" alt="Favorito">`;
    showToast(`Vehículo eliminado de favoritos`, 'info');
  }
}

// Format price with thousands separator
function formatPrice(price) {
  return new Intl.NumberFormat('es-ES').format(price);
}

// Format mileage with thousands separator
function formatMileage(mileage) {
  return new Intl.NumberFormat('es-ES').format(mileage);
}

// Expose functions to window to be used by React components
window.vehiclesData = vehiclesData;
window.formatPrice = formatPrice;
window.formatMileage = formatMileage;
