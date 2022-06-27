import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    Box,
  } from "@chakra-ui/react"

interface ImageData {
  name: string,
  image: string
}

export interface FightData {
  id: number,
  time: number,
  weaving: DamageData
  misery: DamageData
}

export interface DamageData {
  totalDamage: number,
  damageDone: Record<string, number>
}

interface TableProps {
  fights: FightData[]
}

const ICONS: Record<number, ImageData> = {
  0: {name: "Trash", image: "./icons/sam.jpeg"},
  // Gruul / Mag
  649: {name: "High King Maulgar", image: "./icons/gruulmag/hkm.jpeg"},
  650: {name: "Gruul the Dragonkiller", image: "./icons/gruulmag/gruul.jpeg"},
  651: {name: "Magtheridon", image: "./icons/gruulmag/mag.jpeg"},
  // Serpentshrine Cavern
  623: {name: "Hydross the Unstable", image: "./icons/ssctk/hydross.jpeg"},
  624: {name: "The Lurker Below", image: "./icons/ssctk/lurker.jpeg"},
  625: {name: "Leotheras the Blind", image: "./icons/ssctk/leo.jpeg"},
  626: {name: "Fathom-Lord Karathress", image: "./icons/ssctk/flk.jpeg"},
  627: {name: "Morogrim Tidewalker", image: "./icons/ssctk/moro.jpeg"},
  628: {name: "Lady Vashj", image: "./icons/ssctk/vashj.jpeg"},
  // Tempest Keep
  730: {name: "Al'ar", image: "./icons/ssctk/alar.jpeg"},
  731: {name: "Void Reaver", image: "./icons/ssctk/vr.jpeg"},
  732: {name: "High Astromancer Solarian", image: "./icons/ssctk/solarian.jpeg"},
  733: {name: "Kaelthas Sunstrider", image: "./icons/ssctk/kt.jpeg"},
  // Black Temple
  601: {name: "High Warlord Naj'entus", image: "./icons/btmh/najentus.jpeg"},
  602: {name: "Supremus", image: "./icons/btmh/supremus.jpeg"},
  603: {name: "Shade of Akama", image: "./icons/btmh/akama.jpeg"},
  604: {name: "Teron Gorefiend", image: "./icons/btmh/teron.jpeg"},
  605: {name: "Gurtogg Bloodboil", image: "./icons/btmh/gurtogg.jpeg"},
  606: {name: "Reliquary of Souls", image: "./icons/btmh/reliquary.jpeg"},
  607: {name: "Mother Shahraz", image: "./icons/btmh/mother.jpeg"},
  608: {name: "The Illidari Council", image: "./icons/btmh/council.jpeg"},
  609: {name: "Illidan Stormrage", image: "./icons/btmh/illidan.jpeg"},
  // Mount Hyjal
  618: {name: "Rage Winterchill", image: "./icons/btmh/rage.jpeg"},
  619: {name: "Anetheron", image: "./icons/btmh/anetheron.jpeg"},
  620: {name: "Kaz'rogal", image: "./icons/btmh/kazrogal.jpeg"},
  621: {name: "Azgalor", image: "./icons/btmh/azgalor.jpeg"},
  622: {name: "Archimonde", image: "./icons/btmh/archi.jpeg"},
  // Sunwell Plateau
  724: {name: "Kalecgos", image: "./icons/swp/kale.jpeg"},
  725: {name: "Brutallus", image: "./icons/swp/brut.jpeg"},
  726: {name: "Felmyst", image: "./icons/swp/felmyst.jpeg"},
  727: {name: "Eredar Twins", image: "./icons/swp/twins.jpeg"},
  728: {name: "M'uru", image: "./icons/swp/muru.jpeg"},
  729: {name: "Kil'jaeden", image: "./icons/swp/kj.jpeg"},
  // Zul'Aman
  1189: {name: "Akil'zon", image:"./icons/za/akilzon.jpeg"},
  1190: {name: "Nalorakk", image:"./icons/za/nalorakk.jpeg"},
  1191: {name: "Jan'alai", image:"./icons/za/janalai.jpeg"},
  1192: {name: "Halazzi", image:"./icons/za/halazzi.jpeg"},
  1193: {name: "Hex Lord Malacrass", image:"./icons/za/hexlord.jpeg"},
  1194: {name: "Daakara", image:"./icons/za/daakara.jpeg"},
  // Karazhan
  652: {name: "Attumen the Huntsman", image:"./icons/kara/attumen.jpeg"},
  653: {name: "Moroes", image:"./icons/kara/moroes.jpeg"},
  654: {name: "Maiden of Virtue", image:"./icons/kara/maiden.jpeg"},
  655: {name: "Opera Hall", image:"./icons/kara/opera.jpeg"},
  656: {name: "The Curator", image:"./icons/kara/curator.jpeg"},
  657: {name: "Terestian Illhoof", image:"./icons/kara/terestian.jpeg"},
  658: {name: "Shade of Aran", image:"./icons/kara/shade.jpeg"},
  659: {name: "Netherspite", image:"./icons/kara/netherspite.jpeg"},
  661: {name: "Prince Malchezaar", image:"./icons/kara/prince.jpeg"},
  662: {name: "Nightbane", image:"./icons/kara/nightbane.jpeg"},
}

const columns: string[] = ["", "Fight", "Shadow Weaving DPS",
                          "Misery DPS", "Total DPS"]

function SPRow(fight: FightData) {
  if (fight.id === 660) { return }
  let wDPS = ((0.1/1.1)*1000*fight.weaving.totalDamage/fight.time)
  let mDPS = ((0.05/1.05)*1000*fight.misery.totalDamage/fight.time)
  let tDPS = wDPS + mDPS
  let iconInfo = ICONS[fight.id] || ICONS[0]

  return (<Tr key={fight.id}>
            <Td p={[1, 3]} textAlign="center" fontWeight="400">{iconInfo.name}</Td>
            <Td p={[1, 3]}><Box boxSize="50px"><Image border="1px solid #4A5568" src={iconInfo.image} /></Box></Td>
            <Td p={[1, 3]} textAlign="center">{wDPS.toFixed(0)}</Td>
            <Td p={[1, 3]} textAlign="center">{mDPS.toFixed(0)}</Td>
            <Td p={[1, 3]} textAlign="center">{tDPS.toFixed(0)}</Td>
          </Tr>)
}

export function SPTable(props: TableProps) {
      return(
        <Table border="2px solid #4A5568" variant="striped" fontSize="l">
          <Thead>
            <Tr key="titles">
              {columns.map((column, _) => <Th textAlign="center" fontSize={14} p={[1, 3]} key={column}>{column}</Th> )}
            </Tr>
          </Thead>
          <Tbody>
            {props.fights.sort((a,b) => a.id - b.id ).map((fight, i) => SPRow(fight))}
          </Tbody>
        </Table>
      )
}