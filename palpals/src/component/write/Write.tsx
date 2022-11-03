import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { PostContentAsync } from "../../features/PostSlice";

interface formDataType {
  title: string;
  content: string;
}

const Write = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataType>();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<formDataType> = (formData) => {
    dispatch(PostContentAsync(formData)).then((res) => {
      return res.payload.status === 201
        ? (navigate(-1), alert("게시글이 등록되었습니다."))
        : "";
    });
  };
  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputBox>
        <InputStyle
          placeholder="제목을 적어주세요"
          style={{ outline: errors.title ? "2px solid red" : "" }}
          {...register("title", {
            required: true,
          })}
        />
        <ReplyContent
          placeholder="내용을 입력해주세요"
          {...register("content")}
        />
        <SubmitButton>작성</SubmitButton>
        <SubmitButton onClick={() => navigate(-1)}>취소</SubmitButton>
      </InputBox>
    </form>
  );
};

export default Write;

const InputBox = styled.div`
  width: 960px;
  margin: 0 auto;
`;
const InputStyle = styled.input`
  height: 50px;
  width: 100%;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid #cccccc;
`;

const ReplyContent = styled.textarea`
  height: 500px;
  width: 100%;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  border-radius: 8px;
  margin-bottom: 10px;
  /* border: none; */
  &:focus {
    outline: none;
  }
  resize: none;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 40px;
  float: right;
  background-color: #4286f4;
  color: white;
  font-size: 16px;
  border-radius: 6px;
  margin-left: 3px;
  cursor: pointer;
  transition: box-shadow 400ms ease;
  &:hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
`;
