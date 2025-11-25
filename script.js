// Banner functionality
function closeBanner() {
    const banner = document.querySelector('.top-banner');
    banner.classList.add('hidden');
    
    // Adjust header position after banner is hidden
    const header = document.querySelector('.header');
    header.style.top = '0';
}

// Shopping cart functionality
let cartCount = 0;

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartCount;
}

// Add to cart functionality (for affiliate links)
function addToCart(productId, affiliateLink) {
    cartCount++;
    updateCartCount();
    
    // Track the click for analytics
    trackAffiliateClick(productId, affiliateLink);
    
    // Redirect to affiliate link
    window.open(affiliateLink, '_blank');
}

// Enhanced affiliate tracking function
function trackAffiliateClick(productId, affiliateLink) {
    // Use the affiliate configuration if available
    if (typeof trackAffiliateClick !== 'undefined' && typeof AFFILIATE_CONFIG !== 'undefined') {
        // Use the enhanced tracking from affiliate-config.js
        trackAffiliateClick(productId, 'default', affiliateLink);
    } else {
        // Fallback tracking
        console.log('Affiliate click tracked:', {
            productId: productId,
            affiliateLink: affiliateLink,
            timestamp: new Date().toISOString()
        });
        
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'affiliate_click', {
                'product_id': productId,
                'affiliate_link': affiliateLink
            });
        }
        
        // Facebook Pixel tracking
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: productId
            });
        }
    }
}

// Search functionality
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    if (!searchBtn) return;
    
    // Check if search input already exists
    let searchInput = document.querySelector('.search-input');
    
    if (!searchInput) {
        searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search products...';
        searchInput.className = 'search-input';
        
        // Position the search input inline within nav-right
        const navRight = document.querySelector('.nav-right');
        if (navRight) {
            navRight.appendChild(searchInput);
        } else {
            return; // No nav-right found
        }
    }
    
    let isSearchOpen = false;
    
    // Remove existing event listeners by cloning and replacing
    const newSearchBtn = searchBtn.cloneNode(true);
    searchBtn.parentNode.replaceChild(newSearchBtn, searchBtn);
    
    const handleSearchToggle = function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        if (!isSearchOpen) {
            searchInput.classList.add('show');
            // Small delay to ensure the input is visible before focusing
            setTimeout(() => {
                searchInput.focus();
                // On mobile, scroll search into view if needed
                if (window.innerWidth <= 768) {
                    searchInput.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                }
            }, 100);
            isSearchOpen = true;
        } else {
            searchInput.classList.remove('show');
            searchInput.value = '';
            isSearchOpen = false;
            // Clear search results if any
            clearSearchResults();
        }
    };
    
    newSearchBtn.addEventListener('click', handleSearchToggle);
    newSearchBtn.addEventListener('touchend', handleSearchToggle);
    
    // Search as you type (with debounce)
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const searchTerm = this.value.trim();
        
        if (searchTerm.length > 0) {
            searchTimeout = setTimeout(() => {
                performSearch(searchTerm);
            }, 300); // Wait 300ms after user stops typing
        } else {
            clearSearchResults();
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = this.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        }
    });
    
    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (isSearchOpen && !searchInput.contains(e.target) && !newSearchBtn.contains(e.target)) {
            searchInput.classList.remove('show');
            searchInput.value = '';
            isSearchOpen = false;
            clearSearchResults();
        }
    });
    
    // Close search on escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.classList.remove('show');
            searchInput.value = '';
            isSearchOpen = false;
            clearSearchResults();
        }
    });
}

// Global variables for filtering
let activeCategory = 'all';
let currentSearchTerm = '';

// Search function - searches through products on the page
function performSearch(searchTerm) {
    console.log('Searching for:', searchTerm);
    currentSearchTerm = searchTerm;
    
    // If not on shop page, redirect to shop page with search term
    const currentPath = window.location.pathname;
    const isShopPage = currentPath.includes('shop.html');
    const isHomePage = currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/');
    
    if (!isShopPage && (isHomePage || currentPath.includes('index.html'))) {
        // Store search term in sessionStorage and redirect to shop page
        sessionStorage.setItem('searchTerm', searchTerm);
        window.location.href = 'shop.html';
        return;
    }
    
    // Apply both category and search filters
    applyFilters();
}

// Apply both category and search filters together
function applyFilters() {
    const searchTermLower = currentSearchTerm ? currentSearchTerm.toLowerCase().trim() : '';
    let visibleCount = 0;
    
    // Get all product cards
    const productCards = document.querySelectorAll('.product-listing-card, .product-card');
    
    if (productCards.length === 0) {
        // No products on this page, redirect to shop
        if (currentSearchTerm) {
            sessionStorage.setItem('searchTerm', currentSearchTerm);
            window.location.href = 'shop.html';
        }
        return;
    }
    
    console.log('Applying filters - Category:', activeCategory, 'Search:', currentSearchTerm);
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-listing-name, .product-name');
        const productVolume = card.querySelector('.product-listing-volume, .product-size');
        const productCategory = (card.getAttribute('data-category') || 'all').toLowerCase();
        const activeCatLower = (activeCategory || 'all').toLowerCase();
        
        // Check category filter
        const categoryMatch = activeCatLower === 'all' || productCategory === activeCatLower;
        
        // Check search filter
        let searchMatch = true;
        if (searchTermLower && searchTermLower.length > 0) {
            const nameText = productName ? productName.textContent.toLowerCase() : '';
            const volumeText = productVolume ? productVolume.textContent.toLowerCase() : '';
            searchMatch = nameText.includes(searchTermLower) || volumeText.includes(searchTermLower);
        }
        
        // Show product if both filters match
        if (categoryMatch && searchMatch) {
            card.style.opacity = '1';
            card.style.display = '';
            card.style.visibility = 'visible';
            if (searchTermLower) {
                card.classList.add('search-match');
            } else {
                card.classList.remove('search-match');
            }
            visibleCount++;
        } else {
            // Hide product if either filter doesn't match
            card.style.opacity = '0';
            card.style.display = 'none';
            card.style.visibility = 'hidden';
            card.classList.remove('search-match');
        }
    });
    
    console.log('Visible products:', visibleCount);
    
    // Show/hide no results message
    if (visibleCount === 0) {
        const filterText = currentSearchTerm 
            ? `No products found${activeCategory !== 'all' ? ` in ${activeCategory}` : ''} for "${currentSearchTerm}"`
            : `No products found in ${activeCategory}`;
        showNoResultsMessage(filterText);
    } else {
        hideNoResultsMessage();
        
        // Scroll to first visible result
        const firstVisible = Array.from(productCards).find(card => {
            return card.style.display !== 'none' && card.style.opacity !== '0';
        });
        if (firstVisible && window.location.pathname.includes('shop.html')) {
            setTimeout(() => {
                firstVisible.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }
}

// Clear search results
function clearSearchResults() {
    currentSearchTerm = '';
    applyFilters(); // Reapply category filter only
}

// Show no results message
function showNoResultsMessage(message) {
    let noResultsMsg = document.getElementById('search-no-results');
    if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'search-no-results';
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.style.cssText = 'text-align: center; padding: 40px 20px; color: #666; font-size: 16px;';
        
        // Insert after product grid or section
        const productSection = document.querySelector('.product-listing-section, .product-section');
        if (productSection) {
            const productGrid = productSection.querySelector('.product-listing-grid, .product-grid');
            if (productGrid) {
                productGrid.parentNode.insertBefore(noResultsMsg, productGrid.nextSibling);
            }
        }
    }
    noResultsMsg.innerHTML = `<p>${message}</p>`;
    noResultsMsg.style.display = 'block';
}

// Hide no results message
function hideNoResultsMessage() {
    const noResultsMsg = document.getElementById('search-no-results');
    if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Category filtering functionality
function initCategoryFilter() {
    const categoryTabs = document.querySelectorAll('.nav-tab[data-category]');
    
    if (categoryTabs.length === 0) {
        console.log('No category tabs found');
        return;
    }
    
    console.log('Initializing category filter with', categoryTabs.length, 'tabs');
    
    categoryTabs.forEach(tab => {
        // Support both click and touch events for better mobile experience
        const handleCategoryClick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Category tab clicked:', this.getAttribute('data-category'));
            
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update active category
            activeCategory = this.getAttribute('data-category') || 'all';
            
            console.log('Active category set to:', activeCategory);
            
            // Apply filters (category + search)
            applyFilters();
            
            // Scroll category tabs into view on mobile if needed
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }, 100);
            }
        };
        
        tab.addEventListener('click', handleCategoryClick);
        tab.addEventListener('touchend', handleCategoryClick);
    });
    
    // Initialize with 'all' category
    activeCategory = 'all';
    console.log('Category filter initialized');
}

// Shop Now button functionality
function initShopNow() {
    const shopNowBtn = document.querySelector('.shop-now-btn');
    if (!shopNowBtn) return; // Exit if button doesn't exist
    
    shopNowBtn.addEventListener('click', function() {
        // This would redirect to your main product page or affiliate link
        window.location.href = '#products';
        
        // For affiliate marketing, you might want to track this click
        trackAffiliateClick('hero_shop_now', '#products');
    });
}

// Purchase button functionality
function initPurchaseBtn() {
    const purchaseBtn = document.querySelector('.purchase-btn');
    if (!purchaseBtn) return; // Exit if button doesn't exist
    
    purchaseBtn.addEventListener('click', function() {
        // This would redirect to your main affiliate product page
        window.location.href = '#purchase';
        
        // Track the purchase button click
        trackAffiliateClick('header_purchase', '#purchase');
    });
}

// Navigation smooth scrolling - only for hash links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navLinks.length === 0) return;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for hash links (anchor links on same page)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For regular page links (shop.html, bundles.html, etc.), let them navigate normally
        });
    });
    
    // Also handle mobile nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for hash links
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For regular page links, let them navigate normally
            // Also close mobile menu after navigation
            if (targetId && !targetId.startsWith('#')) {
                const mobileMenu = document.getElementById('mobile-nav');
                if (mobileMenu) {
                    setTimeout(() => {
                        mobileMenu.style.display = 'none';
                    }, 100);
                }
            }
        });
    });
}


// Toggle mobile menu function
function toggleMenu() {
    const menu = document.getElementById('mobile-nav');
    
    if (menu) {
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
            menu.style.position = 'fixed';
            menu.style.top = '60px';
            menu.style.left = '20px';
            menu.style.backgroundColor = '#8B7355';
            menu.style.borderRadius = '8px';
            menu.style.padding = '20px';
            menu.style.zIndex = '1000';
            menu.style.minWidth = '200px';
            menu.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            menu.style.display = 'none';
        }
    }
}

// Mobile Menu Initialization
function initMobileMenu() {
    const menu = document.getElementById('mobile-nav');
    
    if (menu) {
        // Initially hide the menu
        menu.style.display = 'none';
        console.log('Mobile menu initialized');
    }
}

// See All button functionality for Health Essentials
function initSeeAllButtons() {
    console.log('Initializing See All buttons...');
    
    // Use event delegation to ensure buttons are captured
    document.addEventListener('click', function(e) {
        // Check if clicked element is a See All button
        if (e.target.classList.contains('see-all-btn')) {
            e.preventDefault();
            console.log('Health Essentials See All clicked!');
            window.location.href = 'shop.html';
        }
    });
    
    // Also try direct event listeners as backup
    setTimeout(() => {
        const seeAllBtn = document.querySelector('.see-all-btn');
        
        console.log('Health Essentials button found:', seeAllBtn);
        
        if (seeAllBtn) {
            seeAllBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Direct Health Essentials See All clicked!');
                window.location.href = 'shop.html';
            });
        }
    }, 100);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize category filter first
        initCategoryFilter();
        
        initSearch();
        initShopNow();
        initPurchaseBtn();
        initSmoothScrolling();
        initMobileMenu();
        initSeeAllButtons();
        updateCartCount();
        
        // Check if there's a stored search term (from redirect)
        const storedSearchTerm = sessionStorage.getItem('searchTerm');
        if (storedSearchTerm && window.location.pathname.includes('shop.html')) {
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.value = storedSearchTerm;
                searchInput.classList.add('show');
                setTimeout(() => {
                    performSearch(storedSearchTerm);
                    sessionStorage.removeItem('searchTerm');
                }, 300);
            }
        } else {
            // Initialize with all products visible
            activeCategory = 'all';
            currentSearchTerm = '';
            // Don't apply filters initially - show all products
            // Only apply filters when user interacts
        }
        
        // Add loading animation
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.hero-content, .nav-link');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Sticky product navigation functionality
function initStickyProductNav() {
    const productNavSection = document.querySelector('.product-nav-section');
    const heroSection = document.querySelector('.hero-section');
    
    if (!productNavSection || !heroSection) return;
    
    let isSticky = false;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        // Check if we've scrolled past the hero section
        if (currentScrollY >= heroBottom) {
            if (!isSticky) {
                productNavSection.style.position = 'fixed';
                productNavSection.style.top = '60px'; /* Position directly below navbar */
                productNavSection.style.width = '100%';
                productNavSection.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                productNavSection.style.marginTop = '0';
                productNavSection.style.zIndex = '999';
                isSticky = true;
            }
        } else {
            if (isSticky) {
                productNavSection.style.position = 'sticky';
                productNavSection.style.top = '80px';
                productNavSection.style.width = 'auto';
                productNavSection.style.boxShadow = 'none';
                productNavSection.style.marginTop = '-20px';
                productNavSection.style.zIndex = '998';
                isSticky = false;
            }
        }
    }
    
    window.addEventListener('scroll', handleScroll);
}

// Current page highlighting functionality
function highlightCurrentPage() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Remove current-page class from all links
    navLinks.forEach(link => link.classList.remove('current-page'));
    mobileNavLinks.forEach(link => link.classList.remove('current-page'));
    
    // Add current-page class to matching links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPage.includes(href) || (currentPage === '/' && href === 'index.html'))) {
            link.classList.add('current-page');
        }
    });
    
    mobileNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPage.includes(href) || (currentPage === '/' && href === 'index.html'))) {
            link.classList.add('current-page');
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initStickyProductNav();
    highlightCurrentPage();
});

