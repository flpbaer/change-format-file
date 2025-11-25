# Pasta de Entrada

Coloque seus arquivos aqui para converter.

## Estrutura

- `videos/` - Coloque seus arquivos de vídeo aqui (.mp4, .avi, .mkv, .mov, etc.)
- `audio/` - Coloque seus arquivos de áudio aqui (.wav, .mp3, .aac, .flac, etc.)

## Exemplos de Uso

### Converter vídeos para MP3

```bash
npm run dev dir ./input/videos mp3 -o ./output
```

### Converter áudios WAV para MP3

```bash
npm run dev dir ./input/audio mp3 --filter wav -o ./output
```

### Converter arquivo específico

```bash
npm run dev file ./input/videos/meu-video.mp4 mp3 -o ./output
```
