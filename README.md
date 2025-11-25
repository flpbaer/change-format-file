# File Format Converter

Uma aplicação TypeScript robusta e bem estruturada para converter arquivos de áudio e vídeo entre diversos formatos.

## 🎯 Características

- ✅ Conversão de múltiplos formatos de áudio (MP3, WAV, AAC, FLAC, OGG, M4A, WMA)
- ✅ Conversão de múltiplos formatos de vídeo (MP4, AVI, MKV, MOV, WMV, FLV, WEBM)
- ✅ Extração de áudio de arquivos de vídeo
- ✅ Conversão em lote (diretórios completos)
- ✅ Opções avançadas de codificação
- ✅ Interface de linha de comando intuitiva
- ✅ Arquitetura bem estruturada usando padrões de design

## 📋 Pré-requisitos

- Node.js 18+
- FFmpeg instalado no sistema

### Instalando FFmpeg

**macOS:**

```bash
brew install ffmpeg
```

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install ffmpeg
```

**Windows:**
Baixe o FFmpeg de [ffmpeg.org](https://ffmpeg.org/download.html) e adicione ao PATH.

## 🚀 Instalação

1. Clone o repositório ou navegue até a pasta do projeto
2. Instale as dependências:

```bash
npm install
```

3. Compile o projeto:

```bash
npm run build
```

## 📖 Uso

### Converter um único arquivo

```bash
npm run dev file <arquivo-entrada> <formato-saída> [opções]
```

**Exemplos:**

```bash
# Converter WAV para MP3
npm run dev file input.wav mp3

# Converter MP4 para MP3 (extração de áudio)
npm run dev file video.mp4 mp3

# Converter com bitrate personalizado
npm run dev file audio.wav mp3 --audio-bitrate 320k

# Converter com diretório de saída específico
npm run dev file input.wav mp3 -o ./output
```

### Converter diretório completo

```bash
npm run dev dir <diretório-entrada> <formato-saída> [opções]
```

**Exemplos:**

```bash
# Converter todos os arquivos WAV para MP3
npm run dev dir ./audio-folder mp3 --filter wav

# Converter todos os vídeos para MP4
npm run dev dir ./videos mp4 --filter avi

# Converter com saída em diretório diferente
npm run dev dir ./input mp3 -o ./output --filter wav
```

### Ver formatos suportados

```bash
npm run dev formats
```

## ⚙️ Opções Avançadas

### Opções de Áudio

- `-ab, --audio-bitrate <rate>`: Bitrate do áudio (ex: 192k, 320k)
- `-ac, --audio-codec <codec>`: Codec de áudio (ex: libmp3lame, aac)
- `-ar, --sample-rate <rate>`: Taxa de amostragem (ex: 44100, 48000)
- `-ch, --channels <number>`: Canais de áudio (1 para mono, 2 para estéreo)

### Opções de Vídeo

- `-vb, --video-bitrate <rate>`: Bitrate do vídeo (ex: 1000k, 2000k)
- `-vc, --video-codec <codec>`: Codec de vídeo (ex: libx264, libx265)
- `-r, --resolution <res>`: Resolução do vídeo (ex: 1920x1080, 1280x720)
- `-fps, --frame-rate <fps>`: Taxa de quadros (ex: 30, 60)
- `-p, --preset <preset>`: Preset de codificação (ultrafast, fast, medium, slow, veryslow)

### Exemplos Avançados

```bash
# Converter áudio com alta qualidade
npm run dev file input.wav mp3 --audio-bitrate 320k --sample-rate 48000

# Converter vídeo com codec específico e resolução
npm run dev file input.avi mp4 --video-codec libx264 --resolution 1920x1080 --preset medium

# Extrair áudio de vídeo com configurações personalizadas
npm run dev file video.mp4 mp3 --audio-bitrate 192k --channels 2

# Conversão em lote com configurações
npm run dev dir ./videos mp4 --filter mkv --video-bitrate 2000k --preset fast
```

## 📁 Estrutura do Projeto

```
src/
├── converters/               # Conversores de formato
│   ├── BaseConverter.ts      # Classe base abstrata
│   ├── AudioConverter.ts     # Conversor de áudio
│   ├── VideoConverter.ts     # Conversor de vídeo
│   ├── AudioExtractionConverter.ts  # Extração de áudio
│   └── ConverterFactory.ts   # Factory pattern
├── types/                    # Definições de tipos TypeScript
│   └── index.ts
├── utils/                    # Utilitários
│   └── fileUtils.ts          # Funções auxiliares de arquivos
├── FileConverterService.ts   # Serviço principal
├── cli.ts                    # Interface de linha de comando
└── index.ts                  # Ponto de entrada principal
```

## 🎨 Arquitetura

A aplicação segue princípios de design sólidos:

- **Padrão Strategy**: Diferentes estratégias de conversão para diferentes tipos de arquivos
- **Padrão Factory**: Factory para criar conversores apropriados baseado nos formatos
- **Separação de Responsabilidades**: Cada classe tem uma responsabilidade única
- **Extensibilidade**: Fácil adicionar novos formatos e conversores

### Fluxo de Conversão

1. CLI recebe comando do usuário
2. FileConverterService valida entrada e saída
3. ConverterFactory seleciona o conversor apropriado
4. Conversor específico (Audio/Video/Extraction) executa a conversão via FFmpeg
5. Resultado é retornado e exibido ao usuário

## 🔧 Desenvolvimento

```bash
# Modo de desenvolvimento com watch
npm run watch

# Executar em modo dev
npm run dev

# Compilar para produção
npm run build

# Executar versão compilada
npm start
```

## 📊 Conversões Suportadas

### Áudio ↔ Áudio

- MP3, WAV, AAC, FLAC, OGG, M4A, WMA
- Qualquer combinação entre estes formatos

### Vídeo ↔ Vídeo

- MP4, AVI, MKV, MOV, WMV, FLV, WEBM
- Qualquer combinação entre estes formatos

### Vídeo → Áudio

- Extração de áudio de qualquer formato de vídeo
- Conversão para qualquer formato de áudio suportado

## 🛠️ Uso Programático

Você também pode usar a biblioteca diretamente no seu código TypeScript:

```typescript
import { FileConverterService } from "./FileConverterService";

const service = new FileConverterService();

// Converter arquivo único
const result = await service.convertFile("input.wav", "mp3", "./output", {
  audioBitrate: "320k",
});

if (result.success) {
  console.log(`Convertido: ${result.outputFile}`);
} else {
  console.error(`Erro: ${result.error}`);
}

// Converter diretório
const results = await service.convertDirectory(
  "./audio-files",
  "mp3",
  "./output",
  { audioBitrate: "192k" },
  "wav" // filtrar apenas arquivos .wav
);

results.forEach((result) => {
  if (result.success) {
    console.log(`✓ ${result.inputFile}`);
  } else {
    console.error(`✗ ${result.inputFile}: ${result.error}`);
  }
});
```

## 🐛 Troubleshooting

### FFmpeg não encontrado

Se você receber erros sobre FFmpeg não encontrado:

1. Certifique-se de que o FFmpeg está instalado
2. Verifique se está no PATH: `ffmpeg -version`
3. Reinicie o terminal após a instalação

### Erro de codificação

Se houver erro com codecs específicos:

- Verifique se seu FFmpeg foi compilado com suporte ao codec
- Execute: `ffmpeg -codecs` para ver codecs disponíveis

### Arquivo de saída já existe

Por padrão, o FFmpeg não sobrescreve arquivos. Delete o arquivo de saída manualmente ou use um diretório diferente.

## 📝 Licença

MIT

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📧 Suporte

Para problemas ou dúvidas, abra uma issue no repositório.
