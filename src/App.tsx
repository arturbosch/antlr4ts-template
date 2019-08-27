import React, { useState } from 'react'
import styled from 'styled-components'
import { evaluateExpression } from './parser'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default function App() {
  const [value, setValue] = useState('')

  return (
    <Container>
      <h3>Tests antlr4ts parser</h3>
      <p>
        Enter a valid expressions matching the SimpleFilter.g4 grammar. Verify
        the tree output in the Console.
      </p>
      <input
        name="Expression"
        type="text"
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
      />
      <button
        type="button"
        onClick={() => evaluateExpression(value)}
        className="btn"
      >
        Evaluate
      </button>
    </Container>
  )
}
