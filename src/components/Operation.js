import '../styles/App.css';

import pause from "../icons/pause.svg"
import check from "../icons/check.svg"

export function Operation() {
    return (
      <div className="operation">
        <span>18904</span>
        <div className="operationBtn">
            <button><img src={pause}/></button>
            <button><img src={check}/></button>
        </div>
      </div>
    );
}
  