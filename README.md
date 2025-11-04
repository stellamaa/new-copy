# Portfolio Website Template

A modern, clean portfolio website template inspired by [Ananda Ferreira's website](https://www.anandaferreira.com/). This template is fully customizable and easy to use.

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. Customize your content by editing the `config` object in `script.js`
3. Add your images to the `images/` folder
4. Update image paths in the portfolio section

## 📁 File Structure

```
stellanew/
├── index.html          # Main HTML file
├── styles.css         # CSS styling
├── script.js          # JavaScript configuration
├── images/            # Your portfolio images
│   └── README.md      # Image guidelines
└── README.md          # This file
```

## 🎨 Customization Guide

### 1. Personal Information
Edit the `config` object in `script.js`:

```javascript
const config = {
    name: "Your Name",
    tagline: "Visual Designer", 
    location: "Based in Your City, Country",
    aboutText: "Your bio and description...",
    phone: "+1 234 567 8900",
    email: "your.email@example.com"
};
```

### 2. Services
Update the services array:

```javascript
services: [
    "Art Direction",
    "Photography",
    "Web Development",
    "Brand Design"  // Add your services
]
```

### 3. Portfolio Projects
Add your projects to the portfolio array:

```javascript
portfolio: [
    {
        title: "Project Name",
        client: "Client Name", 
        year: "2024",
        service: "Service Type",
        image: "images/your-image.jpg",
        description: "Project description"
    }
]
```

### 4. Adding Images
1. Add your images to the `images/` folder
2. Update the `image` path in your portfolio items
3. Recommended: 800x600px or larger, under 2MB

## 🎯 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Typography**: Clean, professional fonts
- **Smooth Animations**: Subtle hover effects and transitions
- **Easy Customization**: All content managed through JavaScript config
- **Image Fallbacks**: Automatic placeholder for missing images
- **Contact Integration**: Click-to-call and email buttons

## 🛠️ Technical Details

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No dependencies required
- **Google Fonts**: Inter font family
- **Responsive**: Mobile-first design approach

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Local Development
Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

### Web Hosting
Upload all files to your web hosting provider:
- Upload `index.html`, `styles.css`, `script.js` to your domain root
- Upload your images to the `images/` folder
- Update any absolute paths if needed

## 🎨 Styling Customization

### Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #000;
    --text-color: #333;
    --background-color: #fff;
    --border-color: #eee;
}
```

### Typography
Change fonts by updating the Google Fonts import in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600&display=swap" rel="stylesheet">
```

## 📞 Support

This template is designed to be simple and self-contained. All customization is done through the `config` object in `script.js`.

## 📄 License

This template is free to use for personal and commercial projects.

---

**Inspired by**: [Ananda Ferreira](https://www.anandaferreira.com/) - A beautiful, minimal portfolio design.










# newsite
