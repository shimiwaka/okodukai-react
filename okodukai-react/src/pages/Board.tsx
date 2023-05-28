import React from 'react';
import { useParams } from 'react-router-dom';

const targetURL: string = process.env.REACT_APP_BASE_URL || "";

const Board = () => {  
  const params = useParams();

  React.useEffect(() => {
    alert(params.token);
  }, [params.token]);

  return (
    <>
      <div>
        ボード
      </div>
    </>
  )
}

export default Board;
