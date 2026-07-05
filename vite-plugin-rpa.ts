import type { Plugin } from 'vite'
import { execFile } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

// Este plugin só existe pra rodar o `npm run dev` local -- não faz sentido
// (nem funciona) num build estático publicado, já que precisa de um processo
// Node de verdade pra disparar o script Python no computador do Nelson.
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RPA_DIR = path.resolve(__dirname, '..')
const RPA_SCRIPT = 'rpa_preencher_carta.py'
const COORDS_FILE = path.join(RPA_DIR, 'rpa_coords.json')

type Point = [number, number]
type Coords = { nome: Point; mensagem: Point; enviar: Point }

function isPoint(v: unknown): v is Point {
  return Array.isArray(v) && v.length === 2 && v.every((n) => typeof n === 'number' && Number.isFinite(n))
}

function parseCoords(v: unknown): Coords | null {
  if (!v || typeof v !== 'object') return null
  const c = v as Record<string, unknown>
  if (isPoint(c.nome) && isPoint(c.mensagem) && isPoint(c.enviar)) {
    return { nome: c.nome, mensagem: c.mensagem, enviar: c.enviar }
  }
  return null
}

export function rpaPlugin(): Plugin {
  return {
    name: 'rpa-local-trigger',
    configureServer(server) {
      server.middlewares.use('/api/run-rpa', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }

        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', () => {
          let nome = 'Entrevistadora'
          let coords: Coords | null = null
          try {
            const parsed = JSON.parse(body || '{}')
            if (typeof parsed.nome === 'string' && parsed.nome.trim()) {
              nome = parsed.nome.trim()
            }
            coords = parseCoords(parsed.coords)
          } catch {
            // corpo inválido -- segue com o nome padrão e sem coords
          }

          // Sem coords vindas do navegador, cai pro arquivo calibrado na mão
          // (fallback pra quem quiser rodar via terminal sem o site aberto).
          if (!coords && !fs.existsSync(COORDS_FILE)) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              ok: false,
              error: 'Não recebi a posição dos campos do navegador. Recarregue a página e tente de novo.',
            }))
            return
          }

          // execFile (não exec) com args em array: nada aqui passa por um
          // shell, então não há como injetar comando pelo nome ou pelas coords.
          const args = coords
            ? [RPA_SCRIPT, 'enviar', nome, JSON.stringify(coords)]
            : [RPA_SCRIPT, 'enviar', nome]

          execFile('python', args, { cwd: RPA_DIR, timeout: 30000 }, (error, stdout, stderr) => {
            res.setHeader('Content-Type', 'application/json')
            if (error) {
              res.statusCode = 500
              res.end(JSON.stringify({ ok: false, error: stderr || error.message }))
              return
            }
            res.statusCode = 200
            res.end(JSON.stringify({ ok: true, output: stdout }))
          })
        })
      })
    },
  }
}
