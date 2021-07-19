// Creates a random number generator function
function createRandomGenerator(seed: number) {
  // some big numbers
  const a = 5486230734
  const b = 6908969830
  const m = 9853205067
  let x = seed

  // returns a random value 0 <= num < 1
  return function generate() {
    // seed is optional. If supplied sets a new seed
    x = (seed * a + b) % m

    return x / m
  }
}

// Function creates a 32bit hash of a string
function stringTo32BitHash(str: string) {
  let v = 0

  for (let i = 0; i < str.length; i += 1) {
    v += str.charCodeAt(i) << i % 24
  }

  return v % 0xffffffff
}

/**
 * This function will pseudorandomly select a value from the array
 * of values given a string `s`.
 *
 * @example
 * ```
 * const result = deterministicSelection("abc", 3)
 * // result is always 2
 * ```
 */
export function colorSelection(s: string, maxRange: number) {
  const random = createRandomGenerator(stringTo32BitHash(s))()

  return Math.floor(random * maxRange)
}
