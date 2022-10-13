// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
    const [state, setState] = React.useState({status: "idle"})

    React.useEffect(() => {
        if (!pokemonName) {
            setState({status: "idle"})
        };

        setState({
            status: "pending",
            error: null,
            pokemon: null
        })
        fetchPokemon(pokemonName).then((pokemonData) => {
            setState({
                status: "resolved",
                pokemon: pokemonData
            })
        }).catch(error => {
            setState({
                status: "rejected",
                error: error
            })
        })
    }, [pokemonName])

  return (
          <>
          {state.status === "idle" && !pokemonName && "Submit a pokemon"}
          {pokemonName && (state.status === "idle" || state.status === "pending") && <PokemonInfoFallback name={pokemonName} />}
          {state.status === "resolved" && <PokemonDataView pokemon={state.pokemon} />}
          {state.status === "rejected" && <div role="alert">
              There was an error: <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
          </div>}
          </>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
