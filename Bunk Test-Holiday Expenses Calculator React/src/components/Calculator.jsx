import axios from 'axios';
import React, { useState } from 'react'
import { expense } from "./expense";

const Calculator = () => {
  const [userdata, setUserdata] = useState([{ name: "", amount: "" }])
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState([])

  const handleChange = (e, id) => {
    setIsResult(false)

    const data = [...userdata]
    if (e.target.name === "name") {
      const existUser = userdata.find(trans => trans.name.toLowerCase() === e.target.value.toLowerCase());
      if (existUser) {
        alert("please write new name");
        e.target.value = "";
        return;
      }
    }
    data[id][e.target.name] = e.target.value
    setUserdata(data)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await axios.post("http://localhost:9000/nagar", userdata, {
      headers: {
        "Content-Type": "application/json"
      }
    })
   await setResult(res.data)
    setIsResult(true)
  }
  const addMore = () => {
    setIsResult(false)
    setUserdata([...userdata, { name: "", amount: "" }])
  }
  const reoveUser = (id) => {
    setIsResult(false)
    const newUser = userdata.filter((data, i) => i !== id)
    setUserdata(newUser);
    // or 
    // const data = [...userdata]
    // data.splice(id, 1)
    // setUserdata(data)
  }

  const isValid = () => {
    return !userdata.some((trans) => !trans.name || !trans.amount)
  }
  // let calcResult = []
  // expense(userdata).forEach((value, key) => calcResult.push({ name: key, transactions: value }));

  return (
    <div>
      <form className="d-flex flex-column m-auto align-items-center gap-4" onSubmit={handleSubmit}>
        <h1 className="">Expense Calculator</h1>
        {userdata.map((item, i) => {
          return <div key={i} className="row align-items-center justify-content-between">
            <div className="col">
              <input name="name" type="name" className="form-control" value={item.name} onChange={(e) => handleChange(e, i)} placeholder="Name" id="name" />
            </div>
            <div className="col">
              <input name="amount" type="amount" className="form-control" value={item.amount} onChange={(e) => handleChange(e, i)} placeholder="Amount" id="amount" />
            </div>
            <div className="col">
              <button type="button" className="btn btn-danger" onClick={() => reoveUser(i)}>X</button>
            </div>
          </div>
        })}
        <div className="d-flex flex-column m-auto align-items-center" >
          <div className="my-2">
            <button type="button" onClick={addMore} className="btn btn-primary">Add</button>
          </div>
          <div className="my-2">
            <button disabled={(userdata.length <= 1) || !isValid()} type="submit" className="btn btn-success">Submit</button>
          </div>
        </div>
      </form>
      <div>
        {isResult && <table className="table">
          <thead>
            <tr>
              <th scope="col">Payer</th>
              <th scope="col">Transaction (Receiver =&gt; Amount)</th>
            </tr>
          </thead>
          <tbody>
            {result.map((each, i) => {
              return (
                <tr key={i}>
                  <td>{result[i][0]}</td>
                  <td>{result[i][1].map((trans, index) => {
                    return (<div className="m-1" key={index}>
                      <div className="m">{trans.name}</div>
                      <div className="m">{trans.amount}</div>
                    </div>)
                  })}
                  </td>
                </tr>)
            })}
          </tbody>
        </table>}
      </div>
    </div>
  )
}

export default Calculator