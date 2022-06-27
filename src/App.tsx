import {
  ChakraProvider,
  Flex,
  VStack,
  HStack,
  Button,
  Text,
  Link,
  Input,
  Image,
  extendTheme,
} from "@chakra-ui/react"

import { FightData, DamageData, SPTable } from "./SPTable"
import { useState } from "react"
import axios from "axios";

const API_URL = "https://sptoolapi.herokuapp.com"
const FOOTER_MESSAGE = "Note that stacking effects of misery and shadow weaving are not accounted for."
const VERSION = "1.0"
const SOURCE_LINK = "https://github.com/kuwarantine/sptool"

const INVALID_ERROR = "Invalid report URL or ID!"
const SERVER_ERROR = "Server error!"

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({config})

function emptyFights() {
  const wd: DamageData = {totalDamage: 0, damageDone: {}}
  const md: DamageData = {totalDamage: 0, damageDone: {}}
  const fight: FightData = {id: 0, time: 0, weaving: wd, misery: md}
  return [fight]
}

function extractId(text: string) {
  let id = text || "";

  if (id.startsWith("http")) {
    const match = id.match(/warcraftlogs\.com\/reports\/((?:a:)?[A-Za-z0-9]{16})/m)
    id = (match && match[1]) || "";
  } else if (!/^(?:a:)?[A-Za-z0-9]{16}$/.test(id)) {
    id = ""
  }

  return id
}

export function App() {
  const [reportField, setReportField] = useState("")
  const [fights, setFights] = useState(emptyFights())
  const [fetched, setFetched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const fetchReport = () => {
    const id = extractId(reportField)
    if (!id) { return }

    setLoading(true)
    axios.get(API_URL+"/report/"+id)
      .then(res => {
        setFights(res.data)
        setFetched(true)
        setLoading(false)
        setErrorMsg("")
      }).catch((error) => {
        if (error.response.status === 400) { setErrorMsg(INVALID_ERROR) }
        else { setErrorMsg(SERVER_ERROR) }
        setLoading(false)
      })
  }

  return(
    <ChakraProvider theme={theme}>
      <Flex p={3} w={["100%", "600px"]} direction="column" textAlign="center" m="0 auto" align="center">
        <VStack spacing={8} >
          <VStack fontSize={14}>
            <Text fontSize={24}>{"Shadow Priest Added DPS"}</Text>
            <Text>
              {"v"+VERSION+" — "}
              <Link href={SOURCE_LINK} target="_blank" _hover={{textDecoration: "none", color: "#4299E1"}}>
                <Image src="./github.png" display="inline" height="1em"/>
                {" GitHub"}
              </Link>
              {" — Made by Kuwarantine-Firemaw"}
            </Text> 
            <Text>{FOOTER_MESSAGE}</Text>
          </VStack>
          <HStack w="100%">
            <Input placeholder="Report URL or ID" value={reportField} onChange={e => setReportField(e.currentTarget.value)}/>
            <Button isLoading={loading} onClick={fetchReport}>Fetch</Button>
          </HStack>
          {errorMsg ? <Text>{errorMsg}</Text> : null}
          {fetched ? <SPTable fights={fights}/> : null}
        </VStack>
      </Flex>
    </ChakraProvider>)
}