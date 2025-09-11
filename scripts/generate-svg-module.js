#!/usr/bin/env node

/**
 * This script reads SVG files from the demo/BrandingLogos folder and generates a JavaScript module
 * with base64-encoded SVGs that can be imported directly in the browser without needing the fs module.
 */

const fs = require('fs');
const path = require('path');

// Path to the SVG logo files
const LOGOS_DIR = path.resolve(__dirname, '../demo/BrandingLogos');
// Output file path
const OUTPUT_FILE = path.resolve(__dirname, '../src/utils/svgData.js');

// Read all SVG files from the directory
const svgFiles = fs.readdirSync(LOGOS_DIR).filter(file => file.endsWith('.svg'));

// Generate the JavaScript module content
let moduleContent = `/**
 * Auto-generated file containing base64-encoded SVG logo data
 * Generated from SVG files in demo/BrandingLogos
 * DO NOT EDIT DIRECTLY
 */

export const svgData = {
`;

// Process each SVG file
svgFiles.forEach(file => {
    const filePath = path.join(LOGOS_DIR, file);
    const svgContent = fs.readFileSync(filePath, 'utf8');
    const base64Content = Buffer.from(svgContent).toString('base64');
    const dataUri = `data:image/svg+xml;base64,${base64Content}`;
    
    // Add the file to the module with its name as the key
    moduleContent += `  '${file}': '${dataUri}',\n`;
});

// Close the module content
moduleContent += `};

/**
 * Returns a data URI for the specified SVG file
 * @param {string} filename - SVG filename in the demo/BrandingLogos folder
 * @returns {string} - Base64 encoded SVG data URI
 */
export const getSvgDataUri = (filename) => {
  if (!svgData[filename]) {
    console.warn(\`SVG file not found: \${filename}\`);
    return '';
  }
  return svgData[filename];
};

/**
 * Creates a logo object with dimensions for the messaging component
 * @param {string} filename - SVG filename in the demo/BrandingLogos folder
 * @param {number[]} dimensions - Width and height of the logo [width, height]
 * @returns {Object} - Logo object with src and dimensions
 */
export const createLogo = (filename, dimensions) => {
  return {
    src: getSvgDataUri(filename),
    dimensions
  };
};
`;

// Write the module to the output file
fs.writeFileSync(OUTPUT_FILE, moduleContent);

console.log(`SVG module generated at ${OUTPUT_FILE}`);