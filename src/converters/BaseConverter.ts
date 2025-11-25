import ffmpeg from 'fluent-ffmpeg';
import { ConversionOptions, ConversionResult } from '../types';

/**
 * Abstract base class for file converters
 */
export abstract class BaseConverter {
  /**
   * Convert a file from one format to another
   */
  abstract convert(
    inputPath: string,
    outputPath: string,
    options?: ConversionOptions
  ): Promise<ConversionResult>;

  /**
   * Validate if conversion is supported
   */
  abstract canConvert(fromFormat: string, toFormat: string): boolean;

  /**
   * Execute ffmpeg command with common error handling
   */
  protected executeFFmpeg(
    inputPath: string,
    outputPath: string,
    configureCommand: (command: ffmpeg.FfmpegCommand) => ffmpeg.FfmpegCommand
  ): Promise<ConversionResult> {
    const startTime = Date.now();

    return new Promise((resolve, reject) => {
      const command = ffmpeg(inputPath);
      const configuredCommand = configureCommand(command);

      configuredCommand
        .output(outputPath)
        .on('end', () => {
          const duration = (Date.now() - startTime) / 1000;
          resolve({
            success: true,
            inputFile: inputPath,
            outputFile: outputPath,
            duration
          });
        })
        .on('error', (err: Error) => {
          resolve({
            success: false,
            inputFile: inputPath,
            outputFile: outputPath,
            error: err.message
          });
        })
        .run();
    });
  }

  /**
   * Get the type of converter
   */
  abstract getType(): 'audio' | 'video';
}
