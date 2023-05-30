import axios from "axios";
import React from 'react';
import { useParams } from 'react-router-dom';

const targetURL: string = process.env.REACT_APP_BASE_URL || "";

const Board = () => {  
  const params = useParams();
  const [owner, setOwner] = React.useState<string>();
  const [newColumn, setNewColumn] = React.useState<string>("");
  const [columns, setColumns] = React.useState<any[]>([]);

  React.useEffect(() => {
    axios.get(targetURL + "board/" + params.token)
    .then((response : any) => {
      setOwner(response.data.owner);
      setColumns(response.data.columns);
    })
  
  }, [params.token]);

  const createColumn = () => {
    if (newColumn == "") {
      return
    }
    var postParams = new URLSearchParams()
    postParams.append('name', newColumn)
    axios.post(targetURL + "board/" + params.token + "/newcolumn" , postParams)
    .then((response : any) => {
      setNewColumn("")
      axios.get(targetURL + "board/" + params.token)
      .then((response : any) => {
        setOwner(response.data.owner);
        setColumns(response.data.columns);
      })
    })
  }

  return (
    <>
      <div>
        管理者：{owner}
      </div>
      <div>
        <input placeholder="おてつだいを追加" value={newColumn} onChange={(e) => setNewColumn(e.target.value)}/>
        <button type="submit" onClick={createColumn}>
          追加
        </button>
      </div>
      <div>
        { columns.map((value) => <li>{value.name}</li>)}
      </div>
    </>
  )
}

export default Board;
