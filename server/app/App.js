import React, {Component} from 'react';
import styled from 'styled-components';
import 'react-block-ui/style.css';
import ProductDetail from './components/ProductDetail';
import gfetch from '../utils/graphql-dsl';

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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      blocking: false,
    };
  }

  getProducts() {
    return gfetch(`
      query {
        products {
          name
          price
        }
      }
    `);
  }

  componentDidMount() {
    this.setState({
      blocking: true,
    });

    this.getProducts().then(res => {
      this.setState({
        products: res.data.products,
      });
    });
  }

  renderListContent() {
    return this.state.products.map((product, index) => {
      return (
        <tr key={index}>
          <td>
            <Item onClick={() => alert('wtf')}>
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
        <ProductDetail/>
      </div>
    )
  }
}

export default App;
