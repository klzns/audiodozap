import 'twin.macro'
import React, { ReactNode } from 'react'

function Transcription({ children }: { children: ReactNode }) {
  return (
    <div tw="text-gray-700 text-xl space-y-2">
      <div tw="font-bold text-lg">[Transcrição]</div>
      <div>{children}</div>
    </div>
  )
}

export default Transcription
