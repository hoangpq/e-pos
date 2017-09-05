import React, {Component, PropTypes} from 'react';
import styled from 'styled-components';

// ref: https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties

const Box = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background: grey;
`;

const List = styled.ul`
  list-style: none;
  background-color: red;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 0 0 0;
`;

const Item = styled.li`
  color: #000;
`;

class App extends Component {

  renderList() {
    return (
      <div style={{display: 'flex', flex: '1 0', background: 'red'}}>
        <List>
        {
          this.props.products.map((product, index) => {
            return (
              <Item key={index}>
                <div style={{width: '100%', background: '#dddddd', padding: '10px'}}>
                  {product.name}
                </div>
              </Item>
            )
          })
        }
        </List>
      </div>
    );
  }

  render() {

    return (
      <Box>
        <span>Hello Electron</span>
        {this.renderList()}
      </Box>
    )
  }
}

App.propTypes = {
  products: PropTypes.array.isRequired,
};

export default App;
