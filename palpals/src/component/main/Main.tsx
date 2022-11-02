import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  authenticated,
  nicknameData,
  onLogout,
} from "../../features/LoginSlice";
import { onReset, postData } from "../../features/PostSlice";

const Main = () => {
  const auth = useAppSelector(authenticated);
  const nickname = useAppSelector(nicknameData);
  const contentData = useAppSelector(postData);
  const dispatch = useAppDispatch();
  const onClickLogout = () => {
    sessionStorage.removeItem("access_token");
    dispatch(onLogout());
    dispatch(onReset());
    alert("로그아웃 되었습니다.");
  };
  const onWrite = (e: any) => {
    return !auth && (alert("로그인 해주세요"), e.preventDefault());
  };
  return (
    <>
      <MainWrap>
        <p>메인 페이지</p>
        {nickname && <p>{nickname}님 환영합니다!!!</p>}
        <ButtonWrap>
          <SignUpBtn to={"/signup"}>회원가입</SignUpBtn>
          {auth === true ? (
            <LoginBtn to={"/"} onClick={onClickLogout}>
              로그아웃
            </LoginBtn>
          ) : (
            <LoginBtn to={"/login"}>로그인</LoginBtn>
          )}
          <WriteBtn onClick={onWrite} to={"/write"}>
            게시글 작성
          </WriteBtn>
        </ButtonWrap>
      </MainWrap>
      <PostsWrap>
        <Posts>게시글</Posts>
        {contentData.map((data: any, i: any) => {
          return (data.title && data.content) === null ? (
            ""
          ) : (
            <ContentWrap key={i}>
              <ContentTitle>{data.title}</ContentTitle>
              <Content>{data.content}</Content>
            </ContentWrap>
          );
        })}
      </PostsWrap>
    </>
  );
};

export default Main;

const MainWrap = styled.div`
  width: 100%;
  min-height: 100px;
  height: 100%;
  margin: 0 auto;
  p {
    font-size: 34px;
    width: 90%;
    margin: 0 auto;
    text-align: center;
  }
`;
const SignUpBtn = styled(Link)`
  float: left;
  font-size: 20px;
  border: 1px solid black;
  &:hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  cursor: pointer;
`;
const LoginBtn = styled(Link)`
  float: left;
  font-size: 20px;
  border: 1px solid black;
  &:hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  cursor: pointer;
`;
const WriteBtn = styled(Link)`
  float: right;
  font-size: 20px;
  border: 1px solid black;
  &:hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  width: 70%;
  margin: 0 auto;
`;
const PostsWrap = styled.div`
  width: 70%;
  margin: 0 auto;
  div {
    font-size: 20px;
  }
`;
const Posts = styled.p`
  border: none;
  border-bottom: 1px solid #cccccc;
  font-size: 35px;
  margin-bottom: 10px;
`;
const ContentWrap = styled.div`
  /* border-bottom: 1px solid #cccccc; */
  margin-bottom: 10px;
`;
const ContentTitle = styled.p`
  font-size: 24px;
`;
const Content = styled.p`
  font-size: 18px;
  min-height: 100px;
  height: 100%;
  margin-top: 5px;
  border: 1px solid #cccccc;
`;
