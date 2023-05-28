import axios from "axios";
import React from 'react';
import { useNavigate } from "react-router-dom"

const targetURL: string = process.env.REACT_APP_BASE_URL || "";

const Top = () => {
  const [email, setEmail] = React.useState<string>("");

  const navigate = useNavigate()
  const createBoard = () => {
    axios.post(targetURL + "create", { email: email }, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then((response : any) => {
      console.log(response.data);
      navigate("/board/" + response.data.token)
    })
  }

  return (
    <>
      <div>
        おこづかいシートを作るには、メールアドレスを入力してください。
      </div>
      <input placeholder="メールアドレス" onChange={(e) => setEmail(e.target.value)}/>
      <button type="submit" onClick={createBoard}>
        OK
      </button>
    </>
  )
}

export default Top;
