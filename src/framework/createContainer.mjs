import loadProviders from './loadProviders.mjs'

export default async function createContainer() {
  const privateProviders = await loadProviders()

  const container = new Proxy(Object.create(null), {
    get(target, property, receiver) {
      if (!target[property]) {
        if (privateProviders[property]) {
          target[property] = privateProviders[property].default(container)
        } else {
          return undefined
          // throw Error('Not found: '.red + property)
        }
      }
      return Reflect.get(target, property, receiver)
    },
  })

  return container
}
