# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

xaround is a static landing page website for the xaround iOS app - a campus-based anonymous social networking platform. The website serves as the main marketing and information hub at xaroundapp.com.

## Technical Stack

- **Static HTML** pages (no server-side rendering)
- **Tailwind CSS v3.3.7** for styling with custom configuration
- **Vanilla JavaScript** for interactive features
- **GitHub Pages** for hosting (CNAME configured for xaroundapp.com)
- **Node.js** for build tooling (Tailwind CSS compilation)

## Build Commands

```bash
# Install dependencies
npm install

# Build production CSS (minified)
npm run build

# Watch mode for development (auto-rebuild on file changes)
npm run watch
```

Both commands process `/src/styles.css` and output to `/public/assets/css/output.css`.

## Project Structure

```
/
├── public/                      # All publicly served files
│   ├── index.html              # Homepage
│   ├── pages/                  # Sub-pages
│   │   ├── about.html          # About page
│   │   ├── community-guidelines.html # Community guidelines
│   │   └── terms-and-privacy.html    # Terms and privacy policy
│   └── assets/                 # All static assets
│       ├── css/
│       │   └── output.css      # Compiled Tailwind CSS
│       ├── js/
│       │   └── main.js         # Interactive features
│       └── images/
│           ├── icons/          # SVG icons and logos
│           ├── screenshots/    # App screenshots
│           ├── logos/          # Brand logos
│           └── favicon_io/     # Favicon files and manifests
├── src/
│   └── styles.css              # Source CSS with Tailwind directives
└── docs/
    ├── style-guide.md          # Design system documentation
    └── content/
        └── text-guide.md       # Website copy and content
```

## Key Features

### Dynamic Background Colors
The website uses a section-based background color system (main.js:1-45):
- Monitors scroll position
- Changes background color based on which section is visible
- Colors: #E5F4E8 (hero), #E8F0FE (features), #F9E5D8 (testimonials), #F3E8FF (CTA)

### Mobile Navigation
Hamburger menu system for mobile devices (main.js:47-66):
- Toggle between hamburger and X icon
- Show/hide mobile menu
- Handles click-outside to close

## Custom Tailwind Configuration

The project extends Tailwind with custom values (tailwind.config.js):

### Colors
- `'x-yellow'`: #FFD43D
- `'x-brown'`: #8B4513
- `'x-green'`: #E5F4E8
- `'x-blue'`: #E8F0FE
- `'x-orange'`: #F9E5D8
- `'x-purple'`: #F3E8FF

### Fonts
- Primary: 'Inter' (loaded from Google Fonts)

### Transitions
- Custom duration: `'2000'`: 2000ms

## Design Guidelines

### Layout Breakpoints (style-guide.md)
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Color Scheme
- Primary: Yellow (#FFD43D)
- Text: Dark gray/black
- Backgrounds: Soft pastels (green, blue, orange, purple)

### Typography
- Font: Inter (400, 600, 700, 900 weights)
- Responsive sizing using Tailwind classes

## Content Structure

### Pages
1. **Homepage** - Hero section, features, how it works, testimonials, CTA
2. **About** - Company story, values, team, campus focus
3. **Community Guidelines** - Rules for respectful engagement
4. **Terms & Privacy** - Legal documentation

### Key Messaging
- "Share your thoughts anonymously"
- "Built for your campus community"
- Focus on authentic, respectful interactions

## Development Notes

### Current Git Status
- Modified files: All HTML pages and output.css
- Untracked: favicon files and new logo
- Branch: main

### Important Considerations
- No JavaScript framework or bundler
- No testing framework configured
- Simple deployment via GitHub Pages
- Mobile-first responsive design
- Accessibility features included (semantic HTML, ARIA labels)

## Future Considerations

When working on this codebase:
1. Replace Lorem Ipsum content in testimonials with real user feedback
2. Consider adding meta tags for better SEO
3. The app screenshots in /images/ may need updating as the app evolves
4. Monitor Tailwind CSS updates for potential improvements