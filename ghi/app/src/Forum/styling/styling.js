import React from "react";
import styled, { css } from "styled-components";

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
  padding-top: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 40px;
  color: #a63a79;
  font-weight: 500px;
`;

export const CommentButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
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
