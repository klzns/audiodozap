import { globalStyles } from 'twin.macro'
import { global } from '../stitches.config'

const styles = () => {
  global(globalStyles)()
  global({
    body: {
      fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
      background: '#fff7f0',
    },
  })()
}

export default styles
