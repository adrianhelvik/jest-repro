import fs from 'fs/promises'
import path from 'path'

export default async function loadProviders() {
  const providers = Object.create(null)

  const procsDir = path.resolve(
    decodeURIComponent(new URL(import.meta.url).pathname),
    '..',
    '..',
    'providers',
  )

  for (const filename of await fs.readdir(procsDir)) {
    if (filename.endsWith('.mjs') && !filename.endsWith('.spec.mjs')) {
      console.log('filename:', filename)
      providers[
        filename.substring(0, filename.length - '.mjs'.length)
      ] = await import(`../providers/${filename}`)
    }
  }

  return providers
}
