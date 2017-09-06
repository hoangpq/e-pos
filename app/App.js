import React, {Component} from 'react';
import styled from 'styled-components';

// ref: https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties

const Box = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: white;
  overflow-y: scroll;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  color: #000;
  padding: 10px;
  border: 1px solid #e0e0e0;
`;

const Hightlight = styled.span`
  color: #ef5350;
`;

const Overlay = styled.div`
  
`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/products`)
      .then(res => res.json())
      .then(products => {
        this.setState({products});
      });
  }

  renderListContent() {
    return this.state.products.map((product, index) => {
      return (
        <Item key={index}>
          {product.name} - <Hightlight>${product.price}</Hightlight>
        </Item>
      )
    });
  }

  renderList() {
    return (
      <List>
        {this.renderListContent()}
      </List>
    );
  }

  render() {
    return (
      <Box>
        {this.renderList()}
      </Box>
    )
  }
}

export default App;
