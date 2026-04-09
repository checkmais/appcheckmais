/**
 * Estrutura de dados para o checklist de vistoria simples
 * Baseado no documento de checklist de entrega de chaves
 */

export type AreaType = "internal" | "external";
export type TestStatus = "pending" | "approved" | "rejected" | "na";

export interface TestItem {
  id: string;
  description: string;
  instruction?: string;
  status: TestStatus;
  photos: PhotoWithCaption[];
}

export interface PhotoWithCaption {
  id: string;
  uri: string;
  caption: string;
  timestamp: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  tests: TestItem[];
}

export interface RoomChecklist {
  id: string;
  roomName: string;
  areaType: AreaType;
  sections: ChecklistSection[];
  memorialAvailable: boolean;
  projectAvailable: boolean;
  overallStatus: "pending" | "approved" | "rejected";
  observations: string;
}

// Checklist para ÁREA INTERNA
export const INTERNAL_CHECKLIST: ChecklistSection[] = [
  {
    id: "dimensions",
    title: "1. Conferência de Dimensões",
    tests: [
      {
        id: "length",
        description: "Comprimento conforme projeto",
        instruction:
          "Compare o comprimento real do ambiente com a medida prevista no projeto ou memorial descritivo.",
        status: "pending",
        photos: [],
      },
      {
        id: "width",
        description: "Largura conforme projeto",
        instruction:
          "Compare a largura real do ambiente com a medida prevista no projeto ou memorial descritivo.",
        status: "pending",
        photos: [],
      },
      {
        id: "height",
        description: "Pé-direito conforme especificado",
        instruction:
          "Verifique se a altura do piso ao teto está compatível com a especificação prevista no projeto.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "walls",
    title: "2. Paredes e Revestimentos",
    tests: [
      {
        id: "type",
        description: "Tipo conforme memorial descritivo",
        instruction:
          "Verifique se o material e o acabamento executados correspondem ao previsto no memorial descritivo.",
        status: "pending",
        photos: [],
      },
      {
        id: "paint",
        description: "Pintura uniforme",
        instruction:
          "Observe se a pintura está homogênea, sem diferença de tonalidade, falhas, manchas ou marcas excessivas.",
        status: "pending",
        photos: [],
      },
      {
        id: "stains",
        description: "Sem manchas, bolhas ou descascamento",
        instruction:
          "Inspecione visualmente a superfície para identificar manchas, umidade, bolhas ou pintura soltando.",
        status: "pending",
        photos: [],
      },
      {
        id: "cracks",
        description: "Revestimentos sem trincas ou peças ocas",
        instruction:
          "Verifique se há fissuras, trincas ou peças cerâmicas com som oco ao toque.",
        status: "pending",
        photos: [],
      },
      {
        id: "grout",
        description: "Rejuntes uniformes",
        instruction:
          "Veja se os rejuntes estão preenchidos de forma contínua, sem falhas, buracos ou diferença excessiva.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "floors",
    title: "3. Pisos",
    tests: [
      {
        id: "type",
        description: "Tipo conforme memorial",
        instruction:
          "Confira se o piso executado corresponde ao material previsto no memorial descritivo.",
        status: "pending",
        photos: [],
      },
      {
        id: "level",
        description: "Nivelamento adequado",
        instruction:
          "Verifique se há desníveis, ressaltos ou irregularidades perceptíveis na superfície do piso.",
        status: "pending",
        photos: [],
      },
      {
        id: "loose",
        description: "Sem peças soltas ou ocas",
        instruction:
          "Bata levemente sobre as peças para identificar som oco, movimentação anormal ou desprendimento.",
        status: "pending",
        photos: [],
      },
      {
        id: "grout",
        description: "Rejuntes completos",
        instruction:
          "Verifique se os rejuntes estão íntegros, preenchidos e sem falhas visíveis.",
        status: "pending",
        photos: [],
      },
      {
        id: "slope",
        description: "Caimento adequado (áreas molhadas)",
        instruction:
          "Observe se a água escoa corretamente para o ralo, sem empoçamento ou retorno.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "ceiling",
    title: "4. Teto / Forro",
    tests: [
      {
        id: "type",
        description: "Tipo conforme memorial",
        instruction:
          "Confira se o forro ou acabamento do teto corresponde ao material especificado no memorial.",
        status: "pending",
        photos: [],
      },
      {
        id: "cracks",
        description: "Sem fissuras ou manchas",
        instruction:
          "Observe se existem fissuras, manchas de umidade, infiltração ou marcas de reparo.",
        status: "pending",
        photos: [],
      },
      {
        id: "level",
        description: "Nivelamento adequado",
        instruction:
          "Verifique se o teto ou forro apresenta alinhamento visual adequado, sem deformações ou ondulações.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "windows",
    title: "5. Esquadrias",
    tests: [
      {
        id: "type",
        description: "Tipo conforme memorial",
        instruction:
          "Confira se o modelo, material e acabamento das esquadrias correspondem ao memorial descritivo.",
        status: "pending",
        photos: [],
      },
      {
        id: "function",
        description: "Funcionamento adequado",
        instruction:
          "Abra e feche portas ou janelas verificando se o movimento ocorre sem travamentos ou esforço excessivo.",
        status: "pending",
        photos: [],
      },
      {
        id: "sealing",
        description: "Vedação correta",
        instruction:
          "Observe se há folgas, entrada de luz excessiva, falhas de vedação ou desalinhamentos.",
        status: "pending",
        photos: [],
      },
      {
        id: "glass",
        description: "Vidros íntegros",
        instruction:
          "Verifique se os vidros estão sem trincas, quebras, riscos excessivos ou mau encaixe.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "electrical",
    title: "6. Instalações Elétricas",
    tests: [
      {
        id: "points",
        description: "Pontos conforme projeto",
        instruction:
          "Confira se tomadas, interruptores e pontos de luz estão nas posições previstas no projeto.",
        status: "pending",
        photos: [],
      },
      {
        id: "outlets",
        description: "Tomadas funcionando",
        instruction:
          "Teste as tomadas com equipamento apropriado ou dispositivo simples para verificar funcionamento.",
        status: "pending",
        photos: [],
      },
      {
        id: "switches",
        description: "Interruptores funcionando",
        instruction:
          "Acione os interruptores e confira se comandam corretamente os pontos previstos.",
        status: "pending",
        photos: [],
      },
      {
        id: "finish",
        description: "Acabamentos fixos",
        instruction:
          "Observe se espelhos, acabamentos e suportes estão bem fixados, alinhados e sem folgas.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "hydraulic",
    title: "7. Instalações Hidráulicas",
    tests: [
      {
        id: "points",
        description: "Pontos conforme projeto",
        instruction:
          "Confira se os pontos hidráulicos estão na posição prevista e compatíveis com o projeto.",
        status: "pending",
        photos: [],
      },
      {
        id: "pressure",
        description: "Pressão adequada",
        instruction:
          "Abra os registros e verifique se a vazão e a pressão da água estão satisfatórias.",
        status: "pending",
        photos: [],
      },
      {
        id: "leaks",
        description: "Sem vazamentos",
        instruction:
          "Observe conexões, válvulas, sifões e louças para identificar gotejamento ou vazamentos.",
        status: "pending",
        photos: [],
      },
      {
        id: "drainage",
        description: "Escoamento adequado",
        instruction:
          "Teste o escoamento da água em pias, ralos e vasos para verificar lentidão ou retorno.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "fixtures",
    title: "8. Louças e Metais",
    tests: [
      {
        id: "type",
        description: "Tipo conforme memorial",
        instruction:
          "Confira se louças, metais e acessórios instalados correspondem ao especificado no memorial.",
        status: "pending",
        photos: [],
      },
      {
        id: "fixation",
        description: "Fixação adequada",
        instruction:
          "Verifique se as peças estão firmes, sem folgas, deslocamentos ou instabilidade.",
        status: "pending",
        photos: [],
      },
      {
        id: "function",
        description: "Funcionamento correto",
        instruction:
          "Acione torneiras, válvulas, chuveiros e descargas para confirmar o funcionamento adequado.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "waterproofing",
    title: "9. Impermeabilização (Indícios)",
    tests: [
      {
        id: "stains",
        description: "Sem manchas de umidade",
        instruction:
          "Observe paredes, pisos e rodapés para identificar sinais de umidade, escurecimento ou infiltração.",
        status: "pending",
        photos: [],
      },
      {
        id: "mold",
        description: "Sem mofo",
        instruction:
          "Verifique se existem manchas características de mofo, bolor ou odor persistente de umidade.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "sealing",
    title: "10. Vedações e Acabamentos",
    tests: [
      {
        id: "silicone",
        description: "Silicone adequado",
        instruction:
          "Confira se a aplicação do silicone está contínua, bem aderida e sem falhas aparentes.",
        status: "pending",
        photos: [],
      },
      {
        id: "failures",
        description: "Sem falhas",
        instruction:
          "Observe se existem frestas, aberturas, desprendimentos ou acabamento incompleto nas vedações.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "compliance",
    title: "11. Conformidade com Memorial",
    tests: [
      {
        id: "materials",
        description: "Materiais conferem",
        instruction:
          "Compare os materiais instalados com os previstos no memorial descritivo.",
        status: "pending",
        photos: [],
      },
      {
        id: "finishes",
        description: "Acabamentos conferem",
        instruction:
          "Verifique se os acabamentos executados correspondem ao padrão e à especificação definidos.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "cleaning",
    title: "12. Limpeza",
    tests: [
      {
        id: "clean",
        description: "Ambiente limpo",
        instruction:
          "Verifique se o ambiente foi entregue limpo, sem poeira excessiva, manchas ou sujeira acumulada.",
        status: "pending",
        photos: [],
      },
      {
        id: "debris",
        description: "Sem resíduos de obra",
        instruction:
          "Observe se há restos de materiais, entulho, embalagens, argamassa ou sujeira de obra no local.",
        status: "pending",
        photos: [],
      },
    ],
  },
];

// Checklist para ÁREA EXTERNA
export const EXTERNAL_CHECKLIST: ChecklistSection[] = [
  {
    id: "dimensions",
    title: "1. Conferência de Dimensões",
    tests: [
      {
        id: "measures",
        description: "Medidas conforme projeto",
        instruction:
          "Compare as medidas reais da área externa com aquelas previstas em projeto ou memorial.",
        status: "pending",
        photos: [],
      },
      {
        id: "area",
        description: "Área compatível",
        instruction:
          "Verifique se a área executada está compatível com a área indicada em projeto.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "floors",
    title: "2. Pisos Externos",
    tests: [
      {
        id: "type",
        description: "Tipo conforme memorial",
        instruction:
          "Confira se o tipo de piso aplicado corresponde ao material previsto no memorial.",
        status: "pending",
        photos: [],
      },
      {
        id: "level",
        description: "Nivelamento adequado",
        instruction:
          "Verifique se há desníveis, ressaltos ou irregularidades visíveis no piso externo.",
        status: "pending",
        photos: [],
      },
      {
        id: "loose",
        description: "Sem peças soltas",
        instruction:
          "Bata levemente sobre as peças para verificar se há som oco ou instabilidade.",
        status: "pending",
        photos: [],
      },
      {
        id: "grout",
        description: "Rejuntes completos",
        instruction:
          "Observe se os rejuntes estão preenchidos e sem falhas aparentes.",
        status: "pending",
        photos: [],
      },
      {
        id: "slope",
        description: "Caimento correto",
        instruction:
          "Verifique se o piso direciona corretamente a água para os pontos de drenagem, sem empoçamentos.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "drainage",
    title: "3. Drenagem",
    tests: [
      {
        id: "drains",
        description: "Ralos existentes",
        instruction:
          "Confirme a existência e localização dos ralos previstos para drenagem da área.",
        status: "pending",
        photos: [],
      },
      {
        id: "flow",
        description: "Escoamento adequado",
        instruction:
          "Teste ou observe se a água escoa adequadamente sem retorno ou lentidão excessiva.",
        status: "pending",
        photos: [],
      },
      {
        id: "water",
        description: "Sem acúmulo de água",
        instruction:
          "Observe se há pontos de empoçamento ou retenção de água após molhagem ou chuva.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "walls",
    title: "4. Paredes / Fachada",
    tests: [
      {
        id: "type",
        description: "Tipo conforme memorial",
        instruction:
          "Confira se o acabamento de fachada ou parede externa corresponde ao memorial descritivo.",
        status: "pending",
        photos: [],
      },
      {
        id: "cracks",
        description: "Sem fissuras",
        instruction:
          "Verifique a presença de fissuras, trincas ou patologias aparentes na superfície.",
        status: "pending",
        photos: [],
      },
      {
        id: "peeling",
        description: "Sem descascamento",
        instruction:
          "Observe se a pintura ou revestimento apresenta desprendimento, bolhas ou desgaste prematuro.",
        status: "pending",
        photos: [],
      },
      {
        id: "adhesion",
        description: "Boa aderência",
        instruction:
          "Verifique se o revestimento aparenta estar bem aderido, sem partes soltas ou ocas.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "roof",
    title: "5. Teto / Cobertura",
    tests: [
      {
        id: "type",
        description: "Tipo conforme memorial",
        instruction:
          "Confira se a cobertura, telha ou acabamento executado corresponde ao previsto.",
        status: "pending",
        photos: [],
      },
      {
        id: "infiltration",
        description: "Sem sinais de infiltração",
        instruction:
          "Observe manchas, umidade ou outros sinais que indiquem infiltração na cobertura.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "windows",
    title: "6. Esquadrias Externas",
    tests: [
      {
        id: "type",
        description: "Tipo conforme memorial",
        instruction:
          "Confira se o modelo e material das esquadrias externas correspondem ao memorial.",
        status: "pending",
        photos: [],
      },
      {
        id: "function",
        description: "Funcionamento adequado",
        instruction:
          "Abra e feche os elementos móveis para verificar travamento, alinhamento e esforço de operação.",
        status: "pending",
        photos: [],
      },
      {
        id: "sealing",
        description: "Vedação correta",
        instruction:
          "Observe se existem frestas, desalinhamento ou falhas de vedação contra água e vento.",
        status: "pending",
        photos: [],
      },
      {
        id: "glass",
        description: "Vidros íntegros",
        instruction:
          "Inspecione os vidros para identificar trincas, lascas, quebra ou falha de fixação.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "handrail",
    title: "7. Guarda-corpo / Corrimão",
    tests: [
      {
        id: "structure",
        description: "Estrutura firme",
        instruction:
          "Verifique se a estrutura está rígida, sem folgas, vibrações excessivas ou instabilidade.",
        status: "pending",
        photos: [],
      },
      {
        id: "height",
        description: "Altura adequada",
        instruction:
          "Confira visualmente se a altura atende ao padrão previsto em projeto ou norma aplicável.",
        status: "pending",
        photos: [],
      },
      {
        id: "fixation",
        description: "Fixação correta",
        instruction:
          "Observe se os pontos de fixação estão firmes, alinhados e sem sinais de soltura.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "electrical",
    title: "8. Instalações Elétricas",
    tests: [
      {
        id: "points",
        description: "Pontos conforme projeto",
        instruction:
          "Confira se os pontos elétricos externos estão nas posições previstas em projeto.",
        status: "pending",
        photos: [],
      },
      {
        id: "protection",
        description: "Proteção contra água",
        instruction:
          "Verifique se tomadas, luminárias e caixas externas possuem proteção adequada contra intempéries.",
        status: "pending",
        photos: [],
      },
      {
        id: "function",
        description: "Funcionamento adequado",
        instruction:
          "Teste o funcionamento dos pontos elétricos e equipamentos instalados na área externa.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "hydraulic",
    title: "9. Instalações Hidráulicas",
    tests: [
      {
        id: "points",
        description: "Pontos conforme projeto",
        instruction:
          "Confira se os pontos hidráulicos externos estão nas posições previstas no projeto.",
        status: "pending",
        photos: [],
      },
      {
        id: "leaks",
        description: "Sem vazamentos",
        instruction:
          "Observe registros, conexões e saídas para identificar vazamentos ou gotejamento.",
        status: "pending",
        photos: [],
      },
      {
        id: "function",
        description: "Funcionamento adequado",
        instruction:
          "Acione os pontos de uso para verificar vazão, pressão e desempenho adequado.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "waterproofing",
    title: "10. Impermeabilização",
    tests: [
      {
        id: "infiltration",
        description: "Sem infiltrações",
        instruction:
          "Verifique se existem sinais aparentes de infiltração em lajes, paredes ou áreas molhadas externas.",
        status: "pending",
        photos: [],
      },
      {
        id: "stains",
        description: "Sem manchas",
        instruction:
          "Observe se há manchas de umidade, bolor ou escurecimento em superfícies externas.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "joints",
    title: "11. Juntas e Dilatação",
    tests: [
      {
        id: "existing",
        description: "Existentes",
        instruction:
          "Verifique se as juntas previstas em projeto foram executadas e estão presentes nos pontos necessários.",
        status: "pending",
        photos: [],
      },
      {
        id: "integrity",
        description: "Íntegras",
        instruction:
          "Observe se as juntas estão preservadas, sem falhas, rompimentos ou selantes deteriorados.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "finishes",
    title: "12. Acabamentos",
    tests: [
      {
        id: "thresholds",
        description: "Soleiras e pingadeiras adequadas",
        instruction:
          "Confira se soleiras, peitoris e pingadeiras foram instalados corretamente e cumprem sua função.",
        status: "pending",
        photos: [],
      },
      {
        id: "general",
        description: "Acabamento geral conforme",
        instruction:
          "Avalie o padrão visual geral dos acabamentos, alinhamento e compatibilidade com o memorial.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "compliance",
    title: "13. Conformidade com Memorial",
    tests: [
      {
        id: "materials",
        description: "Materiais conferem",
        instruction:
          "Compare os materiais executados com os materiais previstos em memorial descritivo.",
        status: "pending",
        photos: [],
      },
      {
        id: "finishes",
        description: "Acabamentos conferem",
        instruction:
          "Verifique se os acabamentos executados estão compatíveis com o padrão definido.",
        status: "pending",
        photos: [],
      },
    ],
  },
  {
    id: "cleaning",
    title: "14. Limpeza",
    tests: [
      {
        id: "clean",
        description: "Área limpa",
        instruction:
          "Verifique se a área externa está limpa e sem sujeira acumulada.",
        status: "pending",
        photos: [],
      },
      {
        id: "debris",
        description: "Sem resíduos",
        instruction:
          "Observe se há restos de obra, embalagens, materiais soltos ou entulho no local.",
        status: "pending",
        photos: [],
      },
    ],
  },
];

/**
 * Sugestões de cômodos para área interna
 */
export const SUGGESTED_ROOMS = [
  "Sala de Estar",
  "Sala de Jantar",
  "Cozinha",
  "Quarto Principal",
  "Quarto Secundário",
  "Banheiro Principal",
  "Banheiro Secundário",
  "Lavanderia",
  "Corredor",
  "Varanda",
  "Garagem",
  "Outro",
];

/**
 * Sugestões de áreas externas
 */
export const SUGGESTED_EXTERNAL_AREAS = [
  "Fachada Principal",
  "Fachada Lateral",
  "Fachada Posterior",
  "Cobertura",
  "Terraço",
  "Sacada",
  "Garagem Externa",
  "Área de Serviço",
  "Outro",
];