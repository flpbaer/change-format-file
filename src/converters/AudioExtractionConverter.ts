import ffmpeg from 'fluent-ffmpeg';
import { BaseConverter } from './BaseConverter';
import { ConversionOptions, ConversionResult } from '../types';
import { getFormatType } from '../utils/fileUtils';

/**
 * Audio extraction converter
 * Extracts audio from video files and converts to audio format
 */
export class AudioExtractionConverter extends BaseConverter {
  getType(): 'audio' {
    return 'audio';
  }

  canConvert(fromFormat: string, toFormat: string): boolean {
    const fromType = getFormatType(fromFormat);
    const toType = getFormatType(toFormat);
    return fromType === 'video' && toType === 'audio';
  }

  async convert(
    inputPath: string,
    outputPath: string,
    options: ConversionOptions = {}
  ): Promise<ConversionResult> {
    return this.executeFFmpeg(inputPath, outputPath, (command) => {
      // Extract audio only
      command.noVideo();

      // Apply audio options
      if (options.audioBitrate) {
        command.audioBitrate(options.audioBitrate);
      }

      if (options.audioCodec) {
        command.audioCodec(options.audioCodec);
      }

      if (options.sampleRate) {
        command.audioFrequency(options.sampleRate);
      }

      if (options.audioChannels) {
        command.audioChannels(options.audioChannels);
      }

      return command;
    });
  }
}
