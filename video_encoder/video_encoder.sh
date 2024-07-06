#!/bin/bash

export VIDEO_URL="${VIDEO_URL}"

curl "$VIDEO_URL" --output video.mp4

mkdir ./output/480p
mkdir ./output/1080p
mkdir ./output/720p
mkdir ./output/360p

ffmpeg -i video.mp4 -vf "scale=854:480" -codec:v libx264 -crf 23 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename ./output/480p/segment_%03d.ts -start_number 0 ./output/480p/index.m3u8
# ffmpeg -i video.mp4 -vf "scale=640:360" -codec:v libx264 -crf 23 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename ./output/360p/segment_%03d.ts -start_number 0 ./output/360p/index.m3u8
# ffmpeg -i video.mp4 -vf "scale=1280:720" -codec:v libx264 -crf 23 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename ./output/720p/segment_%03d.ts -start_number 0 ./output/720p/index.m3u8
# ffmpeg -i video.mp4 -vf "scale=1920:1080" -codec:v libx264 -crf 23 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename ./output/1080p/segment_%03d.ts -start_number 0 ./output/1080p/index.m3u8

node script.js
