import { useAddProductMutation, useGetGoodsQuery,useDeleteProductMutation } from './redux';
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState();
  const [newProduct,setNewProduct] = useState('');

  const { data = [], isLoading } = useGetGoodsQuery(count);
  const [addProduct, {isError}] = useAddProductMutation()

  const [deleteProduct] = useDeleteProductMutation()

  const handleAddProduct = async ()=>{
    if (newProduct){
      await addProduct({name:newProduct}).unwrap();
      setNewProduct('')
    }
  }

  const handleDeleteProduct = async(id)=>{
    await deleteProduct(id).unwrap()
  }


  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
  return (
    <div className="App">
      <div>
        <input type='text' value={newProduct} onChange={(e)=>setNewProduct(e.target.value)}/>
        <button onClick={handleAddProduct}>Add prod</button>
      </div>
      <div>
        <select value={count} onChange={(e)=>setCount(e.target.value)}>
          <option value=''>all</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
      </div>
      {data.map((item) => {
        return <li onClick={()=>handleDeleteProduct(item.id)} key={item.id}>{item.name}</li>;
      })}
    </div>
  );
}

export default App;
