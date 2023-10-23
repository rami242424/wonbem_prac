import { useState } from "react";
import JoinPage from "./Components/JoinPage";
import LoginPage from "./Components/LoginPage";

function App() {
  const [page, setPage] = useState(true);
  const [info, setInfo] = useState("");

  const handlePage = () => {
    setPage((prev) => !prev);
  };

  const getMyinfo = async () => {
    const url = "https://api.mandarin.weniv.co.kr/user/myinfo";
    const token = localStorage.getItem("token");

    try {
      const info_data = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => data.user);
      setInfo(JSON.stringify(info_data));
    } catch (e) {
      console.error("유저 정보가 없음", e);
    }
  };

  return (
    <div>
      <button type="button" onClick={getMyinfo}>
        내 정보 출력하기
      </button>
      <br />
      {info}
      {page ? (
        <LoginPage handlePage={handlePage} />
      ) : (
        <JoinPage handlePage={handlePage} />
      )}
    </div>
  );
}
export default App;
