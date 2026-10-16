# Ajay Chithanoor — Interactive 3D Portfolio

A premium React/Vite portfolio rebuilt around a lightweight 3D interaction system, responsive glass-depth UI, accessible motion fallbacks, and Vercel-friendly performance.

## Highlights

- Lightweight React Three Fiber hero scene with capped DPR and no post-processing stack
- Pointer-reactive 3D cards using CSS transforms rather than additional WebGL canvases
- Responsive desktop/tablet/mobile layouts
- Active-section navigation and polished mobile menu
- Reduced-motion and coarse-pointer fallbacks
- Filterable project cards and cleaned project states/links
- EmailJS contact support with automatic `mailto:` fallback when environment variables are not configured
- SEO/social metadata in `index.html`
- Existing profile image, project images, favicon and resume preserved

## Local development

```bash
npm install
npm run dev
```

Production check:

```bash
npm run lint
npm run build
```

## EmailJS (optional)

Create a `.env.local` file if you want the contact form to send directly through EmailJS:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Without these variables, the contact form opens the visitor's default email application with the message pre-filled.

## Deploying on Vercel

This is a standard Vite deployment. Push the project to GitHub and import the repository into Vercel. Vercel should detect Vite automatically.

- Build command: `npm run build`
- Output directory: `dist`

If the project is already connected to Vercel, pushing these source changes to the tracked branch will trigger the normal deployment pipeline.
