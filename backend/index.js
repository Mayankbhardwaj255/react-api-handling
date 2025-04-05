import express from 'express';


const app = express();
const PORT = process.env.PORT || 3000;
app.get('/api/products', (req, res) => {
     
    const products = [
        {
          id: 1,
          name: "Wireless Headphones",
          image: "https://images.pexels.com/photos/3394668/pexels-photo-3394668.jpeg"
        },
        {
          id: 2,
          name: "Smartwatch",
          image: "https://images.pexels.com/photos/5082588/pexels-photo-5082588.jpeg"
        },
        {
          id: 3,
          name: "Running Shoes",
          image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
        },
        {
          id: 4,
          name: "Coffee Mug",
          image: "https://images.pexels.com/photos/5857507/pexels-photo-5857507.jpeg"
        },
        {
          id: 5,
          name: "Laptop Stand",
          image: "https://images.pexels.com/photos/4386334/pexels-photo-4386334.jpeg"
        },
        {
          id: 6,
          name: "Gaming Mouse",
          image: "https://images.pexels.com/photos/3945651/pexels-photo-3945651.jpeg"
        },
        {
          id: 7,
          name: "Sunglasses",
          image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg"
        },
        {
          id: 8,
          name: "Leather Wallet",
          image: "https://images.pexels.com/photos/1098373/pexels-photo-1098373.jpeg"
        },
        {
          id: 9,
          name: "Bluetooth Speaker",
          image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg"
        },
        {
          id: 10,
          name: "Backpack",
          image: "https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg"
        }
      ];
//https://localhost:3000/api/products?search=wireless

     if(req.query.search){
         const filterProducts = products.filter(product =>product.name.includes(req.query.search))
         res.send(filterProducts)
         return;
     }
   
      setTimeout(() => {
        res.json(products);
      }, 3000); // Simulate a 3-second delay
      
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
