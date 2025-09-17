/**
 * Content Generator
 * Combines scanned file data with project metadata to generate HTML content
 */

import { generateProjectsData } from './file-scanner.js';
import { projectMetadata, categoryConfig } from '../data/project-metadata.js';

/**
 * Merges discovered files with project metadata
 * @param {Object} discoveredProjects - Projects discovered by file scanner
 * @param {Object} metadata - Project metadata
 * @returns {Object} Complete project data
 */
export function mergeProjectData(discoveredProjects, metadata) {
    const mergedProjects = {};

    Object.keys(discoveredProjects).forEach(projectId => {
        const discovered = discoveredProjects[projectId];
        const meta = metadata[projectId] || {};

        mergedProjects[projectId] = {
            // From file discovery
            ...discovered,
            // From metadata
            ...meta,
            // Ensure we have the project ID
            projectId
        };
    });

    return mergedProjects;
}

/**
 * Generates complete project data structure
 * @returns {Object} Complete projects data for all categories
 */
export async function generateCompleteProjectData() {
    const discoveredData = await generateProjectsData();

    const completeData = {
        AI: mergeProjectData(discoveredData.AI, projectMetadata),
        CGI: mergeProjectData(discoveredData.CGI, projectMetadata),
        PHOTO: mergeProjectData(discoveredData.PHOTO, projectMetadata)
    };

    return completeData;
}

/**
 * Generates HTML for a single carousel item
 * @param {string} projectId - The project ID
 * @param {Object} imageData - Image data object
 * @param {string} category - Category class name (ai, cg, ph)
 * @param {boolean} isActive - Whether this is the first/active item
 * @returns {string} HTML string for carousel item
 */
export function generateCarouselItem(projectId, imageData, category, isActive = false) {
    const activeClass = isActive ? ' active' : '';
    const additionalClasses = imageData.additionalClasses ? ` ${imageData.additionalClasses.join(' ')}` : '';

    if (imageData.isVideo) {
        return `
        <div id="${projectId}" class="carousel-item ${category}${activeClass}">
            <video id="${category}-video" data-hover="${projectId}" data-index="${imageData.dataIndex}" controls preload="metadata">
                <source src="${imageData.src}" type="video/mp4">
                <p>Your browser doesn't support HTML video. <a href="${imageData.src}">Download the video</a> instead.</p>
            </video>
        </div>`;
    } else {
        return `
        <div id="${projectId}" class="carousel-item ${category}${activeClass}">
            <img src="${imageData.src}"
                 id="${projectId}"
                 class="d-block${additionalClasses}"
                 data-index="${imageData.dataIndex}"
                 data-hover="${projectId}"
                 alt="${imageData.alt || '...'}">
        </div>`;
    }
}

/**
 * Generates HTML for all carousel items in a category
 * @param {Object} categoryProjects - All projects for a category
 * @param {string} categoryClass - Category CSS class (ai, cg, ph)
 * @returns {string} HTML string for all carousel items
 */
export function generateCategoryCarouselItems(categoryProjects, categoryClass) {
    let html = '';
    let isFirstItem = true;

    // Collect all images maintaining their array position order from file-scanner
    const allImages = [];

    Object.keys(categoryProjects).forEach(projectId => {
        const project = categoryProjects[projectId];
        if (project.images && project.images.length > 0) {
            project.images.forEach((image, arrayIndex) => {
                // Use array position as sort key instead of dataIndex
                // This maintains the exact order from file-scanner.js arrays
                allImages.push({
                    projectId,
                    image,
                    arrayPosition: allImages.length, // Incremental position based on discovery order
                    dataIndex: parseInt(image.dataIndex) || 0, // Keep original for reference system
                    originalIndex: parseInt(image.dataIndex) || 0 // Keep original for display
                });
            });
        }
    });

    // Sort by array position (discovery order) instead of dataIndex
    // This maintains the exact order from file-scanner.js getKnownFiles arrays
    allImages.sort((a, b) => a.arrayPosition - b.arrayPosition);

    // Debug: Log the array position-based ordering
    console.log(`� Array position-based order for ${categoryClass} (as defined in file-scanner.js):`);
    allImages.forEach((item, index) => {
        const displayIndex = item.originalIndex || item.dataIndex;
        console.log(`  ${index + 1}. [index:${displayIndex}] ${item.image.filename} (project: ${item.projectId})`);
        console.log(`      → src: ${item.image.src}`);
    });

    // Generate carousel items in array position order
    allImages.forEach(item => {
        const isActive = isFirstItem;
        html += generateCarouselItem(item.projectId, item.image, categoryClass, isActive);
        isFirstItem = false;
    });

    return html;
}

/**
 * Generates HTML for project description
 * @param {string} projectId - The project ID
 * @param {Object} projectData - Complete project data
 * @returns {string} HTML string for project description
 */
export function generateProjectDescription(projectId, projectData) {
    const referenceButton = projectData.hasReferences ?
        `<button id="references" style="border: 0px solid rgb(196, 196, 196); box-shadow: 3px 5px 5px rgb(181, 181, 181); margin-bottom: 1rem; padding: 0.2rem 1rem; border-radius: 25px; background-color: rgb(220, 220, 220); color: rgb(147, 147, 147); font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 400; cursor: pointer; transition: all 0.2s ease;">${projectData.referenceButtonText || 'references'}</button>` : '';

    return `
    <div data-prj="${projectId}">
        <h4 class="title" id="title" style="display: none;">${projectData.title}${referenceButton ? ' - ' + referenceButton : ''}</h4>
        <p class="text-description paragraph" style="display: none;">${projectData.description}</p>
    </div>`;
}

/**
 * Generates HTML for all project descriptions
 * @param {Object} allProjects - All projects data
 * @returns {string} HTML string for all project descriptions
 */
export function generateAllProjectDescriptions(allProjects) {
    let html = '';

    ['AI', 'CGI', 'PHOTO'].forEach(category => {
        if (allProjects[category]) {
            Object.keys(allProjects[category]).forEach(projectId => {
                const project = allProjects[category][projectId];
                html += generateProjectDescription(projectId, project);
            });
        }
    });

    return html;
}

/**
 * Generates HTML for navigation menu items
 * @param {Object} categoryProjects - Projects for a category
 * @param {string} carouselId - Target carousel ID
 * @returns {string} HTML string for menu items
 */
export function generateMenuItems(categoryProjects, carouselId) {
    let html = '';

    Object.keys(categoryProjects).forEach(projectId => {
        const project = categoryProjects[projectId];
        const displayName = project.menuDisplayName || project.title;

        html += `<li><a id="${projectId}" class="sub-list-link" href="#${carouselId}">${displayName}</a></li>\n`;
    });

    return html;
}

/**
 * Generates complete carousel HTML for a category
 * @param {string} category - Category name (AI, CGI, PHOTO)
 * @param {Object} categoryProjects - Projects for this category
 * @returns {string} Complete carousel HTML
 */
export function generateCompleteCarousel(category, categoryProjects) {
    const config = categoryConfig[category];
    if (!config) return '';

    const carouselItems = generateCategoryCarouselItems(categoryProjects, config.className);

    return `
    <!-- ! Carousel ${category} -->
    <div id="${config.carouselId}" class="carousel carousel-dark" data-bs-pause="false">
        <div class="carousel-button-container-prev">
            <button id="prev" class="carousel-control-prev${category === 'AI' ? ' z-2' : ''}" type="button" data-bs-target="#${config.carouselId}" data-bs-slide="prev"></button>
        </div>
        <div class="carousel-button-container-next">
            <button id="next" class="carousel-control-next${category === 'AI' ? ' z-2' : ''}" type="button" data-bs-target="#${config.carouselId}" data-bs-slide="next"></button>
        </div>
        <div class="carousel-inner${category === 'PHOTO' ? ' pht' : ''}">
            ${carouselItems}
        </div>
    </div>`;
}

/**
 * Main function to generate all content
 * @returns {Object} Generated HTML content for different sections
 */
export async function generateAllContent() {
    const completeData = await generateCompleteProjectData();

    return {
        carousels: {
            AI: generateCompleteCarousel('AI', completeData.AI),
            CGI: generateCompleteCarousel('CGI', completeData.CGI),
            PHOTO: generateCompleteCarousel('PHOTO', completeData.PHOTO)
        },
        descriptions: generateAllProjectDescriptions(completeData),
        menus: {
            AI: generateMenuItems(completeData.AI, categoryConfig.AI.carouselId),
            CGI: generateMenuItems(completeData.CGI, categoryConfig.CGI.carouselId),
            PHOTO: generateMenuItems(completeData.PHOTO, categoryConfig.PHOTO.carouselId)
        },
        data: completeData
    };
}
