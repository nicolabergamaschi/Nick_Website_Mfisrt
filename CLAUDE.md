# CLAUDE.md - Project Architecture & Development Guidelines

## Content Management Procedures

### 1. Adding New Images to Existing Projects

To add a new image to an existing project (e.g., adding another image to the Vogue project):

1. **Upload the image file** to the appropriate category directory:
   - AI images: `/resources/images/AI/`
   - CGI images: `/resources/images/CGI/`
   - Photo images: `/resources/images/PHOTO/`

2. **Follow the naming convention**: `category-project_name-index.webp`
   - Example: `ai-Vogue-4.webp` (if Vogue currently has indices 1-3)
   - Use the next sequential index number
   - Supported formats: `.webp`, `.mp4` (for videos)

3. **Update the known files list** in `/js/utils/file-scanner.js`:
   - Find the appropriate category section (AI, CGI, or PHOTO)
   - Add your new filename to the array
   - Maintain sequential order

4. **Refresh the browser** - The image will automatically appear in the correct position

### 2. Creating New Projects

To create an entirely new project within a category:

1. **Choose index range** - Determine where in the carousel sequence your project should appear
   - AI currently uses indices 1-21
   - CGI currently uses indices 0-16 (ShowReel at 0, then 1-16)
   - PHOTO currently uses indices 1-33

2. **Upload images** with consistent project name:
   - Example: `ai-NewProject-22.webp`, `ai-NewProject-23.webp`, etc.

3. **Update file scanner** (`/js/utils/file-scanner.js`):
   - Add all new filenames to the known files array

4. **Add project metadata** in `/js/data/project-metadata.js`:
   ```javascript
   "ai-NewProject": {
       title: "Project Title",
       description: "Project description...",
       hasReferences: false, // or true if you have reference images
       menuDisplayName: "Display Name"
   }
   ```

5. **Update menu** (if needed) in `index.html`:
   - Add menu item to the appropriate category section

### 3. Adding Reference Images

Reference images appear in overlay popups when users click on main images.

1. **Upload reference images** to `/resources/images/ai-training/` (or appropriate reference directory)

2. **Set project metadata** `hasReferences: true` in `/js/data/project-metadata.js`

3. **Configure reference mapping** in `/js/ui/references.js`:
   - Map `data-index` values to reference image paths
   - Example:
   ```javascript
   if (projectId === "ai-Vogue" && dataIndex === "1") {
       return "resources/images/ai-training/vogue-reference-1.jpg";
   }
   ```

4. **Test the reference system** - Click on images to verify reference overlays work

## Project Overview
This is Nicola Bergamaschi's portfolio website - a multidisciplinary artist working across AI, CGI, and photography. The site showcases work through interactive carousels with dynamic content loading.

## Architecture Principles

### 1. Modular JavaScript Structure
- **Main Entry Point**: `js/main.js` - imports and initializes all modules
- **UI Components**: `js/ui/` - each component handles specific functionality
  - `carousels.js` - main carousel logic and scrolling
  - `references.js` - reference image overlay system
  - `project-description.js` - project information display
  - `navigation-buttons.js` - carousel navigation
  - `category-menu.js` - category switching
  - `cursors.js` - custom cursor behavior
  - `mobile-function.js` - mobile-specific features

### 2. Content Management Philosophy
- **Data-Driven Approach**: Content should be managed through JSON/JS objects, not hardcoded HTML
- **Automatic Generation**: HTML structure should be generated programmatically from content data
- **Separation of Concerns**: Content data, presentation logic, and styling kept separate

## 3. CURRENT DATA STRUCTURE

### Existing Architecture
The site currently uses hardcoded HTML structure with Bootstrap carousels for image navigation. Each image has specific data attributes that serve as identifiers for various JavaScript functions.

### Current ID and Data Attribution System

#### ID Structure
Every image belongs to one of three main categories (AI, CGI, PHOTO) and has an ID composed of:
**Format**: `category-short_project_name`

**Examples**:
- `ai-Vogue` - AI category, Vogue project
- `ai-RickOwens` - AI category, Rick Owens project
- `ai-VogueBES` - AI category, Vogue Business Editorial Services project
- `cg-ShowReel` - CGI category, Show Reel project
- `ph-VitalSigns` - Photo category, Vital Signs project

#### Data-Index System
The `data-index` attribute serves dual purposes:
1. **Reference Image Identifier**: Links to corresponding reference images in `references.js` logic
2. **Uniqueness Provider**: Ensures each image has a unique identifier since multiple images can share the same ID within a project

**Key Characteristics**:
- Multiple images within the same project share the same ID (e.g., all Vogue images have `id="ai-Vogue"`)
- Each individual image has a unique `data-index` value
- The `data-index` is used by the reference system to map specific images to their reference materials
- This creates a hierarchical identification: `ID` groups by project, `data-index` identifies individual images

**Example from current HTML**:
```html
<img src="./resources/images/AI/AI_05-vogue-magazine.webp" id="ai-Vogue" data-index="1" data-hover="ai-Vogue" alt="...">
<img src="./resources/images/AI/AI_02.webp" id="ai-Vogue" data-index="2" data-hover="ai-Vogue" alt="...">
<img src="./resources/images/AI/AI_20-voguealien.webp" id="ai-Vogue" data-index="3" data-hover="ai-Vogue" alt="...">
```

### 4. PROPOSED DATA SCHEMA

### Project Data Structure
The system combines automatic file discovery with manual project metadata to create complete project objects:

```javascript
// js/data/project-metadata.js - Manual metadata for each project
export const projectMetadata = {
  "ai-Vogue": {
    title: "VOGUE Polska - July August 2023",
    description: "A 13-image series and cover for Vogue Polska's AI-themed issue...",
    hasReferences: true,
    referenceButtonText: "images from shoot"
  },
  "ai-VogueBES": {
    title: "Vogue Annual BES Report 2023",
    description: "Created for Vogue Business's 2023 Annual Report...",
    hasReferences: false
  }
  // ... more project metadata
};

// js/utils/file-scanner.js - Automatic file discovery
export async function generateProjectsData() {
  const aiProjects = await scanImageDirectory('AI');
  const cgiProjects = await scanImageDirectory('CGI');
  const photoProjects = await scanImageDirectory('PHOTO');

  // Merge discovered files with metadata
  const completeProjects = {
    AI: mergeWithMetadata(aiProjects, projectMetadata),
    CGI: mergeWithMetadata(cgiProjects, projectMetadata),
    PHOTO: mergeWithMetadata(photoProjects, projectMetadata)
  };

  return completeProjects;
}

// Example of generated complete project data
const generatedProjectsData = {
  AI: {
    "ai-Vogue": {
      // From metadata
      title: "VOGUE Polska - July August 2023",
      description: "A 13-image series and cover for Vogue Polska's AI-themed issue...",
      hasReferences: true,
      referenceButtonText: "images from shoot",

      // From file discovery
      category: "ai",
      images: [
        {
          src: "./resources/images/AI/ai-Vogue-1.webp",
          dataIndex: 1,
          filename: "ai-Vogue-1.webp",
          alt: "Vogue Magazine Cover",
          isActive: true // First image in project
        },
        {
          src: "./resources/images/AI/ai-Vogue-2.webp",
          dataIndex: 2,
          filename: "ai-Vogue-2.webp",
          alt: "Vogue Editorial Image",
          additionalClasses: ["main-img", "ref"]
        },
        {
          src: "./resources/images/AI/ai-Vogue-3.webp",
          dataIndex: 3,
          filename: "ai-Vogue-3.webp",
          alt: "Vogue Alien Concept"
        }
      ]
    }
  }
};
```

### Reference Data Structure
Preserve the existing reference mapping system while making it data-driven:

```javascript
// js/data/references.js
export const referenceImages = {
  // Maps data-index to reference images (maintains current system)
  2: [ // ai-Vogue data-index="2"
    "./resources/images/references/ref_img#ai-Vogue_2_data-index_2_1.webp",
    "./resources/images/references/ref_img#ai-Vogue_2_data-index_2_2.webp",
    "./resources/images/references/ref_img#ai-Vogue_2_data-index_2_3.webp"
  ],
  3: [ // ai-Vogue data-index="3"
    "./resources/images/references/ref_img#ai-Vogue_3_data-index_3_1.webp",
    "./resources/images/references/ref_img#ai-Vogue_3_data-index_3_2.webp"
  ]
  // ... more reference mappings
};
```

### Key Preservation Requirements
- **ID Consistency**: Maintain `category-project_name` format for all projects
- **Data-Index Uniqueness**: Preserve existing data-index values for backward compatibility
- **Reference System**: Keep current reference image mapping logic intact
- **Bootstrap Structure**: Maintain carousel structure and CSS classes
- **Data Attributes**: Preserve all `data-hover`, `data-index`, and `id` attributes
- **Container Structure**: Each image must be wrapped in `div` with matching ID and proper classes

### Critical Container Structure
Every new image element generated during automation MUST follow the exact existing pattern:

```html
<!-- Current Pattern - MUST BE PRESERVED -->
<div id="ai-Vogue" class="carousel-item ai active">
    <img src="./resources/images/AI/AI_05-vogue-magazine.webp"
         id="ai-Vogue"
         class="d-block"
         data-index="1"
         data-hover="ai-Vogue"
         alt="...">
</div>
```

**Wrapper Div Requirements**:
- `id`: MUST match the image ID (`category-project_name`)
- `class`: MUST include `carousel-item` + category class (`ai`, `cg`, `ph`)
- First item in each category: MUST include `active` class
- Video items: Follow same pattern but contain `<video>` instead of `<img>`

**Breaking this structure will cause**:
- Navigation system failures
- Reference button functionality breakdown
- Category-specific styling issues
- Bootstrap carousel malfunction

## 5. AUTOMATIC IMAGE DISCOVERY SYSTEM

### File-Based Content Management
The automation system will scan the `resources/images` directories to automatically discover and inject images into the application, eliminating the need for manual HTML updates.

### Image Naming Convention
**Format**: `category-project_name-index.webp`

**Examples**:
- `ai-Vogue-1.webp` → AI category, Vogue project, data-index=1, position=1
- `ai-Vogue-2.webp` → AI category, Vogue project, data-index=2, position=2
- `cg-ShowReel-200.webp` → CGI category, ShowReel project, data-index=200, position=1
- `ph-VitalSigns-22.webp` → Photo category, VitalSigns project, data-index=22, position=1

### Directory Structure for Scanning
```
resources/images/
├── AI/          # Scanned for ai-* files
│   ├── ai-Vogue-1.webp
│   ├── ai-Vogue-2.webp
│   ├── ai-Vogue-3.webp
│   ├── ai-VogueBES-60.webp
│   ├── ai-VogueBES-61.webp
│   └── ai-Rombaut-4.webp
├── CGI/         # Scanned for cg-* files
│   ├── cg-ShowReel-200.mp4
│   ├── cg-DMP-8.webp
│   ├── cg-DMP-9.webp
│   └── cg-Experiments-15.webp
└── PHOTO/       # Scanned for ph-* files
    ├── ph-VitalSigns-22.webp
    ├── ph-VitalSigns-23.webp
    └── ph-Personal-33.webp
```

### Index Dual Purpose
The `index` in the filename serves two critical functions:
1. **Data-Index**: Used by the reference system for mapping to reference images
2. **Carousel Position**: Determines the order of images within the project carousel

### Automatic Content Generation Process
1. **Directory Scanning**: System scans `AI/`, `CGI/`, `PHOTO/` folders
2. **File Parsing**: Extracts category, project name, and index from filenames
3. **Data Structure Building**: Automatically builds project data objects
4. **HTML Generation**: Creates carousel items with proper wrapper divs and attributes
5. **Reference Integration**: Links data-index values to existing reference system

### Migration Strategy for Existing Files
Current files need to be renamed to follow the new convention:
```bash
# Current: AI_05-vogue-magazine.webp
# New:     ai-Vogue-1.webp

# Current: CGI_01.webp
# New:     cg-DMP-8.webp

# Current: PHOTO_01-vitalcolour.webp
# New:     ph-VitalSigns-22.webp
```

### 6. Development Rules

#### Code Quality
- **ES6+ Modules**: Use import/export for all JavaScript
- **Consistent Naming**: camelCase for JS, kebab-case for CSS classes
- **No Inline Styles**: All styling via CSS files
- **Error Handling**: Graceful fallbacks for missing content

#### Backward Compatibility
- Maintain existing URLs and navigation
- Preserve current user experience
- Keep existing CSS class structure
- Ensure mobile compatibility

#### Performance
- **Lazy Loading**: Load images as needed
- **Minimal DOM**: Generate only visible content initially
- **Efficient Updates**: Update only changed elements
- **Asset Optimization**: Compressed images, minimal JavaScript

### 7. Current State Analysis

#### Existing Features to Preserve
- ✅ Bootstrap carousel functionality
- ✅ Smooth scrolling between categories
- ✅ Reference image overlay system
- ✅ Mobile navigation
- ✅ Custom cursor behavior
- ✅ Project description switching
- ✅ Responsive design

#### Technical Debt to Address
- ❌ Hardcoded HTML content
- ❌ Manual project addition process
- ❌ Scattered content management
- ❌ Duplicate ID issues in HTML
- ❌ Mixed inline and external styling

### 8. Implementation Strategy

#### Step 1: Data Structure Creation
**Objective**: Create automatic image discovery and data structure generation system

**Critical Requirements**:
- Scan `resources/images/AI/`, `resources/images/CGI/`, `resources/images/PHOTO/` directories
- Parse filenames following `category-project_name-index.webp` format
- Preserve existing data-index values during migration
- Zero breaking changes to existing functionality

**Tasks**:
1. **Create `js/utils/file-scanner.js`**
   - Directory scanning functions for each category
   - Filename parsing to extract category, project, and index
   - Automatic data structure generation from discovered files
   - File validation and error handling

2. **Create `js/data/projects.js`**
   - Initially extract current project metadata (titles, descriptions)
   - Merge with automatically discovered image data
   - Preserve all existing `data-index` values
   - Include exact reference button text where applicable

3. **File Migration Strategy**
   - Rename existing files to follow new convention:
     - `AI_05-vogue-magazine.webp` → `ai-Vogue-1.webp`
     - `CGI_01.webp` → `cg-DMP-8.webp`
     - `PHOTO_01-vitalcolour.webp` → `ph-VitalSigns-22.webp`
   - Maintain exact data-index mapping during rename

4. **Create `js/data/references.js`**
   - Extract current reference image mappings from existing `references.js`
   - Maintain data-index-based mapping system
   - Update to work with new file naming convention

**Example Scanner Function**:
```javascript
async function scanImageDirectory(category) {
  const files = await getDirectoryFiles(`resources/images/${category}/`);
  const projects = {};

  files.forEach(filename => {
    const match = filename.match(/^(\w+)-([^-]+)-(\d+)\.(webp|mp4)$/);
    if (match) {
      const [, cat, projectName, index, ext] = match;
      const projectId = `${cat}-${projectName}`;

      if (!projects[projectId]) {
        projects[projectId] = { images: [], category: cat };
      }

      projects[projectId].images.push({
        src: `./resources/images/${category}/${filename}`,
        dataIndex: parseInt(index),
        filename: filename
      });
    }
  });

  return projects;
}
```

#### Step 2: Content Generation Functions
**Objective**: Create dynamic HTML generation while maintaining Bootstrap carousel structure

**Tasks**:
1. **Create `js/utils/content-generator.js`**
   - Functions to generate carousel HTML from project data
   - **CRITICAL**: Every image must be wrapped in div with matching ID and proper classes
   - Preserve exact Bootstrap classes and structure
   - Maintain all data attributes: `data-index`, `data-hover`, `id`
   - Handle both image and video media types
   - Generate reference buttons only when `hasReferences: true`

**Content Generator Function Requirements**:
```javascript
// Example function structure that MUST be followed
function generateCarouselItem(projectId, itemData, category, isFirst = false) {
  const activeClass = isFirst ? ' active' : '';
  const additionalClasses = itemData.additionalClasses ? ` ${itemData.additionalClasses.join(' ')}` : '';

  return `
    <div id="${projectId}" class="carousel-item ${category}${activeClass}">
      <img src="${itemData.src}"
           id="${projectId}"
           class="d-block${additionalClasses}"
           data-index="${itemData.dataIndex}"
           data-hover="${projectId}"
           alt="${itemData.alt}">
    </div>
  `;
}
```

2. **Integration Testing**
   - Verify generated HTML matches current structure exactly
   - Test that data-index values remain consistent
   - Ensure reference button functionality works with generated content

#### Step 3: Migration
**Objective**: Seamlessly replace hardcoded content with data-driven generation

**Tasks**:
1. **Gradual Replacement**
   - Replace hardcoded carousel items with generated ones (preserve all IDs and data-indexes)
   - Replace hardcoded descriptions with generated ones
   - Update reference system to work with both old and new structure during transition

2. **Reference System Adaptation**
   - Modify `js/ui/references.js` to work with generated content
   - Preserve existing data-index-based reference lookup
   - Maintain current button styling and interaction behavior

3. **Backward Compatibility Testing**
   - Verify all existing bookmarks and navigation still work
   - Test reference overlays function identically
   - Ensure mobile navigation remains unchanged

#### Step 4: Enhancement
**Objective**: Add new capabilities while maintaining system integrity

**Tasks**:
1. **New Project Addition System**
   - Simple data file updates to add new projects
   - Automatic data-index assignment for new images
   - Reference system auto-detection and integration

2. **Content Validation**
   - Validate that all referenced images exist
   - Check for data-index conflicts
   - Ensure reference mappings are complete

3. **Testing and Documentation**
   - Comprehensive testing across all 20+ projects
   - Performance optimization
   - Update development documentation

### 9. Future Enhancements

#### Content Management
- Admin interface for adding projects
- Image upload and optimization pipeline
- Content validation and preview system

#### User Experience
- Preloading strategies
- Progressive image loading
- Advanced filtering and search
- Project detail pages

#### Technical
- TypeScript migration
- Build system optimization
- Automated testing
- Performance monitoring

## Development Notes

### Current Working Features
- Reference overlay system working for ai-Vogue_2 and ai-Vogue_3
- Dynamic reference button showing/hiding based on available references
- Smooth animations and transitions
- Mobile-responsive design

### Immediate Priorities
1. Extract existing content into data structures
2. Create content generation system
3. Migrate gradually without breaking existing functionality
4. Test thoroughly on all devices and browsers

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers
