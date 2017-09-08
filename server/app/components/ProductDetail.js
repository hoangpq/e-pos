import React, {Component} from 'react';
import styled from 'styled-components';
import defaultImg from '../images/default.jpg';

const Wrapper = styled.div`
  display: flex;
  flex: 0.5;
  margin-top: 10px;
  align-item: center;
  justify-content: center;
  border: 1px solid red;
`;

const ProductImage = styled.img;`
  
`;

export default class ProductDetail extends Component {

  render() {
    return (
      <Wrapper>
        <div>
        </div>
      </Wrapper>
    )
  }

}
