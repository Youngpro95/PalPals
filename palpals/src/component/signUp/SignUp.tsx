import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { signUpAsync } from "../../features/LoginSlice";
interface formDataType{
  email : string
  password : string
  confirmPassword : string
  nickname : string
}

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<formDataType>();
  const onSubmit : SubmitHandler<formDataType>= (formData) => {
    dispatch(signUpAsync(formData)).then(
      (res) => res.meta.requestStatus === "fulfilled" && navigate(-1)
    );
  };
  return (
    <WrapContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <NameStyle>이메일</NameStyle>
        <InputBox>
          <InputStyle
            type="text"
            placeholder="이메일"
            style={{
              outline: errors.email ? "2px solid red" : "",
            }}
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <ErrorMessage>이메일 확인</ErrorMessage>}
        </InputBox>
        <InputBox>
          <NameStyle>비밀번호</NameStyle>
          <InputStyle
            type="password"
            placeholder="비밀번호"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
            })}
          />
          {errors.password && (
            <ErrorMessage>
              비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리 사용해야 합니다.
            </ErrorMessage>
          )}
        </InputBox>
        <InputBox>
          <NameStyle>비밀번호 확인</NameStyle>
          <InputStyle
            type="password"
            placeholder="비밀번호 확인"
            style={{
              outline: errors.confirmPassword ? "2px solid red" : "",
            }}
            {...register("confirmPassword", {
              validate: (value: string) => getValues("password") === value,
            })}
          />
          {passwordRef.current?.value !== getValues("password")}
          {errors.confirmPassword && (
            <ErrorMessage>비밀번호를 확인해 주세요.</ErrorMessage>
          )}
        </InputBox>
        <InputBox>
          <NameStyle>닉네임</NameStyle>
          <InputStyle
            placeholder="이름을 적어주세요"
            style={{ outline: errors.nickname ? "2px solid red" : "" }}
            {...register("nickname", {
              required: true,
              minLength: 2,
              valueAsNumber: false,
            })}
          />
          {errors.nickname && (
            <ErrorMessage>닉네임을 입력해주세요.</ErrorMessage>
          )}
        </InputBox>
        {Object.keys(errors).length !== 0 ? (
          <SubmitFailedButton>가입하기</SubmitFailedButton>
        ) : (
          <SubmitButton type={"submit"}>가입하기</SubmitButton>
        )}
      </Form>
    </WrapContainer>
  );
};

export default SignUp;

const WrapContainer = styled.div`
  width: 600px;
  margin: 0 auto;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 100px;
`;

const InputBox = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Form = styled.form``;

const InputStyle = styled.input`
  height: 50px;
  width: 100%;
  font-size: 16px;
  font-weight: 500px;
  border-radius: 8px;
  padding-left: 20px;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
  &:focus {
    outline: 2px solid #34a853;
  }
`;
const NameStyle = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  padding-bottom: 6px;
  color: #666666;
`;

const ErrorMessage = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #ea4335;
  margin-top: -10px;
  padding-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 600px;
  height: 90px;
  background-color: #4286f4;
  color: white;
  margin-top: 50px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 400ms ease;
  &:hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
`;
const SubmitFailedButton = styled.button`
  width: 600px;
  height: 90px;
  background-color: gray;
  color: white;
  margin-top: 50px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  border-radius: 8px;
  opacity: 0.2;
  pointer-events: none;
`;
