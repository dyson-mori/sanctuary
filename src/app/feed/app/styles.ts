import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  position: relative;

	flex-direction: column;

	overflow-y: scroll;
  scroll-snap-type: y mandatory;

	width: 100%;
	height: 100%;
`;

export const Section = styled.section`
  display: flex;

	justify-content: center;
	align-items: center;

	height: 100%;

  transition: .5s;

	scroll-snap-align: start;
`;