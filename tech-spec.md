# Technical Specification - Dr. Samee Dental Clinic

## Component Inventory

### shadcn/ui Components (Built-in)
| Component | Purpose | Customization |
|-----------|---------|---------------|
| Button | CTAs, navigation | Custom colors, magnetic hover effect |
| Card | Service cards, info cards | Glassmorphism, lift animations |
| Accordion | FAQ section | Spring physics animation |
| Badge | Certification badges | Gradient backgrounds |
| Separator | Visual dividers | Animated lines |

### Third-Party Registry Components
| Component | Registry | Purpose |
|-----------|----------|---------|
| None required | - | Custom implementations preferred for this design |

### Custom Components
| Component | Purpose | Props |
|-----------|---------|-------|
| MagneticButton | CTA with magnetic hover | children, className, strength |
| ParallaxImage | Image with parallax scroll | src, alt, speed |
| SplitText | Character-by-character reveal | text, delay, className |
| GlassCard | Glassmorphism card | children, className, glowColor |
| HorizontalScroll | Pinned horizontal section | children, itemCount |
| Counter | Animated number counter | end, duration, suffix |
| WaveDivider | Animated SVG wave | amplitude, frequency, speed |

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero Image Scale & Reveal | GSAP | Clip-path circle animation on load | High |
| Split-Char Text Stagger | GSAP + SplitType | Split text, stagger from y:50 | High |
| Magnetic Button Hover | Custom React Hook | Track mouse, transform button | Medium |
| Wave Divider Movement | GSAP | SVG path morph on mouse move | High |
| Card 3D Unfold | GSAP ScrollTrigger | RotateX based on scroll position | Medium |
| Card Lift on Hover | CSS + Framer | Transform translateZ on hover | Low |
| Diagonal Image Wipe | GSAP | Clip-path polygon animation | High |
| Inner Image Parallax | GSAP ScrollTrigger | Object-position animation | Medium |
| Horizontal Service Scroll | GSAP ScrollTrigger | Pin section, translateX track | High |
| Service Card Zoom | CSS | Scale transform on hover | Low |
| Feature Image Glitch | Custom Canvas | Pixelate transition effect | High |
| CTA Parallax Window | CSS | Background-attachment: fixed | Low |
| Doctor Circle Mask Expand | GSAP ScrollTrigger | Clip-path circle animation | High |
| Stats Counter | Custom Hook | requestAnimationFrame counter | Medium |
| FAQ Spring Accordion | Framer Motion | AnimatePresence with spring | Medium |
| Footer Curtain Reveal | GSAP ScrollTrigger | Z-index layering reveal | Medium |

## Animation Library Choices

### Primary: GSAP + ScrollTrigger
- **Rationale**: Best performance for scroll-driven animations, precise control over timing
- **Use for**: All scroll effects, complex timelines, pinned sections

### Secondary: Framer Motion
- **Rationale**: React-native, excellent for component-level animations
- **Use for**: Hover effects, accordion, page transitions

### Utilities
- **SplitType**: Text splitting for character animations
- **Lenis**: Smooth scroll damping

## Project File Structure

```
app/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   ├── animations/
│   │   │   ├── SplitText.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── ParallaxImage.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   └── Counter.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── VisionMission.tsx
│   │   │   ├── AboutClinic.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── CTA.tsx
│   │   │   ├── MeetDoctor.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── Footer.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── TopBar.tsx
│   ├── hooks/
│   │   ├── useMousePosition.ts
│   │   ├── useScrollProgress.ts
│   │   └── useInView.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── images/
├── index.html
└── package.json
```

## Dependencies

```json
{
  "dependencies": {
    "gsap": "^3.12.5",
    "@gsap/react": "^3.12.5",
    "framer-motion": "^11.0.0",
    "split-type": "^0.3.4",
    "lenis": "^1.1.0",
    "lucide-react": "latest"
  }
}
```

## Color CSS Variables

```css
:root {
  --primary-blue: #0063dd;
  --primary-dark: #002d6d;
  --accent-blue: #0058c4;
  --light-blue: #3898ec;
  --sky-blue: #c9d9ff;
  --white: #ffffff;
  --black: #000000;
  --light-gray: #f8f8f8;
  --text-gray: #5d5d5d;
  --dark-text: #333333;
  --border-gray: #cccccc;
  --cyan-glow: #00e5ff;
}
```

## Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Mobile | < 768px | Disable parallax, simplify animations |
| Tablet | 768px - 1024px | Reduce animation intensity |
| Desktop | > 1024px | Full animation experience |

## Performance Optimizations

1. **will-change**: Apply to hero image, service track
2. **Lazy loading**: Images below fold
3. **Code splitting**: Section components
4. **Reduced motion**: Respect user preferences
5. **GPU acceleration**: Use transform3d
