#!/bin/bash

# Video Batch Conversion Script
# Re-encodes all videos for maximum browser compatibility
# Excludes ShowReel video as requested

echo "🎬 Starting batch video conversion for maximum browser compatibility..."

# Create backup directory
BACKUP_DIR="video_originals_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Function to convert a single video
convert_video() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local dir=$(dirname "$input_file")

    echo "📹 Processing: $filename"

    # Create backup
    cp "$input_file" "$BACKUP_DIR/$filename"
    echo "  ✅ Backup created"

    # Create temporary output file
    local temp_output="${input_file%.mp4}_temp.mp4"

    # Convert with optimal settings for browser compatibility
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -profile:v high \
        -level:v 4.0 \
        -pix_fmt yuv420p \
        -crf 23 \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -y \
        "$temp_output" 2>/dev/null

    if [ $? -eq 0 ]; then
        # Replace original with converted version
        mv "$temp_output" "$input_file"
        echo "  ✅ Converted successfully"
        return 0
    else
        # Remove failed temp file
        rm -f "$temp_output"
        echo "  ❌ Conversion failed"
        return 1
    fi
}

# Check if ffmpeg is available
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ Error: ffmpeg is not installed"
    echo "Please install ffmpeg first:"
    echo "  Ubuntu/Debian: sudo apt update && sudo apt install ffmpeg"
    echo "  macOS: brew install ffmpeg"
    echo "  Windows: Download from https://ffmpeg.org/download.html"
    exit 1
fi

echo "✅ ffmpeg found, starting conversions..."

# Counter for statistics
total_videos=0
successful_conversions=0
failed_conversions=0

# List of videos to convert (excluding ShowReel)
declare -a videos=(
    "resources/images/AI/ai-Kraut-22.mp4"
    "resources/images/AI/ai-Rombaut-8-1.mp4"
    "resources/images/AI/ai-Rombaut-8-2.mp4"
    "resources/images/AI/ai-Rombaut-8-3.mp4"
    "resources/images/AI/ai-Rombaut-9-1.mp4"
    "resources/images/CGI/cg-DMP-3a.mp4"
    "resources/images/CGI/cg-DMP-4a.mp4"
    "resources/images/CGI/cg-DMP-5.mp4"
    "resources/images/CGI/cg-Experiments-10a.mp4"
    "resources/images/CGI/cg-Experiments-12a.mp4"
    "resources/images/CGI/cg-Experiments-8a.mp4"
    "resources/images/CGI/cg-Rolex-6a.mp4"
)

echo "Found ${#videos[@]} videos to convert (excluding ShowReel)"
echo ""

# Convert each video
for video in "${videos[@]}"; do
    if [ -f "$video" ]; then
        total_videos=$((total_videos + 1))
        if convert_video "$video"; then
            successful_conversions=$((successful_conversions + 1))
        else
            failed_conversions=$((failed_conversions + 1))
        fi
        echo ""
    else
        echo "⚠️  File not found: $video"
    fi
done

# Print summary
echo "🎯 Conversion Summary:"
echo "  Total videos processed: $total_videos"
echo "  Successful conversions: $successful_conversions"
echo "  Failed conversions: $failed_conversions"
echo "  Backup directory: $BACKUP_DIR"
echo ""

if [ $successful_conversions -gt 0 ]; then
    echo "✅ Conversion completed!"
    echo "📁 Original videos backed up to: $BACKUP_DIR"
    echo "🌐 Videos are now optimized for maximum browser compatibility"
else
    echo "❌ No videos were converted successfully"
fi

echo ""
echo "🔧 Encoding settings used:"
echo "  - Codec: H.264 (libx264)"
echo "  - Profile: High, Level 4.0"
echo "  - CRF: 23 (good quality/size balance)"
echo "  - Audio: AAC 128kbps"
echo "  - Progressive download enabled"
echo "  - Pixel format: yuv420p (max compatibility)"
