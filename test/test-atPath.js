let atPath = require('../src/atPath')

describe('atPath', function() {
  let increment = x => x + 1

  it('transforms the value at the path by the function', function() {
    let initial = {
      foo: 1
    }

    let final = atPath('foo', increment, initial)

    expect(final.foo).toBe(2)
  })

  it('leaves other properties unchanged', function() {
    let initial = {
      foo: 1,
      dontChangeMe: 5
    }

    let final = atPath('foo', increment, initial)

    expect(final.dontChangeMe).toBe(5)
  })

  it('leaves the initial value unchanged', function() {
    let initial = {
      foo: 1,
      dontChangeMe: 5
    }

    atPath('foo', increment, initial)

    expect(initial).toEqual({
      foo: 1,
      dontChangeMe: 5
    })
  })

  it('throws an error if the path does not exist', function() {
    expect(() => atPath('yikes', increment, undefined)).toThrow()
  })

  it('traverses slash-separated paths', function() {
    let initial = {
      foo: {bar: {baz: 1}}
    }

    let final = atPath('foo/bar/baz', increment, initial)

    expect(final.foo.bar.baz).toBe(2)
  })

  it('ignores extra slashes', function() {
    let initial = {
      foo: {bar: {baz: 1}}
    }

    let final = atPath('/foo//bar/baz/', increment, initial)

    expect(final.foo.bar.baz).toBe(2)
  })

  it('only clones parts of the tree that changed', function() {
    let initial = {
      foo: {bar: {baz: 1}},
      unchanged: {foo: 1}
    }

    let final = atPath('foo/bar/baz', increment, initial)

    expect(final).not.toBe(initial)
    expect(final.unchanged).toBe(initial.unchanged)
  })
})
