import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

function Basket() {
  const [basket, setBasket] = useState([]);
  let [count, setCount] = useState(0);
  useEffect(() => {
    let basketArr = JSON.parse(localStorage.getItem("basket"));
    basketArr ? setBasket(basketArr) : setFav([]);
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <TableContainer>
        <Table variant="striped" colorScheme="blue">
          <TableCaption></TableCaption>
          <Thead style={{ backgroundColor: "pink" }}>
            <Tr>
              <Th>ID</Th>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Decrease</Th>
              <Th>Count</Th>
              <Th>Increase</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {basket &&
              basket.map((elem, i) => {
                return (
                  <Tr key={i}>
                    <Td>{elem.id}</Td>
                    <Td>
                      <img src={elem.image} alt="" style={{ width: "50px" }} />
                    </Td>
                    <Td>{elem.name}</Td>
                    <Td>{elem.price}</Td>
                    <Td>
                      <Button
                        colorScheme="gray"
                        style={{ borderRadius: "50%" }}
                        data-id={elem.id}
                        onClick={(e) => {
                          let dataId = basket.filter(
                            (elem) =>
                              elem.id == e.target.getAttribute("data-id")
                          );
                          console.log(dataId);
                          if (dataId) {
                            if (count > 0) {
                              setCount(count - 1);
                            }
                          }
                        }}
                      >
                        -
                      </Button>
                    </Td>
                    <Td>{count}</Td>
                    <Td>
                      <Button
                        colorScheme="gray"
                        style={{ borderRadius: "50%" }}
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      >
                        +
                      </Button>
                    </Td>
                    <Td>
                      <Button colorScheme="red">Delete</Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
          <Tfoot style={{ backgroundColor: "pink" }}>
            <Tr>
              <Th>ID</Th>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Decrease</Th>
              <Th>Count</Th>
              <Th>Increase</Th>
              <Th>Delete</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Basket;
