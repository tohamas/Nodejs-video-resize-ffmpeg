const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

// Tell fluent-ffmpeg where it can find FFmpeg
ffmpeg.setFfmpegPath(ffmpegStatic);

// Run FFmpeg
ffmpeg()

  // Input file path
  .input('example_video.mp4')

  // Scale the video to 720 pixels in height. The -2 means FFmpeg should figure out the
  // exact size of the other dimension. In other words, to make the video 720 pixels wide
  // and make FFmpeg calculate its height, use scale=720:-2 instead.
  .outputOptions('-vf','scale=600:-2')

  // Output file new path
  .saveToFile('example_video_new_name.mp4')

  // Log the percentage of work completed
  .on('progress', (progress) => {
    if (progress.percent) {
      console.log(`Processing: ${Math.floor(progress.percent)}% done`);
    }
  })

  // The callback that is run when FFmpeg is finished
  .on('end', () => {
    console.log('FFmpeg has finished.');
  })

  // The callback that is run when FFmpeg encountered an error
  .on('error', (error) => {
    console.error(error);
  });