
// Testimonial slider functionality

document.addEventListener('DOMContentLoaded', () => {
  initTestimonialSlider();
});

// Testimonial data - in a real application, this would come from an API or database
const testimonials = [
  {
    id: 1,
    content: 'Excelente servicio y atención personalizada. Encontré exactamente el vehículo que estaba buscando y a un precio justo. Muy recomendable.',
    author: 'Carlos Rodríguez',
    role: 'Cliente satisfecho',
    avatar: './assets/images/testimonials/person1.jpg'
  },
  {
    id: 2,
    content: 'El proceso de compra fue rápido y sin complicaciones. El asesor me guió en cada paso y resolvió todas mis dudas sobre financiamiento.',
    author: 'Ana Martínez',
    role: 'Cliente',
    avatar: './assets/images/testimonials/person2.jpg'
  },
  {
    id: 3,
    content: 'La mejor experiencia de compra de un auto que he tenido. Profesionales serios y transparentes. Estoy muy contento con mi nuevo vehículo.',
    author: 'Miguel Sánchez',
    role: 'Cliente frecuente',
    avatar: './assets/images/testimonials/person3.jpg'
  }
];

// Initialize testimonial slider
function initTestimonialSlider() {
  const testimonialSlider = document.getElementById('testimonial-slider');
  if (!testimonialSlider) return;
  
  let currentSlide = 0;
  const totalSlides = testimonials.length;
  
  // Create slider HTML
  let sliderHTML = '';
  
  // Add testimonials
  testimonials.forEach((testimonial, index) => {
    sliderHTML += `
      <div class="testimonial" data-index="${index}" ${index === 0 ? 'style="display:block"' : 'style="display:none"'}>
        <div class="testimonial-content">
          "${testimonial.content}"
        </div>
        <div class="testimonial-author">
          <div class="testimonial-avatar">
            <img src="${testimonial.avatar}" alt="${testimonial.author}">
          </div>
          <div class="testimonial-name">${testimonial.author}</div>
          <div class="testimonial-role">${testimonial.role}</div>
        </div>
      </div>
    `;
  });
  
  // Add controls
  sliderHTML += `
    <div class="testimonial-controls">
      <button class="testimonial-control prev">←</button>
      <button class="testimonial-control next">→</button>
    </div>
  `;
  
  testimonialSlider.innerHTML = sliderHTML;
  
  // Add event listeners to controls
  const prevButton = testimonialSlider.querySelector('.prev');
  const nextButton = testimonialSlider.querySelector('.next');
  
  prevButton.addEventListener('click', () => {
    changeSlide((currentSlide - 1 + totalSlides) % totalSlides);
  });
  
  nextButton.addEventListener('click', () => {
    changeSlide((currentSlide + 1) % totalSlides);
  });
  
  // Auto slide every 5 seconds
  let slideInterval = setInterval(() => {
    changeSlide((currentSlide + 1) % totalSlides);
  }, 5000);
  
  // Stop auto slide on hover
  testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  testimonialSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      changeSlide((currentSlide + 1) % totalSlides);
    }, 5000);
  });
  
  // Change slide function
  function changeSlide(newIndex) {
    // Hide current slide
    const currentSlideElement = testimonialSlider.querySelector(`[data-index="${currentSlide}"]`);
    if (currentSlideElement) {
      currentSlideElement.style.display = 'none';
    }
    
    // Show new slide
    const newSlideElement = testimonialSlider.querySelector(`[data-index="${newIndex}"]`);
    if (newSlideElement) {
      newSlideElement.style.display = 'block';
    }
    
    // Update current slide index
    currentSlide = newIndex;
  }
}
