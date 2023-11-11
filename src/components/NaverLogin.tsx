// import axios from "axios"; // Axios를 사용하여 HTTP 요청을 보냄
// import { useRouter } from "next/router"; // Next.js에서 페이지 네비게이션을 처리
// import { useEffect } from "react"; // React 훅 중 하나로, 컴포넌트 생명주기 이벤트를 처리
// import Cookies from "js-cookie"; // 브라우저 쿠키를 설정하고 가져오기 위한 라이브러리

// const NaverLogin: React.FC = () => {
//   const router = useRouter(); // useRouter 훅을 사용하여 페이지 네비게이션을 다룸
//   const code = new URL(window.location.href).searchParams.get("code"); // 현재 URL에서 "code" 파라미터를 가져옴
//   const state = new URL(window.location.href).searchParams.get("state"); // 현재 URL에서 "state" 파라미터를 가져옴

//   useEffect(() => {
//     // useEffect 훅을 사용하여 코드가 컴포넌트가 렌더링될 때 실행되게 설정
//     const naver = async () => {
//       try {
//         if (code && state) {
//           // "code"와 "state"가 존재할 때만 실행

//           // 서버 엔드포인트의 URL을 정의. 개발 중에는 주로 로컬 개발 서버 URL을 사용
//           const BASE_URL = "localhost:8080/oauth2/authorization/naver"; // 실제 서버 URL로 대체해야 합니다.

//           // Axios를 사용하여 GET 요청을 보냄. 백엔드 서버로 요청을 보냄
//           const response = await axios.get(
//             `${BASE_URL}/api/v1/members/naverLogin?code=${code}&state=${state}`
//           );

//           // 응답에서 "Authorization" 헤더를 확인
//           const token = response.headers["authorization"];

//           if (token) {
//             // 토큰이 존재하면 브라우저 쿠키를 설정
//             Cookies.set("token", token);
//           }

//           // 페이지를 "/main"로 이동
//           router.push("/main");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (code && state) {
//       // "code"와 "state"가 존재할 때만 "naver" 함수를 호출
//       naver();
//     }
//   }, [code, state, router]);

//   return <div>로딩페이지컴포넌트</div>;
// };

// export default NaverLogin;
