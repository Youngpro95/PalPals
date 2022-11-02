import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { LoginAsync } from "../../features/LoginSlice";

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (formData: any) => {
    dispatch(LoginAsync(formData)).then((res) => {
      return res.payload.status === 201
        ? (alert("로그인 성공"),
          sessionStorage.setItem(
            "access_token",
            res.payload.data.response.access_token
          ),
          navigate(-1))
        : res.payload.status === 400
        ? setError("password", { type: "passwordError" })
        : setError("email", { type: "emailError" });
    });
  };

  return (
    <>
      <Wrap>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EmailArea>
            <h1>로그인</h1>
            <p>이메일</p>
            <InputStyle
              type="text"
              placeholder="이메일"
              style={{
                outline: errors.email ? "2px solid red" : "",
              }}
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <ErrorMessage>이메일이 일치하지 않습니다.</ErrorMessage>
            )}
          </EmailArea>
          <PasswordArea>
            <p>비밀번호</p>
            <InputStyle
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </PasswordArea>
          <LoginArea>
            <button>로그인</button>
          </LoginArea>
        </form>
        <Member>
          <Link to="/signUp">
            <button>회원가입</button>
          </Link>
        </Member>
      </Wrap>
    </>
  );
}

export default Login;

const Wrap = styled.div`
  width: 1184px;
  margin: 0 auto;
  padding: 48px;
`;

const EmailArea = styled.section`
  font-weight: bolder;
  text-align: center;
  position: relative;

  h1 {
    text-align: center;
    padding: 16px 0;
    font-size: 24px;
  }

  p {
    font-size: 16px;
    margin-left: -270px;
  }

  input {
    border: 1px solid #ccc;
    width: 320px;
    height: 48px;
    border-radius: 5px;
    margin-top: 10px;
    padding-left: 15px;
    &:focus {
      outline: 2px solid #34a853;
    }
  }
`;

const PasswordArea = styled.section`
  font-weight: bolder;
  text-align: center;
  margin-top: 22px;
  position: relative;
  p {
    font-size: 16px;
    margin-left: -260px;
  }
`;

const LoginArea = styled.section`
  text-align: center;
  margin-top: 56px;
  button {
    width: 320px;
    height: 48px;
    border: 2px solid #000;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bolder;
    &:hover {
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
        0 2px 10px 0 rgba(0, 0, 0, 0.12);
      background-color: black;
      color: white;
    }
    cursor: pointer;
  }
`;
const Member = styled.section`
  text-align: center;
  button {
    width: 320px;
    height: 48px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bolder;
    background-color: #4286f4;
    color: white;
    margin-top: 48px;
    &:hover {
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
        0 2px 10px 0 rgba(0, 0, 0, 0.12);
    }
    cursor: pointer;
  }
`;

const InputStyle = styled.input`
  height: 50px;
  width: 320px;
  font-size: 16px;
  font-weight: 500px;
  border-radius: 8px;
  padding-left: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
  &:focus {
    outline: 2px solid #34a853;
  }
`;

const ErrorMessage = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #ea4335;
  margin-top: -10px;
  padding-left: 135px;
  padding-bottom: 20px;
`;
