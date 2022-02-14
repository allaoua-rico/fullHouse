import * as React from "react"

const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}  className={props.className}>
    <path d="M12 2C6.489 2 2 6.489 2 12s4.489 10 10 10 10-4.489 10-10S17.511 2 12 2zm0 2c4.43 0 8 3.57 8 8a7.977 7.977 0 0 1-6.781 7.898v-5.513h2.328l.365-2.365H13.22v-1.293c0-.983.32-1.856 1.24-1.856h1.477V6.807c-.26-.035-.81-.112-1.846-.112-2.166 0-3.436 1.144-3.436 3.75v1.575H8.428v2.365h2.226v5.494A7.978 7.978 0 0 1 4 12c0-4.43 3.57-8 8-8z" />
  </svg>
)

export default SvgComponent
