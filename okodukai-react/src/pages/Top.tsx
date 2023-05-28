import axios from "axios";

const targetURL: string = process.env.REACT_APP_BASE_URL || "";

const Top = () => {
  const createBoard = () => {
    axios.post(targetURL + "create", { email: "hoge@email.com" }, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then((response) => {
      console.log(response);
    })
  }

  return (
    <>
      <div>
        おこづかいシートを作るには、メールアドレスを入力してください。
      </div>
      <input placeholder="メールアドレス"/>
      <button type="submit" onClick={createBoard}>
        OK
      </button>
    </>
  )
}

export default Top;
