# Hungama Nights - Static Website Export

This is a static HTML/CSS/JavaScript version of the Hungama Nights website, exported for easy deployment to any web server.

## Files Included

- `index.html` - Main website file with all content and functionality
- `styles.css` - Additional custom styles and responsive design
- `script.js` - Interactive JavaScript functionality
- `README.md` - This documentation file

## Features

### ✅ Complete Website Content
- **Hero Section** - Welcome message and branding
- **About Us** - Story and mission with feature icons
- **Upcoming Events** - Event cards with sample data
- **Restaurant Partnership** - Partnership inquiry form
- **Gallery** - Placeholder image grid
- **Contact** - Contact form
- **Footer** - Links and social media

### ✅ Interactive Features
- **Smooth Scrolling** - Navigation and button clicks
- **Responsive Design** - Mobile-friendly layout
- **Form Validation** - Client-side form validation
- **Map Integration** - Click addresses to open maps
- **Hover Effects** - Card animations and interactions
- **Mobile Menu** - Responsive navigation (placeholder)

### ✅ Technologies Used
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling via CDN
- **Lucide Icons** - Beautiful icon library
- **Vanilla JavaScript** - No framework dependencies
- **Google Fonts** - Comfortaa font family

## Deployment Instructions

### Option 1: Simple File Upload
1. Upload all files to your web server's public directory
2. Ensure `index.html` is in the root folder
3. Access via your domain (e.g., `https://yourdomain.com`)

### Option 2: GitHub Pages
1. Create a new GitHub repository
2. Upload all files to the repository
3. Enable GitHub Pages in repository settings
4. Access via `https://username.github.io/repository-name`

### Option 3: Netlify/Vercel
1. Drag and drop the folder to Netlify or Vercel
2. Get instant deployment with custom domain options

### Option 4: Traditional Web Hosting
1. Use FTP/SFTP to upload files to your hosting provider
2. Place files in `public_html` or equivalent directory

## Customization Guide

### Colors and Branding
The website uses a consistent color scheme defined in the Tailwind config:
- **Primary Red**: `#DC2626` (hungama-red)
- **Orange**: `#EA580C` (hungama-orange)  
- **Yellow**: `#D97706` (hungama-yellow)

To change colors, update the Tailwind config in `index.html`:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'hungama-red': '#YOUR_COLOR',
                'hungama-orange': '#YOUR_COLOR',
                'hungama-yellow': '#YOUR_COLOR'
            }
        }
    }
}
```

### Content Updates
- **Text Content**: Edit directly in `index.html`
- **Event Data**: Update the sample event card in the Events section
- **Contact Info**: Modify footer and contact sections
- **Images**: Replace placeholder image URLs with actual images

### Forms
The forms currently show success messages but don't submit data. To make them functional:

1. **Add a backend service** (PHP, Node.js, Python, etc.)
2. **Use a form service** like Formspree, Netlify Forms, or EmailJS
3. **Update the JavaScript** in `script.js` to make real API calls

Example with Formspree:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Adding Real Events
To connect to a real event management system:
1. Replace the sample event data with API calls
2. Update the `script.js` to fetch events from your backend
3. Modify the event card template as needed

## Browser Support
- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes
- **Fast Loading**: No heavy frameworks or large dependencies
- **CDN Resources**: Tailwind CSS and Lucide icons loaded from CDN
- **Optimized Images**: Use WebP format for better compression
- **Lazy Loading**: Script includes intersection observer for images

## SEO Features
- ✅ Semantic HTML structure
- ✅ Meta tags for description and viewport
- ✅ Heading hierarchy (H1, H2, H3)
- ✅ Alt text placeholders for images
- ✅ Clean URLs with section anchors

## Accessibility
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Proper color contrast
- ✅ Screen reader friendly structure
- ✅ Form labels and validation

## Next Steps
1. **Add Real Content**: Replace placeholder text and images
2. **Connect Forms**: Set up form processing backend
3. **Add Analytics**: Google Analytics or similar tracking
4. **SSL Certificate**: Ensure HTTPS for security
5. **Domain Setup**: Configure custom domain name
6. **Event Management**: Connect to calendar or event system

## Support
For questions about this static export or the original dynamic application, please refer to the main project documentation or contact the development team.

---

**Note**: This is a static version for demonstration purposes. The original application includes a full React frontend with Express.js backend, database integration, and admin panel for event management.