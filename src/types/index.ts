/**
 * Conversion configuration options
 */
export interface ConversionOptions {
  /** Audio bitrate (e.g., '192k', '320k') */
  audioBitrate?: string;
  /** Video bitrate (e.g., '1000k', '2000k') */
  videoBitrate?: string;
  /** Audio codec (e.g., 'libmp3lame', 'aac') */
  audioCodec?: string;
  /** Video codec (e.g., 'libx264', 'libx265') */
  videoCodec?: string;
  /** Audio sample rate (e.g., 44100, 48000) */
  sampleRate?: number;
  /** Audio channels (1 for mono, 2 for stereo) */
  audioChannels?: number;
  /** Video resolution (e.g., '1920x1080', '1280x720') */
  resolution?: string;
  /** Video frame rate (e.g., 30, 60) */
  frameRate?: number;
  /** Quality preset for video encoding */
  preset?: 'ultrafast' | 'superfast' | 'veryfast' | 'faster' | 'fast' | 'medium' | 'slow' | 'slower' | 'veryslow';
}

/**
 * Conversion result
 */
export interface ConversionResult {
  success: boolean;
  inputFile: string;
  outputFile: string;
  error?: string;
  duration?: number;
}

/**
 * Supported format information
 */
export interface FormatInfo {
  extension: string;
  type: 'audio' | 'video';
  defaultCodec?: string;
  description: string;
}
