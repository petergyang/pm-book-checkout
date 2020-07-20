import { useState } from "react";
import Router from "next/router";

import Layout from "../components/Layout";
import Row from "../components/prebuilt/Row";
import BookShop from "../components/prebuilt/BookShop";
import CheckoutForm from "../components/CheckoutForm";
import getBookPrice from "../utils/get-book-price";

const MainPage = props => {
  const [numBooks, setNumBooks] = useState(1);

  const addBook = () => setNumBooks(num => Math.min(12, num + 1));
  const remBook = () => setNumBooks(num => Math.max(1, num - 1));

  return (
    <Layout title="Book Shop">
      <Row>
        <BookShop
          onAddBook={addBook}
          onRemoveBook={remBook}
          numBooks={numBooks}
        />
      </Row>
      <CheckoutForm
        price={getBookPrice(numBooks)}
        onSuccessfulCheckout={() => Router.push("/success")}
      />
    </Layout>
  );
};

export default MainPage;