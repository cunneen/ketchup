#!/bin/bash

mkdir icon.iconset
convert -background none -resize 16x16 -gravity center  tomato.png icon.iconset/icon_16x16.png
convert -background none -gravity center  -density 144  -units PixelsPerInch -resample 16x16 -resize 32x32 tomato.png icon.iconset/icon_16x16@2x.png
convert -background none -resize 32x32 -gravity center  tomato.png icon.iconset/icon_32x32.png
convert -background none -gravity center  -density 144  -units PixelsPerInch -resample 32x32 -resize 64x64 tomato.png icon.iconset/icon_32x32@2x.png
convert -background none -resize 64x64 -gravity center  tomato.png icon.iconset/icon_64x64.png
convert -background none -gravity center -density 144 -units PixelsPerInch -resample 64x64 -resize 128x128 tomato.png icon.iconset/icon_64x64@2x.png
convert -background none -resize 128x128 -gravity center  tomato.png icon.iconset/icon_128x128.png
convert -background none -gravity center -density 144 -units PixelsPerInch -resample 128x128 -resize 256x256 tomato.png icon.iconset/icon_128x128@2x.png
convert -background none -resize 256x256 -gravity center  tomato.png icon.iconset/icon_256x256.png
convert -background none -gravity center -density 144 -units PixelsPerInch -resample 256x256 -resize 512x512 tomato.png icon.iconset/icon_256x256@2x.png
convert -background none -resize 512x512 -gravity center  tomato.png icon.iconset/icon_512x512.png
convert -background none -gravity center -density 144 -units PixelsPerInch -resample 512x512 -resize 1024x1024 tomato.png icon.iconset/icon_512x512@2x.png
iconutil --convert icns icon.iconset
cp icon.iconset/icon_32x32.png ./tomato-32.png
cp icon.iconset/icon_32x32@2x.png ./tomato-32@2x.png
cp icon.iconset/icon_128x128.png ./tomato-128.png
cp icon.iconset/icon_128x128@2x.png ./tomato-128@2x.png
rm -R icon.iconset


mkdir iconTemplate.iconset
convert -background none -resize 16x16 -gravity center  tomatoTemplate.png iconTemplate.iconset/icon_16x16.png
convert -background none -gravity center -density 144 -units PixelsPerInch -resample 16x16 -resize 32x32 tomatoTemplate.png iconTemplate.iconset/icon_16x16@2x.png
convert -background none -resize 32x32 -gravity center  tomatoTemplate.png iconTemplate.iconset/icon_32x32.png
convert -background none -gravity center -density 144 -units PixelsPerInch -resample 32x32 -resize 64x64 tomatoTemplate.png iconTemplate.iconset/icon_32x32@2x.png
convert -background none -resize 64x64 -gravity center  tomatoTemplate.png iconTemplate.iconset/icon_64x64.png
convert -background none -gravity center -density 144 -units PixelsPerInch -resample 64x64 -resize 128x128 tomatoTemplate.png iconTemplate.iconset/icon_64x64@2x.png
convert -background none -resize 128x128 -gravity center  tomatoTemplate.png iconTemplate.iconset/icon_128x128.png
convert -background none -gravity center -density 144 -units PixelsPerInch -resample 128x128 -resize 256x256 tomatoTemplate.png iconTemplate.iconset/icon_128x128@2x.png
convert -background none -resize 256x256 -gravity center  tomatoTemplate.png iconTemplate.iconset/icon_256x256.png
convert -background none -gravity center -density 144 -units PixelsPerInch -resample 256x256 -resize 512x512 tomatoTemplate.png iconTemplate.iconset/icon_256x256@2x.png
convert -background none -resize 512x512 -gravity center  tomatoTemplate.png iconTemplate.iconset/icon_512x512.png
convert -background none -gravity center -density 144 -units PixelsPerInch -resample 512x512 -resize 1024x1024 tomatoTemplate.png iconTemplate.iconset/icon_512x512@2x.png
iconutil --convert icns iconTemplate.iconset

cp iconTemplate.iconset/icon_32x32.png ./tomato-32Template.png
cp iconTemplate.iconset/icon_32x32@2x.png ./tomato-32Template@2x.png
cp iconTemplate.iconset/icon_128x128.png ./tomato-128Template.png
cp iconTemplate.iconset/icon_128x128@2x.png ./tomato-128Template@2x.png
rm -R iconTemplate.iconset

