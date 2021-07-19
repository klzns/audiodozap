import 'twin.macro'

import { Button } from './Button'

function Contribute() {
  return (
    <Button
      as="a"
      tw="text-left space-x-2"
      href="https://wa.me/5521990609164?text=Oi%2C%20estou%20enviando%20um%20audio%20e%20sua%20transcri%C3%A7%C3%A3o%20pra%20colocar%20no%20site!%20Segue:"
    >
      Enviar novo áudio pro site
    </Button>
  )
}

export default Contribute
