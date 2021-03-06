import styled from 'styled-components';

import { Alert as Reusable } from '../../global/styles';

export const Container = styled.section``;

export const DropdownButton = styled.button`
  cursor: pointer;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(to right, #8e2de2, #4a00e0);
  width: 100%;
  max-width: 80%;
  padding: 1rem 2rem;
  color: ${({ theme: { fonts } }) => fonts.primary};
  border: 0;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  :hover {
    opacity: 0.5;
  }
  :active {
    transform: skew(10deg);
  }
  @media screen and (min-width: 700px) {
    display: none;
  }
`;

interface ListProps {
  isDropdownOpen: boolean;
}
export const List = styled.ul<ListProps>`
  position: relative;
  z-index: 30;
  width: 100%;
  background: ${({ theme: { bgs } }) => bgs.secondary};
  overflow: auto;
  visibility: ${({ isDropdownOpen }) => (isDropdownOpen ? 'visible' : 'hidden')};
  max-height: ${({ isDropdownOpen }) => (isDropdownOpen ? '60vh' : '0vh')};
  transition: max-height 0.6s ease-in-out,
    visibility ${({ isDropdownOpen }) => (isDropdownOpen ? '.1s' : '.7s')} ease-in-out;
  border-radius: 5px;
  li {
    position: relative;
    width: 100%;
    padding: 0.5rem;
    border-bottom: 1px solid ${({ theme: { border } }) => border.primary};
  }
  @media screen and (min-width: 700px) {
    background: ${({ theme: { bgs } }) => bgs.tertiary};
    position: unset;
    grid-column: 1 / 1;
    visibility: visible;
    max-height: 82.3vh;
    max-width: 400px;
  }
  .delete {
    cursor: pointer;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    :hover svg {
      transform: scale(1.1);
    }
  }
  .chat {
    cursor: pointer;
    position: absolute;
    bottom: 1rem;
    right: 4rem;
    :hover svg {
      transform: scale(1.1);
    }
  }
  .status {
    position: absolute;
    bottom: 1rem;
    right: 8rem;
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: ${({ theme: { fonts } }) => fonts.secondary};
      font-size: 1.5rem;
    }
  }
`;

export const User = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem;
  img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
  span {
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.4rem;
    font-weight: bolder;
  }
`;

export const Message = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  span {
    font-size: 1.2rem;
    opacity: 0.8;
    color: ${({ theme: { fonts } }) => fonts.secondary};
  }
`;

export const Alert = styled(Reusable)`
  top: 1rem;
  left: 92%;
`;
