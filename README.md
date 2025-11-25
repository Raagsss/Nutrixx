# NutriCare - Health & Wellness Affiliate Website

A modern, responsive e-commerce website for health and wellness products with integrated affiliate marketing. Built with vanilla HTML5, CSS3, and JavaScript for optimal performance and user experience.

![NutriCare](https://img.shields.io/badge/Status-Live-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Overview

NutriCare is a premium health and wellness platform that curates and promotes high-quality supplements, skincare solutions, and natural health products. The website features an elegant design, comprehensive product reviews, and seamless affiliate integration for monetization.

## ✨ Features

### 🛍️ E-Commerce Features
- **Shop Page**: Browse curated health supplements, skincare, and wellness products
- **Bundles Page**: Discover value-packed health and wellness bundles
- **Product Listings**: Beautiful product cards with pricing, descriptions, and call-to-action buttons
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 📝 Content & Blogging
- **Blog Section**: Comprehensive product reviews and health insights
- **Product Reviews**: Detailed, SEO-optimized reviews for:
  - NeuroEnergizer (Binaural Beats Program)
  - ProDentim (Oral Health Probiotic)
  - Mitolyn (Metabolism Support)
  - TruVarin (Hair Growth Formula)
  - FoliPrime (Hair Support Serum)
  - Hydrossential (Skincare Serum)
  - Metanail (Nail & Feet Complex)
  - Totally Bangin (Self Tanner)
  - Audifort (Hearing Support)
- **Related Articles**: Cross-linking between related product reviews

### 💰 Affiliate Marketing Ready
- **Click Tracking**: Built-in affiliate link tracking system
- **Affiliate Config**: Centralized configuration file for managing affiliate links
- **Analytics Ready**: Prepared for Google Analytics and Facebook Pixel integration
- **Conversion Optimization**: Strategically placed CTAs and affiliate disclosures
- **Multiple Networks**: Support for ClickBank, Amazon Associates, and other networks

### 🎨 Design & UX
- **Modern Typography**: Playfair Display, Inter, and Worry-Free fonts
- **Elegant Color Scheme**: Warm earth tones with professional styling
- **Smooth Animations**: Hover effects and transitions for enhanced user experience
- **Mobile-First**: Fully responsive design with mobile navigation menu
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

## 📁 Project Structure

```
NutriCare/
├── index.html                      # Homepage
├── shop.html                       # Product shop page
├── bundles.html                    # Product bundles page
├── blogs.html                      # Blog listing page
├── *.html                          # Individual product review pages
├── styles.css                      # Main stylesheet (responsive design)
├── script.js                       # JavaScript functionality
├── affiliate-config.js             # Affiliate links configuration
├── product images/                 # Product images directory
│   ├── neuroenergizer.webp
│   ├── mitolyn.avif
│   ├── truvarin.png
│   └── ...
└── README.md                       # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A web server (optional, for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/NutriCare.git
   cd NutriCare
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser, or
   - Use a local server like Live Server in VS Code

3. **Customize affiliate links**
   - Update affiliate links in `affiliate-config.js`
   - Modify product links in individual HTML files as needed

## 🔧 Configuration

### Adding Affiliate Links

Update the affiliate links in `affiliate-config.js`:

```javascript
const AFFILIATE_CONFIG = {
    products: {
        product_name: {
            affiliateLinks: {
                clickbank: 'https://your-hoplink.com/product',
                amazon: 'https://amazon.com/dp/PRODUCT_ID?tag=your-tag'
            }
        }
    }
};
```

### Analytics Integration

Add your tracking codes to the HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

<!-- Facebook Pixel -->
<script>
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
</script>
```

## 📄 Pages

- **Home** (`index.html`): Hero section, featured products, and blog preview
- **Shop** (`shop.html`): Complete product catalog with filters
- **Bundles** (`bundles.html`): Curated product bundles and packages
- **Blogs** (`blogs.html`): Blog post listing with featured articles
- **Product Reviews**: Individual review pages for each product

## 🎨 Design System

### Colors
- Primary: `#8B4513` (Saddle Brown)
- Background: `#F5F5F0` (Off-white)
- Text: `#2C2C2C` (Dark Gray)
- Footer: `#E0E0D8` (Light Gray)

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)
- **Accent**: Worry-Free, Basis Grotesque Pro

### Font Sizes
- Hero Titles: 48px - 72px
- Section Titles: 36px - 48px
- Body Text: 14px - 16px

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔒 Security Features

- Content Security Policy (CSP) headers
- Secure external resource loading
- XSS protection measures

## 📈 SEO Features

- Semantic HTML5 structure
- Meta tags and Open Graph tags
- JSON-LD structured data
- Alt text for all images
- Mobile-friendly design
- Fast loading times

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👤 Author

**NutriCare Team**
- Made by R²

## 🙏 Acknowledgments

- Product images and information from respective manufacturers
- Fonts provided by Google Fonts and Adobe Fonts
- Design inspiration from modern e-commerce platforms

## 📞 Support

For questions or support, please open an issue in the GitHub repository.

---

**Transform your wellness journey with NutriCare** 🌿✨