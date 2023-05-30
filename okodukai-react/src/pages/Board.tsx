import axios from "axios";
import React from 'react';
import { useParams } from 'react-router-dom';

const targetURL: string = process.env.REACT_APP_BASE_URL || "";

const Board = () => {  
  const params = useParams();
  const [owner, setOwner] = React.useState<string>();

  React.useEffect(() => {
    axios.get(targetURL + "board/" + params.token)
    .then((response : any) => {
      setOwner(response.data.owner);
    })
  
  }, [params.token]);

  return (
    <>
      <div>
        管理者：{owner}
      </div>
    </>
  )
}

export default Board;
