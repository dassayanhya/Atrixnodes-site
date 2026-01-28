# Change Log — AtrixNodes Site

Date: 2026-01-28

## Overview
- Reduced hero top spacing for tighter layout
- Kept navbar fully transparent
- Redesigned Features section with GIF background, blur overlay, and glass cards
- Added Server Locations section with map.svg and animated dot
- Transformed Pricing section: new card design, backgrounds, hover effects, and currency selector
- Fixed CSS parsing errors preventing styles from applying

## Navigation
- Nav background set to fully transparent using CSS variable
  - [main.js](file:///e:/Codion/Website%20Works/AtrixNodes/main.js)

## Hero
- Reduced hero padding from pt-24/lg:pt-32 to pt-16/lg:pt-20
  - [index.html](file:///e:/Codion/Website%20Works/AtrixNodes/index.html)

## Features
- Replaced “Why Atrix Nodes?” preview with advanced features layout
- Set section background to assets/BG/Feature-Section-BG.gif with blur overlay
- Implemented glass-style feature cards with entry animations
  - [index.html](file:///e:/Codion/Website%20Works/AtrixNodes/index.html)
  - [styles.css](file:///e:/Codion/Website%20Works/AtrixNodes/styles.css)
  - [main.js](file:///e:/Codion/Website%20Works/AtrixNodes/main.js)
- Polished visuals to match reference (rounded corners, gradient sheen, icon container)
- Adjusted card placement to custom mosaic layout

## Server Locations
- Inserted section directly after Features
- Used assets/SVGs/map.svg for the background
- Added animated blinking dot overlays
- Removed Singapore location card and extra dots (kept single India marker)
- Adjusted India dot position to match visual reference
  - [index.html](file:///e:/Codion/Website%20Works/AtrixNodes/index.html)
  - [styles.css](file:///e:/Codion/Website%20Works/AtrixNodes/styles.css)

## Pricing
- Redesigned pricing into image-banner cards with glass body (pricing-card2)
- Set per-card backgrounds:
  - Bot Hosting → assets/BG/discord.jpg
  - Minecraft Hosting → assets/BG/minecraft.jpg
  - VPS Hosting → assets/BG/vps.jpg
- Added hover animations: card lift/glow, banner zoom, CTA micro-motion
- Updated CTAs to local plan pages:
  - Bot Hosting → discord.html
  - Minecraft Hosting → minecraft.html
  - VPS Hosting → vps.html
- Implemented header with badge “Transparent Pricing” and “Simple Pricing” title
- Added currency selector (INR, USD, EUR) with on-page conversion
  - [index.html](file:///e:/Codion/Website%20Works/AtrixNodes/index.html)
  - [styles.css](file:///e:/Codion/Website%20Works/AtrixNodes/styles.css)
  - [main.js](file:///e:/Codion/Website%20Works/AtrixNodes/main.js)

## Bug Fixes
- Resolved CSS corruption (stray .price-value tokens) that blocked features styles
  - [styles.css](file:///e:/Codion/Website%20Works/AtrixNodes/styles.css)

## Assets
- Added/used:
  - assets/BG/Feature-Section-BG.gif
  - assets/SVGs/map.svg
  - assets/BG/discord.jpg
  - assets/BG/minecraft.jpg
  - assets/BG/vps.jpg

