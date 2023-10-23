import { useState } from "react";

const JoinPage = ({ handlePage }) => {
  //     {
  // 		"user": {
  // 				"username": String*,
  // 				"email": String*,
  // 				"password": String*,
  // 				"accountname": String*,
  // 				"intro": String,
  // 				"image": String // 예시) https://api.mandarin.weniv.co.kr/1641906557953.png
  // 		}
  // }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountname, setAccountname] = useState("");
  const [imgSrc, setImgSrc] = useState(
    "https://api.mandarin.weniv.co.kr/Ellipse.png"
  );
  const [info, setInfo] = useState("");

  const submitJoin = () => {
    const joinData = {
      user: {
        username: username,
        email: email,
        password: password,
        accountname: accountname,
        intro: info,
        image: imgSrc,
      },
    };
    join(joinData);
  };

  const uploadImage = async (imageFile) => {
    const baseUrl = "https://api.mandarin.weniv.co.kr/";
    const reqUrl = baseUrl + "image/uploadfile";
    const form = new FormData();
    form.append("image", imageFile);

    const res = await fetch(reqUrl, {
      method: "POST",
      body: form,
    });

    const json = await res.json();
    setImgSrc(baseUrl + json.filename);
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };

  const join = async (joinData) => {
    console.log(joinData);
    const reqUrl = "https://api.mandarin.weniv.co.kr/user/";
    const data = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(joinData),
    }).then((res) => res.json());
    console.log(data);
  };

  return (
    <>
      <button type="button" onClick={handlePage}>
        로그인 페이지로 돌아가기
      </button>
      <section>
        <h2>이메일로 회원가입</h2>
        <div>
          <label htmlFor="emailInput">이메일</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="emailInput"
            name="email"
            placeholder="이메일 주소를 알려주세요."
          />
        </div>
        <div>
          <label htmlFor="passwordInput">비밀번호</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="passwordInput"
            placeholder="비밀번호를 설정해 주세요."
          />
        </div>
        <button type="button">다음</button>
      </section>
      <section>
        <h2>프로필 설정</h2>
        <p>나중에 언제든지 변경할 수 있습니다.</p>
        <label src={imgSrc} htmlFor="profileImg">
          <img src={imgSrc} alt="" id="imagePre" />
        </label>
        <input
          type="file"
          onChange={handleChangeImage}
          id="profileImg"
          name="image"
          accept="image/*"
        />
        <div>
          <label htmlFor="userNameInput">사용자 이름</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="userNameInput"
            name="username"
            placeholder="2~10자 이내여야 합니다."
          />
        </div>
        <div>
          <label htmlFor="userIdInput">계정 ID</label>
          <input
            value={accountname}
            onChange={(e) => setAccountname(e.target.value)}
            type="text"
            id="userIdInput"
            name="accountname"
            placeholder="영문, 숫자, 특수문자(,), (_)만 사용 가능합니다."
          />
        </div>
        <div>
          <label htmlFor="userIntroInput">소개</label>
          <input
            type="text"
            onChange={(e) => setInfo(e.target.value)}
            id="userIntroInput"
            name="intro"
            placeholder="자신과 판매할 상품에 대해 소개해 주세요."
          />
        </div>
        <button type="button" onClick={submitJoin}>
          감귤마켓 시작하기
        </button>
      </section>
    </>
  );
};

export default JoinPage;
