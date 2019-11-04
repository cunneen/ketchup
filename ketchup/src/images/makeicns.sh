#!/bin/bash

mkdir icon.iconset
convert -background none -resize 16x16 -gravity center  tomato.png icon.iconset/icon_16x16.png
convert -background none -resize 32x32 -gravity center  tomato.png icon.iconset/icon_16x16@2x.png
convert -background none -resize 32x32 -gravity center  tomato.png icon.iconset/icon_32x32.png
convert -background none -resize 64x64 -gravity center  tomato.png icon.iconset/icon_32x32@2x.png
convert -background none -resize 64x64 -gravity center  tomato.png icon.iconset/icon_64x64.png
convert -background none -resize 128x128 -gravity center  tomato.png icon.iconset/icon_64x64@2x.png
convert -background none -resize 128x128 -gravity center  tomato.png icon.iconset/icon_128x128.png
convert -background none -resize 256x256 -gravity center  tomato.png icon.iconset/icon_128x128@2x.png
convert -background none -resize 256x256 -gravity center  tomato.png icon.iconset/icon_256x256.png
convert -background none -resize 512x512 -gravity center  tomato.png icon.iconset/icon_256x256@2x.png
convert -background none -resize 512x512 -gravity center  tomato.png icon.iconset/icon_512x512.png
#convert -background none -resize 1024x1024 -gravity center  tomato.png icon.iconset/icon_512x512@2x.png
iconutil --convert icns icon.iconset
rm -R icon.iconset
