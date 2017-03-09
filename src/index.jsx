import React from 'react';
import ReactDom from 'react-dom';
import HelloMessage from './components/HelloMessage.jsx';
import NodeList from './components/NodeList.jsx';

ReactDom.render(
  <NodeList>
    <span>123</span>
    <span>456</span>
  </NodeList>
  ,
  document.getElementById("test"));

/*const names = ['小明','小红','小王'];
ReactDom.render(<div>{
    names.map((n,k) => {
      return <HelloMessage name={n} />
    })
  }</div>, 
  document.getElementById("test"));*/


// const arr = [
//   <div>hello world</div>,
//   <div>react is niu b</div>
// ];
// ReactDom.render(<div>{arr}</div>, document.getElementById("test"));


/*const names = ['小明','小红','小王'];

ReactDom.render(
  <ul>
      {
          names.map((n) => {
            return <li>hello {n}</li>
          })
      }
  </ul>,
  document.getElementById('test')
);*/