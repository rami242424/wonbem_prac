import React, { useState } from "react";

function LoginPage({ handlePage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email, password) => {
    const baseUrl = "https://api.mandarin.weniv.co.kr";
    const reqPath = "/user/login";

    const loginData = {
      user: {
        email: email,
        password: password,
      },
    };
    try {
      const token = await fetch(baseUrl + reqPath, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((res) => res.json())
        .then((data) => data.user.token)
        .catch(console.error("유저의 Token 정보가 없습니다."));
      console.log(token);

      localStorage.setItem("token", token);
    } catch (e) {
      alert("유저의 정보가 없습니다.", e);
    }
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <h1>로그인</h1>
      <section>
        <h2>이메일, 비밀번호</h2>
        <form onSubmit={submitLogin}>
          <input
            type="text"
            placeholder="이메일 입력"
            value={email}
            onChange={inputEmail}
          />
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={inputPassword}
          />
          <button>로그인</button>
          <button type="button" onClick={handlePage}>
            회원 가입
          </button>
        </form>
      </section>
    </>
  );
}

export default LoginPage;
