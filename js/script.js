// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Get the section id from the href attribute
            const targetId = this.getAttribute('href');
            
            // Scroll to the section
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation for timeline items and sections
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineSections = document.querySelectorAll('.timeline-section');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to check if an element is partially in viewport
    function isPartiallyInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to add animation class when element is in viewport
    function animateOnScroll() {
        timelineItems.forEach(item => {
            if (isPartiallyInViewport(item)) {
                item.classList.add('visible');
            }
        });
        
        timelineSections.forEach(section => {
            if (isPartiallyInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }
    
    // Add initial visible class to items in viewport
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Collapse/expand timeline sections
    timelineSections.forEach(section => {
        section.addEventListener('click', function() {
            // Get all timeline items until the next section
            let nextSection = this.nextElementSibling;
            const itemsToToggle = [];
            
            while (nextSection && !nextSection.classList.contains('timeline-section')) {
                if (nextSection.classList.contains('timeline-item')) {
                    itemsToToggle.push(nextSection);
                }
                nextSection = nextSection.nextElementSibling;
            }
            
            // Toggle collapsed class on the section
            this.classList.toggle('collapsed');
            
            // Toggle display of the items
            if (this.classList.contains('collapsed')) {
                itemsToToggle.forEach(item => {
                    item.style.maxHeight = '0';
                    item.style.opacity = '0';
                    item.style.margin = '0';
                    item.style.padding = '0';
                    item.style.overflow = 'hidden';
                });
            } else {
                itemsToToggle.forEach(item => {
                    item.style.maxHeight = '';
                    item.style.opacity = '';
                    item.style.margin = '';
                    item.style.padding = '';
                    item.style.overflow = '';
                });
            }
        });
    });
});