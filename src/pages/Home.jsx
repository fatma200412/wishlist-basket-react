import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import Login from "./Login";
import Register from "./Register";
import Products from "./Products";

function Home() {
  const [login, setLogin] = useState(true);
  const [checkProduct, setCheckProduct] = useState(false);

  return (
    <ChakraProvider>
      <>
        {login ? (
          <>
            {checkProduct ? (
              <Products
                checkProduct={checkProduct}
                setCheckProduct={setCheckProduct}
              />
            ) : (
              <Login
                login={login}
                setLogin={setLogin}
                setCheckProduct={setCheckProduct}
              />
            )}
          </>
        ) : (
          <Register login={login} setLogin={setLogin} />
        )}
      </>
    </ChakraProvider>
  );
}

export default Home;
