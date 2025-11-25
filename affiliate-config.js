// Affiliate Marketing Configuration
// Update these settings with your actual affiliate links and tracking information

const AFFILIATE_CONFIG = {
    // Your affiliate network settings
    networks: {
        amazon: {
            tag: 'your-amazon-tag', // Replace with your Amazon Associate ID
            baseUrl: 'https://amazon.com/dp/'
        },
        shareasale: {
            merchantId: 'your-merchant-id', // Replace with your ShareASale merchant ID
            baseUrl: 'https://www.shareasale.com/r.cfm?'
        },
        clickbank: {
            hoplink: 'your-hoplink', // Replace with your ClickBank hoplink
            baseUrl: 'https://your-hoplink.com/'
        }
    },
    
    // Product categories and their affiliate links
    products: {
        skincare_essentials: {
            name: 'Skincare Essentials Bundle',
            category: 'skincare',
            affiliateLinks: {
                amazon: 'https://amazon.com/dp/B08XYZ123?tag=your-amazon-tag',
                shareasale: 'https://www.shareasale.com/r.cfm?u=123456&m=789&b=123456',
                clickbank: 'https://your-hoplink.com/skincare-essentials'
            },
            price: '$49.99',
            description: 'Complete skincare routine for all skin types'
        },
        face_cleanser: {
            name: 'Gentle Face Cleanser',
            category: 'cleansers',
            affiliateLinks: {
                amazon: 'https://amazon.com/dp/B08ABC456?tag=your-amazon-tag',
                shareasale: 'https://www.shareasale.com/r.cfm?u=123456&m=789&b=234567'
            },
            price: '$24.99',
            description: 'Gentle daily cleanser for sensitive skin'
        },
        moisturizer: {
            name: 'Hydrating Moisturizer',
            category: 'moisturizers',
            affiliateLinks: {
                amazon: 'https://amazon.com/dp/B08DEF789?tag=your-amazon-tag',
                shareasale: 'https://www.shareasale.com/r.cfm?u=123456&m=789&b=345678'
            },
            price: '$34.99',
            description: '24-hour hydration for all skin types'
        }
    },
    
    // Analytics and tracking settings
    analytics: {
        googleAnalytics: {
            trackingId: 'GA-XXXXXXXXX', // Replace with your GA4 tracking ID
            enabled: true
        },
        facebookPixel: {
            pixelId: 'XXXXXXXXXXXXXXX', // Replace with your Facebook Pixel ID
            enabled: true
        },
        conversionTracking: {
            enabled: true,
            events: {
                pageView: 'page_view',
                affiliateClick: 'affiliate_click',
                addToCart: 'add_to_cart',
                purchase: 'purchase'
            }
        }
    },
    
    // SEO and marketing settings
    seo: {
        siteName: 'Avenda - Skincare Essentials',
        description: 'Discover premium skincare and hygiene products. Expert recommendations for all skin types.',
        keywords: ['skincare', 'beauty', 'hygiene', 'face care', 'skin care products', 'beauty essentials'],
        socialMedia: {
            facebook: 'https://facebook.com/your-page',
            instagram: 'https://instagram.com/your-account',
            twitter: 'https://twitter.com/your-account'
        }
    },
    
    // A/B testing configuration
    abTesting: {
        enabled: false,
        variants: {
            heroButton: {
                control: 'Shop Now',
                variant1: 'Get Started',
                variant2: 'Discover More'
            },
            heroTitle: {
                control: 'The New Skincare Essentials',
                variant1: 'Premium Skincare Collection',
                variant2: 'Transform Your Skin Today'
            }
        }
    }
};

// Function to get affiliate link for a specific product and network
function getAffiliateLink(productId, network = 'amazon') {
    const product = AFFILIATE_CONFIG.products[productId];
    if (!product) {
        console.error('Product not found:', productId);
        return '#';
    }
    
    const affiliateLink = product.affiliateLinks[network];
    if (!affiliateLink) {
        console.error('Affiliate link not found for network:', network);
        return '#';
    }
    
    return affiliateLink;
}

// Function to track affiliate clicks with detailed analytics
function trackAffiliateClick(productId, network, link) {
    const product = AFFILIATE_CONFIG.products[productId];
    
    // Google Analytics tracking
    if (AFFILIATE_CONFIG.analytics.googleAnalytics.enabled && typeof gtag !== 'undefined') {
        gtag('event', AFFILIATE_CONFIG.analytics.conversionTracking.events.affiliateClick, {
            'product_id': productId,
            'product_name': product ? product.name : 'Unknown',
            'product_category': product ? product.category : 'Unknown',
            'affiliate_network': network,
            'affiliate_link': link,
            'value': product ? parseFloat(product.price.replace('$', '')) : 0
        });
    }
    
    // Facebook Pixel tracking
    if (AFFILIATE_CONFIG.analytics.facebookPixel.enabled && typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: product ? product.name : productId,
            content_category: product ? product.category : 'skincare',
            value: product ? parseFloat(product.price.replace('$', '')) : 0
        });
    }
    
    // Custom tracking (you can add your own tracking service here)
    console.log('Affiliate click tracked:', {
        productId: productId,
        productName: product ? product.name : 'Unknown',
        network: network,
        link: link,
        timestamp: new Date().toISOString()
    });
}

// Function to get the best performing affiliate network for a product
function getBestAffiliateLink(productId) {
    // This could be enhanced with actual performance data
    // For now, it returns the first available link
    const product = AFFILIATE_CONFIG.products[productId];
    if (!product) return '#';
    
    const networks = Object.keys(product.affiliateLinks);
    return networks.length > 0 ? product.affiliateLinks[networks[0]] : '#';
}

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AFFILIATE_CONFIG,
        getAffiliateLink,
        trackAffiliateClick,
        getBestAffiliateLink
    };
}
