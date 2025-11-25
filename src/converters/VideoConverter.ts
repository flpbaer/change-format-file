import ffmpeg from 'fluent-ffmpeg';
import { BaseConverter } from './BaseConverter';
import { ConversionOptions, ConversionResult } from '../types';
import { SUPPORTED_FORMATS } from '../utils/fileUtils';

/**
 * Video file converter
 * Supports conversions between: MP4, AVI, MKV, MOV, WMV, FLV, WEBM
 */
export class VideoConverter extends BaseConverter {
  getType(): 'video' {
    return 'video';
  }

  canConvert(fromFormat: string, toFormat: string): boolean {
    const from = fromFormat.toLowerCase();
    const to = toFormat.toLowerCase();
    return SUPPORTED_FORMATS.video.includes(from) && 
           SUPPORTED_FORMATS.video.includes(to);
  }

  async convert(
    inputPath: string,
    outputPath: string,
    options: ConversionOptions = {}
  ): Promise<ConversionResult> {
    return this.executeFFmpeg(inputPath, outputPath, (command) => {
      // Apply video-specific options
      if (options.videoCodec) {
        command.videoCodec(options.videoCodec);
      }

      if (options.videoBitrate) {
        command.videoBitrate(options.videoBitrate);
      }

      if (options.resolution) {
        command.size(options.resolution);
      }

      if (options.frameRate) {
        command.fps(options.frameRate);
      }

      if (options.preset) {
        command.outputOptions(`-preset ${options.preset}`);
      }

      // Apply audio options if present
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
