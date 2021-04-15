import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './game.js'
import AnalogClock from 'analog-clock-react';
// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick = {() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

  let options={
    useCustomTime: false,
    width: "300px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#17a2b8",
    centerColor: "#459cff",
    centerBorderColor: "#fff",
    handColors: {
      second: "#d81c7a",
      minute: "#fff",
      hour: "#fff"
    }
  };






// ========================================

ReactDOM.render(
  <div>
  <Game />
  <AnalogClock {...options}/>
  </div>,
  document.getElementById('root')
);

