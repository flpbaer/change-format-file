import * as path from 'path';
import { converterFactory } from './converters/ConverterFactory';
import { ConversionOptions, ConversionResult } from './types';
import {
  fileExists,
  getExtension,
  generateOutputPath,
  getFilesInDirectory,
  isFormatSupported
} from './utils/fileUtils';

/**
 * Main conversion service
 */
export class FileConverterService {
  /**
   * Convert a single file
   */
  async convertFile(
    inputPath: string,
    outputFormat: string,
    outputDir?: string,
    options?: ConversionOptions
  ): Promise<ConversionResult> {
    // Validate input file
    if (!fileExists(inputPath)) {
      return {
        success: false,
        inputFile: inputPath,
        outputFile: '',
        error: 'Input file does not exist'
      };
    }

    // Get input format
    const inputFormat = getExtension(inputPath);
    if (!isFormatSupported(inputFormat)) {
      return {
        success: false,
        inputFile: inputPath,
        outputFile: '',
        error: `Unsupported input format: ${inputFormat}`
      };
    }

    // Validate output format
    if (!isFormatSupported(outputFormat)) {
      return {
        success: false,
        inputFile: inputPath,
        outputFile: '',
        error: `Unsupported output format: ${outputFormat}`
      };
    }

    // Get appropriate converter
    const converter = converterFactory.getConverter(inputFormat, outputFormat);
    if (!converter) {
      return {
        success: false,
        inputFile: inputPath,
        outputFile: '',
        error: `No converter available for ${inputFormat} to ${outputFormat}`
      };
    }

    // Generate output path
    const outputPath = generateOutputPath(inputPath, outputFormat, outputDir);

    // Perform conversion
    return converter.convert(inputPath, outputPath, options);
  }

  /**
   * Convert all files in a directory
   */
  async convertDirectory(
    inputDir: string,
    outputFormat: string,
    outputDir?: string,
    options?: ConversionOptions,
    inputFormat?: string
  ): Promise<ConversionResult[]> {
    // Get files to convert
    const extensions = inputFormat ? [inputFormat] : undefined;
    let files: string[];
    
    try {
      files = getFilesInDirectory(inputDir, extensions);
    } catch (error) {
      return [{
        success: false,
        inputFile: inputDir,
        outputFile: '',
        error: error instanceof Error ? error.message : 'Failed to read directory'
      }];
    }

    if (files.length === 0) {
      return [{
        success: false,
        inputFile: inputDir,
        outputFile: '',
        error: inputFormat 
          ? `No files with extension .${inputFormat} found in directory`
          : 'No files found in directory'
      }];
    }

    // Convert each file
    const results: ConversionResult[] = [];
    for (const file of files) {
      const result = await this.convertFile(file, outputFormat, outputDir, options);
      results.push(result);
    }

    return results;
  }

  /**
   * Check if conversion is supported
   */
  isConversionSupported(fromFormat: string, toFormat: string): boolean {
    return converterFactory.canConvert(fromFormat, toFormat);
  }

  /**
   * Get list of supported conversions
   */
  getSupportedConversions(): string[] {
    return converterFactory.getSupportedConversions();
  }
}
