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
function Wishlish() {
  let [fav, setFav] = useState([]);
  useEffect(() => {
    let wishlist = JSON.parse(localStorage.getItem("fav"));
    wishlist ? setFav(wishlist) : setFav([]);
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption></TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fav &&
                fav.map((elem, i) => {
                  return (
                    <Tr key={i}>
                      <Td>{elem.id}</Td>
                      <Td>
                        <img
                          src={elem.image}
                          alt=""
                          style={{ width: "50px" }}
                        />
                      </Td>
                      <Td>{elem.name}</Td>
                      <Td>{elem.price}</Td>
                      <Td>
                        <button>Delete</button>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>ID</Th>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Delete</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Wishlish;
