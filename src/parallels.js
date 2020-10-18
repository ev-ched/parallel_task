/**
 * @param arrayOfFunctions
 * @param resultCb
 */
function parallels (arrayOfFunctions, resultCb) {
  let funcCounter = 0

  /**
   * @param err
   * @param res
   */
  function createCallback (err, res) {
    let flagOnceTimeCb = false
    let flagErr = false

    return function () {
      if (err && !flagErr) {
        resultCb(err)
        flagErr = true
      }

      if (!flagOnceTimeCb) {
        funcCounter++
        flagOnceTimeCb = true
      }

      if (funcCounter === arrayOfFunctions.length) {
        return resultCb(null)
      }
    }
  }

  try {
    arrayOfFunctions.forEach((currentFunc) => {
      const closureCb = createCallback()

      currentFunc(closureCb)
    })
  } catch (err) {
    resultCb(err)
  }
}

module.exports = parallels
