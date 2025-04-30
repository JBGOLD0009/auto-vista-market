
// Vehicles page specific functionality

document.addEventListener('DOMContentLoaded', () => {
  loadAllVehicles();
  initFilters();
  initPriceRange();
  applyQueryFilters();
});

// Get URL query parameters and apply filters
function applyQueryFilters() {
  const params = getQueryParams();
  
  // Apply brand filter
  if (params.brand) {
    const brandCheckbox = document.querySelector(`input[name="brand"][value="${params.brand}"]`);
    if (brandCheckbox) {
      brandCheckbox.checked = true;
    }
  }
  
  // Apply type filter
  if (params.type) {
    const typeCheckbox = document.querySelector(`input[name="type"][value="${params.type}"]`);
    if (typeCheckbox) {
      typeCheckbox.checked = true;
    } else {
      // Handle special case for "nuevos", "usados", "ofertas"
      if (params.type === 'nuevos') {
        document.querySelectorAll('.vehicle-card').forEach(card => {
          if (!card.querySelector('.vehicle-badge') || card.querySelector('.vehicle-badge').textContent !== 'Nuevo') {
            card.style.display = 'none';
          }
        });
      } else if (params.type === 'usados' || params.type === 'seminuevos') {
        document.querySelectorAll('.vehicle-card').forEach(card => {
          if (!card.querySelector('.vehicle-badge') || card.querySelector('.vehicle-badge').textContent !== 'Seminuevo') {
            card.style.display = 'none';
          }
        });
      } else if (params.type === 'ofertas') {
        document.querySelectorAll('.vehicle-card').forEach(card => {
          if (!card.querySelector('.vehicle-badge') || card.querySelector('.vehicle-badge').textContent !== 'Oferta') {
            card.style.display = 'none';
          }
        });
      }
    }
  }
  
  // Apply search filter
  if (params.search) {
    const searchInput = document.getElementById('search-input-page');
    if (searchInput) {
      searchInput.value = params.search;
      searchVehicles(params.search);
    }
  }
  
  // If any filter is applied, trigger the filter application
  if (params.brand || params.type || params.search) {
    applyFilters();
  }
}

// Extended vehicle data for the vehicles page
const allVehiclesData = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'RAV4',
    year: 2023,
    price: 32900,
    mileage: 0,
    fuel: 'Hybrid',
    transmission: 'Automática',
    type: 'SUV',
    image: '../assets/images/toyota-rav4.jpg',
    badge: 'Nuevo'
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
    type: 'Sedán',
    image: '../assets/images/honda-civic.jpg',
    badge: 'Seminuevo'
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
    type: 'Coupé',
    image: '../assets/images/ford-mustang.jpg',
    badge: 'Oferta'
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
    type: 'Sedán',
    image: '../assets/images/tesla-model3.jpg',
    badge: 'Premium'
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
    type: 'SUV',
    image: '../assets/images/bmw-x5.jpg',
    badge: 'Lujo'
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
    type: 'Sedán',
    image: '../assets/images/mercedes-cclass.jpg',
    badge: 'Premium'
  },
  // Additional vehicles
  {
    id: 7,
    brand: 'Audi',
    model: 'Q5',
    year: 2022,
    price: 57800,
    mileage: 8500,
    fuel: 'Gasolina',
    transmission: 'Automática',
    type: 'SUV',
    image: '../assets/images/audi-q5.jpg',
    badge: 'Premium'
  },
  {
    id: 8,
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2021,
    price: 27500,
    mileage: 18000,
    fuel: 'Gasolina',
    transmission: 'Manual',
    type: 'Hatchback',
    image: '../assets/images/vw-golf.jpg'
  },
  {
    id: 9,
    brand: 'Nissan',
    model: 'Frontier',
    year: 2023,
    price: 38000,
    mileage: 0,
    fuel: 'Diesel',
    transmission: 'Automática',
    type: 'Pickup',
    image: '../assets/images/nissan-frontier.jpg',
    badge: 'Nuevo'
  },
  {
    id: 10,
    brand: 'Lexus',
    model: 'RX',
    year: 2022,
    price: 65000,
    mileage: 10000,
    fuel: 'Híbrido',
    transmission: 'Automática',
    type: 'SUV',
    image: '../assets/images/lexus-rx.jpg',
    badge: 'Lujo'
  },
  {
    id: 11,
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2022,
    price: 32000,
    mileage: 15000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    type: 'SUV',
    image: '../assets/images/hyundai-tucson.jpg'
  },
  {
    id: 12,
    brand: 'Kia',
    model: 'Sportage',
    year: 2023,
    price: 33500,
    mileage: 1000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    type: 'SUV',
    image: '../assets/images/kia-sportage.jpg',
    badge: 'Oferta'
  },
  // New vehicles
  {
    id: 13,
    brand: 'Mazda',
    model: 'CX-5',
    year: 2022,
    price: 34900,
    mileage: 5000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    type: 'SUV',
    image: '../assets/images/mazda-cx5.jpg',
    badge: 'Seminuevo'
  },
  {
    id: 14,
    brand: 'Subaru',
    model: 'Forester',
    year: 2023,
    price: 36700,
    mileage: 0,
    fuel: 'Gasolina',
    transmission: 'Automática',
    type: 'SUV',
    image: '../assets/images/subaru-forester.jpg',
    badge: 'Nuevo'
  },
  {
    id: 15,
    brand: 'Jeep',
    model: 'Wrangler',
    year: 2022,
    price: 49800,
    mileage: 7000,
    fuel: 'Gasolina',
    transmission: 'Manual',
    type: 'SUV',
    image: '../assets/images/jeep-wrangler.jpg',
    badge: 'Premium'
  },
  {
    id: 16,
    brand: 'Chevrolet',
    model: 'Camaro',
    year: 2021,
    price: 52000,
    mileage: 12000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    type: 'Coupé',
    image: '../assets/images/chevrolet-camaro.jpg',
    badge: 'Oferta'
  },
  {
    id: 17,
    brand: 'Volvo',
    model: 'XC60',
    year: 2023,
    price: 59900,
    mileage: 0,
    fuel: 'Híbrido',
    transmission: 'Automática',
    type: 'SUV',
    image: '../assets/images/volvo-xc60.jpg',
    badge: 'Nuevo'
  },
  {
    id: 18,
    brand: 'Porsche',
    model: 'Cayenne',
    year: 2022,
    price: 89500,
    mileage: 5000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    type: 'SUV',
    image: '../assets/images/porsche-cayenne.jpg',
    badge: 'Lujo'
  },
  {
    id: 19,
    brand: 'Land Rover',
    model: 'Range Rover',
    year: 2023,
    price: 94000,
    mileage: 0,
    fuel: 'Diesel',
    transmission: 'Automática',
    type: 'SUV',
    image: '../assets/images/range-rover.jpg',
    badge: 'Lujo'
  },
  {
    id: 20,
    brand: 'Mini',
    model: 'Cooper',
    year: 2022,
    price: 31800,
    mileage: 10000,
    fuel: 'Gasolina',
    transmission: 'Manual',
    type: 'Hatchback',
    image: '../assets/images/mini-cooper.jpg',
    badge: 'Premium'
  }
];

// Load all vehicles
function loadAllVehicles() {
  const vehiclesContainer = document.getElementById('vehicles-container');
  if (!vehiclesContainer) return;
  
  renderVehicles(allVehiclesData, vehiclesContainer);
  updateResultsCount(allVehiclesData.length);
}

// Search vehicles
function searchVehicles(searchTerm) {
  if (!searchTerm) {
    loadAllVehicles();
    return;
  }
  
  const searchTermLower = searchTerm.toLowerCase();
  const filteredVehicles = allVehiclesData.filter(vehicle => 
    vehicle.brand.toLowerCase().includes(searchTermLower) ||
    vehicle.model.toLowerCase().includes(searchTermLower) ||
    vehicle.year.toString().includes(searchTermLower) ||
    vehicle.fuel.toLowerCase().includes(searchTermLower) ||
    vehicle.type.toLowerCase().includes(searchTermLower)
  );
  
  const vehiclesContainer = document.getElementById('vehicles-container');
  renderVehicles(filteredVehicles, vehiclesContainer);
  updateResultsCount(filteredVehicles.length);
  
  // Show toast
  showToast(`Se encontraron ${filteredVehicles.length} vehículos que coinciden con tu búsqueda.`, 'info');
}

// Get URL query parameters
function getQueryParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split('&');
  
  pairs.forEach(pair => {
    if (pair) {
      const keyValue = pair.split('=');
      params[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1] || '');
    }
  });
  
  return params;
}

// Render vehicles to container
function renderVehicles(vehicles, container) {
  if (vehicles.length === 0) {
    container.innerHTML = '<div class="no-results">No se encontraron vehículos que coincidan con los filtros seleccionados.</div>';
    return;
  }
  
  let html = '';
  
  vehicles.forEach(vehicle => {
    html += `
      <div class="vehicle-card" data-vehicle-id="${vehicle.id}">
        <div class="vehicle-image">
          <img src="${vehicle.image}" alt="${vehicle.brand} ${vehicle.model}">
          ${vehicle.badge ? `<div class="vehicle-badge">${vehicle.badge}</div>` : ''}
        </div>
        <div class="vehicle-info">
          <h3 class="vehicle-title">${vehicle.brand} ${vehicle.model} ${vehicle.year}</h3>
          <div class="vehicle-price">$${formatPrice(vehicle.price)}</div>
          <div class="vehicle-meta">
            <span><img src="../assets/icons/speedometer.svg" alt="Kilometraje"> ${formatMileage(vehicle.mileage)} km</span>
            <span><img src="../assets/icons/fuel.svg" alt="Combustible"> ${vehicle.fuel}</span>
            <span><img src="../assets/icons/gear.svg" alt="Transmisión"> ${vehicle.transmission}</span>
          </div>
          <div class="vehicle-actions">
            <a href="./vehicle-detail.html?id=${vehicle.id}" class="btn-details">Ver Detalles</a>
            <button class="btn-favorite" data-vehicle-id="${vehicle.id}">
              <img src="../assets/icons/heart.svg" alt="Favorito">
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Add event listeners for favorite buttons
  const favoriteButtons = container.querySelectorAll('.btn-favorite');
  favoriteButtons.forEach(button => {
    button.addEventListener('click', toggleFavorite);
  });
}

// Initialize filters
function initFilters() {
  const applyFiltersBtn = document.getElementById('apply-filters');
  const clearFiltersBtn = document.getElementById('clear-filters');
  const sortSelect = document.getElementById('sort-select');
  
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', applyFilters);
  }
  
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearFilters);
  }
  
  if (sortSelect) {
    sortSelect.addEventListener('change', sortVehicles);
  }
}

// Apply filters
function applyFilters() {
  // Get selected brands
  const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(input => input.value);
  
  // Get selected vehicle types
  const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(input => input.value);
  
  // Get selected fuel types
  const selectedFuels = Array.from(document.querySelectorAll('input[name="fuel"]:checked')).map(input => input.value);
  
  // Get price range
  const maxPrice = parseInt(document.getElementById('price-range').value);
  
  // Filter vehicles
  let filteredVehicles = allVehiclesData;
  
  if (selectedBrands.length > 0) {
    filteredVehicles = filteredVehicles.filter(vehicle => selectedBrands.includes(vehicle.brand));
  }
  
  if (selectedTypes.length > 0) {
    filteredVehicles = filteredVehicles.filter(vehicle => selectedTypes.includes(vehicle.type));
  }
  
  if (selectedFuels.length > 0) {
    filteredVehicles = filteredVehicles.filter(vehicle => selectedFuels.includes(vehicle.fuel));
  }
  
  filteredVehicles = filteredVehicles.filter(vehicle => vehicle.price <= maxPrice);
  
  // Apply current sorting
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    const sortValue = sortSelect.value;
    filteredVehicles = sortVehiclesByOption(filteredVehicles, sortValue);
  }
  
  // Render filtered vehicles
  const vehiclesContainer = document.getElementById('vehicles-container');
  renderVehicles(filteredVehicles, vehiclesContainer);
  updateResultsCount(filteredVehicles.length);
  
  // Show toast
  showToast(`Se encontraron ${filteredVehicles.length} vehículos que coinciden con tus filtros.`, 'info');
}

// Clear all filters
function clearFilters() {
  // Uncheck all checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.checked = false;
  });
  
  // Reset price range
  const priceRange = document.getElementById('price-range');
  if (priceRange) {
    priceRange.value = 100000;
    document.getElementById('price-value').textContent = '$100,000';
  }
  
  // Reset sort select
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.value = 'recommended';
  }
  
  // Reload all vehicles
  loadAllVehicles();
  
  // Show toast
  showToast('Se han eliminado todos los filtros.', 'info');
}

// Sort vehicles
function sortVehicles() {
  const sortSelect = document.getElementById('sort-select');
  if (!sortSelect) return;
  
  const sortValue = sortSelect.value;
  
  // Get currently filtered vehicles
  let vehiclesToSort = getCurrentlyDisplayedVehicles();
  
  // Sort vehicles
  vehiclesToSort = sortVehiclesByOption(vehiclesToSort, sortValue);
  
  // Render sorted vehicles
  const vehiclesContainer = document.getElementById('vehicles-container');
  renderVehicles(vehiclesToSort, vehiclesContainer);
}

// Get currently displayed vehicles based on active filters
function getCurrentlyDisplayedVehicles() {
  // This is a simplified version - in a real application, you would track the current filter state
  // For this example, we'll just get the IDs of the current vehicles and match them with allVehiclesData
  const currentVehicleElements = document.querySelectorAll('.vehicle-card');
  const currentVehicleIds = Array.from(currentVehicleElements).map(el => parseInt(el.getAttribute('data-vehicle-id')));
  
  return allVehiclesData.filter(vehicle => currentVehicleIds.includes(vehicle.id));
}

// Sort vehicles by option
function sortVehiclesByOption(vehicles, sortOption) {
  switch (sortOption) {
    case 'price-asc':
      return [...vehicles].sort((a, b) => a.price - b.price);
    case 'price-desc':
      return [...vehicles].sort((a, b) => b.price - a.price);
    case 'year-desc':
      return [...vehicles].sort((a, b) => b.year - a.year);
    case 'mileage-asc':
      return [...vehicles].sort((a, b) => a.mileage - b.mileage);
    case 'recommended':
    default:
      // For recommended, we could use a more complex algorithm
      // For this example, we'll just randomize the results
      return [...vehicles].sort(() => Math.random() - 0.5);
  }
}

// Initialize price range slider
function initPriceRange() {
  const priceRange = document.getElementById('price-range');
  const priceValue = document.getElementById('price-value');
  
  if (priceRange && priceValue) {
    priceRange.addEventListener('input', () => {
      const value = priceRange.value;
      priceValue.textContent = `$${formatPrice(value)}`;
    });
  }
}

// Update results count
function updateResultsCount(count) {
  const resultsCount = document.getElementById('results-count');
  if (resultsCount) {
    resultsCount.textContent = count;
  }
}

// Toggle favorite state
function toggleFavorite(e) {
  const button = e.currentTarget;
  const vehicleId = button.getAttribute('data-vehicle-id');
  
  // Toggle active class
  button.classList.toggle('active');
  
  // In a real application, this would save to localStorage or a database
  if (button.classList.contains('active')) {
    button.innerHTML = `<img src="../assets/icons/heart-filled.svg" alt="Favorito">`;
    showToast(`Vehículo añadido a favoritos`, 'success');
  } else {
    button.innerHTML = `<img src="../assets/icons/heart.svg" alt="Favorito">`;
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
