import React, { useState } from "react";
import Vouchersdata from "./Vouchersdata.json";

export default function Vouchers({ ADiscount, setVoucherDiscount }) {
  const [vdata, setVdata] = useState(Vouchersdata);
  const [inputText, setInputText] = useState();
  const [error, SetError] = useState("");
  const [showVoucherBox, setShowVoucherBox] = useState(false);
  const inputValue = (event) => {
    setInputText(event.target.value);
  };

  const submitVoucher = () => {
    const newcode = vdata.find((item) => item.Code === inputText);
    setInputText("");
    if (newcode) {
      if (newcode.minPrice < ADiscount) {
        setVoucherDiscount(newcode.discountPercent);
      } else {
        SetError("Your total amount not eligible for tis voucher");
      }
    } else {
      SetError("invalid Voucher Code");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <div className="voucher-heading">
            <h5>
              Do you have any voucher?
              <span>
                {" "}
                <input
                  type="checkbox"
                  id="voucher"
                  name="box"
                  onChange={() => setShowVoucherBox(!showVoucherBox)}
                  checked={showVoucherBox}
                />{" "}
                <label htmlFor="voucher">yes</label>
              </span>
            </h5>
          </div>
        </div>
      </div>
      {showVoucherBox && (
        <div className="voucher-box">
          <div className="row">
            <div className="col-sm-12">
              <input
                type="text"
                placeholder="Enter your voucher"
                onChange={inputValue}
                value={inputText}
              />
              <button className="v-btn" onClick={() => submitVoucher()}>
                Add
              </button>
            </div>
            <div className="col-sm-12">
              <div className="error" id="error">
                {error}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
