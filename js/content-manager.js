/**
 * Content Manager Integration
 * Initializes the automated content management system
 */

import { scanImageDirectory } from './utils/file-scanner.js';
import { generateCategoryCarouselItems } from './utils/content-generator.js';
import { projectMetadata, categoryConfig } from './data/project-metadata.js';

/**
 * Initialize the automated content management system
 * This replaces manual HTML content with dynamically generated content
 */
export async function initContentManager() {
    try {
        // Scan directories for images following the naming convention
        const aiProjects = await scanImageDirectory('resources/images/AI');
        const cgiProjects = await scanImageDirectory('resources/images/CGI');
        const photoProjects = await scanImageDirectory('resources/images/PHOTO');

        // Combine all projects
        const allProjects = {
            ...aiProjects,
            ...cgiProjects,
            ...photoProjects
        };

        // Generate content for each category
        await generateCategoryContent('cg', cgiProjects);
        await generateCategoryContent('ph', photoProjects);
        await generateCategoryContent('ai', aiProjects);

        // Fire custom event to notify other systems that content is ready
        const contentReadyEvent = new CustomEvent('contentManagerReady', {
            detail: { allProjects, aiProjects, cgiProjects, photoProjects }
        });
        document.dispatchEvent(contentReadyEvent);

    } catch (error) {
        console.error('❌ Error initializing content manager:', error);
        // Fallback: Continue with existing static HTML if automation fails
    }
}

/**
 * Generate and inject content for a specific category
 */
async function generateCategoryContent(category, projects) {
    const categorySelectors = {
        'ai': '#carouselExampleDarkAi .carousel-inner',
        'cg': '#carouselExampleDarkCgi .carousel-inner',
        'ph': '#carouselExampleDarkPhoto .carousel-inner'
    };

    const container = document.querySelector(categorySelectors[category]);
    if (!container) {
        console.warn(`⚠️ Container not found for category: ${category} (selector: ${categorySelectors[category]})`);
        return;
    }

    // Generate carousel items HTML for this category (all projects at once)
    const projectCount = Object.keys(projects).length;

    // Get the category configuration
    const categoryMap = {
        'ai': 'AI',
        'cg': 'CGI',
        'ph': 'PHOTO'
    };
    const fullCategoryName = categoryMap[category];
    const config = categoryConfig[fullCategoryName];
    if (!config) {
        console.warn(`⚠️ No configuration found for category: ${category} (mapped to: ${fullCategoryName})`);
        return;
    }

    // Generate only the carousel items (not the full carousel structure)
    const generatedHTML = generateCategoryCarouselItems(projects, config.className);

    // Replace the carousel-inner content with generated HTML
    if (generatedHTML) {
        container.innerHTML = generatedHTML;
    } else {
        console.warn(`⚠️ No content generated for ${category} category`);
    }
}/**
 * Development mode: Log discovered content without replacing HTML
 * This allows testing the system while keeping existing functionality
 */
export function debugContentManager() {
    initContentManager();
}
