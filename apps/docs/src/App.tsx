/*
 * Copyright (c) 2025 by 星语恋心-星语 
 * All Rights Reserved. 
 * @Author: 星语
 * @Date: 2025-01-12 21:47:29
 * @LastEditors: hxlove
 * @LastEditTime: 2025-01-13 12:13:02
 * @FilePath: \love-ui\apps\docs\src\App.tsx
 * @Description: 星语恋心出品，作者 @星语，版权归星语所有
 */
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@love/ui'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count} 222
        </Button>
      </div>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
