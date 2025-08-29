# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a PLZ Router webapp that determines the responsible person and German state for a given postal code (PLZ). Built with Next.js and React, it features a responsive design with AboutWater GmbH branding.

## Commands

### Development
- `npm install` - Install dependencies
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build the production version
- `npm start` - Start production server

## Architecture

### File Structure
- `/pages/index.js` - Main PLZ checker interface with form and result display
- `/pages/api/check_plz.js` - API endpoint for PLZ validation and person/state mapping
- `/pages/_app.js` - Next.js app wrapper component
- `/pages/_document.js` - Custom document with German locale and meta tags
- `/styles/globals.css` - Complete styling with AboutWater branding and responsive design

### PLZ Mapping Logic
The application maps PLZ first digits to responsible persons:
- PLZ starting with 7, 8, 9 → Anna Kropfitsch (Bayern)
- PLZ starting with 3, 5, 6 → Carmen Bergar (Hessen) 
- PLZ starting with 0, 1, 2, 4 → Mattias Herbst (Hamburg)

### Key Features
- Client-side validation with numeric input restriction
- Server-side API validation
- Dynamic color-coded result cards based on assigned person
- Responsive design with mobile-first approach
- AboutWater GmbH branding integration
- Loading states and error handling
- Accessibility features (ARIA labels, focus management)

### Styling System
Uses CSS custom properties for theming with AboutWater brand colors. Includes comprehensive responsive breakpoints, accessibility features (high contrast, reduced motion), and print styles.