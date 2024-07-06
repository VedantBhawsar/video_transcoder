FROM ubuntu

RUN apt update -y && apt upgrade -y 
RUN apt install ffmpeg -y
RUN apt install curl -y
RUN RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
RUN apt update -y
RUN apt install nodejs -y
RUN apt install npm -y

RUN node -v

RUN ffmpeg -version

WORKDIR /raw-videos

COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm i 

COPY video_encoder.sh video_encoder.sh
COPY script.js script.js
COPY utils.js utils.js
# COPY keys.json keys.json
COPY db.js db.js

RUN mkdir -p output

RUN chmod +x video_encoder.sh
RUN chmod +x script.js


ENTRYPOINT [ "./video_encoder.sh" ]