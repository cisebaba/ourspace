import styled from "styled-components";

export const PostWrapper = styled.div`
  /// This is making the box
  width: 600px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  left: 25%;
  background-color: #fff;
  box-shadow: 0px 0px 2.7px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

export const TitleContainer = styled.header`
  text-align: center;
  padding-top: 25px;
  padding-bottom: 25px;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 40px;
  color: #a63a79;
  font-weight: 500px;
  background-color: #fadadd;
`;

export const CommentTitleContainer = styled.header`
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  color: #a63a79;
  font-weight: 500px;
  background-color: #f2e9eb;
`;

export const CommentButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 0;
  margin-left: auto !important;
  margin-right: 12px !important;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  color: white;
  background-color: white;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  background: white;
  background: linear-gradient(to right, #efb7b7, #8a1253);
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

//previous colors : #efb7b7, #8a1253

export const StyledDeleteButton = styled.button`
  display: block;
  width: 10%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  color: white;
  background-color: white;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  background: white;
  background: linear-gradient(to right, #efb7b7, #8a1253);
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

export const StyledCreateButton = styled.button`
  display: block;
  width: 10%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  color: white;
  background-color: white;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  background: white;
  background: linear-gradient(to right, #74b49b, #458c4f);
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

export const ForumHeaderText = styled.h1`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

export const ForumSmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

export const PostTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 20px;
  font-style: 1em sans-serif;
  border: 3px;
`;

export const PostCommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 15px;
`;
