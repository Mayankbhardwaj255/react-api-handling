import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import FetchedData from './components/FetchedData';

function App() {
  const [count, setCount] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    //1st method:
    // const fetchProducts = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:3000/products');
    //     setProducts(response.data);
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //   }
    // }
    // fetchProducts();

    //2nd method:
    //using  immediately invoked function expression (IIFE)
    const controller = new AbortController(); //AbortController is used to cancel the request

    const debounceTimer = setTimeout(() => {
      ;(async () => {
        try {
          setLoading(true);
          setError(false);
          const response = await axios.get('/api/products?search=' + search, {
            signal: controller.signal
          })
          console.log(response.data);
          setProducts(response.data);
        }
        catch (error) {
          // error.name === 'CanceledError' works for fetch cancellations with AbortController
          if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
            console.log('Request was cancelled:', error.message);
            return;
          }
          setError(true);
          console.error('Error fetching products:', error);
        }
        finally {
          setLoading(false);
        }
      })()
    }, 500); // debounce delay in ms

    //cleanup part.. executed when component unmounts
    //or when the search changes
    return () => {
      clearTimeout(debounceTimer); // cancel debounce if search changes quickly
      controller.abort(); // cancel fetch request if still pending
    }
  }, [search])

  //calling the customReactQuery function
  //const [products, loading, error] = customReactQuery('/api/products')

  //  if(error){
  //   return <h2>Something went wrong</h2>
  //  }
  //  if(loading){
  //   return <h2>Loading...</h2>
  //  }

  //2nd method:
  // return error && <h2>Something went wrong</h2>

  return (
    <>
      <h1>Api handling</h1>

      <input
        type="text"
        placeholder='Search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <h2>Loading...</h2>}
      <FetchedData products={products} />
      {error && <h2>Something went wrong</h2>}
      <h2>Number of Products: {products.length}</h2>
    </>
  )
}
export default App

// const customReactQuery = (urlPath) => {
//   const [count, setCount] = useState(0)
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//   ;(async () =>{
//     try{
//       setLoading(true);
//       setError(false);
//       const response = await axios.get(urlPath)
//       console.log(response.data);
//       setProducts(response.data);
//       setLoading(false);
//     }
//     catch(error){
//       setError(true);
//       console.error('Error fetching products:', error);
//     }
//   })()
//  }, [])
// return [
//   products,
//   loading,
//   error
//   ]
// }
