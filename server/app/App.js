import React, {Component} from 'react';
import styled from 'styled-components';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

// ref: https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties
const Hightlight = styled.span`
  color: #ef5350;
`;

const Item = styled.div`
  padding: 10px;
  border: 1px solid red;
  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 10px;
  flex: 0.5;
  border: 1px solid red;
  overflow-y: scroll;
  border-right: none;
`;

const ProductDetail = styled.div`
  display: flex;
  flex: 0.5;
  margin-top: 10px;
  align-item: center;
  justify-content: center;
  border: 1px solid red;
`;


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      blocking: false,
    };
  }

  componentDidMount() {
    this.setState({
      blocking: true,
    });
    fetch(`http://localhost:3000/products`)
      .then(res => res.json())
      .then(products => {
        this.setState({
          products,
        });
        setTimeout(() => {
          this.setState({
            blocking: false,
          })
        }, 3000);
      });
  }

  renderListContent() {
    return this.state.products.map((product, index) => {
      return (
        <tr key={index}>
          <td>
            <Item>
              {product.name} - <Hightlight>${product.price}</Hightlight>
            </Item>
          </td>
        </tr>
      )
    });
  }

  renderList() {
    return (
      <Wrapper>
        <table style={{width: '100%'}}>
          <tbody>
          {this.renderListContent()}
          </tbody>
        </table>
      </Wrapper>
    );
  }

  render() {
    return (
      <div style={{display: 'flex', flex: 1}}>
        {this.renderList()}
        <ProductDetail>
          <span>Product detail</span>
        </ProductDetail>
      </div>
    )
  }
}

export default App;
