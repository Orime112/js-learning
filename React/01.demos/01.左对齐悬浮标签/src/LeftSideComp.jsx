import React from 'react';

const buttonStyle = {
  padding: '10px 20px',
  border: '2px solid #3085d6',
  borderRadius: '5px',
  background: '#3085d6',
  boxShadow: '5px 5px 5px grey',
  textShadow: '1px 1px 1px black',
  fontWeight: '900',
  color: 'white'
};

const commonStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  padding: '5px',
  border: '1px solid #0657FF',
  borderRadius: '0 30px 30px 0',
  background: '#C9E5FF',
  width: '280px',
  transition: '0.5s',
  overflow: 'hidden'
};

const visibleStyle = {
  ...commonStyle,
  left: '0'
};

const hiddenStyle = {
  ...commonStyle,
  left: '-300px'
};

const liStyle = {
  margin: '10px',
  padding: '5px',
  border: '2px solid #3085d6',
  borderRadius: '5px',
  background: '#5fa8ed',
  boxShadow: '5px 5px 5px grey',
  textShadow: '1px 1px 1px black',
  fontWeight: '900',
  color: 'white',
  listStyle: 'circle inside'
};

const App = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div style={{ height: '200px' }}>
        <button style={buttonStyle} onClick={() => setVisible(true)}>
          Show
        </button>
      <div style={visible ? visibleStyle : hiddenStyle}>
        <button style={buttonStyle} onClick={() => setVisible(false)}>
          Hide
        </button>
        <div>
          <ul>
            <li style={liStyle}>Fruits 🍏🍌🍒</li>
            <li style={liStyle}>Vegetables 🥕🥦🍅</li>
            <li style={liStyle}>Fast Food 🍕🍟🍔</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
