#!/bin/bash

# File Rename Script for Automated Content Management System
# This script renames all existing files to follow the new naming convention:
# category-project_name-index.webp
#
# IMPORTANT: Make a backup of your resources folder before running this script!
#
# Usage: ./rename_files.sh

echo "🚀 Starting file rename process..."
echo "⚠️  WARNING: This script will rename all your image files!"
echo "📁 Make sure you have a backup of your resources folder!"
echo ""
read -p "Do you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Operation cancelled."
    exit 1
fi

# Create backup
echo "📦 Creating backup..."
cp -r resources resources_backup_$(date +%Y%m%d_%H%M%S)
echo "✅ Backup created"

# Create new directory structure if needed
mkdir -p resources/images/AI
mkdir -p resources/images/CGI
mkdir -p resources/images/PHOTO

echo ""
echo "🔄 Renaming AI category files..."

# AI Category - Reassigning unique indices
# ai-Vogue project (indices 1, 2, 3)
if [ -f "resources/images/AI/AI_05-vogue-magazine.webp" ]; then
    mv "resources/images/AI/AI_05-vogue-magazine.webp" "resources/images/AI/ai-Vogue-1.webp"
    echo "✅ AI_05-vogue-magazine.webp → ai-Vogue-1.webp"
fi

if [ -f "resources/images/AI/AI_02.webp" ]; then
    mv "resources/images/AI/AI_02.webp" "resources/images/AI/ai-Vogue-2.webp"
    echo "✅ AI_02.webp → ai-Vogue-2.webp"
fi

if [ -f "resources/images/AI/AI_20-voguealien.webp" ]; then
    mv "resources/images/AI/AI_20-voguealien.webp" "resources/images/AI/ai-Vogue-3.webp"
    echo "✅ AI_20-voguealien.webp → ai-Vogue-3.webp"
fi

# ai-VogueBES project (indices 60, 61, 62, 63) - reassigned unique indices
if [ -f "resources/images/AI/AI_14-VogueBusiness.webp" ]; then
    mv "resources/images/AI/AI_14-VogueBusiness.webp" "resources/images/AI/ai-VogueBES-60.webp"
    echo "✅ AI_14-VogueBusiness.webp → ai-VogueBES-60.webp"
fi

if [ -f "resources/images/AI/AI_14a-VogueBusiness.webp" ]; then
    mv "resources/images/AI/AI_14a-VogueBusiness.webp" "resources/images/AI/ai-VogueBES-61.webp"
    echo "✅ AI_14a-VogueBusiness.webp → ai-VogueBES-61.webp"
fi

if [ -f "resources/images/AI/AI_23-VogueBusiness.webp" ]; then
    mv "resources/images/AI/AI_23-VogueBusiness.webp" "resources/images/AI/ai-VogueBES-62.webp"
    echo "✅ AI_23-VogueBusiness.webp → ai-VogueBES-62.webp"
fi

if [ -f "resources/images/AI/AI_23a-VogueBusiness.webp" ]; then
    mv "resources/images/AI/AI_23a-VogueBusiness.webp" "resources/images/AI/ai-VogueBES-63.webp"
    echo "✅ AI_23a-VogueBusiness.webp → ai-VogueBES-63.webp"
fi

# ai-Rombaut project (indices 4, 56, 57, 58, 59)
if [ -f "resources/images/AI/AI_04.webp" ]; then
    mv "resources/images/AI/AI_04.webp" "resources/images/AI/ai-Rombaut-4.webp"
    echo "✅ AI_04.webp → ai-Rombaut-4.webp"
fi

if [ -f "resources/images/AI/AI_08-rombaut.webp" ]; then
    mv "resources/images/AI/AI_08-rombaut.webp" "resources/images/AI/ai-Rombaut-56.webp"
    echo "✅ AI_08-rombaut.webp → ai-Rombaut-56.webp"
fi

if [ -f "resources/images/AI/AI_22-Rombautblack.webp" ]; then
    mv "resources/images/AI/AI_22-Rombautblack.webp" "resources/images/AI/ai-Rombaut-57.webp"
    echo "✅ AI_22-Rombautblack.webp → ai-Rombaut-57.webp"
fi

if [ -f "resources/images/AI/AI_09-rombaut.webp" ]; then
    mv "resources/images/AI/AI_09-rombaut.webp" "resources/images/AI/ai-Rombaut-58.webp"
    echo "✅ AI_09-rombaut.webp → ai-Rombaut-58.webp"
fi

if [ -f "resources/images/AI/AI_19-rombautblack.webp" ]; then
    mv "resources/images/AI/AI_19-rombautblack.webp" "resources/images/AI/ai-Rombaut-59.webp"
    echo "✅ AI_19-rombautblack.webp → ai-Rombaut-59.webp"
fi

# ai-RickOwens project (index 64 - reassigned from 62)
if [ -f "resources/images/AI/AI_21-rickowens_boots.webp" ]; then
    mv "resources/images/AI/AI_21-rickowens_boots.webp" "resources/images/AI/ai-RickOwens-64.webp"
    echo "✅ AI_21-rickowens_boots.webp → ai-RickOwens-64.webp"
fi

# ai-Experiments project (indices 6, 7, 65, 66, 67, 68, 69, 70) - reassigned some for uniqueness
if [ -f "resources/images/AI/AI_11-ExpShoes.webp" ]; then
    mv "resources/images/AI/AI_11-ExpShoes.webp" "resources/images/AI/ai-Experiments-6.webp"
    echo "✅ AI_11-ExpShoes.webp → ai-Experiments-6.webp"
fi

if [ -f "resources/images/AI/AI_07.webp" ]; then
    mv "resources/images/AI/AI_07.webp" "resources/images/AI/ai-Experiments-7.webp"
    echo "✅ AI_07.webp → ai-Experiments-7.webp"
fi

if [ -f "resources/images/AI/AI_12-experSkin.webp" ]; then
    mv "resources/images/AI/AI_12-experSkin.webp" "resources/images/AI/ai-Experiments-65.webp"
    echo "✅ AI_12-experSkin.webp → ai-Experiments-65.webp"
fi

if [ -f "resources/images/AI/AI_13-expskin2.webp" ]; then
    mv "resources/images/AI/AI_13-expskin2.webp" "resources/images/AI/ai-Experiments-66.webp"
    echo "✅ AI_13-expskin2.webp → ai-Experiments-66.webp"
fi

if [ -f "resources/images/AI/AI_16-shirt1.webp" ]; then
    mv "resources/images/AI/AI_16-shirt1.webp" "resources/images/AI/ai-Experiments-67.webp"
    echo "✅ AI_16-shirt1.webp → ai-Experiments-67.webp"
fi

if [ -f "resources/images/AI/AI_17-shirt.webp" ]; then
    mv "resources/images/AI/AI_17-shirt.webp" "resources/images/AI/ai-Experiments-68.webp"
    echo "✅ AI_17-shirt.webp → ai-Experiments-68.webp"
fi

if [ -f "resources/images/AI/AI_18-exprock.webp" ]; then
    mv "resources/images/AI/AI_18-exprock.webp" "resources/images/AI/ai-Experiments-69.webp"
    echo "✅ AI_18-exprock.webp → ai-Experiments-69.webp"
fi

if [ -f "resources/images/AI/AI_06.webp" ]; then
    mv "resources/images/AI/AI_06.webp" "resources/images/AI/ai-Experiments-70.webp"
    echo "✅ AI_06.webp → ai-Experiments-70.webp"
fi

echo ""
echo "🔄 Renaming CGI category files..."

# Move video file from resources/video to resources/images/CGI
if [ -f "resources/video/Reel_24-25_NicolaBergamaschi_V3_compressed.mp4" ]; then
    mv "resources/video/Reel_24-25_NicolaBergamaschi_V3_compressed.mp4" "resources/images/CGI/cg-ShowReel-200.mp4"
    echo "✅ Moved video to CGI folder: cg-ShowReel-200.mp4"
fi

# CGI Category files
if [ -f "resources/images/CGI/CGI_01.webp" ]; then
    mv "resources/images/CGI/CGI_01.webp" "resources/images/CGI/cg-DMP-8.webp"
    echo "✅ CGI_01.webp → cg-DMP-8.webp"
fi

if [ -f "resources/images/CGI/CGI_06.webp" ]; then
    mv "resources/images/CGI/CGI_06.webp" "resources/images/CGI/cg-DMP-9.webp"
    echo "✅ CGI_06.webp → cg-DMP-9.webp"
fi

if [ -f "resources/images/CGI/CGI_11-dmp-forn.webp" ]; then
    mv "resources/images/CGI/CGI_11-dmp-forn.webp" "resources/images/CGI/cg-DMP-10.webp"
    echo "✅ CGI_11-dmp-forn.webp → cg-DMP-10.webp"
fi

if [ -f "resources/images/CGI/CGI_12-dmplake.webp" ]; then
    mv "resources/images/CGI/CGI_12-dmplake.webp" "resources/images/CGI/cg-DMP-11.webp"
    echo "✅ CGI_12-dmplake.webp → cg-DMP-11.webp"
fi

if [ -f "resources/images/CGI/CGI_010-Lanvin.webp" ]; then
    mv "resources/images/CGI/CGI_010-Lanvin.webp" "resources/images/CGI/cg-LANVIN-12.webp"
    echo "✅ CGI_010-Lanvin.webp → cg-LANVIN-12.webp"
fi

if [ -f "resources/images/CGI/CGI_02.webp" ]; then
    mv "resources/images/CGI/CGI_02.webp" "resources/images/CGI/cg-Rolex-13.webp"
    echo "✅ CGI_02.webp → cg-Rolex-13.webp"
fi

if [ -f "resources/images/CGI/CGI_09-Salomon_GI_effect_01.webp" ]; then
    mv "resources/images/CGI/CGI_09-Salomon_GI_effect_01.webp" "resources/images/CGI/cg-Salomon-14.webp"
    echo "✅ CGI_09-Salomon_GI_effect_01.webp → cg-Salomon-14.webp"
fi

# cg-Experiments
if [ -f "resources/images/CGI/CGI_07-fluidSim.webp" ]; then
    mv "resources/images/CGI/CGI_07-fluidSim.webp" "resources/images/CGI/cg-Experiments-15.webp"
    echo "✅ CGI_07-fluidSim.webp → cg-Experiments-15.webp"
fi

if [ -f "resources/images/CGI/CGI_08-fluidSim.webp" ]; then
    mv "resources/images/CGI/CGI_08-fluidSim.webp" "resources/images/CGI/cg-Experiments-16.webp"
    echo "✅ CGI_08-fluidSim.webp → cg-Experiments-16.webp"
fi

if [ -f "resources/images/CGI/CGI_15-smokeSim.webp" ]; then
    mv "resources/images/CGI/CGI_15-smokeSim.webp" "resources/images/CGI/cg-Experiments-17.webp"
    echo "✅ CGI_15-smokeSim.webp → cg-Experiments-17.webp"
fi

if [ -f "resources/images/CGI/CGI_16-smokeSim.webp" ]; then
    mv "resources/images/CGI/CGI_16-smokeSim.webp" "resources/images/CGI/cg-Experiments-18.webp"
    echo "✅ CGI_16-smokeSim.webp → cg-Experiments-18.webp"
fi

if [ -f "resources/images/CGI/CGI_13-partSim.webp" ]; then
    mv "resources/images/CGI/CGI_13-partSim.webp" "resources/images/CGI/cg-Experiments-19.webp"
    echo "✅ CGI_13-partSim.webp → cg-Experiments-19.webp"
fi

if [ -f "resources/images/CGI/CGI_17-photgram.webp" ]; then
    mv "resources/images/CGI/CGI_17-photgram.webp" "resources/images/CGI/cg-Experiments-20.webp"
    echo "✅ CGI_17-photgram.webp → cg-Experiments-20.webp"
fi

if [ -f "resources/images/CGI/CGI_05.webp" ]; then
    mv "resources/images/CGI/CGI_05.webp" "resources/images/CGI/cg-Experiments-21.webp"
    echo "✅ CGI_05.webp → cg-Experiments-21.webp"
fi

if [ -f "resources/images/CGI/CGI_14-Tiara.webp" ]; then
    mv "resources/images/CGI/CGI_14-Tiara.webp" "resources/images/CGI/cg-Experiments-38.webp"
    echo "✅ CGI_14-Tiara.webp → cg-Experiments-38.webp"
fi

echo ""
echo "🔄 Renaming PHOTO category files..."

# PHOTO Category files
if [ -f "resources/images/PHOTO/PHOTO_01-vitalcolour.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_01-vitalcolour.webp" "resources/images/PHOTO/ph-VitalSigns-22.webp"
    echo "✅ PHOTO_01-vitalcolour.webp → ph-VitalSigns-22.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_01a-vitalcolour.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_01a-vitalcolour.webp" "resources/images/PHOTO/ph-VitalSigns-23.webp"
    echo "✅ PHOTO_01a-vitalcolour.webp → ph-VitalSigns-23.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_01b-vitalcolour.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_01b-vitalcolour.webp" "resources/images/PHOTO/ph-VitalSigns-24.webp"
    echo "✅ PHOTO_01b-vitalcolour.webp → ph-VitalSigns-24.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_02-vitalbw.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_02-vitalbw.webp" "resources/images/PHOTO/ph-VitalSigns-25.webp"
    echo "✅ PHOTO_02-vitalbw.webp → ph-VitalSigns-25.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_02a-vitalbw.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_02a-vitalbw.webp" "resources/images/PHOTO/ph-VitalSigns-26.webp"
    echo "✅ PHOTO_02a-vitalbw.webp → ph-VitalSigns-26.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_28-vitalbw.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_28-vitalbw.webp" "resources/images/PHOTO/ph-VitalSigns-27.webp"
    echo "✅ PHOTO_28-vitalbw.webp → ph-VitalSigns-27.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_29-vitalbw.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_29-vitalbw.webp" "resources/images/PHOTO/ph-VitalSigns-28.webp"
    echo "✅ PHOTO_29-vitalbw.webp → ph-VitalSigns-28.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_30-SGL_Sepia_3.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_30-SGL_Sepia_3.webp" "resources/images/PHOTO/ph-VitalSigns-29.webp"
    echo "✅ PHOTO_30-SGL_Sepia_3.webp → ph-VitalSigns-29.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_31-SGL_Sepia_7.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_31-SGL_Sepia_7.webp" "resources/images/PHOTO/ph-VitalSigns-30.webp"
    echo "✅ PHOTO_31-SGL_Sepia_7.webp → ph-VitalSigns-30.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_32-SGL_Sepia_11.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_32-SGL_Sepia_11.webp" "resources/images/PHOTO/ph-VitalSigns-31.webp"
    echo "✅ PHOTO_32-SGL_Sepia_11.webp → ph-VitalSigns-31.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_33-SGL_Sepia_5.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_33-SGL_Sepia_5.webp" "resources/images/PHOTO/ph-VitalSigns-32.webp"
    echo "✅ PHOTO_33-SGL_Sepia_5.webp → ph-VitalSigns-32.webp"
fi

# ph-Personal files
if [ -f "resources/images/PHOTO/PHOTO_06-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_06-personal.webp" "resources/images/PHOTO/ph-Personal-33.webp"
    echo "✅ PHOTO_06-personal.webp → ph-Personal-33.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_07-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_07-personal.webp" "resources/images/PHOTO/ph-Personal-34.webp"
    echo "✅ PHOTO_07-personal.webp → ph-Personal-34.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_07b-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_07b-personal.webp" "resources/images/PHOTO/ph-Personal-35.webp"
    echo "✅ PHOTO_07b-personal.webp → ph-Personal-35.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_08-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_08-personal.webp" "resources/images/PHOTO/ph-Personal-36.webp"
    echo "✅ PHOTO_08-personal.webp → ph-Personal-36.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_09-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_09-personal.webp" "resources/images/PHOTO/ph-Personal-37.webp"
    echo "✅ PHOTO_09-personal.webp → ph-Personal-37.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_11-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_11-personal.webp" "resources/images/PHOTO/ph-Personal-39.webp"
    echo "✅ PHOTO_11-personal.webp → ph-Personal-39.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_12-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_12-personal.webp" "resources/images/PHOTO/ph-Personal-40.webp"
    echo "✅ PHOTO_12-personal.webp → ph-Personal-40.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_13-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_13-personal.webp" "resources/images/PHOTO/ph-Personal-41.webp"
    echo "✅ PHOTO_13-personal.webp → ph-Personal-41.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_14-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_14-personal.webp" "resources/images/PHOTO/ph-Personal-42.webp"
    echo "✅ PHOTO_14-personal.webp → ph-Personal-42.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_15-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_15-personal.webp" "resources/images/PHOTO/ph-Personal-43.webp"
    echo "✅ PHOTO_15-personal.webp → ph-Personal-43.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_16-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_16-personal.webp" "resources/images/PHOTO/ph-Personal-44.webp"
    echo "✅ PHOTO_16-personal.webp → ph-Personal-44.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_17-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_17-personal.webp" "resources/images/PHOTO/ph-Personal-45.webp"
    echo "✅ PHOTO_17-personal.webp → ph-Personal-45.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_18-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_18-personal.webp" "resources/images/PHOTO/ph-Personal-46.webp"
    echo "✅ PHOTO_18-personal.webp → ph-Personal-46.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_19-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_19-personal.webp" "resources/images/PHOTO/ph-Personal-47.webp"
    echo "✅ PHOTO_19-personal.webp → ph-Personal-47.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_20-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_20-personal.webp" "resources/images/PHOTO/ph-Personal-48.webp"
    echo "✅ PHOTO_20-personal.webp → ph-Personal-48.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_21-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_21-personal.webp" "resources/images/PHOTO/ph-Personal-49.webp"
    echo "✅ PHOTO_21-personal.webp → ph-Personal-49.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_22-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_22-personal.webp" "resources/images/PHOTO/ph-Personal-50.webp"
    echo "✅ PHOTO_22-personal.webp → ph-Personal-50.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_23-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_23-personal.webp" "resources/images/PHOTO/ph-Personal-51.webp"
    echo "✅ PHOTO_23-personal.webp → ph-Personal-51.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_24-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_24-personal.webp" "resources/images/PHOTO/ph-Personal-52.webp"
    echo "✅ PHOTO_24-personal.webp → ph-Personal-52.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_25-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_25-personal.webp" "resources/images/PHOTO/ph-Personal-53.webp"
    echo "✅ PHOTO_25-personal.webp → ph-Personal-53.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_26-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_26-personal.webp" "resources/images/PHOTO/ph-Personal-54.webp"
    echo "✅ PHOTO_26-personal.webp → ph-Personal-54.webp"
fi

if [ -f "resources/images/PHOTO/PHOTO_27-personal.webp" ]; then
    mv "resources/images/PHOTO/PHOTO_27-personal.webp" "resources/images/PHOTO/ph-Personal-55.webp"
    echo "✅ PHOTO_27-personal.webp → ph-Personal-55.webp"
fi

echo ""
echo "🎉 File rename process completed!"
echo ""
echo "📊 Summary of changes:"
echo "• All images renamed to follow category-project_name-index.webp convention"
echo "• Video file moved to CGI folder"
echo "• Duplicate indices resolved with unique numbers"
echo "• Backup created in resources_backup_* folder"
echo ""
echo "⚠️  IMPORTANT: You'll need to update your reference system manually"
echo "   The data-index mappings have changed for some files:"
echo "   • ai-RickOwens: 62 → 64"
echo "   • ai-VogueBES duplicates: 60,60,61,61 → 60,61,62,63"
echo "   • ai-Experiments: preserved 6,7 but others changed to 65-70"
echo ""
echo "🚀 Ready to use the automated content management system!"
