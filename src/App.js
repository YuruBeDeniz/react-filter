import { useMemo, useRef, useState } from "react"

function App() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")
  const inputRef = useRef()

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return item.toLowerCase().includes(query.toLowerCase())
    })
  }, [items, query])

  function onSubmit(e) {
    e.preventDefault()

    const value = inputRef.current.value
    if (value === "") return
    setItems(prev => {
      return [...prev, value]
    })

    inputRef.current.value = ""
  }

  return (
    <>
      Search:
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        type="search"
      />
      <br />
      <br />
      <form onSubmit={onSubmit}>
        New Item: <input ref={inputRef} type="text" />
        <button type="submit">Add</button>
      </form>
      <h3>Items:</h3>
      {filteredItems.map(item => (
        <div>{item}</div>
      ))}
    </>
  )
}

export default App;



//we stored overall list of items in our state (items) and our query for what we want
//to search for; so now we those two pieces of information, we can actually derive our list
//of filtered items without having to store it in State anywhere. Here, we only store
//the least amount of info in our state, none of them overlaps with each other
/* const filteredItems = items.filter(item => {
      return item.toLowerCase().includes(query.toLowerCase())
    })
 */
/* doing this calculation every single time our page re-renders could be time consuming
and costly on performance; so we could wrap this inside of useMemo(); by doing that
we say that we only want to run this code every single time certain parameters change;
we can pass these parameters in --> items, query; only re-update our list of filteredItems
anytime our overall items or our query changes */
