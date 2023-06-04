import axios from "axios";
import React from 'react';
import { useParams } from 'react-router-dom';

const targetURL: string = process.env.REACT_APP_BASE_URL || "";

const Board = () => {  
  const params = useParams();
  const [owner, setOwner] = React.useState<string>();
  const [newColumn, setNewColumn] = React.useState<string>("");
  const [newPrice, setNewPrice] = React.useState<number>(100);
  const [columns, setColumns] = React.useState<any[]>([]);
  const [table, setTable] = React.useState<any[]>([]);

  React.useEffect(() => {
    refreshTable()
  }, [params.token]);

  const refreshTable = () => {
    axios.get(targetURL + "board/" + params.token)
    .then((response : any) => {
      setOwner(response.data.owner);
      setColumns(response.data.columns);
      if (response.data.days) {
        setTable(response.data.days.reverse());
      } else {
        setTable(response.data.days);
      }
    })
  }
  
  const formatDate = (date : string) => {
    var fdates = date.split('T');
    return fdates[0];
  }

  const createColumn = () => {
    if (newColumn === "") {
      return
    }
    var postParams = new URLSearchParams()
    postParams.append('name', newColumn)
    postParams.append('price', String(newPrice))
    axios.post(targetURL + "board/" + params.token + "/newcolumn" , postParams)
    .then((response : any) => {
      setNewColumn("")
      refreshTable()
    })
  }

  const check = (date : string, column : number) => {
    axios.get(targetURL + "board/" + params.token + "/check/" + date + "/" + column)
    .then((response : any) => {
      refreshTable()
    })
  }
  
  const uncheck = (date : string, column : number) => {
    axios.get(targetURL + "board/" + params.token + "/uncheck/" + date + "/" + column)
    .then((response : any) => {
      refreshTable()
    })
  }

  const newPayment = (date : string) => {
    axios.get(targetURL + "board/" + params.token + "/newpayment/" + date)
    .then((response : any) => {
      refreshTable()
    })
  }
  const cancelPayment = (date : string) => {
    axios.get(targetURL + "board/" + params.token + "/cancelpayment/" + date)
    .then((response : any) => {
      refreshTable()
    })
  }
  return (
    <>
      <div>
        <input placeholder="おてつだいを追加" value={newColumn} onChange={(e) => setNewColumn(e.target.value)} className="Column-name"/>
        <input placeholder="単価" value={newPrice} onChange={(e) => setNewPrice(Number(e.target.value))} className="Column-price"/>円
        <button type="submit" onClick={createColumn}>
          追加
        </button>
      </div>
      <hr />
      <div className="Table">
        <table>
          <tr>
            <td>
              日付
            </td>
            { columns.map((value) => <td>{value.name}<br/>({value.price}円)</td>)}
            <td>
              精算
            </td>
          </tr>
          {
            table.map((value) => { 
              return (
                <tr>
                  <td>{formatDate(value.date)}</td>
                  {
                    value.checked.map((v : any, idx : number) => {
                      if (v) {
                        return (
                          <td><button type="submit" onClick={(e) => uncheck(formatDate(value.date), idx)} className="Checked-button">◯</button></td>
                        )
                      } else {
                        return (
                          <td><button type="submit" onClick={(e) => check(formatDate(value.date), idx)} className="Not-checked-button">✕</button></td>
                        )
                      }
                    })
                  }
                  <td>
                    { value.payment == -1 ?
                     <button type="submit" onClick={(e) => newPayment(formatDate(value.date))} className="Payment-button">精算</button> :
                     <button type="submit" onClick={(e) => cancelPayment(formatDate(value.date))} className="Cancel-payment-button">{value.payment}円</button> }
                  </td>
                </tr> 
              )
            }
          )}
        </table>
      </div>
    </>
  )
}

export default Board;
