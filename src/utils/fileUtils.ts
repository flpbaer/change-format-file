import * as path from 'path';
import * as fs from 'fs';

/**
 * Supported audio and video formats
 */
export const SUPPORTED_FORMATS = {
  audio: ['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a', 'wma'],
  video: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm']
};

/**
 * Get file extension without dot
 */
export function getExtension(filePath: string): string {
  return path.extname(filePath).toLowerCase().slice(1);
}

/**
 * Check if file exists
 */
export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/**
 * Check if format is supported
 */
export function isFormatSupported(format: string): boolean {
  const lowerFormat = format.toLowerCase();
  return SUPPORTED_FORMATS.audio.includes(lowerFormat) || 
         SUPPORTED_FORMATS.video.includes(lowerFormat);
}

/**
 * Get format type (audio or video)
 */
export function getFormatType(format: string): 'audio' | 'video' | null {
  const lowerFormat = format.toLowerCase();
  if (SUPPORTED_FORMATS.audio.includes(lowerFormat)) return 'audio';
  if (SUPPORTED_FORMATS.video.includes(lowerFormat)) return 'video';
  return null;
}

/**
 * Ensure directory exists
 */
export function ensureDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Get all files in directory with specific extensions
 */
export function getFilesInDirectory(
  dirPath: string, 
  extensions?: string[]
): string[] {
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Directory does not exist: ${dirPath}`);
  }

  const stat = fs.statSync(dirPath);
  if (!stat.isDirectory()) {
    throw new Error(`Path is not a directory: ${dirPath}`);
  }

  const files = fs.readdirSync(dirPath);
  let result = files.map(file => path.join(dirPath, file))
    .filter(file => fs.statSync(file).isFile());

  if (extensions && extensions.length > 0) {
    const lowerExtensions = extensions.map(ext => ext.toLowerCase());
    result = result.filter(file => {
      const ext = getExtension(file);
      return lowerExtensions.includes(ext);
    });
  }

  return result;
}

/**
 * Generate output filename
 */
export function generateOutputPath(
  inputPath: string,
  outputFormat: string,
  outputDir?: string
): string {
  const parsed = path.parse(inputPath);
  const filename = `${parsed.name}.${outputFormat}`;
  
  if (outputDir) {
    ensureDirectory(outputDir);
    return path.join(outputDir, filename);
  }
  
  return path.join(parsed.dir, filename);
}

/**
 * Format duration in seconds to human-readable format
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs}s`;
}
