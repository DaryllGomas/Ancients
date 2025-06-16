// Artifacts page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const artifactCards = document.querySelectorAll('.artifact-card');
    const modal = document.getElementById('artifactModal');
    const modalClose = modal.querySelector('.close');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter artifact cards
            artifactCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                    // Reset animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 10);
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.classList.remove('hidden');
                        // Reset animation
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = '';
                        }, 10);
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
    
    // Modal functionality
    function openArtifactModal(artifactKey) {
        const artifact = artifactsData[artifactKey];
        if (!artifact) return;
        
        // Populate modal content
        document.getElementById('artifactTitle').textContent = artifact.title;
        document.getElementById('artifactEra').textContent = artifact.era;
        document.getElementById('artifactModalImage').src = artifact.image;
        document.getElementById('artifactModalImage').alt = artifact.title;
        document.getElementById('artifactOverview').textContent = artifact.overview;
        document.getElementById('artifactContext').textContent = artifact.context;
        document.getElementById('artifactSignificance').textContent = artifact.significance;
        
        // Handle mysteries section
        const mysteriesSection = document.getElementById('mysteriesSection');
        if (artifact.mysteries) {
            document.getElementById('artifactMysteries').textContent = artifact.mysteries;
            mysteriesSection.style.display = 'block';
        } else {
            mysteriesSection.style.display = 'none';
        }
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Fade in animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Add click handlers to view details buttons
    artifactCards.forEach((card, index) => {
        const viewButton = card.querySelector('.view-details');
        viewButton.addEventListener('click', function() {
            // Determine which artifact based on the card content
            const title = card.querySelector('h3').textContent;
            let artifactKey = '';
            
            if (title.includes('Handbag')) {
                if (title.includes('Multiple')) {
                    artifactKey = 'multiple-handbag-depictions';
                } else {
                    artifactKey = 'mysterious-handbags';
                }
            } else if (title.includes('Cartouche')) {
                artifactKey = 'egyptian-cartouches';
            } else if (title.includes('Bronze Age Swords')) {
                artifactKey = 'bronze-age-swords';
            } else if (title.includes('Paleolithic Hand Axe')) {
                artifactKey = 'paleolithic-hand-axe';
            } else if (title.includes('Venus Figurines')) {
                artifactKey = 'venus-figurines';
            }
            
            if (artifactKey) {
                openArtifactModal(artifactKey);
            }
        });
    });
    
    // Close modal handlers
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Smooth scroll if coming from another page
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
    
    // Add loading animation for images
    const images = document.querySelectorAll('.artifact-image img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 50);
        });
    });
    
    // Add hover effect for artifact cards
    artifactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Helper function to add more artifacts dynamically
function addArtifact(artifactData) {
    const grid = document.querySelector('.artifacts-grid');
    const card = document.createElement('div');
    card.className = 'artifact-card';
    card.setAttribute('data-category', artifactData.category.join(' '));
    
    // Determine the primary category for the tag
    let tagType = 'mysterious';
    let tagLabel = 'Mysterious';
    
    if (artifactData.category.includes('tools')) {
        tagType = 'tools';
        tagLabel = 'Tools & Weapons';
    } else if (artifactData.category.includes('art') && !artifactData.category.includes('mysterious')) {
        tagType = 'art';
        tagLabel = 'Art & Symbols';
    }
    
    card.innerHTML = `
        <div class="artifact-image">
            <img src="${artifactData.image}" alt="${artifactData.title}">
            <div class="artifact-overlay">
                <span class="view-details">View Details</span>
            </div>
        </div>
        <div class="artifact-info">
            <h3>${artifactData.title}</h3>
            <p class="artifact-era">${artifactData.era}</p>
            <p class="artifact-description">${artifactData.description}</p>
            <span class="artifact-tag ${tagType}">${tagLabel}</span>
        </div>
    `;
    
    grid.appendChild(card);
    
    // Add event listener to new card
    const viewButton = card.querySelector('.view-details');
    viewButton.addEventListener('click', function() {
        openArtifactModal(artifactData.key);
    });
}

// Export for potential use in other scripts
window.artifactsManager = {
    addArtifact: addArtifact,
    openModal: openArtifactModal
};
