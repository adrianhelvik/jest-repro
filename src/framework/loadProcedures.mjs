import fs from 'fs/promises'
import path from 'path'

export default async function loadProcedures() {
  const procedures = Object.create(null)

  const procsDir = path.resolve(
    decodeURIComponent(new URL(import.meta.url).pathname),
    '..',
    '..',
    'procedures',
  )

  try {
    for (const filename of await fs.readdir(procsDir)) {
      if (filename.endsWith('.proc.mjs')) {
        procedures[
          filename.substring(0, filename.length - '.proc.mjs'.length)
        ] = await import(`../procedures/${filename}`)
      }
    }
  } catch (e) {
    console.error(e.stack)
  }

  return procedures
}
