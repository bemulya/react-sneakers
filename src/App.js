import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios'
import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';



function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    axios.get('https://6293c5e77aa3e6af1a10e9b0.mockapi.io/items').then((res) => {
      setItems(res.data)
    });
    axios.get('https://6293c5e77aa3e6af1a10e9b0.mockapi.io/cart').then((res) => {
      setCartItems(res.data)
    })
    axios.get('https://6293c5e77aa3e6af1a10e9b0.mockapi.io/favorites').then((res) => {
      setFavorites(res.data)
    })
  }, [])


  const onAddToCart = (obj) => {
    axios.post('https://6293c5e77aa3e6af1a10e9b0.mockapi.io/cart', obj)
    setCartItems((prev) => [...prev, obj])
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://6293c5e77aa3e6af1a10e9b0.mockapi.io/cart/ ${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }


  const onAddToFavorite = (obj) => {
    // is(favorites.find((favObj) => favObj.id === obj.id )) {
    //   axios.delete(`https://6293c5e77aa3e6af1a10e9b0.mockapi.io/favorites/ ${obj.id}`)
    //   setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
    // } else { 
      axios.post('https://6293c5e77aa3e6af1a10e9b0.mockapi.io/favorites', obj)
      setFavorites((prev) => [...prev, obj])
    // }
  }


  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper clear">
      {cartOpened &&
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      }
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/" exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />

        <Route
          path="/favorites" exact
          element={
            <Favorites items={favorites}
              onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>

    </div>
  )
}

export default App;
