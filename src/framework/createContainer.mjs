import loadProviders from './loadProviders.mjs'

export default async function createContainer() {
  return await loadProviders()
}
