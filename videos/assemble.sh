#!/bin/bash
cd "$(dirname "$0")/assets"

# Create individual video segments: image + audio for each scene
for i in 1 2 3 4 5 6 7; do
  dur=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 narr${i}.mp3)
  # Add 1 second padding after narration
  total=$(echo "$dur + 1.0" | bc)
  
  ffmpeg -y \
    -loop 1 -i slide${i}.png \
    -i narr${i}.mp3 \
    -c:v libx264 -tune stillimage -pix_fmt yuv420p \
    -c:a aac -b:a 192k \
    -t $total \
    -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,fps=30" \
    segment${i}.mp4 2>/dev/null
  
  echo "Created segment${i}.mp4 (${total}s)"
done

# Create concat list
> concat.txt
for i in 1 2 3 4 5 6 7; do
  echo "file 'segment${i}.mp4'" >> concat.txt
done

# Concatenate all segments
ffmpeg -y -f concat -safe 0 -i concat.txt \
  -c:v libx264 -c:a aac -b:a 192k \
  ../output/video1-cuando-empezar-9x16.mp4 2>/dev/null

echo ""
echo "=== DONE ==="
ls -lh ../output/video1-cuando-empezar-9x16.mp4
