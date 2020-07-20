import styled from "@emotion/styled";

import Image from "./Image";
import BookQuantity from "./BookQuantity";

const Shop = styled.div`
  padding: 10px 20px 40px 20px;
`;

const ShopName = styled.h1`
  font-size: 18px;
  color: #fff;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 26.4px;
  margin-bottom: 20px;
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const BookShop = ({ onAddBook, onRemoveBook, numBooks }) => {
  return (
    <Shop>
      <ShopName>Buy PM Principles</ShopName>
      <Image src="./book.png" width="500px"></Image>
      <Controls>
        <BookQuantity
          onAdd={onAddBook}
          onRemove={onRemoveBook}
          quantity={numBooks}
        />
      </Controls>
    </Shop>
  );
};

export default BookShop;
