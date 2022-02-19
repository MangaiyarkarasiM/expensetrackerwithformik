import React,{useContext,useEffect, useState} from "react";
import {GlobalContext} from '../../context/globalContext';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './Form.css'

const loginFormValidation = Yup.object().shape({
    title: Yup.string().required('Enter title'),
    amount: Yup.number().required('Enter amount').positive()
  })

function Form(props){
const {transaction, editTransactions, addTransactions} = useContext(GlobalContext);
const [trans,setTrans] = useState({});

useEffect(()=>{
let trans = transaction?.filter((t)=> t.id===props.id);
 if(trans){setTrans(...trans)};
},[props.id])

const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
        title: trans? trans.title : '',
        amount: trans? trans.amount : ''
    },
    enableReinitialize: true,
    validationSchema: loginFormValidation,
    onSubmit: (v) => {
      if(props.id)
        {
            let isExpense = props.income ? false : true;
            editTransactions({...v, id: props.id, isExpense});
            props.setShowEdit(false);
            props.setId(0)
      }
      else{
        let isExpense = props.income ? false : true;
        addTransactions({...v, isExpense});
        props.setShowEdit(false)
      }
      
    }
  })

    return(
        <div className="bg-white rounded p-4 ml-4">
            <form onSubmit={handleSubmit}>
                <div className="formstyle d-flex flex-column mb-4">
                    <label className="">{props.income?'Income Title':'Expense Title'}</label>
                    <input 
                    className="border rounded"
                    type="text"
                    name='title'
                    value={values.title}
                    placeholder="Enter the title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.title && <small className='text-danger'>{errors.title}</small>}
                </div>
                <div className="formstyle d-flex flex-column mb-4">
                    <label className="">Amount</label>
                    <input
                    className="border rounded"
                    type="text"
                    name='amount'
                    value={values.amount}
                    placeholder="Enter the amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.amount && <small className='text-danger'>{errors.amount}</small>}
                </div>
                <div className="d-flex justify-content-between">
                    {props.id? <button type='submit' className="btn btn-info">Update</button>
                    : <button type='submit' className="btn btn-info" >Add</button>}
                    
                    <button className="btn btn-info" onClick={()=>{props.setShowEdit(false); props.setId(0)}}>Cancel</button>
                </div>
            </form> 
        </div>
    )
}

export default Form;