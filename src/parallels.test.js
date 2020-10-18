/* eslint-disable */
const parallels = require('./parallels')

describe('Parallel:', () => {
  describe('Sync tests:', () => {
    test('Must be define', () => {
      expect(parallels).toBeDefined()
    })

    test('Test without error', () => {
      const resultCb = jest.fn()

      const testFunc = (cb) => {
        cb(null, true)
      }

      const arrayOfFunctions = [testFunc, testFunc, testFunc]

      parallels(arrayOfFunctions, resultCb)
      expect(resultCb).toBeCalled()
      expect(resultCb.mock.calls.length).toEqual(1)
    })
    test('Test with error', () => {
      const resultCb = jest.fn()

      const testFunc = (cb) => {
        cb(null, true)
      }

      const testWithError = (cb) => {
        throw Error('Error')
      }

      const arrayOfFunctions = [testFunc, testWithError, testFunc, testFunc]

      parallels(arrayOfFunctions, resultCb)
      expect(resultCb).toBeCalled()
      expect(resultCb.mock.calls.length).toEqual(1)
    })

    test('Test with twice cb', () => {
      const resultCb = jest.fn()

      const testFunc = (cb) => {
        cb(null, true)
      }
      const twiceCb = (cb) => {
        cb(null, true)
        cb(null, true)
      }
      const arrayOfFunctions = [testFunc, twiceCb, twiceCb, testFunc]

      parallels(arrayOfFunctions, resultCb)
      expect(resultCb).toBeCalled()
      expect(resultCb.mock.calls.length).toEqual(1)
    })

    test('Test with error', () => {
      const resultCb = jest.fn()

      const testFunc = (cb) => {
        cb(null, true)
      }

      const testWithError = (cb) => {
        throw Error('Error')
      }

      const arrayOfFunctions = [testFunc, testWithError, testFunc, testFunc]

      parallels(arrayOfFunctions, resultCb)
      expect(resultCb).toBeCalled()
      expect(resultCb.mock.calls.length).toEqual(1)
    })
  })

  describe('ASYNC tests', () => {
    test('Test only one error call', (done) => {
      const resultCb = jest.fn()

      expect.assertions(2)

      const f1 = (cb) => setTimeout(cb, 1, 'error1')
      const f2 = (cb) => setTimeout(cb, 30, 'error2')

      parallels([f1, f2], resultCb)

      setTimeout(() => {
        expect(resultCb).toBeCalled()
        expect(resultCb.mock.calls.length).toEqual(1)

        done()
      }, 100)
    })

    test('test throw', (done) => {
      const resultCb = jest.fn()

      expect.assertions(2)

      const f1 = (cb) => {
        cb()
        throw Error('err')
      }
      const f2 = (cb) => setTimeout(cb, 30, 'error2')

      parallels([f1, f2], resultCb)

      setTimeout(() => {
        expect(resultCb).toBeCalled()
        expect(resultCb.mock.calls.length).toEqual(1)

        done()
      }, 100)
    })

    test('Test when func is not a func', (done) => {
      const resultCb = jest.fn()

      expect.assertions(2)

      const f1 = 'kek'
      const f2 = (cb) => setTimeout(cb, 30, 'error2')

      parallels([f1, f2], resultCb)

      setTimeout(() => {
        expect(resultCb).toBeCalled()
        expect(resultCb.mock.calls.length).toEqual(1)

        done()
      }, 100)
    })

    test('Test with twice ASYNC cb', (done) => {
      const resultCb = jest.fn()

      expect.assertions(2)

      const f1 = (cb) =>
        setTimeout(
          () => {
            cb()
            cb()
          },
          20,
          null,
          'res'
        )
      const f2 = (cb) => setTimeout(cb, 60, null, 'res')
      const f3 = (cb) =>
        setTimeout(
          () => {
            cb()
            cb()
            cb()
          },
          20,
          null,
          'res'
        )
      const f4 = (cb) => setTimeout(cb, 120, null, 'res')

      parallels([f1, f2, f3, f4], resultCb)

      setTimeout(() => {
        expect(resultCb).toBeCalled()
        expect(resultCb.mock.calls.length).toEqual(1)

        done()
      }, 200)
    })

    test('Test simple', (done) => {
      const resultCb = jest.fn()

      expect.assertions(2)

      const f1 = (cb) => setTimeout(cb, 20, null, 'res')
      const f2 = (cb) => setTimeout(cb, 60, null, 'res')
      const f3 = (cb) => setTimeout(cb, 20, null, 'res')
      const f4 = (cb) => setTimeout(cb, 120, null, 'res')
      const f5 = (cb) => setTimeout(cb, 120, null, 'res')
      const f6 = (cb) => setTimeout(cb, 120, null, 'res')
      const f7 = (cb) => setTimeout(cb, 120, null, 'res')
      const f8 = (cb) => setTimeout(cb, 120, null, 'res')
      const f9 = (cb) => setTimeout(cb, 120, null, 'res')

      parallels([f1, f2, f3, f4, f5, f6, f7, f8, f9], resultCb)

      setTimeout(() => {
        expect(resultCb).toBeCalled()
        expect(resultCb.mock.calls.length).toEqual(1)

        done()
      }, 200)
    })
  })
})


 (2 + 3) * 2