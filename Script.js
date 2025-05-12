// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // In a real environment, you'd send this data to a server
    // But for now, we'll just show a success message
    alert('Thank you for contacting us, ' + name + '! We will get back to you shortly.');
    
    // Reset the form
    this.reset();
});

// Back to top button functionality
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

document.getElementById('backToTop').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate offset to account for fixed navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Active navigation menu based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 20; // Added extra offset
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Handle resize events for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust hero section margin-top based on navbar height
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    if (hero && navbar) {
        hero.style.marginTop = navbar.offsetHeight + 'px';
    }
});

// Run once on load to set initial margins
window.addEventListener('load', function() {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    if (hero && navbar) {
        hero.style.marginTop = navbar.offsetHeight + 'px';
    }
});

// Book Now button functionality
document.getElementById('bookNowBtn').addEventListener('click', function() {
    // Open email client with prefilled information
    const emailTo = 'jprathmesh581@gmail.com';
    const emailSubject = 'New Service Booking Request';
    const emailBody = 'I would like to book a cleaning service. Please contact me for more details.\n\nName:\nPhone:\nAddress:\nService Required:\nPreferred Date and Time:';
    
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
});

// Service card book buttons
document.querySelectorAll('.service-book-btn').forEach(button => {
    button.addEventListener('click', function() {
        const service = this.getAttribute('data-service');
        
        // Open email client with prefilled information
        const emailTo = 'jprathmesh581@gmail.com';
        const emailSubject = `New Booking Request: ${service}`;
        const emailBody = `I would like to book the ${service} service. Please contact me for more details.\n\nName:\nPhone:\nAddress:\nPreferred Date and Time:`;
        
        window.location.href = `mailto:${emailTo}?subject=${encureURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    });
});

// Booking form submission handler
document.getElementById('submitBooking').addEventListener('click', function() {
    // Get form values
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    const phone = document.getElementById('bookingPhone').value;
    const address = document.getElementById('bookingAddress').value;
    const service = document.getElementById('bookingService').value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const notes = document.getElementById('bookingNotes').value;
    
    // Validate form
    if (!name || !email || !phone || !address || !service || !date || !time) {
        alert('Please fill all required fields');
        return;
    }
    
    // Format date and time for display
    const formattedDate = new Date(date).toLocaleDateString();
    const formattedTime = time;
    
    // Build email body
    const emailTo = 'jprathmesh581@gmail.com';
    const emailSubject = `New Booking: ${service}`;
    const emailBody = `New Service Booking Details:\n\n` +
                     `Service: ${service}\n` +
                     `Name: ${name}\n` +
                     `Email: ${email}\n` +
                     `Phone: ${phone}\n` +
                     `Address: ${address}\n` +
                     `Date: ${formattedDate}\n` +
                     `Time: ${formattedTime}\n` +
                     `Additional Notes: ${notes || 'None'}`;
    
    // Open email client
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Close modal and reset form
    const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
    bookingModal.hide();
    document.getElementById('bookingForm').reset();
});

// Add click event for service booking buttons to open modal
document.querySelectorAll('.service-book-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the service name from data attribute
        const service = this.getAttribute('data-service');
        
        // Set the selected service in the booking form dropdown
        const serviceDropdown = document.getElementById('bookingService');
        for (let i = 0; i < serviceDropdown.options.length; i++) {
            if (serviceDropdown.options[i].text === service) {
                serviceDropdown.selectedIndex = i;
                break;
            }
        }
        
        // Open the booking modal
        const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
        bookingModal.show();
    });
});
