#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs';
import { FileConverterService } from './FileConverterService';
import { ConversionOptions } from './types';
import { formatDuration } from './utils/fileUtils';

const service = new FileConverterService();
const program = new Command();

program
  .name('convert-file')
  .description('Convert audio and video files between different formats')
  .version('1.0.0');

// Convert single file command
program
  .command('file')
  .description('Convert a single file')
  .argument('<input>', 'Input file path')
  .argument('<format>', 'Output format (e.g., mp3, wav, mp4)')
  .option('-o, --output <dir>', 'Output directory')
  .option('-ab, --audio-bitrate <rate>', 'Audio bitrate (e.g., 192k, 320k)')
  .option('-vb, --video-bitrate <rate>', 'Video bitrate (e.g., 1000k, 2000k)')
  .option('-ac, --audio-codec <codec>', 'Audio codec (e.g., libmp3lame, aac)')
  .option('-vc, --video-codec <codec>', 'Video codec (e.g., libx264, libx265)')
  .option('-ar, --sample-rate <rate>', 'Audio sample rate (e.g., 44100, 48000)', parseInt)
  .option('-ch, --channels <number>', 'Audio channels (1 or 2)', parseInt)
  .option('-r, --resolution <res>', 'Video resolution (e.g., 1920x1080)')
  .option('-fps, --frame-rate <fps>', 'Video frame rate', parseInt)
  .option('-p, --preset <preset>', 'Encoding preset (ultrafast, fast, medium, slow, veryslow)')
  .action(async (input: string, format: string, options: any) => {
    const spinner = ora('Converting file...').start();

    try {
      const conversionOptions: ConversionOptions = {
        audioBitrate: options.audioBitrate,
        videoBitrate: options.videoBitrate,
        audioCodec: options.audioCodec,
        videoCodec: options.videoCodec,
        sampleRate: options.sampleRate,
        audioChannels: options.channels,
        resolution: options.resolution,
        frameRate: options.frameRate,
        preset: options.preset
      };

      const result = await service.convertFile(
        input,
        format,
        options.output,
        conversionOptions
      );

      if (result.success) {
        spinner.succeed(
          chalk.green(`✓ Conversion completed in ${formatDuration(result.duration || 0)}`)
        );
        console.log(chalk.cyan(`  Input:  ${result.inputFile}`));
        console.log(chalk.cyan(`  Output: ${result.outputFile}`));
      } else {
        spinner.fail(chalk.red('✗ Conversion failed'));
        console.error(chalk.red(`  Error: ${result.error}`));
        process.exit(1);
      }
    } catch (error) {
      spinner.fail(chalk.red('✗ Conversion failed'));
      console.error(chalk.red(`  Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      process.exit(1);
    }
  });

// Convert directory command
program
  .command('dir')
  .description('Convert all files in a directory')
  .argument('<input>', 'Input directory path')
  .argument('<format>', 'Output format (e.g., mp3, wav, mp4)')
  .option('-o, --output <dir>', 'Output directory')
  .option('-f, --filter <ext>', 'Filter by input file extension (e.g., wav, mp4)')
  .option('-ab, --audio-bitrate <rate>', 'Audio bitrate (e.g., 192k, 320k)')
  .option('-vb, --video-bitrate <rate>', 'Video bitrate (e.g., 1000k, 2000k)')
  .option('-ac, --audio-codec <codec>', 'Audio codec')
  .option('-vc, --video-codec <codec>', 'Video codec')
  .option('-ar, --sample-rate <rate>', 'Audio sample rate', parseInt)
  .option('-ch, --channels <number>', 'Audio channels', parseInt)
  .option('-r, --resolution <res>', 'Video resolution')
  .option('-fps, --frame-rate <fps>', 'Video frame rate', parseInt)
  .option('-p, --preset <preset>', 'Encoding preset')
  .action(async (input: string, format: string, options: any) => {
    const spinner = ora('Converting directory...').start();

    try {
      const conversionOptions: ConversionOptions = {
        audioBitrate: options.audioBitrate,
        videoBitrate: options.videoBitrate,
        audioCodec: options.audioCodec,
        videoCodec: options.videoCodec,
        sampleRate: options.sampleRate,
        audioChannels: options.channels,
        resolution: options.resolution,
        frameRate: options.frameRate,
        preset: options.preset
      };

      const results = await service.convertDirectory(
        input,
        format,
        options.output,
        conversionOptions,
        options.filter
      );

      spinner.stop();

      let successCount = 0;
      let failCount = 0;

      console.log(chalk.bold('\nConversion Results:'));
      console.log(chalk.gray('─'.repeat(60)));

      for (const result of results) {
        if (result.success) {
          successCount++;
          console.log(chalk.green(`✓ ${result.inputFile}`));
          console.log(chalk.gray(`  → ${result.outputFile}`));
          if (result.duration) {
            console.log(chalk.gray(`  Time: ${formatDuration(result.duration)}`));
          }
        } else {
          failCount++;
          console.log(chalk.red(`✗ ${result.inputFile}`));
          console.log(chalk.red(`  Error: ${result.error}`));
        }
        console.log();
      }

      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.bold('Summary:'));
      console.log(chalk.green(`  Success: ${successCount}`));
      if (failCount > 0) {
        console.log(chalk.red(`  Failed:  ${failCount}`));
      }

      if (failCount > 0) {
        process.exit(1);
      }
    } catch (error) {
      spinner.fail(chalk.red('✗ Directory conversion failed'));
      console.error(chalk.red(`  Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      process.exit(1);
    }
  });

// List supported formats command
program
  .command('formats')
  .description('List all supported file formats')
  .action(() => {
    console.log(chalk.bold('\nSupported Conversions:\n'));
    const conversions = service.getSupportedConversions();
    conversions.forEach(conversion => {
      console.log(chalk.cyan(`  • ${conversion}`));
    });
    console.log();
  });

// Parse command line arguments
program.parse();
