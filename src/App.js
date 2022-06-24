import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios'
import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';


function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)


  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const favoritesResponse = await axios.get('https://6293c5e77aa3e6af1a10e9b0.mockapi.io/favorites')
      const itemsResponse = await axios.get('https://6293c5e77aa3e6af1a10e9b0.mockapi.io/items')
      const cartResponse = await axios.get('https://6293c5e77aa3e6af1a10e9b0.mockapi.io/cart')


      setIsLoading(false)

      setItems(itemsResponse.data)
    }

    fetchData()
  }, [])


  const onAddToCart = (obj) => {
    axios.delete(`https://6293c5e77aa3e6af1a10e9b0.mockapi.io/cart/ ${obj.id}`)
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
    } else {
      axios.post('https://6293c5e77aa3e6af1a10e9b0.mockapi.io/cart', obj)
      setCartItems((prev) => [...prev, obj])
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://6293c5e77aa3e6af1a10e9b0.mockapi.io/cart/ ${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }


  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://6293c5e77aa3e6af1a10e9b0.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))

      } else {
        const { data } = await axios.post('https://6293c5e77aa3e6af1a10e9b0.mockapi.io/favorites', obj)
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }


  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded,  onAddToFavorite, setCartOpened, setCartItems  }}>
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
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="/favorites" exact
            element={
              <Favorites 
                 />
            }
          />
        </Routes>

      </div>
    </AppContext.Provider>
  )
}

export default App;
