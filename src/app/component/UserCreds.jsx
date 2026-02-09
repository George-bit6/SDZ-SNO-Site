import { VStack, Heading, Avatar} from "@chakra-ui/react"

const stackStyles = {

  height:"clamp(340px, 50vw, 600px)", 
  width:"full", 
  bg: "gray.900",
  justifyContent:"center",
  border: "xl",
  borderColor:"gray.900" 

}

const avatarStyles = {

  size:"2xl",
  color:"white",
  boxSize:"150px",
  borderRadius:"full",
  fit:"cover",
  variant:"outline"

}


export default function UserCreds({firstName = "unknown", lastName = "unknown", section = "unknown", color = "black"}){

  const fullName = firstName + " " + lastName;

    return  <VStack {...stackStyles}>
              <Avatar.Root {...avatarStyles}>
                <Avatar.Fallback fontSize={"6xl"}/>
              </Avatar.Root>
              <Heading size = "7xl" color="white"> {fullName}</Heading>          
              <Heading size = "6xl" color={color} fontWeight={"semibold"}> {section} </Heading>
            </VStack>
      
          
}