#!/bin/bash

# Rename CGI files to start from index 1
cd /home/nicola/Nick_Website_Mfisrt/resources/images/CGI

echo "🎬 Renaming CGI files to start from index 1..."

# DMP project: indices 8-11 → 1-4
if [ -f "cg-DMP-8.webp" ]; then mv "cg-DMP-8.webp" "cg-DMP-1.webp"; echo "cg-DMP-8.webp → cg-DMP-1.webp"; fi
if [ -f "cg-DMP-9.webp" ]; then mv "cg-DMP-9.webp" "cg-DMP-2.webp"; echo "cg-DMP-9.webp → cg-DMP-2.webp"; fi
if [ -f "cg-DMP-10.webp" ]; then mv "cg-DMP-10.webp" "cg-DMP-3.webp"; echo "cg-DMP-10.webp → cg-DMP-3.webp"; fi
if [ -f "cg-DMP-11.webp" ]; then mv "cg-DMP-11.webp" "cg-DMP-4.webp"; echo "cg-DMP-11.webp → cg-DMP-4.webp"; fi

# LANVIN project: index 12 → 5
if [ -f "cg-LANVIN-12.webp" ]; then mv "cg-LANVIN-12.webp" "cg-LANVIN-5.webp"; echo "cg-LANVIN-12.webp → cg-LANVIN-5.webp"; fi

# Rolex project: index 13 → 6
if [ -f "cg-Rolex-13.webp" ]; then mv "cg-Rolex-13.webp" "cg-Rolex-6.webp"; echo "cg-Rolex-13.webp → cg-Rolex-6.webp"; fi

# Salomon project: index 14 → 7
if [ -f "cg-Salomon-14.webp" ]; then mv "cg-Salomon-14.webp" "cg-Salomon-7.webp"; echo "cg-Salomon-14.webp → cg-Salomon-7.webp"; fi

# Experiments project: indices 15-21 → 8-14
if [ -f "cg-Experiments-15.webp" ]; then mv "cg-Experiments-15.webp" "cg-Experiments-8.webp"; echo "cg-Experiments-15.webp → cg-Experiments-8.webp"; fi
if [ -f "cg-Experiments-16.webp" ]; then mv "cg-Experiments-16.webp" "cg-Experiments-9.webp"; echo "cg-Experiments-16.webp → cg-Experiments-9.webp"; fi
if [ -f "cg-Experiments-17.webp" ]; then mv "cg-Experiments-17.webp" "cg-Experiments-10.webp"; echo "cg-Experiments-17.webp → cg-Experiments-10.webp"; fi
if [ -f "cg-Experiments-18.webp" ]; then mv "cg-Experiments-18.webp" "cg-Experiments-11.webp"; echo "cg-Experiments-18.webp → cg-Experiments-11.webp"; fi
if [ -f "cg-Experiments-19.webp" ]; then mv "cg-Experiments-19.webp" "cg-Experiments-12.webp"; echo "cg-Experiments-19.webp → cg-Experiments-12.webp"; fi
if [ -f "cg-Experiments-20.webp" ]; then mv "cg-Experiments-20.webp" "cg-Experiments-13.webp"; echo "cg-Experiments-20.webp → cg-Experiments-13.webp"; fi
if [ -f "cg-Experiments-21.webp" ]; then mv "cg-Experiments-21.webp" "cg-Experiments-14.webp"; echo "cg-Experiments-21.webp → cg-Experiments-14.webp"; fi

# Special case: cg-Experiments-38.webp → 15
if [ -f "cg-Experiments-38.webp" ]; then mv "cg-Experiments-38.webp" "cg-Experiments-15.webp"; echo "cg-Experiments-38.webp → cg-Experiments-15.webp"; fi

# ShowReel: index 200 → 16
if [ -f "cg-ShowReel-200.mp4" ]; then mv "cg-ShowReel-200.mp4" "cg-ShowReel-16.mp4"; echo "cg-ShowReel-200.mp4 → cg-ShowReel-16.mp4"; fi

echo "✅ CGI files renamed successfully!"
echo "📊 New order: DMP(1-4) → LANVIN(5) → Rolex(6) → Salomon(7) → Experiments(8-15) → ShowReel(16)"
