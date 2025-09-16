# Migration Analysis: Current to New File Structure

## Current Image Structure Analysis

### AI Category Images (from HTML parsing):
1. `AI_05-vogue-magazine.webp` → `ai-Vogue-1.webp` (data-index="1", active)
2. `AI_02.webp` → `ai-Vogue-2.webp` (data-index="2", has references, classes: main-img ref)
3. `AI_20-voguealien.webp` → `ai-Vogue-3.webp` (data-index="3", has references)
4. `AI_14-VogueBusiness.webp` → `ai-VogueBES-60.webp` (data-index="60")
5. `AI_14a-VogueBusiness.webp` → `ai-VogueBES-60a.webp` (data-index="60", duplicate index)
6. `AI_23-VogueBusiness.webp` → `ai-VogueBES-61.webp` (data-index="61")
7. `AI_23a-VogueBusiness.webp` → `ai-VogueBES-61a.webp` (data-index="61", duplicate index)
8. `AI_04.webp` → `ai-Rombaut-4.webp` (data-index="4")
9. `AI_08-rombaut.webp` → `ai-Rombaut-56.webp` (data-index="56")
10. `AI_22-Rombautblack.webp` → `ai-Rombaut-57.webp` (data-index="57")
11. `AI_09-rombaut.webp` → `ai-Rombaut-58.webp` (data-index="58")
12. `AI_19-rombautblack.webp` → `ai-Rombaut-59.webp` (data-index="59")
13. `AI_21-rickowens_boots.webp` → `ai-RickOwens-62.webp` (data-index="62")
14. `AI_12-experSkin.webp` → `ai-Experiments-63.webp` (data-index="63")
15. `AI_13-expskin2.webp` → `ai-Experiments-64.webp` (data-index="64")
16. `AI_16-shirt1.webp` → `ai-Experiments-65.webp` (data-index="65")
17. `AI_17-shirt.webp` → `ai-Experiments-66.webp` (data-index="66")
18. `AI_18-exprock.webp` → `ai-Experiments-67.webp` (data-index="67")
19. `AI_06.webp` → `ai-Experiments-68.webp` (data-index="68")
20. `AI_11-ExpShoes.webp` → `ai-Experiments-6.webp` (data-index="6")
21. `AI_07.webp` → `ai-Experiments-7.webp` (data-index="7")

### CGI Category Images:
1. `Reel_24-25_NicolaBergamaschi_V3_compressed.mp4` → `cg-ShowReel-200.mp4` (data-index="200", video, active)
2. `CGI_01.webp` → `cg-DMP-8.webp` (data-index="8")
3. `CGI_06.webp` → `cg-DMP-9.webp` (data-index="9")
4. `CGI_11-dmp-forn.webp` → `cg-DMP-10.webp` (data-index="10")
5. `CGI_12-dmplake.webp` → `cg-DMP-11.webp` (data-index="11")
6. `CGI_010-Lanvin.webp` → `cg-LANVIN-12.webp` (data-index="12")
7. `CGI_02.webp` → `cg-Rolex-13.webp` (data-index="13")
8. `CGI_09-Salomon_GI_effect_01.webp` → `cg-Salomon-14.webp` (data-index="14")
9. `CGI_07-fluidSim.webp` → `cg-Experiments-15.webp` (data-index="15")
10. `CGI_08-fluidSim.webp` → `cg-Experiments-16.webp` (data-index="16")
11. `CGI_15-smokeSim.webp` → `cg-Experiments-17.webp` (data-index="17")
12. `CGI_16-smokeSim.webp` → `cg-Experiments-18.webp` (data-index="18")
13. `CGI_13-partSim.webp` → `cg-Experiments-19.webp` (data-index="19")
14. `CGI_17-photgram.webp` → `cg-Experiments-20.webp` (data-index="20")
15. `CGI_14-Tiara.webp` → `cg-Experiments-38.webp` (data-index="38")
16. `CGI_05.webp` → `cg-Experiments-21.webp` (data-index="21")

### PHOTO Category Images:
1. `PHOTO_01-vitalcolour.webp` → `ph-VitalSigns-22.webp` (data-index="22", active)
2. `PHOTO_01a-vitalcolour.webp` → `ph-VitalSigns-23.webp` (data-index="23")
3. `PHOTO_01b-vitalcolour.webp` → `ph-VitalSigns-24.webp` (data-index="24")
4. `PHOTO_02-vitalbw.webp` → `ph-VitalSigns-25.webp` (data-index="25")
5. `PHOTO_02a-vitalbw.webp` → `ph-VitalSigns-26.webp` (data-index="26")
6. `PHOTO_28-vitalbw.webp` → `ph-VitalSigns-27.webp` (data-index="27")
7. `PHOTO_29-vitalbw.webp` → `ph-VitalSigns-28.webp` (data-index="28")
8. `PHOTO_30-SGL_Sepia_3.webp` → `ph-VitalSigns-29.webp` (data-index="29")
9. `PHOTO_31-SGL_Sepia_7.webp` → `ph-VitalSigns-30.webp` (data-index="30")
10. `PHOTO_32-SGL_Sepia_11.webp` → `ph-VitalSigns-31.webp` (data-index="31")
11. `PHOTO_33-SGL_Sepia_5.webp` → `ph-VitalSigns-32.webp` (data-index="32")
12. `PHOTO_06-personal.webp` → `ph-Personal-33.webp` (data-index="33")
13. `PHOTO_07-personal.webp` → `ph-Personal-34.webp` (data-index="34")
14. `PHOTO_07b-personal.webp` → `ph-Personal-35.webp` (data-index="35")
15. `PHOTO_08-personal.webp` → `ph-Personal-36.webp` (data-index="36")
16. `PHOTO_09-personal.webp` → `ph-Personal-37.webp` (data-index="37")
17. `PHOTO_11-personal.webp` → `ph-Personal-39.webp` (data-index="39")
18. `PHOTO_12-personal.webp` → `ph-Personal-40.webp` (data-index="40")
19. `PHOTO_13-personal.webp` → `ph-Personal-41.webp` (data-index="41")
20. `PHOTO_14-personal.webp` → `ph-Personal-42.webp` (data-index="42")
21. `PHOTO_15-personal.webp` → `ph-Personal-43.webp` (data-index="43")
22. `PHOTO_16-personal.webp` → `ph-Personal-44.webp` (data-index="44")
23. `PHOTO_17-personal.webp` → `ph-Personal-45.webp` (data-index="45")
24. `PHOTO_18-personal.webp` → `ph-Personal-46.webp` (data-index="46")
25. `PHOTO_19-personal.webp` → `ph-Personal-47.webp` (data-index="47")
26. `PHOTO_20-personal.webp` → `ph-Personal-48.webp` (data-index="48")
27. `PHOTO_21-personal.webp` → `ph-Personal-49.webp` (data-index="49")
28. `PHOTO_22-personal.webp` → `ph-Personal-50.webp` (data-index="50")
29. `PHOTO_23-personal.webp` → `ph-Personal-51.webp` (data-index="51")
30. `PHOTO_24-personal.webp` → `ph-Personal-52.webp` (data-index="52")
31. `PHOTO_25-personal.webp` → `ph-Personal-53.webp` (data-index="53")
32. `PHOTO_26-personal.webp` → `ph-Personal-54.webp` (data-index="54")
33. `PHOTO_27-personal.webp` → `ph-Personal-55.webp` (data-index="55")

## Critical Issues to Address:

### 1. Duplicate Data-Index Values
- ai-VogueBES has two images with data-index="60" and two with data-index="61"
- This will break the file naming convention

### 2. Non-Sequential Indices
- ai-Experiments images have data-index values: 6, 7, 63, 64, 65, 66, 67, 68
- These need to be preserved for reference system compatibility

### 3. Video File Handling
- Show Reel is a video file, not image
- Located in resources/video/ not resources/images/CGI/

## Recommended Solutions:

### For Duplicate Indices:
Use suffix letters for duplicates:
- `ai-VogueBES-60.webp` and `ai-VogueBES-60a.webp`
- `ai-VogueBES-61.webp` and `ai-VogueBES-61a.webp`

### For Video Files:
- Move to appropriate image directory or handle specially in scanner
- Maintain data-index="200" for proper reference system compatibility

## Next Steps:
1. Confirm this mapping is correct
2. Handle duplicate index strategy
3. Decide on video file location
4. Generate rename script
5. Build file scanner to work with new convention
