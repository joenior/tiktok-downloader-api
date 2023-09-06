# TikTok Video Downloader API

![GitHub License](https://img.shields.io/github/license/joenior/tiktok-downloader-api)

A simple Express.js API for downloading TikTok videos without watermark.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [License](#license)

## Introduction

This project provides a RESTful API built with Express.js to download TikTok videos without the watermark. It utilizes the TikTok API to fetch video data and return the video URL for downloading.

## Features

- Download TikTok videos without watermarks.
- Simple and easy-to-use API.
- Customizable for further integration.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/n0l3r/tiktok-video-downloader-api.git
```

Install the required dependencies:

```
cd tiktok-video-downloader-api
npm install
```

Start the server:

```
npm start
```

## Usage

To download TikTok videos without watermarks using this API, you can send a POST request with the TikTok video URL to the /download endpoint.

Here's an example using cURL:

```
curl -X POST -H "Content-Type: application/json" -d '{"url": "https://www.tiktok.com/@username/videoid"}' http://localhost:3000/download
```

Replace "https://www.tiktok.com/@username/videoid" with the TikTok video URL you want to download.

## Endpoints

POST /download: Download a TikTok video without watermark by providing the video URL in the request body as JSON.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
