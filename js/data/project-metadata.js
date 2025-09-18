/**
 * Project Metadata
 * Contains titles, descriptions, and configuration for all projects
 * This is manually maintained and combined with auto-discovered files
 */

export const projectMetadata = {
    // AI Category Projects
    "ai-Vogue": {
        title: "VOGUE Polska - July August 2023",
        description: "A 13-image series and cover for Vogue Polska's AI-themed issue, blending real photos from a dedicated shoot (by photographer Mati Grzelak) with tools like Midjourney, Stable Diffusion, and ComfyUI to explore the creative fusion of human photography and generative AI.",
        hasReferences: true,
        referenceButtonText: "images from shoot",
        menuDisplayName: "Vogue"
    },

    "ai-VogueBES": {
        title: "Vogue Annual BES Report 2023",
        description: "Created for Vogue Business's 2023 Annual Report, this series of high-resolution images was fully generated with ComfyUI, reflecting inclusion and diversity through tailored generative workflows, showcasing AI's role in concept-driven editorial storytelling.",
        hasReferences: false,
        menuDisplayName: "Vogue BES"
    },

    "ai-Rombaut": {
        title: "Rombaut Case Study",
        description: "A self-initiated AI-generated image series pitched to footwear brand Rombaut, using custom-trained models from online product images. The project explores the brand's aesthetic through humor, material play, and abstraction, blending product and style with a contemporary AI reinterpretation.",
        hasReferences: false,
        menuDisplayName: "Rombaut"
    },

    "ai-RickOwens": {
        title: "Rick Owens Case Study",
        description: "An AI-generated image using ComfyUI, inspired by Rick Owens' iconic boots. It conceptually explores the brand's signature themes and moods, reinterpreting its distinctive aesthetic through generative AI.",
        hasReferences: false,
        menuDisplayName: "RickOwens"
    },

    "ai-Experiments": {
        title: "Experiments",
        description: "Experimental series combining model training and visual abstraction—using ComfyUI and various datasets. These images explore themes of memory, digital archiving, mutation, and the body's transformative potential reimagined through macro-inspired imagery.",
        hasReferences: false,
        menuDisplayName: "Experiments"
    },

    // CGI Category Projects
    "cg-ShowReel": {
        title: "Show Reel 24/25",
        description: "A curated showcase of work in image-making, VFX and compositing. Focused entirely on CGI, it reflects a hands-on approach to contemporary visual storytelling.",
        hasReferences: false,
        menuDisplayName: "Show Reel",
        isVideo: true
    },

    "cg-DMP": {
        title: "Digital Matte Painting",
        description: "A series of digital matte paintings developed to concept personal ideas, primarily inspired by original photographs. The works combine 3D and compositing tools—including Blender, 3ds Max, Maya, Redshift, Nuke, and Photoshop—to build layered, atmospheric visuals.",
        hasReferences: true,
        menuDisplayName: "Digital Matte"
    },

    "cg-LANVIN": {
        title: "LANVIN",
        description: "Digital content creation for fashion brand LANVIN, involving the production of four short videos for an Instagram campaign launch. The work focused on visually translating the brand's identity through motion, styling, and narrative-driven compositions.",
        hasReferences: false,
        menuDisplayName: "Lanvin"
    },

    "cg-Rolex": {
        title: "Rolex",
        description: "An image from a personal project, featuring video stills based on a concept advertisement for luxury watch brand Rolex. The work explores visual storytelling, branding, and stylization within a fictional commercial context, incorporating various simulations created with Houdini.",
        hasReferences: false,
        menuDisplayName: "Rolex"
    },

    "cg-Salomon": {
        title: "Salomon",
        description: "A personal project featuring concept stills of an iconic pair of trainers from the brand Salomon. The work involves custom modeling and simulations, emphasizing form, movement, and a visual language inspired by the brand's identity.",
        hasReferences: false,
        menuDisplayName: "Salomon"
    },

    "cg-Experiments": {
        title: "Experiments",
        description: "A series of images exploring a range of simulation techniques, including particles, volumes, and fluids. The selection also features experiments with photogrammetry and hard-surface sculpting, showcasing diverse approaches to digital form and motion.",
        hasReferences: false,
        menuDisplayName: "Experiments"
    },

    // PHOTO Category Projects
    "ph-VitalSigns": {
        title: "Vital Signs - SGL - King's College",
        description: "Commissioned for Vital Signs at Science Gallery London (King's College), this series used thermal imaging to reveal the unseen traces of life and presence. Shot around London Bridge and atop The Shard, the images featured in both print and digital promotion.",
        hasReferences: false,
        menuDisplayName: "Vital Signs"
    },

    "ph-Personal": {
        title: "Personal - Stills",
        description: "An ongoing personal series of still photographs capturing mundane, everyday moments and object-focused scenes. Often centered on a single subject, the work highlights the beauty and awkwardness found in ordinary things.",
        hasReferences: false,
        menuDisplayName: "Stills"
    }
};

/**
 * Category configuration
 */
export const categoryConfig = {
    AI: {
        displayName: "Ai",
        carouselId: "carouselExampleDarkAi",
        className: "ai"
    },
    CGI: {
        displayName: "Cgi",
        carouselId: "carouselExampleDarkCgi",
        className: "cg"
    },
    PHOTO: {
        displayName: "Photo",
        carouselId: "carouselExampleDarkPhoto",
        className: "ph"
    }
};

/**
 * Gets metadata for a specific project
 * @param {string} projectId - The project ID (e.g., "ai-Vogue")
 * @returns {Object|null} Project metadata or null if not found
 */
export function getProjectMetadata(projectId) {
    return projectMetadata[projectId] || null;
}

/**
 * Gets all projects for a specific category
 * @param {string} category - The category (AI, CGI, PHOTO)
 * @returns {Object} All projects in that category
 */
export function getProjectsByCategory(category) {
    const categoryPrefix = category.toLowerCase().substring(0, 2);
    const result = {};

    Object.keys(projectMetadata).forEach(projectId => {
        if (projectId.startsWith(categoryPrefix + '-')) {
            result[projectId] = projectMetadata[projectId];
        }
    });

    return result;
}

/**
 * Gets category configuration
 * @param {string} category - The category (AI, CGI, PHOTO)
 * @returns {Object|null} Category config or null if not found
 */
export function getCategoryConfig(category) {
    return categoryConfig[category] || null;
}
