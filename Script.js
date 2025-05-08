document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        }
    });

    // Update copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Navigation style change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Back to top button visibility
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Back to top functionality
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Service cards hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('service-hover');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('service-hover');
        });
    });

    // Form validation and handling

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate phone number format
    function isValidPhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
    }

    // Validate date is not in the past
    function isValidDate(dateInput) {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            dateInput.setCustomValidity('Please select a future date');
            return false;
        } else {
            dateInput.setCustomValidity('');
            return true;
        }
    }

    // Booking form validation and submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        const bookingDate = document.getElementById('bookingDate');
        
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        bookingDate.setAttribute('min', today);
        
        bookingDate.addEventListener('input', function() {
            isValidDate(this);
        });
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('bookingName');
            if (!name.value.trim()) {
                name.classList.add('is-invalid');
                isValid = false;
            } else {
                name.classList.remove('is-invalid');
            }
            
            // Validate email
            const email = document.getElementById('bookingEmail');
            if (!isValidEmail(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            } else {
                email.classList.remove('is-invalid');
            }
            
            // Validate phone
            const phone = document.getElementById('bookingPhone');
            if (!isValidPhone(phone.value)) {
                phone.classList.add('is-invalid');
                isValid = false;
            } else {
                phone.classList.remove('is-invalid');
            }
            
            // Validate service selection
            const service = document.getElementById('bookingService');
            if (!service.value) {
                service.classList.add('is-invalid');
                isValid = false;
            } else {
                service.classList.remove('is-invalid');
            }
            
            // Validate date
            if (!isValidDate(bookingDate)) {
                bookingDate.classList.add('is-invalid');
                isValid = false;
            } else {
                bookingDate.classList.remove('is-invalid');
            }
            
            // Validate time
            const time = document.getElementById('bookingTime');
            if (!time.value) {
                time.classList.add('is-invalid');
                isValid = false;
            } else {
                time.classList.remove('is-invalid');
            }
            
            // Validate address
            const address = document.getElementById('bookingAddress');
            if (!address.value.trim()) {
                address.classList.add('is-invalid');
                isValid = false;
            } else {
                address.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // Prepare form data for email submission
                const formData = {
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    service: service.value,
                    date: bookingDate.value,
                    time: time.value,
                    address: address.value,
                    notes: document.getElementById('bookingNotes').value,
                    formType: "Booking Request"
                };
                
                // Send email using EmailJS or similar service
                sendEmailWithFormData('jprathmesh581@gmail.com', formData);
                
                // Show success message
                showAlert('Your booking has been sent! We will contact you shortly to confirm.', 'success');
                
                // Reset form after submission
                bookingForm.reset();
                
                // Refresh page after short delay (Urban Company style)
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        });
    }

    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                name.classList.add('is-invalid');
                isValid = false;
            } else {
                name.classList.remove('is-invalid');
            }
            
            // Validate email
            const email = document.getElementById('email');
            if (!isValidEmail(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            } else {
                email.classList.remove('is-invalid');
            }
            
            // Validate phone
            const phone = document.getElementById('phone');
            if (!isValidPhone(phone.value)) {
                phone.classList.add('is-invalid');
                isValid = false;
            } else {
                phone.classList.remove('is-invalid');
            }
            
            // Validate service selection
            const service = document.getElementById('service');
            if (!service.value) {
                service.classList.add('is-invalid');
                isValid = false;
            } else {
                service.classList.remove('is-invalid');
            }
            
            // Validate message
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                message.classList.add('is-invalid');
                isValid = false;
            } else {
                message.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // Prepare form data for email submission
                const formData = {
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    service: service.value,
                    message: message.value,
                    formType: "Contact Request"
                };
                
                // Send email using EmailJS or similar service
                sendEmailWithFormData('jprathmesh581@gmail.com', formData);
                
                // Show success message
                showAlert('Thank you for your message! We will get back to you soon.', 'success');
                
                // Reset form after submission
                contactForm.reset();
                
                // Refresh page after short delay (Urban Company style)
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        });
    }

    // Alert message handling
    const alertMessage = document.getElementById('alertMessage');
    const alertText = document.getElementById('alertText');
    const alertClose = document.getElementById('alertClose');
    
    function showAlert(message, type) {
        alertText.textContent = message;
        alertMessage.className = `alert alert-${type}`;
        alertMessage.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            alertMessage.classList.remove('show');
        }, 5000);
    }
    
    if (alertClose) {
        alertClose.addEventListener('click', function() {
            alertMessage.classList.remove('show');
        });
    }

    // Image lazy loading for better performance
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });

    // Email sending functionality using EmailJS
    function sendEmailWithFormData(recipient, formData) {
        // Initialize EmailJS with your user ID
        emailjs.init("YOUR_EMAILJS_USER_ID");
        
        // Prepare template parameters
        const templateParams = {
            to_email: recipient,
            from_name: formData.name,
            from_email: formData.email,
            from_phone: formData.phone,
            service_type: formData.service,
            message: formData.message || "",
            form_type: formData.formType,
            booking_date: formData.date || "",
            booking_time: formData.time || "",
            address: formData.address || "",
            notes: formData.notes || ""
        };
        
        // Send email using EmailJS
        emailjs.send('default_service', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('Email sent successfully!', response.status, response.text);
            }, function(error) {
                console.error('Failed to send email:', error);
                // Show error message to user but don't block UI flow
                showAlert('There was an issue sending your request. Please try again or contact us directly.', 'danger');
            });
    }
});