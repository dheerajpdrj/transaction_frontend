import React, { useState } from "react";
import axios from "axios";

const TransactionPage = () => {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const handleAddition = async () => {
    if (!number1 || !number2) {
      setError("Please enter numbers");
      return;
    }

    // if (number1 === number2) {
    //   setError("Numbers cannot be the same");
    //   return;
    // }
    const num1Value = parseFloat(number1);
    const num2Value = parseFloat(number2);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/add",
        {
          num1: num1Value,
          num2: num2Value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.error) {
        setError(response.data.error);
        return;
      }
      setHistory(response.data.previousCalculations);
    } catch (error) {
      console.error("Error adding numbers:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h2>Add Two Numbers</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "50%",
          margin: "auto",
        }}
      >
        <input
          type="text"
          placeholder="Enter number 1"
          style={{ padding: "0.5rem" }}
          value={number1}
          onChange={(e) => {
            setNumber1(e.target.value);
            setError("");
          }}
        />
        <input
          type="text"
          style={{ padding: "0.5rem" }}
          placeholder="Enter number 2"
          value={number2}
          onChange={(e) => {
            setNumber2(e.target.value);
            setError("");
          }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button style={{ padding: "0.5rem" }} onClick={handleAddition}>
          Add
        </button>
      </div>
      <h2>Calculation History</h2>
      {history.length === 0 ? (
        ""
      ) : (
        <div
          style={{ border: "1px solid black", width: "50%", margin: "auto" }}
        >
          <ul style={{ listStyleType: "none" }}>
            {history?.map((calculation, index) => (
              <li
                key={index}
                style={{ padding: "0.5rem" }}
              >{`${calculation.num1} + ${calculation.num2} = ${calculation.result}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
