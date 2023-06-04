import axios from "axios";
import React from 'react';
import { useParams } from 'react-router-dom';

const targetURL: string = process.env.REACT_APP_BASE_URL || "";

const Board = () => {  
  const params = useParams();
  const [newColumn, setNewColumn] = React.useState<string>("");
  const [newPrice, setNewPrice] = React.useState<number>(100);
  const [columns, setColumns] = React.useState<any[]>([]);
  const [table, setTable] = React.useState<any[]>([]);

  React.useEffect(() => {
    refreshTable()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.token]);

  const refreshTable = () => {
    axios.get(targetURL + "board/" + params.token)
    .then((response : any) => {
      setColumns(response.data.columns);
      if (response.data.days) {
        setTable(response.data.days.reverse());
      } else {
        setTable(response.data.days);
      }
    })
    .catch((error : any) => {
      alert("サーバーエラーが発生しました。しばらくしてから再度お試しください。");
    });
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
    .catch((error : any) => {
      alert("サーバーエラーが発生しました。しばらくしてから再度お試しください。");
    });
  }
  const deleteColumn = (idx : number) => {
    axios.get(targetURL + "board/" + params.token + "/deletecolumn/" + idx)
    .then((response : any) => {
      refreshTable()
    })
    .catch((error : any) => {
      alert("サーバーエラーが発生しました。しばらくしてから再度お試しください。");
    });
  }

  const check = (date : string, column : number) => {
    axios.get(targetURL + "board/" + params.token + "/check/" + date + "/" + column)
    .then((response : any) => {
      refreshTable()
    })
    .catch((error : any) => {
      alert("サーバーエラーが発生しました。しばらくしてから再度お試しください。");
    });
  }
  
  const uncheck = (date : string, column : number) => {
    axios.get(targetURL + "board/" + params.token + "/uncheck/" + date + "/" + column)
    .then((response : any) => {
      refreshTable()
    })
    .catch((error : any) => {
      alert("サーバーエラーが発生しました。しばらくしてから再度お試しください。");
    });
  }

  const newPayment = (date : string) => {
    axios.get(targetURL + "board/" + params.token + "/newpayment/" + date)
    .then((response : any) => {
      refreshTable()
    })
    .catch((error : any) => {
      alert("サーバーエラーが発生しました。しばらくしてから再度お試しください。");
    });
  }
  const cancelPayment = (date : string) => {
    axios.get(targetURL + "board/" + params.token + "/cancelpayment/" + date)
    .then((response : any) => {
      refreshTable()
    })
    .catch((error : any) => {
      alert("サーバーエラーが発生しました。しばらくしてから再度お試しください。");
    });
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
            { columns.map((value : any, idx : number) => <td>{value.name} <button className="Delete-button" onClick={(e) => deleteColumn(idx)}>✕</button><br/>({value.price}円)</td>)}
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
                    { value.payment === -1 ?
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
