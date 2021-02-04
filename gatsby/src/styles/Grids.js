import styled from 'styled-components';

export const HomePageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

// SIngle grid item

export const ItemStyles = styled.div`
  text-align: center;
  position: relative;
  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }
  img {
    height: auto;
    font-size: 0;
    &.loading {
      --shine: white;
      --background: var(--grey);
      background-image: linear-gradient(
        90deg,
        var(--background) 0px,
        var(--shine) 40px,
        var(--background) 80px
      );
      background-size: 500px;
      animation: shine 1s infinite linear;
    }
  }
  p {
    transform: rotate(-2deg) translateY(-140%);
    width: 100%;
    left: 0;
    position: absolute;
    .mark {
      display: inline;
    }
  }
`;
