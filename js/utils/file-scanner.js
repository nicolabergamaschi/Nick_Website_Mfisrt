/**
 * File Scanner Utility
 * Scans image directories and discovers content following the naming convention:
 * category-project_name-index.webp
 */

/**
 * Mock directory listing for development/testing
 * @param {string} directoryPath - The directory path
 * @returns {Array<Object>} List of file objects with {image: string, has_ref: boolean}
 */
export async function scanImageDirectory(directoryPath) {
    const projects = {};

    try {
        // Extract category folder name from path (AI, CGI, PHOTO)
        const categoryFolder = directoryPath.split('/').pop();

        // Get actual files from the directory
        const files = await getDirectoryFiles(directoryPath);

        files.forEach(fileData => {
            // Extract filename and has_ref from the new object structure
            const filename = fileData.image;
            const hasRef = fileData.has_ref;

            // Debug logging for CGI DMP images
            if (filename.includes('cg-DMP')) {
                console.log('=== File Scanner Debug ===');
                console.log('File data:', fileData);
                console.log('Filename:', filename);
                console.log('hasRef:', hasRef);
                console.log('===========================');
            }

            const parsedFile = parseFilename(filename);
            if (parsedFile) {
                const { categoryShort, projectName, index, extension } = parsedFile;
                const projectId = `${categoryShort}-${projectName}`;

                if (!projects[projectId]) {
                    projects[projectId] = {
                        projectId,
                        category: categoryShort,
                        images: []
                    };
                }

                projects[projectId].images.push({
                    src: `${directoryPath}/${filename}`,
                    dataIndex: parseInt(index),
                    filename: filename,
                    extension: extension,
                    isVideo: extension === 'mp4',
                    hasRef: hasRef  // Add the has_ref information
                });
            }
        });

        // No sorting here - let content generator handle pure index-based ordering

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
    // Match pattern: category-project_name-index.extension or category-project_name-index-subindex.extension
    const match = filename.match(/^([a-z]+)-([^-]+)-(\d+)(?:-(\d+))?\.(webp|mp4)$/i);

    if (match) {
        const [, categoryShort, projectName, index, subIndex, extension] = match;
        // If there's a subIndex, combine it with the main index for the final index
        const finalIndex = subIndex ? `${index}-${subIndex}` : index;

        return {
            categoryShort: categoryShort.toLowerCase(),
            projectName,
            index: finalIndex,
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

    // For now, return all known files and let the system handle missing ones
    // In a production system, you could test file existence here
    return knownFiles;
}/**
 * Returns known files based on the migration analysis
 * @param {string} directoryPath - The directory path
 * @returns {Array<Object>} Array of file objects with {image: string, has_ref: boolean}
 */
function getKnownFiles(directoryPath) {
    if (directoryPath.includes('/AI')) {
        return [
            // Vogue project (indices 1-3)
            { image: 'ai-Vogue-1.webp', has_ref: false },
            { image: 'ai-Vogue-2.webp', has_ref: true },   // 2nd image - has reference
            { image: 'ai-Vogue-3.webp', has_ref: true },   // 3rd image - has reference
            // VogueBES project (indices 4-7)
            { image: 'ai-VogueBES-4.webp', has_ref: true },
            { image: 'ai-VogueBES-5.webp', has_ref: false },
            { image: 'ai-VogueBES-6.webp', has_ref: false },
            { image: 'ai-VogueBES-7.webp', has_ref: false },
            // Rombaut project (indices 8-12)
            { image: 'ai-Rombaut-8-1.mp4', has_ref: false },
            { image: 'ai-Rombaut-8-2.mp4', has_ref: false },
            { image: 'ai-Rombaut-8.webp', has_ref: true },
            { image: 'ai-Rombaut-9-1.mp4', has_ref: false },
            { image: 'ai-Rombaut-9.webp', has_ref: true },
            { image: 'ai-Rombaut-10.webp', has_ref: true },
            { image: 'ai-Rombaut-11.webp', has_ref: false },
            { image: 'ai-Rombaut-12.webp', has_ref: false },
            // RickOwens project (index 13)
            { image: 'ai-RickOwens-13.webp', has_ref: false },
            // Kraut project (index 22)
            { image: 'ai-Kraut-22.mp4', has_ref: true},
            // Experiments project (indices 14-21)
            { image: 'ai-Experiments-14.webp', has_ref: false },
            { image: 'ai-Experiments-15.webp', has_ref: false },
            { image: 'ai-Experiments-16.webp', has_ref: false },
            { image: 'ai-Experiments-17.webp', has_ref: true },
            { image: 'ai-Experiments-18.webp', has_ref: true },
            { image: 'ai-Experiments-19.webp', has_ref: true },
            { image: 'ai-Experiments-20.webp', has_ref: false },
            { image: 'ai-Experiments-21.webp', has_ref: false }
        ];
    } else if (directoryPath.includes('/CGI')) {
        return [
            // ShowReel project (index 0 - will be sorted to position 1 automatically by special logic)
            { image: 'cg-ShowReel-0.mp4', has_ref: false },
            // DMP project
            { image: 'cg-DMP-1.webp', has_ref: true },
            { image: 'cg-DMP-2.webp', has_ref: true },      // Index 2 - has reference
            { image: 'cg-DMP-3.webp', has_ref: true },
            { image: 'cg-DMP-4.webp', has_ref: false },
            // LANVIN project
            { image: 'cg-LANVIN-5.webp', has_ref: false },
            // Rolex project
            { image: 'cg-Rolex-6.webp', has_ref: false },
            // Salomon project
            { image: 'cg-Salomon-7.webp', has_ref: false },
            // Experiments project
            { image: 'cg-Experiments-8.webp', has_ref: false },
            { image: 'cg-Experiments-9.webp', has_ref: false },
            { image: 'cg-Experiments-10.webp', has_ref: false },
            { image: 'cg-Experiments-11.webp', has_ref: false },
            { image: 'cg-Experiments-12.webp', has_ref: false },
            { image: 'cg-Experiments-13.webp', has_ref: false },
            { image: 'cg-Experiments-14.webp', has_ref: false },
            { image: 'cg-Experiments-15.webp', has_ref: false },
            { image: 'cg-Experiments-16.webp', has_ref: false }
        ];
    } else if (directoryPath.includes('/PHOTO')) {
        return [
            // VitalSigns project (indices 1-11)
            { image: 'ph-VitalSigns-1.webp', has_ref: false },
            { image: 'ph-VitalSigns-2.webp', has_ref: false },
            { image: 'ph-VitalSigns-3.webp', has_ref: false },
            { image: 'ph-VitalSigns-4.webp', has_ref: false },
            { image: 'ph-VitalSigns-5.webp', has_ref: false },
            { image: 'ph-VitalSigns-6.webp', has_ref: false },
            { image: 'ph-VitalSigns-7.webp', has_ref: false },
            { image: 'ph-VitalSigns-8.webp', has_ref: false },
            { image: 'ph-VitalSigns-9.webp', has_ref: false },
            { image: 'ph-VitalSigns-10.webp', has_ref: false },
            { image: 'ph-VitalSigns-11.webp', has_ref: false },
            // Personal project (indices 12-33)
            { image: 'ph-Personal-12.webp', has_ref: false },
            { image: 'ph-Personal-13.webp', has_ref: false },
            { image: 'ph-Personal-14.webp', has_ref: false },
            { image: 'ph-Personal-15.webp', has_ref: false },
            { image: 'ph-Personal-16.webp', has_ref: false },
            { image: 'ph-Personal-17.webp', has_ref: false },
            { image: 'ph-Personal-18.webp', has_ref: false },
            { image: 'ph-Personal-19.webp', has_ref: false },
            { image: 'ph-Personal-20.webp', has_ref: false },
            { image: 'ph-Personal-21.webp', has_ref: false },
            { image: 'ph-Personal-22.webp', has_ref: false },
            { image: 'ph-Personal-23.webp', has_ref: false },
            { image: 'ph-Personal-24.webp', has_ref: false },
            { image: 'ph-Personal-25.webp', has_ref: false },
            { image: 'ph-Personal-26.webp', has_ref: false },
            { image: 'ph-Personal-27.webp', has_ref: false },
            { image: 'ph-Personal-28.webp', has_ref: false },
            { image: 'ph-Personal-29.webp', has_ref: false },
            { image: 'ph-Personal-30.webp', has_ref: false },
            { image: 'ph-Personal-31.webp', has_ref: false },
            { image: 'ph-Personal-32.webp', has_ref: false },
            { image: 'ph-Personal-33.webp', has_ref: false }
        ];
    }
    return [];
}
