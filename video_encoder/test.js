const { exec } = require("child_process");

function init() {
  const p = exec(
    "docker run -it -e VIDEO_URL=https://res.cloudinary.com/dydrdxj16/video/upload/v1719941252/www-y2mate.blog_-_Tell_Me_About_Yourself_Three_Minute_Interview_Preparation_kwntyz.mp4 -e PRODUCT_ID=blog-402212 -e  BUCKET_ID=staging.blog-402212.appspot.com video_encoder"
  );
  p.stdout.on("data", function (data) {
    console.log(data.toString());
  });
  p.stderr.on("data", function (data) {
    console.error(data.toString());
  });
  p.on("exit", function (data) {
    console.log("Exit code:", data);
  });
}

init();
