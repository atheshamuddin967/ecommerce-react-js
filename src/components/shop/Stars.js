import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

export default function Stars({ rating }) {
  // console.log(rating);
  const ratingstars = Array.from({ length: 5 }, (ele, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating > index + 1 ? (
          <FaStar />
        ) : rating > number ? (
          <FaStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </span>
    );
  });
  return <>{ratingstars}</>;
}
