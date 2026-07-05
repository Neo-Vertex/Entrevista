// Gera os áudios do New pra página /apresentacao chamando a API do
// ElevenLabs (o mesmo voice_id usado no agente real de WhatsApp) uma vez
// só, e salva os mp3 em public/audio/. Depois disso o site só toca os
// arquivos estáticos -- não precisa de API key rodando em produção.
//
// Uso:
//   set ELEVENLABS_API_KEY=sua_chave_aqui   (PowerShell: $env:ELEVENLABS_API_KEY="...")
//   node scripts/generate-audio.mjs
//
// Rode de novo (sobrescreve) sempre que mudar o texto dos scripts em
// src/data/apresentacao-requisitos.json ou em bio.json.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'audio')

const VOICE_ID = 'CstacWqMhJQlnfLPxRG4'
const API_KEY = process.env.ELEVENLABS_API_KEY

if (!API_KEY) {
  console.error('Faltou a variável de ambiente ELEVENLABS_API_KEY. Defina ela antes de rodar este script.')
  process.exit(1)
}

async function gerarAudio(id, texto) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text: texto,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.8 },
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`ElevenLabs recusou "${id}": ${res.status} ${detail}`)
  }

  const buffer = Buffer.from(await res.arrayBuffer())
  const destino = path.join(OUT_DIR, `${id}.mp3`)
  await writeFile(destino, buffer)
  console.log(`  -> ${id}.mp3 (${(buffer.length / 1024).toFixed(0)} KB)`)
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const requisitos = JSON.parse(
    await readFile(path.join(ROOT, 'src', 'data', 'apresentacao-requisitos.json'), 'utf-8')
  )

  console.log(`Gerando ${requisitos.length} áudios de requisitos...`)
  for (const item of requisitos) {
    await gerarAudio(item.id, item.script)
  }

  const bioPath = path.join(ROOT, 'src', 'data', 'apresentacao-bio.json')
  try {
    const bio = JSON.parse(await readFile(bioPath, 'utf-8'))
    console.log('Gerando áudio da bio...')
    await gerarAudio('bio', bio.script)
  } catch {
    console.log('(sem apresentacao-bio.json ainda -- pulei o áudio da bio)')
  }

  console.log('\nPronto. Os mp3 estão em public/audio/.')
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
