import { BaseConverter } from './BaseConverter';
import { AudioConverter } from './AudioConverter';
import { VideoConverter } from './VideoConverter';
import { AudioExtractionConverter } from './AudioExtractionConverter';
import { getFormatType } from '../utils/fileUtils';

/**
 * Factory for creating appropriate converters
 */
export class ConverterFactory {
  private converters: BaseConverter[];

  constructor() {
    this.converters = [
      new AudioConverter(),
      new VideoConverter(),
      new AudioExtractionConverter()
    ];
  }

  /**
   * Get appropriate converter for format conversion
   */
  getConverter(fromFormat: string, toFormat: string): BaseConverter | null {
    for (const converter of this.converters) {
      if (converter.canConvert(fromFormat, toFormat)) {
        return converter;
      }
    }
    return null;
  }

  /**
   * Check if conversion is possible
   */
  canConvert(fromFormat: string, toFormat: string): boolean {
    return this.getConverter(fromFormat, toFormat) !== null;
  }

  /**
   * Get supported conversions info
   */
  getSupportedConversions(): string[] {
    return [
      'Audio to Audio: mp3, wav, aac, flac, ogg, m4a, wma',
      'Video to Video: mp4, avi, mkv, mov, wmv, flv, webm',
      'Video to Audio: Extract audio from any video format'
    ];
  }
}

// Export singleton instance
export const converterFactory = new ConverterFactory();
