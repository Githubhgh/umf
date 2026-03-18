window.HELP_IMPROVE_VIDEOJS = false;

// Custom horizontal carousel - single item view with left/right navigation
const carouselState = {};

function initCarousel(carouselId, slideCount) {
    carouselState[carouselId] = {
        currentIndex: 0,
        totalSlides: slideCount
    };
    updateIndicators(carouselId);
}

function slideCarousel(carouselId, direction) {
    const track = document.querySelector(`#carousel-${carouselId} .carousel-track`);
    const state = carouselState[carouselId];
    
    if (!track || !state) return;
    
    // Calculate new index
    let newIndex = state.currentIndex + direction;
    if (newIndex < 0) newIndex = state.totalSlides - 1;
    if (newIndex >= state.totalSlides) newIndex = 0;
    
    // Update state
    state.currentIndex = newIndex;
    
    // Move track
    track.style.transform = `translateX(-${newIndex * 100}%)`;
    
    // Update indicators
    updateIndicators(carouselId);
}

function updateIndicators(carouselId) {
    const container = document.getElementById(`indicators-${carouselId}`);
    const state = carouselState[carouselId];
    
    if (!container || !state) return;
    
    container.innerHTML = '';
    for (let i = 0; i < state.totalSlides; i++) {
        const indicator = document.createElement('span');
        indicator.className = 'indicator' + (i === state.currentIndex ? ' active' : '');
        indicator.onclick = () => goToSlide(carouselId, i);
        container.appendChild(indicator);
    }
}

function goToSlide(carouselId, index) {
    const track = document.querySelector(`#carousel-${carouselId} .carousel-track`);
    const state = carouselState[carouselId];
    
    if (!track || !state) return;
    
    state.currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateIndicators(carouselId);
}

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    // Initialize custom carousels
    initCarousel('dual', 3);      // Dual-Agent has 3 slides
    initCarousel('multiagent', 6); // Multi-Agent has 6 slides
	
    bulmaSlider.attach();
    
    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

});
