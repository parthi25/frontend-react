import React, { useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Quest() {
  const Data = {
    question: "hi im java",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: "4",
  };

  const j = ({'a':'a','b':'b'});
  
  useEffect(() => console.log('console',j))

  const index = "a";

  return (
    <div className="container">
      <h1>test</h1>
      <section className="border " key={index}>
        <label>{Data.question}</label>
        <input type="radio"  value="1" name={index} className="radio-btn" />
        <label >{Data.choice1}</label>

        <input type="radio"  value="1" name={index} />
        <label >{Data.choice2}</label>

        <input type="radio"  value="1" name={index} />
        <label >{Data.choice3}</label>

        <input type="radio"  value="1" name={index} />
        <label >{Data.choice4}</label>
      </section>
    </div>
  );
}

export default Quest;
