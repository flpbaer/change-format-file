import ffmpeg from 'fluent-ffmpeg';
import { BaseConverter } from './BaseConverter';
import { ConversionOptions, ConversionResult } from '../types';
import { SUPPORTED_FORMATS } from '../utils/fileUtils';

/**
 * Audio file converter
 * Supports conversions between: MP3, WAV, AAC, FLAC, OGG, M4A, WMA
 */
export class AudioConverter extends BaseConverter {
  getType(): 'audio' {
    return 'audio';
  }

  canConvert(fromFormat: string, toFormat: string): boolean {
    const from = fromFormat.toLowerCase();
    const to = toFormat.toLowerCase();
    return SUPPORTED_FORMATS.audio.includes(from) && 
           SUPPORTED_FORMATS.audio.includes(to);
  }

  async convert(
    inputPath: string,
    outputPath: string,
    options: ConversionOptions = {}
  ): Promise<ConversionResult> {
    return this.executeFFmpeg(inputPath, outputPath, (command) => {
      // Apply audio-specific options
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

      // Remove video stream if present (for audio extraction)
      command.noVideo();

      return command;
    });
  }
}
