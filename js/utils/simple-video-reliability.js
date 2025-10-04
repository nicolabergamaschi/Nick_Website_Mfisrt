/**
 * Simple Video Reliability System
 * Minimal approach to ensure videos load and play reliably with loading indicators
 */

class SimpleVideoReliability {
    constructor() {
        this.retryAttempts = new Map();
        this.maxRetries = 2;
        this.retryDelay = 1000; // 1 second
    }

    /**
     * Initialize with minimal intervention
     */
    init() {
        // Add loading overlay styles
        this.addLoadingStyles();

        // Wait for DOM content to be ready before adding listeners
        document.addEventListener('contentManagerReady', () => {
            // Small delay to ensure videos are fully in DOM
            setTimeout(() => {
                this.addVideoEventHandling();
            }, 500);
            console.log('Simple video reliability initialized');
        });
    }

    /**
     * Add loading overlay styles to page
     */
    addLoadingStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .video-loading-overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.9);
                padding: 20px;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #333;
                font-family: 'DM Sans', sans-serif;
                z-index: 1000;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                pointer-events: none;
            }

            .video-loading-spinner {
                width: 25px;
                height: 25px;
                border: 2px solid rgba(0, 0, 0, 0.2);
                border-top: 2px solid #333;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 8px;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Add simple event handling to all videos WITHOUT wrapping them
     */
    addVideoEventHandling() {
        // Find all videos after content is loaded
        const videos = document.querySelectorAll('video');
        console.log(`Adding video handling to ${videos.length} videos`);

        videos.forEach(video => {
            // Don't wrap videos - just add listeners
            video.addEventListener('loadstart', (e) => this.handleVideoLoadStart(e.target));
            video.addEventListener('canplay', (e) => this.handleVideoCanPlay(e.target));
            video.addEventListener('error', (e) => this.handleVideoError(e.target));
            video.addEventListener('stalled', (e) => this.handleVideoStalled(e.target));
        });

        // Add carousel slide change listener to restart videos
        this.addCarouselChangeListener();
    }

    /**
     * Add listener for carousel changes to restart videos
     */
    addCarouselChangeListener() {
        const carousels = document.querySelectorAll('.carousel');

        carousels.forEach(carousel => {
            carousel.addEventListener('slid.bs.carousel', (e) => {
                this.restartActiveVideo(e.target);
            });
        });
    }

    /**
     * Restart video when user lands on a slide
     */
    restartActiveVideo(carousel) {
        const activeItem = carousel.querySelector('.carousel-item.active');
        const video = activeItem?.querySelector('video');

        if (video && !video.paused) {
            // Reset video to beginning and ensure it plays
            video.currentTime = 0;
            video.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        }
    }

    /**
     * Handle video load start
     */
    handleVideoLoadStart(video) {
        this.showLoading(video);
    }

    /**
     * Handle video can play
     */
    handleVideoCanPlay(video) {
        this.hideLoading(video);
    }

    /**
     * Handle video error - simple retry logic
     */
    async handleVideoError(video) {
        const videoId = video.id;
        const currentRetries = this.retryAttempts.get(videoId) || 0;
        const error = video.error;

        // Check if this is a decode error (corrupted file)
        const isDecodeError = error && (
            error.code === MediaError.MEDIA_ERR_DECODE ||
            error.message?.includes('could not be decoded') ||
            error.message?.includes('NOT_SUPPORTED_ERR')
        );

        console.log(`Video error: ${videoId}, attempt ${currentRetries + 1}, error code: ${error?.code}, decode error: ${isDecodeError}`);

        if (isDecodeError) {
            // Don't retry decode errors - the file is likely corrupted
            console.error(`Video file corrupted or unsupported: ${videoId}`);
            this.showErrorMessage(video, 'Video format not supported');
            return;
        }

        if (currentRetries < this.maxRetries) {
            this.retryAttempts.set(videoId, currentRetries + 1);
            this.showLoading(video, `Retrying... (${currentRetries + 1}/${this.maxRetries})`);

            // Wait a bit then retry
            setTimeout(() => {
                console.log(`Retrying video: ${videoId}`);
                video.load();
            }, this.retryDelay);
        } else {
            console.error(`Video failed after ${this.maxRetries} retries: ${videoId}`);
            this.showErrorMessage(video, 'Video unavailable');
        }
    }

    /**
     * Handle video stalled (loading issues)
     */
    handleVideoStalled(video) {
        this.showLoading(video, 'Loading...');
    }

    /**
     * Show error message for permanently failed videos
     */
    showErrorMessage(video, message) {
        const carouselItem = video.closest('.carousel-item');
        if (!carouselItem) return;

        let overlay = carouselItem.querySelector('.video-loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'video-loading-overlay';
            carouselItem.appendChild(overlay);
        }

        overlay.innerHTML = `
            <div style="font-size: 1.2rem; margin-bottom: 8px;">⚠️</div>
            <div style="font-size: 0.8rem; font-weight: 400;">${message}</div>
        `;
        overlay.style.display = 'flex';

        // Hide the broken video element
        video.style.display = 'none';
    }

    /**
     * Show loading overlay WITHOUT wrapping video
     */
    showLoading(video, message = 'Loading...') {
        // Get the carousel item container (parent of video)
        const carouselItem = video.closest('.carousel-item');
        if (!carouselItem) return;

        let overlay = carouselItem.querySelector('.video-loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'video-loading-overlay';
            carouselItem.appendChild(overlay);
        }

        overlay.innerHTML = `
            <div class="video-loading-spinner"></div>
            <div style="font-size: 0.8rem; font-weight: 400;">${message}</div>
        `;
        overlay.style.display = 'flex';
    }

    /**
     * Hide loading overlay
     */
    hideLoading(video) {
        const carouselItem = video.closest('.carousel-item');
        const overlay = carouselItem?.querySelector('.video-loading-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }
}

// Initialize immediately
const videoReliability = new SimpleVideoReliability();
videoReliability.init();

export default SimpleVideoReliability;
