export const EXERCISES = [
  {
    id: 1,
    title: "Divergent Tänkande",
    subtitle: "Alternativa Användningar",
    duration: 180,
    color: "from-violet-600 to-purple-700",
    bgGlow: "bg-violet-500/20",
    description:
      "Skriv så många alternativa användningar du kan komma på för objektet nedan. Ingen självcensur!",
    effect: "Ökar idégenereringshastighet, kreativ flyt och originalitet.",
    infoTitle: 'Divergent Tänkande – "Alternativa Användningar"',
    infoTime: "3 min",
    infoSections: [
      {
        heading: "Så gör du",
        text: "Välj ett vardagsföremål, t.ex. en sked, sten, plastpåse eller stol. Skriv ner så många olika sätt du kan använda det på under 3 minuter. Ingen idé är för konstig!",
      },
      {
        heading: "Exempel (sten)",
        text: "Dörrstopp, konstverk, vapen, värmelagring, papperstyngd, spelpjäs.",
      },
      {
        heading: "Vad det gör med hjärnan",
        items: [
          "Hjärnan tränas att generera många idéer snabbt.",
          "Du blir bättre på att tänka originellt.",
          "Du övar flexibilitet, alltså att se flera lösningar på samma sak.",
        ],
      },
      {
        heading: "Hjärnaktivitet",
        items: [
          "Dorsolaterala PFC: planerar och håller idéer i huvudet",
          "Default Mode Network (DMN): hjälper dig att tänka fritt och kreativt",
        ],
      },
      {
        heading: "Forskning",
        text: "Studier visar att den här typen av övning ökar både antalet idéer och hur ovanliga de är.",
      },
    ],
  },
  {
    id: 2,
    title: "Associativ Träning",
    subtitle: "Slumpkoppling",
    duration: 120,
    color: "from-cyan-600 to-blue-700",
    bgGlow: "bg-cyan-500/20",
    description:
      "Hitta minst 3 kreativa kopplingar mellan de två slumpmässiga orden nedan.",
    effect: "Stärker hjärnans associativa nätverk – centralt för kreativitet.",
    infoTitle: 'Associativ Träning – "Slumpkoppling"',
    infoTime: "2 min",
    infoSections: [
      {
        heading: "Så gör du",
        text: 'Välj två slumpmässiga ord, t.ex. "haj + bibliotek" eller "träd + internet". Skriv 3 sätt de kan hänga ihop på.',
      },
      {
        heading: "Exempel",
        text: "Haj + bibliotek → informationsrovdjur, tyst jakt, djup utforskning",
      },
      {
        heading: "Vad det gör med hjärnan",
        items: [
          "Hjälper hjärnan att koppla ihop saker som inte verkar höra ihop.",
          "Tränar flexibilitet och kreativitet.",
          "Gör det lättare att hitta nya, oväntade idéer.",
        ],
      },
      {
        heading: "Hjärnaktivitet",
        items: [
          "Temporala loben & associationsområden: hittar kopplingar mellan idéer",
          "Mediala PFC: ser samband mellan abstrakta idéer",
          "Hippocampus: skapar nya kopplingar i minnet",
          "Frontoparietala nätverk: bedömer vilka idéer som är användbara",
        ],
      },
      {
        heading: "Forskning",
        text: "Forskning visar att personer med starka associativa nätverk ofta är mer kreativa, och att träning med slumpkopplingar kan stärka dessa nätverk.",
      },
    ],
  },
  {
    id: 3,
    title: "Perspektivskifte",
    subtitle: "Nya Ögon",
    duration: 120,
    color: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/20",
    description:
      "Beskriv objektet/konceptet nedan från varje perspektiv. Tänk fritt!",
    effect: "Ökar kognitiv flexibilitet.",
    infoTitle: 'Perspektivskifte – "Nya Ögon"',
    infoTime: "2 min",
    infoSections: [
      {
        heading: "Så gör du",
        text: "Titta på ett objekt eller problem och föreställ dig hur olika personer eller varelser skulle se det: barn, ingenjör, artist eller till och med en utomjording.",
      },
      {
        heading: "Exempel (stol)",
        items: [
          "Barn: klätterställning",
          "Ingenjör: lastbärande struktur",
          "Artist: form och negativt utrymme",
        ],
      },
      {
        heading: "Vad det gör med hjärnan",
        items: [
          "Du tränar att tänka på flera sätt samtidigt.",
          "Det blir lättare att lösa problem på nya sätt.",
          "Du slipper fastna i gamla tankemönster.",
        ],
      },
      {
        heading: "Hjärnaktivitet",
        items: [
          "TPJ: ser saker ur andras perspektiv",
          "Mediala PFC: tänker abstrakt och blockerar gamla vanor",
          "ACC: märker konflikter mellan olika sätt att se på saken och hjälper dig byta perspektiv",
        ],
      },
      {
        heading: "Forskning",
        text: "Studier visar att träning i perspektivskifte ökar kreativitet och gör dig bättre på att hitta oväntade lösningar.",
      },
    ],
    prompts: [
      {
        object: "En stol",
        perspectives: ["🧒 Barn", "🔧 Ingenjör", "🎨 Artist", "👽 Utomjording"],
      },
      {
        object: "Regn",
        perspectives: ["🧒 Barn", "🌱 Bonde", "🎵 Musiker", "👽 Utomjording"],
      },
      {
        object: "En bro",
        perspectives: [
          "🧒 Barn",
          "📐 Arkitekt",
          "🧘 Filosof",
          "👽 Utomjording",
        ],
      },
      {
        object: "Tid",
        perspectives: ["🧒 Barn", "⚛️ Fysiker", "🎭 Poet", "👽 Utomjording"],
      },
      {
        object: "En dörr",
        perspectives: [
          "🧒 Barn",
          "🔒 Säkerhetsvakt",
          "🎨 Artist",
          "👽 Utomjording",
        ],
      },
      {
        object: "Mat",
        perspectives: [
          "🧒 Barn",
          "🔬 Kemist",
          "🌍 Antropolog",
          "👽 Utomjording",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Kreativ Designutmaning",
    subtitle: "Begränsad Innovation",
    duration: 180,
    color: "from-rose-600 to-pink-700",
    bgGlow: "bg-rose-500/20",
    description:
      "Designa en lösning utifrån objektet, begränsningen, kontexten, perspektivet och den kreativa twisten nedan.",
    effect:
      "Tränar förmågan att vara kreativ inom ramar – en nyckelkompetens för innovation.",
    infoTitle: 'Kreativ Designutmaning – "Begränsad Innovation"',
    infoTime: "3 min",
    infoSections: [
      {
        heading: "Så gör du",
        text: "Du får ett objekt, en begränsning, en kontext, ett perspektiv och en kreativ twist. Beskriv din designlösning utifrån alla dessa ramar. Ju mer oväntad lösning, desto bättre!",
      },
      {
        heading: "Exempel",
        text: "Objekt: paraply · Begränsning: utan elektricitet · Kontext: i en översvämning → Designa ett paraply som kan rädda människor i en översvämning utan elektricitet.",
      },
      {
        heading: "Vad det gör med hjärnan",
        items: [
          "Tränar dig att vara kreativ inom begränsningar.",
          "Stärker förmågan att kombinera flera krav till en lösning.",
          "Övar lateral tänkande – att hitta oväntade kopplingar.",
        ],
      },
      {
        heading: "Hjärnaktivitet",
        items: [
          "Dorsolaterala PFC: håller flera krav i arbetsminnet samtidigt",
          "Anteriora cingulate cortex: hanterar konflikter mellan begränsningar",
          "Default Mode Network: genererar kreativa lösningar",
        ],
      },
      {
        heading: "Forskning",
        text: "Forskning visar att begränsningar ofta ökar kreativiteten – de tvingar hjärnan att tänka utanför invanda mönster.",
      },
    ],
  },
  {
    id: 5,
    title: "Produktfusion",
    subtitle: "Kombinera & Skapa",
    duration: 180,
    color: "from-emerald-600 to-teal-700",
    bgGlow: "bg-emerald-500/20",
    description:
      "Kombinera de två orden nedan till en helt ny produkt. Beskriv vad den gör, hur den ser ut och varför någon skulle vilja ha den.",
    effect: "Stärker förmågan att kombinera koncept till nya innovationer.",
    infoTitle: 'Produktfusion – "Kombinera & Skapa"',
    infoTime: "3 min",
    infoSections: [
      {
        heading: "Så gör du",
        text: "Du får två slumpmässiga ord. Kombinera dem till en helt ny produkt eller uppfinning. Beskriv vad den gör, hur den fungerar och vem som skulle använda den.",
      },
      {
        heading: "Exempel",
        text: 'Lampa + Kudde → "SömnGlöd" – en kudde med inbyggt mjukt ljus som sakta tonar ner när du somnar och lyser upp när det är dags att vakna.',
      },
      {
        heading: "Vad det gör med hjärnan",
        items: [
          "Tränar konceptuell kombination – grunden för innovation.",
          "Stärker förmågan att se samband mellan helt olika saker.",
          "Övar att gå från abstrakt idé till konkret produkt.",
        ],
      },
      {
        heading: "Hjärnaktivitet",
        items: [
          "Temporala loben: hittar semantiska kopplingar mellan begrepp",
          "Prefrontala cortex: värderar och förfinar idéer",
          "Hippocampus: kombinerar minnen till nya konstellationer",
        ],
      },
      {
        heading: "Forskning",
        text: "Många av världens mest framgångsrika innovationer har kommit från att kombinera existerande koncept på nya sätt.",
      },
    ],
  },
];

export const motivations = [
  "Fantastiskt flöde!",
  "Kreativiteten sprutar!",
  "Vilken hjärna!",
  "Imponerande!",
  "Snyggt tänkt!",
  "Galet bra!",
];
