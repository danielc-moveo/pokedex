import React from "react";
import styled from "styled-components";

const Input = styled.input`
  border-radius: 9px;
  border: 1px solid rgba(2, 1, 102, 0.5);
  background: #f7f7f9;
  width: 340px;
  @media (max-width: 500px) {
    width: 250px;
  }
  height: 36px;
  &:focus {
    outline: none;
  }
  text-align: center;
`;

const debounce = (cb: (searchField: string) => void, ms: number) => {
  let intervalId: NodeJS.Timeout;
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    clearInterval(intervalId);
    intervalId = setTimeout(() => {
      cb(e.target.value);
    }, ms);
  };
};

interface SearchBoxProps {
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBox = ({ setSearchField }: SearchBoxProps) => {
  const handleChange = (searchField: string) => {
    setSearchField(searchField.toLowerCase());
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <Input
        onChange={debounce(handleChange, 1000)}
        placeholder={"search by pokemon name or id..."}
      />
    </div>
  );
};

export default SearchBox;
