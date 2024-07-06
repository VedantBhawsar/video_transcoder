const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const updateVideo = async () => {
  const data = [
    {
      value: "480p",
      url: "google.com",
    },
  ];
  const id = process.env.VIDEO_ID;
  try {
    let video = await prisma.video.findUnique({
      where: { id },
    });
    if (!video) {
      console.log("Video not found.");
      return;
    }
    let videos = await prisma.video.update({
      data: {
        resolutions: {
          create: data,
        },
      },
    });
    console.log("Video updated.");
    console.log(videos);
  } catch (error) {
    console.error(error);
  }
};
