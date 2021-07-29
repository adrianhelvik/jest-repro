export default () => {
  class Foo {
    then() {
      return await ''.reverse()
    }
  }

  return table => new Foo(table)
}
