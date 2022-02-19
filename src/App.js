import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Incomes from './pages/Incomes';
import Expenses from './pages/Expenses';
import { GlobalProvider } from "./context/globalContext";
import './App.css';
import fetchTransaction from './utils/fetchTransaction';

function App() {
 const [transaction, setTransaction] = useState();

 useEffect(()=>{
  getTransactions()
 },[]);

function getTransactions()
{
  fetchTransaction.get('/transaction')
      .then(res => {
        setTransaction(res.data);
      })
      .catch(e => {
        console.log('transactions > ', e)
      })
}

function editTransactions(trans)
{
  console.log(trans);
  if(trans.title && trans.amount && trans.id){
    fetchTransaction.put(`/transaction/${trans.id}`,{
      title: trans.title,
      amount: trans.amount,
      isExpense: trans.isExpense,
    })
    .then((r)=>{
      getTransactions();
    })
    .catch(e => {
      console.log("Update transaction : ", e);
    })
  }
}

function addTransactions(trans)
{
  if(trans.title && trans.amount){
    fetchTransaction.post(`/transaction`,{
      title: trans.title,
      amount: trans.amount,
      isExpense: trans.isExpense,
    })
    .then((r)=>{
      getTransactions();
    })
    .catch(e => {
      console.log("Add transaction : ", e);
    })
  }
}

function deleteTransactions(id){
  if(id){
    fetchTransaction.delete((`/transaction/${id}`))
    .then((r)=>{
      getTransactions();
    })
    .catch(e => {
      console.log("Delete transaction : ", e);
    })
  }
}


  return (
    <GlobalProvider value={{transaction, editTransactions, addTransactions, deleteTransactions}}>
      <Header/>
      <div className='container'> 
      <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/incomes" element={<Incomes></Incomes>}/>
        <Route path="/expenses" element={<Expenses></Expenses>}/>
      </Routes>  
      </div>     
    </GlobalProvider>
  );
}

export default App;
