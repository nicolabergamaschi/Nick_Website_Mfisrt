#!/bin/bash

# Rename PHOTO files to start from index 1
cd /home/nicola/Nick_Website_Mfisrt/resources/images/PHOTO

echo "📸 Renaming PHOTO files to start from index 1..."

# VitalSigns project: indices 22-32 → 1-11
if [ -f "ph-VitalSigns-22.webp" ]; then mv "ph-VitalSigns-22.webp" "ph-VitalSigns-1.webp"; echo "ph-VitalSigns-22.webp → ph-VitalSigns-1.webp"; fi
if [ -f "ph-VitalSigns-23.webp" ]; then mv "ph-VitalSigns-23.webp" "ph-VitalSigns-2.webp"; echo "ph-VitalSigns-23.webp → ph-VitalSigns-2.webp"; fi
if [ -f "ph-VitalSigns-24.webp" ]; then mv "ph-VitalSigns-24.webp" "ph-VitalSigns-3.webp"; echo "ph-VitalSigns-24.webp → ph-VitalSigns-3.webp"; fi
if [ -f "ph-VitalSigns-25.webp" ]; then mv "ph-VitalSigns-25.webp" "ph-VitalSigns-4.webp"; echo "ph-VitalSigns-25.webp → ph-VitalSigns-4.webp"; fi
if [ -f "ph-VitalSigns-26.webp" ]; then mv "ph-VitalSigns-26.webp" "ph-VitalSigns-5.webp"; echo "ph-VitalSigns-26.webp → ph-VitalSigns-5.webp"; fi
if [ -f "ph-VitalSigns-27.webp" ]; then mv "ph-VitalSigns-27.webp" "ph-VitalSigns-6.webp"; echo "ph-VitalSigns-27.webp → ph-VitalSigns-6.webp"; fi
if [ -f "ph-VitalSigns-28.webp" ]; then mv "ph-VitalSigns-28.webp" "ph-VitalSigns-7.webp"; echo "ph-VitalSigns-28.webp → ph-VitalSigns-7.webp"; fi
if [ -f "ph-VitalSigns-29.webp" ]; then mv "ph-VitalSigns-29.webp" "ph-VitalSigns-8.webp"; echo "ph-VitalSigns-29.webp → ph-VitalSigns-8.webp"; fi
if [ -f "ph-VitalSigns-30.webp" ]; then mv "ph-VitalSigns-30.webp" "ph-VitalSigns-9.webp"; echo "ph-VitalSigns-30.webp → ph-VitalSigns-9.webp"; fi
if [ -f "ph-VitalSigns-31.webp" ]; then mv "ph-VitalSigns-31.webp" "ph-VitalSigns-10.webp"; echo "ph-VitalSigns-31.webp → ph-VitalSigns-10.webp"; fi
if [ -f "ph-VitalSigns-32.webp" ]; then mv "ph-VitalSigns-32.webp" "ph-VitalSigns-11.webp"; echo "ph-VitalSigns-32.webp → ph-VitalSigns-11.webp"; fi

# Personal project: indices 33-37, 39-55 → 12-16, 17-33
if [ -f "ph-Personal-33.webp" ]; then mv "ph-Personal-33.webp" "ph-Personal-12.webp"; echo "ph-Personal-33.webp → ph-Personal-12.webp"; fi
if [ -f "ph-Personal-34.webp" ]; then mv "ph-Personal-34.webp" "ph-Personal-13.webp"; echo "ph-Personal-34.webp → ph-Personal-13.webp"; fi
if [ -f "ph-Personal-35.webp" ]; then mv "ph-Personal-35.webp" "ph-Personal-14.webp"; echo "ph-Personal-35.webp → ph-Personal-14.webp"; fi
if [ -f "ph-Personal-36.webp" ]; then mv "ph-Personal-36.webp" "ph-Personal-15.webp"; echo "ph-Personal-36.webp → ph-Personal-15.webp"; fi
if [ -f "ph-Personal-37.webp" ]; then mv "ph-Personal-37.webp" "ph-Personal-16.webp"; echo "ph-Personal-37.webp → ph-Personal-16.webp"; fi

# Skip 38 (gap), continue with 39-55 → 17-33
if [ -f "ph-Personal-39.webp" ]; then mv "ph-Personal-39.webp" "ph-Personal-17.webp"; echo "ph-Personal-39.webp → ph-Personal-17.webp"; fi
if [ -f "ph-Personal-40.webp" ]; then mv "ph-Personal-40.webp" "ph-Personal-18.webp"; echo "ph-Personal-40.webp → ph-Personal-18.webp"; fi
if [ -f "ph-Personal-41.webp" ]; then mv "ph-Personal-41.webp" "ph-Personal-19.webp"; echo "ph-Personal-41.webp → ph-Personal-19.webp"; fi
if [ -f "ph-Personal-42.webp" ]; then mv "ph-Personal-42.webp" "ph-Personal-20.webp"; echo "ph-Personal-42.webp → ph-Personal-20.webp"; fi
if [ -f "ph-Personal-43.webp" ]; then mv "ph-Personal-43.webp" "ph-Personal-21.webp"; echo "ph-Personal-43.webp → ph-Personal-21.webp"; fi
if [ -f "ph-Personal-44.webp" ]; then mv "ph-Personal-44.webp" "ph-Personal-22.webp"; echo "ph-Personal-44.webp → ph-Personal-22.webp"; fi
if [ -f "ph-Personal-45.webp" ]; then mv "ph-Personal-45.webp" "ph-Personal-23.webp"; echo "ph-Personal-45.webp → ph-Personal-23.webp"; fi
if [ -f "ph-Personal-46.webp" ]; then mv "ph-Personal-46.webp" "ph-Personal-24.webp"; echo "ph-Personal-46.webp → ph-Personal-24.webp"; fi
if [ -f "ph-Personal-47.webp" ]; then mv "ph-Personal-47.webp" "ph-Personal-25.webp"; echo "ph-Personal-47.webp → ph-Personal-25.webp"; fi
if [ -f "ph-Personal-48.webp" ]; then mv "ph-Personal-48.webp" "ph-Personal-26.webp"; echo "ph-Personal-48.webp → ph-Personal-26.webp"; fi
if [ -f "ph-Personal-49.webp" ]; then mv "ph-Personal-49.webp" "ph-Personal-27.webp"; echo "ph-Personal-49.webp → ph-Personal-27.webp"; fi
if [ -f "ph-Personal-50.webp" ]; then mv "ph-Personal-50.webp" "ph-Personal-28.webp"; echo "ph-Personal-50.webp → ph-Personal-28.webp"; fi
if [ -f "ph-Personal-51.webp" ]; then mv "ph-Personal-51.webp" "ph-Personal-29.webp"; echo "ph-Personal-51.webp → ph-Personal-29.webp"; fi
if [ -f "ph-Personal-52.webp" ]; then mv "ph-Personal-52.webp" "ph-Personal-30.webp"; echo "ph-Personal-52.webp → ph-Personal-30.webp"; fi
if [ -f "ph-Personal-53.webp" ]; then mv "ph-Personal-53.webp" "ph-Personal-31.webp"; echo "ph-Personal-53.webp → ph-Personal-31.webp"; fi
if [ -f "ph-Personal-54.webp" ]; then mv "ph-Personal-54.webp" "ph-Personal-32.webp"; echo "ph-Personal-54.webp → ph-Personal-32.webp"; fi
if [ -f "ph-Personal-55.webp" ]; then mv "ph-Personal-55.webp" "ph-Personal-33.webp"; echo "ph-Personal-55.webp → ph-Personal-33.webp"; fi

echo "✅ PHOTO files renamed successfully!"
echo "📊 New order: VitalSigns(1-11) → Personal(12-33)"
