/**
 * File Scanner Utility
 * Scans image directories and discovers content following the naming convention:
 * category-project_name-index.webp
 */

/**
 * Scans a directory for images following the naming convention
 * @param {string} directoryPath - The directory path to scan (e.g., 'resources/images/AI')
 * @returns {Object} Projects object organized by project ID
 */
export async function scanImageDirectory(directoryPath) {
    const projects = {};

    try {
        // Extract category folder name from path (AI, CGI, PHOTO)
        const categoryFolder = directoryPath.split('/').pop();

        // Get actual files from the directory
        const files = await getDirectoryFiles(directoryPath);

        files.forEach(filename => {
            console.log(`🔍 Processing file: ${filename}`);
            const parsedFile = parseFilename(filename);
            console.log(`📝 Parsed result:`, parsedFile);
            if (parsedFile) {
                const { categoryShort, projectName, index, extension } = parsedFile;
                const projectId = `${categoryShort}-${projectName}`;

                if (!projects[projectId]) {
                    projects[projectId] = {
                        projectId,
                        category: categoryShort,
                        images: []
                    };
                    console.log(`📁 Created new project: ${projectId}`);
                }

                projects[projectId].images.push({
                    src: `${directoryPath}/${filename}`,
                    dataIndex: parseInt(index),
                    filename: filename,
                    extension: extension,
                    isVideo: extension === 'mp4'
                });

                // Debug: Log each discovered image
                console.log(`  🖼️ Found: ${filename} → src: ${directoryPath}/${filename}, index: ${parseInt(index)}`);
            } else {
                console.log(`⚠️ Failed to parse filename: ${filename}`);
            }
        });

        // No sorting here - let content generator handle pure index-based ordering
        console.log(`📁 Discovered ${Object.keys(projects).length} projects in ${categoryFolder}:`, Object.keys(projects));

        return projects;
    } catch (error) {
        console.error(`Error scanning directory ${directoryPath}:`, error);
        return {};
    }
}

/**
 * Parses a filename following the convention: category-project_name-index.ext
 * @param {string} filename - The filename to parse
 * @returns {Object|null} Parsed components or null if invalid
 */
export function parseFilename(filename) {
    // Match pattern: category-project_name-index.extension
    const match = filename.match(/^([a-z]+)-([^-]+)-(\d+)\.(webp|mp4)$/i);

    if (match) {
        const [, categoryShort, projectName, index, extension] = match;
        return {
            categoryShort: categoryShort.toLowerCase(),
            projectName,
            index,
            extension: extension.toLowerCase()
        };
    }

    return null;
}

/**
 * Validates that a filename follows the naming convention
 * @param {string} filename - The filename to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function validateFilename(filename) {
    return parseFilename(filename) !== null;
}

/**
 * Generates project data by scanning all category directories
 * @returns {Object} Complete projects data structure
 */
export async function generateProjectsData() {
    const aiProjects = await scanImageDirectory('AI');
    const cgiProjects = await scanImageDirectory('CGI');
    const photoProjects = await scanImageDirectory('PHOTO');

    return {
        AI: aiProjects,
        CGI: cgiProjects,
        PHOTO: photoProjects
    };
}

/**
 * Gets actual files from a directory using fetch
 * @param {string} directoryPath - Path to the directory
 * @returns {Array} List of filenames
 */
async function getDirectoryFiles(directoryPath) {
    // Since we can't directly list directory contents in browser,
    // we'll return the known files and let the content generator
    // handle missing files gracefully
    const knownFiles = getKnownFiles(directoryPath);

    console.log(`📁 Scanning ${directoryPath} - expecting ${knownFiles.length} files`);
    console.log(`📋 Known files for ${directoryPath}:`, knownFiles);

    // For now, return all known files and let the system handle missing ones
    // In a production system, you could test file existence here
    return knownFiles;
}/**
 * Returns known files based on the migration analysis
 * @param {string} directoryPath - The directory path
 * @returns {Array} Array of expected filenames
 */
function getKnownFiles(directoryPath) {
    if (directoryPath.includes('/AI')) {
        return [
            // Vogue project (indices 1-3)
            'ai-Vogue-1.webp', 'ai-Vogue-2.webp', 'ai-Vogue-3.webp',
            // VogueBES project (indices 4-7)
            'ai-VogueBES-4.webp', 'ai-VogueBES-5.webp', 'ai-VogueBES-6.webp', 'ai-VogueBES-7.webp',
            // Rombaut project (indices 8-12)
            'ai-Rombaut-8.webp', 'ai-Rombaut-9.webp', 'ai-Rombaut-10.webp', 'ai-Rombaut-11.webp', 'ai-Rombaut-12.webp',
            // RickOwens project (index 13)
            'ai-RickOwens-13.webp',
            // Experiments project (indices 14-21)
            'ai-Experiments-14.webp', 'ai-Experiments-15.webp', 'ai-Experiments-16.webp', 'ai-Experiments-17.webp',
            'ai-Experiments-18.webp', 'ai-Experiments-19.webp', 'ai-Experiments-20.webp', 'ai-Experiments-21.webp'
        ];
    } else if (directoryPath.includes('/CGI')) {
        return [
            // ShowReel project (index 0 - will be sorted to position 1 automatically by special logic)
            'cg-ShowReel-0.mp4',
            // DMP project
            'cg-DMP-1.webp', 'cg-DMP-2.webp', 'cg-DMP-3.webp', 'cg-DMP-4.webp',
            // LANVIN project
            'cg-LANVIN-5.webp',
            // Rolex project
            'cg-Rolex-6.webp',
            // Salomon project
            'cg-Salomon-7.webp',
            // Experiments project
            'cg-Experiments-8.webp', 'cg-Experiments-9.webp', 'cg-Experiments-10.webp', 'cg-Experiments-11.webp',
            'cg-Experiments-12.webp', 'cg-Experiments-13.webp', 'cg-Experiments-14.webp', 'cg-Experiments-15.webp',
            'cg-Experiments-16.webp'
        ];
    } else if (directoryPath.includes('/PHOTO')) {
        return [
            // VitalSigns project (indices 1-11)
            'ph-VitalSigns-1.webp', 'ph-VitalSigns-2.webp', 'ph-VitalSigns-3.webp', 'ph-VitalSigns-4.webp',
            'ph-VitalSigns-5.webp', 'ph-VitalSigns-6.webp', 'ph-VitalSigns-7.webp', 'ph-VitalSigns-8.webp',
            'ph-VitalSigns-9.webp', 'ph-VitalSigns-10.webp', 'ph-VitalSigns-11.webp',
            // Personal project (indices 12-33)
            'ph-Personal-12.webp', 'ph-Personal-13.webp', 'ph-Personal-14.webp', 'ph-Personal-15.webp',
            'ph-Personal-16.webp', 'ph-Personal-17.webp', 'ph-Personal-18.webp', 'ph-Personal-19.webp',
            'ph-Personal-20.webp', 'ph-Personal-21.webp', 'ph-Personal-22.webp', 'ph-Personal-23.webp',
            'ph-Personal-24.webp', 'ph-Personal-25.webp', 'ph-Personal-26.webp', 'ph-Personal-27.webp',
            'ph-Personal-28.webp', 'ph-Personal-29.webp', 'ph-Personal-30.webp', 'ph-Personal-31.webp',
            'ph-Personal-32.webp', 'ph-Personal-33.webp'
        ];
    }
    return [];
}

/**
 * Mock directory listing for development/testing
 * In production, this would be replaced with actual file system scanning
 */
async function getMockDirectoryFiles(category) {
    const mockFiles = {
        'AI': [
            'ai-Vogue-1.webp',
            'ai-Vogue-2.webp',
            'ai-Vogue-3.webp',
            'ai-VogueBES-60.webp',
            'ai-VogueBES-61.webp',
            'ai-VogueBES-62.webp',
            'ai-VogueBES-63.webp',
            'ai-Rombaut-4.webp',
            'ai-Rombaut-56.webp',
            'ai-Rombaut-57.webp',
            'ai-Rombaut-58.webp',
            'ai-Rombaut-59.webp',
            'ai-RickOwens-64.webp',
            'ai-Experiments-6.webp',
            'ai-Experiments-7.webp',
            'ai-Experiments-65.webp',
            'ai-Experiments-66.webp',
            'ai-Experiments-67.webp',
            'ai-Experiments-68.webp',
            'ai-Experiments-69.webp',
            'ai-Experiments-70.webp'
        ],
        'CGI': [
            'cg-ShowReel-200.mp4',
            'cg-DMP-8.webp',
            'cg-DMP-9.webp',
            'cg-DMP-10.webp',
            'cg-DMP-11.webp',
            'cg-LANVIN-12.webp',
            'cg-Rolex-13.webp',
            'cg-Salomon-14.webp',
            'cg-Experiments-15.webp',
            'cg-Experiments-16.webp',
            'cg-Experiments-17.webp',
            'cg-Experiments-18.webp',
            'cg-Experiments-19.webp',
            'cg-Experiments-20.webp',
            'cg-Experiments-21.webp',
            'cg-Experiments-38.webp'
        ],
        'PHOTO': [
            'ph-VitalSigns-22.webp',
            'ph-VitalSigns-23.webp',
            'ph-VitalSigns-24.webp',
            'ph-VitalSigns-25.webp',
            'ph-VitalSigns-26.webp',
            'ph-VitalSigns-27.webp',
            'ph-VitalSigns-28.webp',
            'ph-VitalSigns-29.webp',
            'ph-VitalSigns-30.webp',
            'ph-VitalSigns-31.webp',
            'ph-VitalSigns-32.webp',
            'ph-Personal-33.webp',
            'ph-Personal-34.webp',
            'ph-Personal-35.webp',
            'ph-Personal-36.webp',
            'ph-Personal-37.webp',
            'ph-Personal-39.webp',
            'ph-Personal-40.webp',
            'ph-Personal-41.webp',
            'ph-Personal-42.webp',
            'ph-Personal-43.webp',
            'ph-Personal-44.webp',
            'ph-Personal-45.webp',
            'ph-Personal-46.webp',
            'ph-Personal-47.webp',
            'ph-Personal-48.webp',
            'ph-Personal-49.webp',
            'ph-Personal-50.webp',
            'ph-Personal-51.webp',
            'ph-Personal-52.webp',
            'ph-Personal-53.webp',
            'ph-Personal-54.webp',
            'ph-Personal-55.webp'
        ]
    };

    return mockFiles[category] || [];
}

/**
 * Real file system scanner (for production use)
 * Uncomment and modify this when ready to use actual file system
 */
/*
import { readdir } from 'fs/promises';
import { join } from 'path';

async function getRealDirectoryFiles(category) {
    try {
        const dirPath = join(process.cwd(), 'resources', 'images', category);
        const files = await readdir(dirPath);
        return files.filter(file =>
            file.endsWith('.webp') || file.endsWith('.mp4')
        );
    } catch (error) {
        console.error(`Error reading directory ${category}:`, error);
        return [];
    }
}
*/
