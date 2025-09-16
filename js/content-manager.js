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
    console.log('🚀🚀🚀 CONTENT MANAGER STARTING - This should be the first thing you see! 🚀🚀🚀');
    try {
        console.log('🚀 Initializing automated content management system...');

        // Scan directories for images following the naming convention
        const aiProjects = await scanImageDirectory('resources/images/AI');
        const cgiProjects = await scanImageDirectory('resources/images/CGI');
        const photoProjects = await scanImageDirectory('resources/images/PHOTO');

        console.log('🎬 CGI projects discovered:', Object.keys(cgiProjects), cgiProjects);
        console.log('📸 PHOTO projects discovered:', Object.keys(photoProjects), photoProjects);
        console.log('🎨 AI projects discovered:', Object.keys(aiProjects), aiProjects);

        // Combine all projects
        const allProjects = {
            ...aiProjects,
            ...cgiProjects,
            ...photoProjects
        };

        console.log('📁 Discovered projects:', Object.keys(allProjects));

        // Generate content for each category with detailed logging
        console.log('🎬 Starting CGI category generation...');
        await generateCategoryContent('cg', cgiProjects);

        console.log('📸 Starting PHOTO category generation...');
        await generateCategoryContent('ph', photoProjects);

        console.log('🎨 Starting AI category generation...');
        await generateCategoryContent('ai', aiProjects);

        console.log('✅ Content management system initialized successfully');

        // Fire custom event to notify other systems that content is ready
        const contentReadyEvent = new CustomEvent('contentManagerReady', {
            detail: { allProjects, aiProjects, cgiProjects, photoProjects }
        });
        document.dispatchEvent(contentReadyEvent);

    } catch (error) {
        console.error('❌ Error initializing content manager:', error);
        // Fallback: Continue with existing static HTML if automation fails
        console.log('📄 Falling back to static HTML content');
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
    console.log(`🔍 Looking for container with selector: ${categorySelectors[category]}`);
    console.log(`📍 Container found:`, container);
    if (!container) {
        console.warn(`⚠️ Container not found for category: ${category} (selector: ${categorySelectors[category]})`);
        return;
    }

    // Generate carousel items HTML for this category (all projects at once)
    const projectCount = Object.keys(projects).length;
    console.log(`🎨 Generated ${category.toUpperCase()} content for ${projectCount} projects:`, Object.keys(projects));

    // Debug: Log all images with their indices
    console.log(`🔍 Detailed ${category.toUpperCase()} image analysis:`);
    Object.keys(projects).forEach(projectId => {
        const project = projects[projectId];
        if (project.images && project.images.length > 0) {
            console.log(`  📁 ${projectId}: ${project.images.length} images`);
            project.images.forEach(img => {
                console.log(`    🖼️ ${img.filename} → index: ${img.dataIndex}`);
            });
        } else {
            console.log(`  📁 ${projectId}: NO IMAGES FOUND`);
        }
    });

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

    console.log(`📊 Generated HTML length for ${category}: ${generatedHTML.length} characters`);
    console.log(`📋 Full generated HTML for ${category}:`, generatedHTML);

    if (generatedHTML.length > 100) {
        console.log(`📋 HTML Preview for ${category}:`, generatedHTML.substring(0, 200) + '...');
    }

    // Replace the carousel-inner content with generated HTML
    if (generatedHTML) {
        console.log(`🔄 About to inject HTML into container:`, container);
        console.log(`🔄 Container innerHTML before:`, container.innerHTML);
        container.innerHTML = generatedHTML;
        console.log(`🔄 Container innerHTML after:`, container.innerHTML);
        console.log(`✅ ${category.toUpperCase()} carousel populated with ${projectCount} projects`);
    } else {
        console.warn(`⚠️ No content generated for ${category} category`);
    }
}/**
 * Development mode: Log discovered content without replacing HTML
 * This allows testing the system while keeping existing functionality
 */
export function debugContentManager() {
    console.log('🔍 Running content manager in debug mode...');
    initContentManager();
}
