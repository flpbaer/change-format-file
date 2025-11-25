# Exemplos de Uso

## Casos de Uso Comuns

### 1. Converter Áudios de um Projeto de Podcast

Você tem vários arquivos WAV de gravação e precisa converter para MP3 para distribuição:

```bash
# Converter todos os WAV para MP3 com alta qualidade
npm run dev dir ./gravacoes mp3 --filter wav --audio-bitrate 320k --sample-rate 48000

# Ou com qualidade padrão boa
npm run dev dir ./gravacoes mp3 --filter wav --audio-bitrate 192k
```

### 2. Extrair Áudio de Vídeos

Você tem vídeos do YouTube ou outras fontes e quer apenas o áudio:

```bash
# Extrair áudio de um vídeo para MP3
npm run dev file video.mp4 mp3 --audio-bitrate 192k

# Extrair áudio de todos os MP4 em uma pasta
npm run dev dir ./videos mp3 --filter mp4 --audio-bitrate 256k
```

### 3. Converter Biblioteca Musical

Converter sua coleção de FLAC para MP3 para economizar espaço:

```bash
# Converter com boa qualidade
npm run dev dir ./musicas-flac mp3 --filter flac --audio-bitrate 320k -o ./musicas-mp3

# Ou com qualidade menor para dispositivos móveis
npm run dev dir ./musicas-flac mp3 --filter flac --audio-bitrate 128k -o ./musicas-mobile
```

### 4. Preparar Vídeos para Web

Converter vídeos para formatos otimizados para web:

```bash
# Converter AVI para MP4 com codec H.264
npm run dev file video.avi mp4 --video-codec libx264 --preset medium --resolution 1920x1080

# Conversão rápida com preset mais rápido
npm run dev file video.mkv mp4 --video-codec libx264 --preset fast
```

### 5. Criar Versões de Diferentes Qualidades

```bash
# Alta qualidade para arquivo
npm run dev file original.wav mp3 --audio-bitrate 320k --sample-rate 48000 -o ./hq

# Média qualidade para streaming
npm run dev file original.wav mp3 --audio-bitrate 192k --sample-rate 44100 -o ./mq

# Baixa qualidade para preview
npm run dev file original.wav mp3 --audio-bitrate 96k --sample-rate 44100 -o ./lq
```

### 6. Converter Vídeos de Drone/Câmera

```bash
# Converter MOV de câmera para MP4
npm run dev dir ./drone-footage mp4 --filter mov --video-bitrate 2000k --preset slow

# Com resolução reduzida para compartilhamento
npm run dev dir ./drone-footage mp4 --filter mov --resolution 1280x720 --video-bitrate 1000k
```

### 7. Preparar Áudio para Masterização

```bash
# Converter para WAV de alta qualidade
npm run dev file master.mp3 wav --sample-rate 96000 --channels 2

# Converter para FLAC sem perda
npm run dev dir ./mixes flac --filter wav
```

### 8. Converter Audiolivros

```bash
# Converter para formato eficiente mantendo qualidade de voz
npm run dev dir ./audiobook mp3 --filter wav --audio-bitrate 64k --channels 1 --sample-rate 22050
```

### 9. Batch Processing de Vídeos

```bash
# Converter todos os vídeos para formato padrão
npm run dev dir ./videos-diversos mp4 \
  --video-codec libx264 \
  --audio-codec aac \
  --video-bitrate 1500k \
  --audio-bitrate 192k \
  --preset medium \
  -o ./videos-processados
```

### 10. Converter para Formatos Específicos de Plataforma

```bash
# Para Instagram (MP4 com AAC)
npm run dev file video.avi mp4 \
  --video-codec libx264 \
  --audio-codec aac \
  --resolution 1080x1920 \
  --video-bitrate 3500k \
  --audio-bitrate 192k

# Para YouTube (alta qualidade)
npm run dev file video.mov mp4 \
  --video-codec libx264 \
  --preset slow \
  --video-bitrate 8000k \
  --audio-bitrate 320k
```

## Scripts Úteis

### Script para Converter Lote com Organização

Crie um arquivo `convert-project.sh`:

```bash
#!/bin/bash

# Criar diretórios de saída
mkdir -p output/mp3
mkdir -p output/wav

# Converter todos WAV para MP3
npm run dev dir ./input mp3 --filter wav -o ./output/mp3 --audio-bitrate 320k

# Converter todos MP3 para WAV
npm run dev dir ./input wav --filter mp3 -o ./output/wav --sample-rate 48000

echo "Conversão concluída!"
```

### Script para Diferentes Qualidades

Crie um arquivo `multi-quality.sh`:

```bash
#!/bin/bash

INPUT=$1
OUTPUT_NAME=$(basename "$INPUT" | sed 's/\.[^.]*$//')

# Alta qualidade
npm run dev file "$INPUT" mp3 --audio-bitrate 320k -o ./output/hq
mv "./output/hq/$OUTPUT_NAME.mp3" "./output/hq/${OUTPUT_NAME}_320k.mp3"

# Média qualidade
npm run dev file "$INPUT" mp3 --audio-bitrate 192k -o ./output/mq
mv "./output/mq/$OUTPUT_NAME.mp3" "./output/mq/${OUTPUT_NAME}_192k.mp3"

# Baixa qualidade
npm run dev file "$INPUT" mp3 --audio-bitrate 128k -o ./output/lq
mv "./output/lq/$OUTPUT_NAME.mp3" "./output/lq/${OUTPUT_NAME}_128k.mp3"

echo "Criadas 3 versões de $INPUT"
```

Uso:

```bash
chmod +x multi-quality.sh
./multi-quality.sh input.wav
```

## Dicas de Qualidade

### Para Áudio

- **320kbps**: Qualidade máxima, indistinguível do original para maioria das pessoas
- **256kbps**: Excelente qualidade, bom equilíbrio
- **192kbps**: Boa qualidade, padrão para distribuição
- **128kbps**: Qualidade aceitável, economiza espaço
- **64kbps**: Para podcasts/voz, mono

### Para Vídeo

- **Presets**:

  - `ultrafast`: Conversão rápida, arquivo maior
  - `fast`: Bom equilíbrio tempo/qualidade
  - `medium`: Padrão recomendado
  - `slow`: Melhor qualidade, arquivo menor, mais lento
  - `veryslow`: Máxima compressão, muito lento

- **Bitrates comuns**:
  - 4K: 15000k - 25000k
  - 1080p: 5000k - 8000k
  - 720p: 2500k - 5000k
  - 480p: 1000k - 2000k
