import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  Image,
  Text,
} from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import { Space } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import Wishlish from "./Wishlish";

function Products({ setCheckProduct }) {
  let [cardsData, setCardsData] = useState([]);
  let [isAdmin, setIsAdmin] = useState(true);
  const [search, setSearch] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stockCount, setStockCount] = useState(0);
  const [imageData, setImageData] = useState("");
  const [sortByPrice, setSortByPrice] = useState(true);
  const [click, setClick] = useState(false);

  const [fav, setFav] = useState([]);
  const [basket, setBasket] = useState([]);
  useEffect(() => {
    axios("https://655619fa84b36e3a431f0abd.mockapi.io/product").then((res) => {
      setCardsData(res.data);
      setSearch(res.data);
    });
    let wishlist = JSON.parse(localStorage.getItem("fav"));
    wishlist ? setFav(wishlist) : setFav([]);

    let basketArr = JSON.parse(localStorage.getItem("basket"));
    basketArr ? setBasket(basketArr) : setBasket([]);
  }, []);
  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);
  console.log(fav);
  console.log(basket);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Button
          colorScheme="red"
          onClick={() => {
            setCheckProduct(false);
          }}
        >
          Exit
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        <InputGroup
          style={{
            width: "500px",
          }}
        >
          <FormLabel>Search</FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              console.log(cardsData);
              console.log(search);
              let arr = search.filter((elem) =>
                elem.name.toLowerCase().includes(e.target.value.toLowerCase())
              );
              console.log(e.target.value);
              console.log(arr);
              setCardsData(arr);
              console.log(setCardsData(arr));
            }}
          />

          <Button colorScheme="purple" type="submit">
            Search
          </Button>

          <Button
            colorScheme="pink"
            onClick={() => {
              let newSorted = sortByPrice === true ? false : true;
              let sorted = [...cardsData].sort((a, b) => {
                if (newSorted == true) {
                  return a.price - b.price;
                } else {
                  return b.price - a.price;
                }
              });
              setCardsData(sorted);
              setSortByPrice(newSorted);
            }}
          >
            {sortByPrice == true ? "Sort (asc)" : "Sort (desc)"}
          </Button>
        </InputGroup>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {cardsData.map((elem, i) => {
          return (
            <Card
              key={i}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                width: "350px",
                display: "flex",

                width: "255px",
                position: "relative",
              }}
            >
              <CardBody>
                <Image
                  src={elem.image}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                  style={{
                    width: "100%",
                  }}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{elem.name}</Heading>
                  <Text
                    color="blue.600"
                    fontSize="2xl"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{elem.price}$</Text>
                    <Text>{elem.stockCount}</Text>
                  </Text>
                  {elem.sale ? (
                    <Button
                      colorScheme="whatsapp"
                      style={{ position: "absolute", top: "10px" }}
                    >
                      SALE
                    </Button>
                  ) : null}{" "}
                  <Button
                    data-id={elem.id}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                    }}
                    onClick={(e) => {
                      let wishlistElem = cardsData.find(
                        (elem) => elem.id == e.target.getAttribute("data-id")
                      );

                      let arr = [];
                      if (
                        fav.find(
                          (elem) => elem.id == e.target.getAttribute("data-id")
                        )
                      ) {
                        arr = fav.filter(
                          (elem) => elem.id == e.target.getAttribute("data-id")
                        );
                        setFav([...arr]);
                      } else {
                        setFav([...fav, wishlistElem]);
                        console.log(fav);
                      }

                      // setClick(!click);
                    }}
                  >
                    <HeartOutlined />

                    {/* <HeartFilled style={{ color: "red" }} /> */}
                  </Button>
                </Stack>
              </CardBody>
              <Divider />

              <CardFooter style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  colorScheme="blue"
                  data-id-basket={elem.id}
                  onClick={(e) => {
                    let basketElem = cardsData.find(
                      (elem) =>
                        elem.id == e.target.getAttribute("data-id-basket")
                    );

                    let arrBasket = [];
                    if (
                      basket.find(
                        (elem) =>
                          elem.id == e.target.getAttribute("data-id-basket")
                      )
                    ) {
                      arrBasket = basket.filter(
                        (elem) =>
                          elem.id == e.target.getAttribute("data-id-basket")
                      );
                      setBasket([...arrBasket]);
                    } else {
                      setBasket([...basket, basketElem]);
                    }
                  }}
                >
                  Add to cart
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FormControl
          isRequired
          style={{
            padding: "35px",
            boxShadow:
              " rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            margin: "50px auto",
            width: "350px",
          }}
        >
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Product name"
            style={{ marginBottom: "15px" }}
            value={name}
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
            }}
          />

          <FormLabel>Price</FormLabel>
          <Input
            placeholder="Product price"
            style={{ marginBottom: "15px" }}
            value={price}
            onChange={(e) => {
              console.log(e.target.value);
              setPrice(e.target.value);
            }}
          />
          <FormLabel>stockCount</FormLabel>
          <Input
            placeholder="Product stockCount"
            style={{ marginBottom: "15px" }}
            value={stockCount}
            onChange={(e) => {
              console.log(e.target.value);
              setStockCount(e.target.value);
            }}
          />
          <FormLabel>Image</FormLabel>
          <Input
            placeholder="Product image link"
            style={{ marginBottom: "15px" }}
            value={imageData}
            onChange={(e) => {
              console.log(e.target.value);
              setImageData(e.target.value);
            }}
          />
          <Button
            colorScheme="whatsapp"
            type="submit"
            onClick={() => {
              let obj = {
                name: name,
                price: price,
                stockCount: stockCount,
                image: imageData,
              };
              console.log(obj);
              setName("");
              setPrice("");
              setStockCount("");
              setImageData("");
              axios
                .post(
                  "https://655619fa84b36e3a431f0abd.mockapi.io/product",
                  obj
                )
                .then((res) => {
                  setCardsData([...cardsData, res.data]);
                });
            }}
          >
            Add
          </Button>
        </FormControl>
      </div>

      {/* <TableContainer>
        <Table variant="striped">
          <Thead style={{ backgroundColor: "pink" }}>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>discontinued</Th>
              <Th>unitsInStock</Th>
              <Th>Edit Button</Th>
              <Th>Delete Button</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableAll.map((elem, i) => {
              return (
                <Tr
                  key={i}
                  style={{
                    color: elem.stockCount < 10 ? "red" : "black",
                  }}
                >
                  <Td>{elem.id}</Td>
                  <Td>{elem.name}</Td>
                  <Td>{elem.price}</Td>
                  <Td style={{ color: elem.sale ? "green" : "black" }}>
                    {elem.sale ? "TRUE" : "FALSE"}
                  </Td>
                  <Td>{elem.stockCount}</Td>
                  <Td>
                    {" "}
                    <Button colorScheme="orange">Edit</Button>
                  </Td>
                  <Td>
                    {" "}
                    <Button
                      colorScheme="red"
                      onClick={(e) => {
                        console.log(e.target);
                        console.log(elem.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot style={{ backgroundColor: "pink" }}>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>discontinued</Th>
              <Th>unitsInStock</Th>
              <Th>Edit Button</Th>

              <Th>Delete Button</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer> */}
    </>
  );
}

export default Products;
