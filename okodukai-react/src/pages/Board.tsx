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
    axios.get(targetURL + "board/" + params.token)
    .then((response : any) => {
      setOwner(response.data.owner);
      setColumns(response.data.columns);
      setTable(response.data.days);
    })
  
  }, [params.token]);
  
  const formatDate = (date : string) => {
    var fdates = date.split('T');
    return fdates[0];
  }

  const createColumn = () => {
    if (newColumn == "") {
      return
    }
    var postParams = new URLSearchParams()
    postParams.append('name', newColumn)
    postParams.append('price', String(newPrice))
    axios.post(targetURL + "board/" + params.token + "/newcolumn" , postParams)
    .then((response : any) => {
      setNewColumn("")
      axios.get(targetURL + "board/" + params.token)
      .then((response : any) => {
        setOwner(response.data.owner);
        setColumns(response.data.columns);
        setTable(response.data.days);
      })
    })
  }

  const check = (date : string, column : number) => {
    alert(date);
    alert(column);
  }

  return (
    <>
      <div>
        管理者：{owner}
      </div>
      <div>
        <input placeholder="おてつだいを追加" value={newColumn} onChange={(e) => setNewColumn(e.target.value)}/>
        <input placeholder="単価" value={newPrice} onChange={(e) => setNewPrice(Number(e.target.value))}/>円
        <button type="submit" onClick={createColumn}>
          追加
        </button>
      </div>
      <div>
        <table>
          <tr>
            <td>
              日付
            </td>
            { columns.map((value) => <td>{value.name}<br/>{value.price}</td>)}
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
                          <td><button type="submit">◯</button></td>
                        )
                      } else {
                        return (
                          <td><button type="submit" onClick={(e) => check(formatDate(value.date), idx)}>✕</button></td>
                        )                        
                      }
                    })
                  }
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
