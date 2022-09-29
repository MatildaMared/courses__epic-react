// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorage(valueName, initialValue) {
  const [value, setValue] = React.useState(
    () => window.localStorage.getItem(valueName) ?? initialValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(valueName, value)
  }, [value, valueName])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const initialValue = initialName ?? undefined
  const [name, setName] = useLocalStorage('name', initialValue)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
