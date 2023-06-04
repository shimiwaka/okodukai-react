import axios from "axios";
import React from 'react';
import { useNavigate } from "react-router-dom"

const targetURL: string = process.env.REACT_APP_BASE_URL || "";

const Top = () => {
  const [email, setEmail] = React.useState<string>("");

  const navigate = useNavigate()
  const createBoard = () => {
    if (email === "") {
      return
    }
    var params = new URLSearchParams()
    params.append('email', email)
    axios.post(targetURL + "create", params)
    .then((response : any) => {
      navigate("/board/" + response.data.token)
    })
    .catch((error : any) => {
      alert("サーバーエラーが発生しました。しばらくしてから再度お試しください。");
    });
  }

  const forget = () => {
    if (email === "") {
      return
    }
    var params = new URLSearchParams()
    params.append('email', email)
    axios.post(targetURL + "forget", params)
    .then((response : any) => {
      alert(email + "に、あなたのおこづかい帳のURLを送信しました。");
    })
  }

  return (
    <>
      <div>
        おこづかい帳を作るには、メールアドレスを入力してください。
      </div>
      <input placeholder="メールアドレス" onChange={(e) => setEmail(e.target.value)}/>
      <button type="submit" onClick={createBoard}>
        OK
      </button>
      <hr />
      作ったおこづかい帳のアドレスを忘れてしまった人はこちら：<br/>
      <input placeholder="メールアドレス" onChange={(e) => setEmail(e.target.value)}/>
      <button type="submit" onClick={forget}>
        OK
      </button>
    </>
  )
}

export default Top;
