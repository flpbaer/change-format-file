# File Format Converter

A TypeScript-based CLI application for converting audio and video files using FFmpeg.

## Features

* Audio conversion (MP3, WAV, AAC, FLAC, OGG, M4A, WMA)
* Video conversion (MP4, AVI, MKV, MOV, WMV, FLV, WEBM)
* Audio extraction from video files
* Batch conversion for directories
* Custom encoding options
* Clean and extensible architecture

---

## Requirements

* Node.js 18+
* FFmpeg installed and available in PATH

### Install FFmpeg

#### macOS

```bash id="c5g4zz"
brew install ffmpeg
```

#### Ubuntu / Debian

```bash id="m0ymsr"
sudo apt update
sudo apt install ffmpeg
```

#### Windows

Download FFmpeg from:

[FFmpeg Official Website](https://ffmpeg.org/download.html?utm_source=chatgpt.com)

---

## Installation

```bash id="xmbh7l"
npm install
npm run build
```

---

## Usage

### Convert a File

```bash id="8u1f7p"
npm run dev file <input-file> <output-format> [options]
```

#### Examples

```bash id="h7f3is"
# WAV to MP3
npm run dev file input.wav mp3

# Extract audio from video
npm run dev file video.mp4 mp3

# Custom bitrate
npm run dev file input.wav mp3 --audio-bitrate 320k
```

---

### Convert a Directory

```bash id="6a6v7e"
npm run dev dir <input-directory> <output-format> [options]
```

#### Example

```bash id="4h22n8"
npm run dev dir ./videos mp4 --filter mkv
```

---

### List Supported Formats

```bash id="vy0p3k"
npm run dev formats
```

---

## Encoding Options

| Option            | Description      |
| ----------------- | ---------------- |
| `--audio-bitrate` | Audio bitrate    |
| `--audio-codec`   | Audio codec      |
| `--sample-rate`   | Sample rate      |
| `--channels`      | Audio channels   |
| `--video-bitrate` | Video bitrate    |
| `--video-codec`   | Video codec      |
| `--resolution`    | Video resolution |
| `--frame-rate`    | FPS              |
| `--preset`        | FFmpeg preset    |

---

## Project Structure

```text id="jlwmkv"
src/
├── converters/
├── types/
├── utils/
├── FileConverterService.ts
├── cli.ts
└── index.ts
```

---

## Programmatic Usage

```typescript id="du0o2z"
import { FileConverterService } from "./FileConverterService";

const service = new FileConverterService();

const result = await service.convertFile(
  "input.wav",
  "mp3",
  "./output",
  {
    audioBitrate: "320k",
  }
);

console.log(result);
```

---

## Development

```bash id="j30oyl"
npm run dev
npm run watch
npm run build
npm start
```

---

## License

MIT
