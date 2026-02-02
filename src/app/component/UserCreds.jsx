import { VStack, Avatar, Heading } from "@chakra-ui/react"

export default function UserCreds({firstName = "unknown", lastName = "unknown", section = "unknown", color = "black"}){

    return <VStack height={"240px"} width={"full"}  gap={"4"} justifyContent={"center"}>
          <Avatar.Root size="2xl" variant={"solid"}>
            <Avatar.Fallback  name={firstName + " " + lastName}/>
          </Avatar.Root >
          <Heading size = "3xl"> {firstName + " " + lastName}</Heading>          
          <Heading size = "2xl" color={color} fontWeight={"semibold"}> {section} </Heading>
        </VStack>

}