export type Language = {
  name: string;
  aliases: string;
  area: string;
  detail: string;
};

// Names vary by community, orthography and source. This is a cultural introduction,
// not a speaker census or a statement of political boundaries.
const languages: Language[] = [
  { name: "Tyap", aliases: "Atyap / Kataf", area: "Zangon Kataf and neighbouring communities", detail: "A major language of the Atyap people, used in family life, cultural expression and community memory." },
  { name: "Bajju", aliases: "Kaje", area: "Zangon Kataf, Kachia and nearby areas", detail: "The language of the Bajju people; it is closely tied to local identity, oral tradition and the Afan cultural season." },
  { name: "Jju", aliases: "Kagoro / Oegworok", area: "Kaura area", detail: "Spoken by the Jju people around Kagoro. Indigenous names and spellings are important parts of language preservation." },
  { name: "Hyam", aliases: "Tuk-Ham / Jaba", area: "Jaba Local Government Area", detail: "The language associated with the Ham people, whose communities maintain strong traditions of storytelling, music and public celebration." },
  { name: "Adara", aliases: "Kadara", area: "Kajuru, Kachia and Chikun areas", detail: "A language of the Adara people. Community-led literacy and intergenerational use are central to keeping indigenous languages vibrant." },
  { name: "Anghan", aliases: "Nandu", area: "Kachia and neighbouring areas", detail: "Anghan is one of the many distinct languages that illustrates Southern Kaduna’s close-knit but diverse linguistic landscape." },
  { name: "Ikulu", aliases: "—", area: "Kauru area", detail: "An indigenous language represented in Kaduna’s language listings and an important marker of community heritage." },
  { name: "Ninzo", aliases: "Ningzom", area: "Kaura and nearby communities", detail: "The Ninzo language is part of the region’s rich Plateau-language heritage and is carried through everyday conversation and oral history." },
  { name: "Ninkyop", aliases: "—", area: "Jema’a and nearby areas", detail: "A local language associated with Ninkyop communities, contributing to the multilingual character of the Kafanchan–Jema’a area." },
  { name: "Numana", aliases: "Aninka", area: "Sanga and Jema’a areas", detail: "Numana is a community language of Southern Kaduna’s eastern corridor, where several languages are spoken in close proximity." },
  { name: "Atsam", aliases: "Chawai", area: "Kauru Local Government Area", detail: "Atsam is spoken by the Atsam people and is documented in language research as part of the region’s indigenous linguistic diversity." },
  { name: "Gwong", aliases: "Kagoma", area: "Jema’a and neighbouring areas", detail: "The Gwong language is associated with Kagoma communities and remains part of Southern Kaduna’s living oral heritage." },
  { name: "Fantswam", aliases: "Kafanchan", area: "Jema’a Local Government Area", detail: "Fantswam belongs to the cluster of languages associated with communities around Kafanchan and Jema’a." },
  { name: "Koro", aliases: "Koro Wachi", area: "Kagarko and adjoining communities", detail: "Koro varieties are spoken across central Nigeria; Koro Wachi is among the languages connected with Kaduna communities." },
  { name: "Asholio", aliases: "Moro’a / Marwa", area: "Kaura area", detail: "Asholio is an indigenous language of the Moro’a people. Its local name is a valued expression of community identity." },
  { name: "Ayu", aliases: "—", area: "Fadan Ayu and Kachia area", detail: "Ayu is a small Plateau language of Southern Kaduna. Small-language communities often face particular pressures in passing languages on to younger generations." },
  { name: "Kyoli", aliases: "Cori / Chori", area: "Jema’a and Kaura areas", detail: "Kyoli, also called Cori or Chori in some sources, is a Plateau language spoken in Southern Kaduna." },
  { name: "Mada", aliases: "—", area: "Southern Kaduna and neighbouring Nasarawa communities", detail: "Mada is a regionally important language with communities extending across state boundaries in Nigeria’s Middle Belt." },
  { name: "Ninzam", aliases: "Ninzom", area: "Kagarko and Kachia areas", detail: "Ninzam is among the languages listed for Kaduna and forms part of the region’s closely woven multilingual heritage." },
  { name: "Yeskwa", aliases: "Nyanpa", area: "Jema’a area", detail: "Yeskwa is associated with communities in the Jema’a axis and is one of many local languages that deserve visibility and documentation." },
  { name: "Kamantan", aliases: "—", area: "Kachia and nearby areas", detail: "Kamantan is represented in Kaduna language listings and reflects the remarkable variety found even between neighbouring communities." },
  { name: "Kurama", aliases: "Akurmi", area: "Lere and Kauru areas", detail: "Kurama, whose speakers may use the name Akurmi, connects communities in the wider Southern Kaduna cultural region." },
  { name: "Amo", aliases: "Timap", area: "Lere Local Government Area", detail: "Amo, also known as Timap in some references, is a Kainji language spoken in Kaduna State." },
  { name: "Gbagyi", aliases: "Gwari", area: "Kachia, Kagarko and wider central Nigeria", detail: "Gbagyi is widely spoken across central Nigeria, including communities connected to Southern Kaduna. It has several regional varieties." }
];

export default languages;
