
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
  
  featuredVehicles.forEach(vehicle => {
    html += createVehicleCard(vehicle);
  });
  
  featuredVehiclesContainer.innerHTML = html;
  
  // Add event listeners for favorite buttons
  const favoriteButtons = document.querySelectorAll('.btn-favorite');
  favoriteButtons.forEach(button => {
    button.addEventListener('click', toggleFavorite);
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
          <a href="./pages/vehicle-detail.html?id=${vehicle.id}" class="btn-details">Ver Detalles</a>
          <button class="btn-favorite" data-vehicle-id="${vehicle.id}">
            <img src="./assets/icons/heart.svg" alt="Favorito">
          </button>
        </div>
      </div>
    </div>
  `;
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
