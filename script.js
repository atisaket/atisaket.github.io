// Hungama Nights - Interactive JavaScript

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize all interactive features
    initNavigation();
    initScrollEffects();
    initForms();
    initMobileMenu();
    initEventHandlers();
    initEventsNavigation();
});

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    let lastScrollY = 0;
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = "translateY(-100%)";
        } else {
            navbar.style.transform = "translateY(0)";
        }

        lastScrollY = currentScrollY;


        // Fade in elements on scroll
        const elements = document.querySelectorAll(".fade-on-scroll");
        elements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add("fade-in-up");
            }
        });
    });
}

// Form handling
function initForms() {
    document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formType = this.getAttribute("data-form-type") || "contact";

            // Validate form
            if (validateForm(this)) {
                submitForm(formData, formType);
            }
        });
    });
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
        if (!field.value.trim()) {
            showFieldError(field, "This field is required");
            isValid = false;
        } else {
            clearFieldError(field);
        }

        // Email validation
        if (field.type === "email" && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, "Please enter a valid email address");
                isValid = false;
            }
        }

        // Phone validation
        if (field.type === "tel" && field.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(field.value.replace(/\s/g, ""))) {
                showFieldError(field, "Please enter a valid phone number");
                isValid = false;
            }
        }
    });

    return isValid;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);

    field.classList.add("border-red-500");
    const errorDiv = document.createElement("div");
    errorDiv.className = "text-red-500 text-sm mt-1";
    errorDiv.textContent = message;
    errorDiv.setAttribute("data-error", "true");

    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove("border-red-500");
    const errorDiv = field.parentNode.querySelector('[data-error="true"]');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Submit form (simulated)
function submitForm(formData, formType) {
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Show success message
        showNotification(
            "Thank you! Your message has been sent successfully.",
            "success",
        );

        // Reset form
        event.target.reset();
    }, 2000);
}

// Mobile menu
function initMobileMenu() {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", () => {
            // Simple alert for demo - in production, this would show a proper mobile menu
            showNotification(
                "Mobile menu would open here. This is a demo version.",
                "info",
            );
        });
    }
}

// Event handlers
function initEventHandlers() {
    // Add click handlers for CTA buttons
    document.querySelectorAll("[data-scroll-to]").forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("data-scroll-to");
            scrollToSection(target);
        });
    });

    // Add animation to cards on hover
    document.querySelectorAll(".card-hover").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-8px) scale(1.02)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)";
        });
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

function openMaps(address) {
    const encodedAddress = encodeURIComponent(address);
    const userAgent = navigator.userAgent;
    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            userAgent,
        );

    if (isMobile && /iPhone|iPad|iPod/i.test(userAgent)) {
        // iOS - try Apple Maps first
        window.open(`maps://maps.apple.com/?q=${encodedAddress}`, "_blank");
    } else {
        // Android or Desktop - use Google Maps
        window.open(
            `https://maps.google.com/maps?q=${encodedAddress}`,
            "_blank",
        );
    }
}

function showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;

    // Set colors based on type
    switch (type) {
        case "success":
            notification.className += " bg-green-500 text-white";
            break;
        case "error":
            notification.className += " bg-red-500 text-white";
            break;
        case "warning":
            notification.className += " bg-yellow-500 text-black";
            break;
        default:
            notification.className += " bg-blue-500 text-white";
    }

    notification.innerHTML = `
        <div class="flex items-center">
            <span class="flex-1">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-current opacity-70 hover:opacity-100">
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Initialize Lucide icons for the notification
    lucide.createIcons();

    // Show notification
    setTimeout(() => {
        notification.classList.remove("translate-x-full");
    }, 100);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.add("translate-x-full");
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Contact form with enhanced validation
function handleContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Enhanced validation
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || name.length < 2) {
        showNotification(
            "Please enter a valid name (at least 2 characters)",
            "error",
        );
        return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showNotification("Please enter a valid email address", "error");
        return;
    }

    if (!subject || subject.length < 5) {
        showNotification(
            "Please enter a subject (at least 5 characters)",
            "error",
        );
        return;
    }

    if (!message || message.length < 10) {
        showNotification(
            "Please enter a message (at least 10 characters)",
            "error",
        );
        return;
    }

    // If validation passes
    showNotification(
        "Thank you for your message! We'll get back to you soon.",
        "success",
    );
    form.reset();
}

// Partnership form handler
function handlePartnershipForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Basic validation
    const requiredFields = ["name", "restaurant", "phone", "email"];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            showNotification(`Please fill in the ${field} field`, "error");
            return;
        }
    }

    showNotification(
        "Thank you for your interest! We'll contact you soon about partnership opportunities.",
        "success",
    );
    form.reset();
}

// Keyboard accessibility
document.addEventListener("keydown", function (e) {
    // ESC key to close modals/notifications
    if (e.key === "Escape") {
        const notifications = document.querySelectorAll(".fixed.top-4.right-4");
        notifications.forEach((notification) => notification.remove());
    }

    // Enter key on buttons
    if (e.key === "Enter" && e.target.tagName === "BUTTON") {
        e.target.click();
    }
});

// Performance optimization - lazy loading for images
if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove("lazy");
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
    });
}

// Events navigation functionality
function initEventsNavigation() {
    const eventsContainer = document.getElementById("events-container");
    const scrollLeftBtn = document.getElementById("events-scroll-left");
    const scrollRightBtn = document.getElementById("events-scroll-right");

    if (!eventsContainer || !scrollLeftBtn || !scrollRightBtn) {
        return;
    }

    // Remove existing event listeners to avoid duplicates
    if (scrollLeftBtn._scrollHandler) {
        scrollLeftBtn.removeEventListener(
            "click",
            scrollLeftBtn._scrollHandler,
        );
    }
    if (scrollRightBtn._scrollHandler) {
        scrollRightBtn.removeEventListener(
            "click",
            scrollRightBtn._scrollHandler,
        );
    }
    if (eventsContainer._scrollHandler) {
        eventsContainer.removeEventListener(
            "scroll",
            eventsContainer._scrollHandler,
        );
    }

    // Function to check scroll position and update button states
    function updateButtonStates() {
        const { scrollLeft, scrollWidth, clientWidth } = eventsContainer;
        const canScrollLeft = scrollLeft > 0;
        const canScrollRight = scrollLeft < scrollWidth - clientWidth - 10;

        // Update left button
        if (canScrollLeft) {
            scrollLeftBtn.classList.remove("opacity-50", "cursor-not-allowed");
            scrollLeftBtn.classList.add("opacity-100", "hover:scale-110");
            scrollLeftBtn.disabled = false;
        } else {
            scrollLeftBtn.classList.add("opacity-50", "cursor-not-allowed");
            scrollLeftBtn.classList.remove("opacity-100", "hover:scale-110");
            scrollLeftBtn.disabled = true;
        }

        // Update right button
        if (canScrollRight) {
            scrollRightBtn.classList.remove("opacity-50", "cursor-not-allowed");
            scrollRightBtn.classList.add("opacity-100", "hover:scale-110");
            scrollRightBtn.disabled = false;
        } else {
            scrollRightBtn.classList.add("opacity-50", "cursor-not-allowed");
            scrollRightBtn.classList.remove("opacity-100", "hover:scale-110");
            scrollRightBtn.disabled = true;
        }
    }

    // Scroll left function
    function scrollLeft() {
        if (eventsContainer) {
            const cardWidth = 320 + 24; // Card width + gap
            eventsContainer.scrollBy({
                left: -cardWidth,
                behavior: "smooth",
            });
        }
    }

    // Scroll right function
    function scrollRight() {
        if (eventsContainer) {
            const cardWidth = 320 + 24; // Card width + gap
            eventsContainer.scrollBy({
                left: cardWidth,
                behavior: "smooth",
            });
        }
    }

    // Store event handlers for cleanup
    scrollLeftBtn._scrollHandler = scrollLeft;
    scrollRightBtn._scrollHandler = scrollRight;
    eventsContainer._scrollHandler = updateButtonStates;

    // Add event listeners
    scrollLeftBtn.addEventListener("click", scrollLeft);
    scrollRightBtn.addEventListener("click", scrollRight);
    eventsContainer.addEventListener("scroll", updateButtonStates);

    // Initial button state check
    updateButtonStates();

    // Update button states on window resize
    window.addEventListener("resize", updateButtonStates);

    // Make updateButtonStates available globally for external calls
    window.updateButtonStates = updateButtonStates;
}

// Initialize events navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Wait a bit for other scripts to load
    setTimeout(initEventsNavigation, 100);
});
