import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Image,
  Text,
  Select,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
 
import { StarIcon } from "@chakra-ui/icons";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addCartData, getCartData } from "../../redux/AppReducer/action";
import axios from "axios";
 
 
const SingleProd = () => { 
  const {id} = useParams()
  const [singleProduct, setSingleProduct] = ({});
   console.log("id",id)
  const dispatch = useDispatch()
  const isLoaded = useSelector((state)=>state.AppReducer.notLoading)

 

  //Below useEffect is used to fetch all cart items

 const getSingleProduct =()=>{
  axios({
    method:"GET",
    url:`/products/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem("token")}`
    },
  })
     
     .then((r) => {
      console.log(r.data);
      setSingleProduct({...r.data})
     } )
     .catch((e) => console.log(e));
 }

 useEffect(()=>{
getSingleProduct()
 },[])

const handleCart =(id)=>{

  dispatch(addCartData(id)).then((res)=>dispatch(getCartData()))
 }
  
    return (
      <div>
        <Flex
          // direction={isLargerThan768 ? "row" : "column"}
          position={"relative"}
          bg={"white"}
          left="0"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Flex
            bg={"white"}
            h={"400px"}
            w={"400px"}
            justifyContent="center"
            alignItems={"center"}
          >
            <Image
              src={singleProduct?.imageUrl}
              h={"400px"}
              w={"300px"}
              p="50"
              m={"50"}
            ></Image>
          </Flex>
          <Box bg={"white"} h={"400px"} w={"400px"}>
            <Text
              marginTop={"30px"}
              marginLeft={"10px"}
              fontSize="20px"
              fontWeight={"bold"}
              lineHeight="22px"
              color={"#212121"}
            >
              {singleProduct?.productName}
            </Text>
            <Text
              marginTop={"10px"}
              marginLeft={"10px"}
              fontSize="12px"
              fontWeight={"400"}
              lineHeight="17px"
              color={"#ff6f61"}
            >
              {singleProduct?.brand}
            </Text>
            <Flex
              marginTop={"10px"}
              left="0"
              flexDirection={"row"}
              justifyContent="flex-start"
              alignItems={"center"}
            >
              <Box
                marginLeft={"10px"}
                paddingLeft={"2px"}
                flexDirection={"row"}
                justifyContent="flex-start"
                alignItems={"center"}
                borderRadius={"2px"}
                bg={"#1aab2a"}
                color={"white"}
                fontWeight={"bold"}
                fontSize="14px"
              >
                {singleProduct?.ratings}
                <StarIcon marginTop={"-3px"} color={"white"} fontSize="12px" />
              </Box>
              <Text marginLeft={3} fontSize="12px" color={"#1aab2a"}>
                {singleProduct?.numberOfRatings}
              </Text>
            </Flex>
            <Box>
              <Text
                marginTop={"10px"}
                marginLeft={"10px"}
                fontSize="18px"
                fontWeight={"bold"}
                lineHeight="22px"
                color={"#212121"}
              >
                Product highlights
              </Text>
              {singleProduct?.prodHighlights.split("\n").map((el, i) => {
                return (
                  <Text
                    marginTop={"10px"}
                    key={i}
                    color="#212121"
                    lineHeight={"20px"}
                    fontWeight="400"
                    fontSize={"14px"}
                  >
                    {el}
                  </Text>
                );
              })}
            </Box>
          </Box>
          <Box
            bg={"white"}
            h={"350px"}
            w={"350px"}
            mr={"5px"}
            borderRadius={"10px"}
            boxShadow="0 1px 2px 1px rgb(0 0 0 / 30%)"
          >
            <Flex
              bg={"#edf9ee"}
              w={"100%"}
              h={"40px"}
              alignItems={"center"}
              borderTopLeftRadius={"10px"}
              borderTopRightRadius={"10px"}
            >
              <Image
                src="https://www.1mg.com/images/social_cue.svg"
                ml={"10px"}
                w={"20px"}
                h={"10px"}
              ></Image>
              <Text
                ml={"10px"}
                fontSize={"12px"}
                fontWeight={"400"}
                lineHeight={"17px"}
              >
                385 people bought this recently
              </Text>
            </Flex>
            <Flex
              justifyContent={"flex-start"}
              alignItems={"center"}
              fontFamily={"Clear Sans"}
              mt={"10px"}
            >
              <input
                style={{ marginLeft: "15px", height: "20px", width: "20px" }}
                name="pcheck"
                defaultChecked={true}
                value={singleProduct?.price}
                type="radio"
              />
              <BiRupee
                color={"#3b3b3b"}
                fontWeight={"500"}
                lineHeight={"33px"}
                fontSize={"23px"}
                ml={"10px"}
              />
              <Text
                color={"#3b3b3b"}
                fontWeight={"500"}
                lineHeight={"33px"}
                fontSize={"23px"}
              >
                {singleProduct?.price}
              </Text>
              <Text
                color={"#666666"}
                textDecoration={"line-through"}
                fontWeight={"400"}
                lineHeight={"23px"}
                fontSize={"16px"}
                ml={"10px"}
              >
                {singleProduct?.strikedPrice}
              </Text>
              <Text
                bg={"#edf9ee"}
                color={"#1aab2a"}
                fontWeight={"400"}
                lineHeight={"23px"}
                fontSize={"16px"}
                ml={"10px"}
              >
                {singleProduct?.discount}% off
              </Text>
            </Flex>
            <Flex
              justifyContent={"flex-start"}
              alignItems={"center"}
              fontFamily={"Clear Sans"}
              mt={"10px"}
            >
              <Box>
                <input
                  style={{ marginLeft: "15px", height: "20px", width: "20px" }}
                  type="radio"
                  name="pcheck"
                  value={singleProduct?.price}
                />
              </Box>
              <Box>
                <Flex
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  fontFamily={"Clear Sans"}
                  mt={"10px"}
                >
                  <BiRupee
                    color={"#3b3b3b"}
                    fontWeight={"500"}
                    lineHeight={"33px"}
                    fontSize={"23px"}
                    ml={"10px"}
                  />
                  <Text
                    color={"#3b3b3b"}
                    fontWeight={"500"}
                    lineHeight={"33px"}
                    fontSize={"23px"}
                  >
                    {singleProduct?.price}
                  </Text>
                  <Text
                    color={"#666666"}
                    fontWeight={"400"}
                    lineHeight={"23px"}
                    fontSize={"16px"}
                    ml={"10px"}
                  >
                    {" "}
                    + free shipping and 5% Extra
                  </Text>
                </Flex>
                <Flex>
                  <Text
                    color={"#666666"}
                    fontWeight={"400"}
                    lineHeight={"23px"}
                    fontSize={"16px"}
                    ml={"10px"}
                  >
                    cashback with
                  </Text>
                  <Image
                    h={"18px"}
                    src="https://res.cloudinary.com/du8msdgbj/image/upload/v1613645053/marketing/phb2bz61etrdmuurfdoq.png"
                  ></Image>
                  <Image src="https://img.1mg.com/images/info_icon.svg"></Image>
                </Flex>
              </Box>
            </Flex>
            <Text
              mt={"20px"}
              color={"#666666"}
              fontWeight={"400"}
              lineHeight={"17px"}
              fontSize={"12px"}
              ml={"20px"}
              fontFamily={"Helvetica, Arial"}
            >
              Inclusive of all taxes
            </Text>
            <Flex mt={"20px"} ml={"20px"} alignItems={"center"}>
              <Select
                //   placeholder="Quantity"
                size="sm"
                borderRadius={"5px"}
                w={"150px"}
                // onChange={(e) => {
                //   setCountValue(e.target.value);
                // }}
              >
                <option value="1">1 Quantity</option>
                <option value="2">2 Quantity</option>
                <option value="3">3 Quantity</option>
                <option value="4">4 Quantity</option>
                <option value="5">5 Quantity</option>
              </Select>
              <Flex>
                {singleProduct?.shortDesc.split(" ").map((el, i) => {
                  if (i >= 1) {
                    return (
                      <Text
                        ml={"10px"}
                        key={i}
                        color="#212121"
                        lineHeight={"20px"}
                        fontWeight="400"
                        fontSize={"14px"}
                      >
                        {el}
                      </Text>
                    );
                  }
                })}
              </Flex>
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Button
                key={singleProduct?.id}
                onClick={() => handleCart(id)}
                bottom={"10"}
                position={"absolute"}
                w={"25%"}
                background={"#ff6f61"}
                color={"white"}
                _hover={{ backgroundColor: "#fa5344" }}
                _active={{ backgroundColor: "#fa5344" }}
          
                loadingText="ADDING..."
              >
                ADD TO CART
              </Button>
            </Flex>
          </Box>
        </Flex>
      </div>
    );
  }
 
export default SingleProd;
