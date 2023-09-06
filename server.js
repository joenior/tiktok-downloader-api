const express = require("express");
const bodyParser = require("body-parser");

const { exit } = require("process");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Adding user agent to avoid IP bans
const headers = new Headers();
headers.append(
  "User-Agent",
  "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet"
);

app.get("/", (req, res) => {
  res.send("Welcome to TikTok Video Downloader API");
});

app.post("/download", async (req, res) => {
  try {
    const url = req.body.url;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const data = await getVideoNoWM(url);
    const videoData = {
      url: data.url,
      id: data.id,
    };

    // You can add additional logic here to save or process the video data.

    res.json(videoData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const getVideoNoWM = async (url) => {
  try {
    const idVideo = await getIdVideo(url);
    const API_URL = `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${idVideo}`;
    const request = await fetch(API_URL, {
      method: "GET",
      headers: headers,
    });
    const body = await request.text();

    try {
      var res = JSON.parse(body);
    } catch (err) {
      console.error("Error:", err);
      console.error("Response body:", body);
    }

    const urlMedia = res.aweme_list[0].video.play_addr.url_list[0];
    const data = {
      url: urlMedia,
      id: idVideo,
    };
    return data;
  } catch (error) {
    throw error;
  }
};

const getIdVideo = (url) => {
  const matching = url.includes("/video/");
  if (!matching) {
    throw new Error("URL not found");
  }
  const idVideo = url.substring(url.indexOf("/video/") + 7, url.length);
  return idVideo.length > 19
    ? idVideo.substring(0, idVideo.indexOf("?"))
    : idVideo;
};
