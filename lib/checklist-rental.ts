/**
 * Checklist de vistoria para locação
 * Foco: estado de conservação, funcionamento, limpeza, danos, desgaste,
 * itens existentes, fotos e evidências para entrada/saída de locação.
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

export const INTERNAL_CHECKLIST: ChecklistSection[] = [
  {
    id: "general_state",
    title: "1. Estado geral do ambiente",
    tests: [
      { id: "cleanliness", description: "Ambiente limpo e em condições de uso", status: "pending", photos: [] },
      { id: "odor", description: "Sem odor forte, mofo ou mau cheiro", status: "pending", photos: [] },
      { id: "humidity_signs", description: "Sem sinais aparentes de umidade ou infiltração", status: "pending", photos: [] },
      { id: "visible_damage", description: "Sem danos aparentes não compatíveis com uso normal", status: "pending", photos: [] },
    ],
  },
  {
    id: "walls",
    title: "2. Paredes e pintura",
    tests: [
      { id: "paint_condition", description: "Pintura em bom estado de conservação", status: "pending", photos: [] },
      { id: "stains", description: "Sem manchas, marcas excessivas ou sujeira relevante", status: "pending", photos: [] },
      { id: "holes", description: "Sem furos, buchas, pregos ou danos não informados", status: "pending", photos: [] },
      { id: "cracks", description: "Sem trincas, fissuras ou rachaduras aparentes", status: "pending", photos: [] },
      { id: "peeling", description: "Sem bolhas, descascamento ou pintura soltando", status: "pending", photos: [] },
    ],
  },
  {
    id: "floor",
    title: "3. Piso, rodapés e soleiras",
    tests: [
      { id: "floor_condition", description: "Piso íntegro, limpo e conservado", status: "pending", photos: [] },
      { id: "broken_pieces", description: "Sem peças quebradas, trincadas, soltas ou ocas", status: "pending", photos: [] },
      { id: "scratches", description: "Sem riscos profundos, lascas ou manchas relevantes", status: "pending", photos: [] },
      { id: "baseboards", description: "Rodapés íntegros, fixos e sem partes soltas", status: "pending", photos: [] },
      { id: "thresholds", description: "Soleiras e acabamentos de transição íntegros", status: "pending", photos: [] },
    ],
  },
  {
    id: "ceiling",
    title: "4. Teto e forro",
    tests: [
      { id: "ceiling_paint", description: "Teto/forro com pintura em bom estado", status: "pending", photos: [] },
      { id: "ceiling_stains", description: "Sem manchas de infiltração ou umidade", status: "pending", photos: [] },
      { id: "ceiling_cracks", description: "Sem fissuras, trincas ou partes soltas", status: "pending", photos: [] },
      { id: "mold", description: "Sem mofo aparente", status: "pending", photos: [] },
    ],
  },
  {
    id: "doors",
    title: "5. Portas, batentes e fechaduras",
    tests: [
      { id: "door_condition", description: "Porta íntegra, sem danos, empeno ou lascas relevantes", status: "pending", photos: [] },
      { id: "door_operation", description: "Porta abre e fecha corretamente", status: "pending", photos: [] },
      { id: "lock_operation", description: "Fechadura, maçaneta e trinco funcionando", status: "pending", photos: [] },
      { id: "keys", description: "Chaves correspondentes funcionando", status: "pending", photos: [] },
      { id: "frame", description: "Batentes, guarnições e dobradiças firmes", status: "pending", photos: [] },
    ],
  },
  {
    id: "windows",
    title: "6. Janelas, vidros e persianas",
    tests: [
      { id: "window_operation", description: "Janelas abrem, fecham e travam corretamente", status: "pending", photos: [] },
      { id: "glass_condition", description: "Vidros íntegros, sem trincas ou quebras", status: "pending", photos: [] },
      { id: "locks", description: "Travas, fechos e puxadores funcionando", status: "pending", photos: [] },
      { id: "sealing", description: "Sem frestas, infiltração aparente ou vedação comprometida", status: "pending", photos: [] },
      { id: "blinds", description: "Persianas/cortinas existentes funcionando e conservadas", status: "pending", photos: [] },
    ],
  },
  {
    id: "electrical",
    title: "7. Elétrica, iluminação e tomadas",
    tests: [
      { id: "switches", description: "Interruptores funcionando", status: "pending", photos: [] },
      { id: "outlets", description: "Tomadas funcionando e com espelhos fixos", status: "pending", photos: [] },
      { id: "light_points", description: "Pontos de luz funcionando quando houver lâmpadas instaladas", status: "pending", photos: [] },
      { id: "fixtures", description: "Luminárias, plafons ou bocais existentes íntegros", status: "pending", photos: [] },
      { id: "breaker_panel", description: "Quadro de disjuntores acessível, identificado e sem dano aparente", status: "pending", photos: [] },
      { id: "exposed_wires", description: "Sem fios expostos ou sinais de risco elétrico", status: "pending", photos: [] },
    ],
  },
  {
    id: "hydraulic",
    title: "8. Hidráulica, torneiras e escoamento",
    tests: [
      { id: "water_flow", description: "Torneiras com funcionamento e vazão adequados", status: "pending", photos: [] },
      { id: "leaks", description: "Sem vazamentos aparentes em torneiras, registros ou conexões", status: "pending", photos: [] },
      { id: "drainage", description: "Ralos e escoamento funcionando sem retorno de água", status: "pending", photos: [] },
      { id: "siphon", description: "Sifões, flexíveis e válvulas sem vazamento aparente", status: "pending", photos: [] },
      { id: "registers", description: "Registros abrem e fecham corretamente", status: "pending", photos: [] },
    ],
  },
  {
    id: "bathroom_items",
    title: "9. Banheiro / área molhada",
    tests: [
      { id: "toilet", description: "Vaso sanitário íntegro, fixo e com descarga funcionando", status: "pending", photos: [] },
      { id: "sink", description: "Cuba/lavatório íntegro, fixo e sem vazamento", status: "pending", photos: [] },
      { id: "shower", description: "Chuveiro/ducha funcionando quando instalado", status: "pending", photos: [] },
      { id: "box", description: "Box, trilhos, roldanas e vidros íntegros quando houver", status: "pending", photos: [] },
      { id: "accessories", description: "Acessórios existentes íntegros: espelho, papeleira, toalheiro, saboneteira", status: "pending", photos: [] },
      { id: "grout_silicone", description: "Rejuntes e silicones sem falhas relevantes ou mofo excessivo", status: "pending", photos: [] },
    ],
  },
  {
    id: "kitchen_laundry",
    title: "10. Cozinha / lavanderia",
    tests: [
      { id: "sink_counter", description: "Bancada, pia e cuba íntegras e fixas", status: "pending", photos: [] },
      { id: "cabinetry", description: "Armários existentes íntegros, limpos e funcionando", status: "pending", photos: [] },
      { id: "doors_drawers", description: "Portas, gavetas, puxadores e dobradiças dos armários funcionando", status: "pending", photos: [] },
      { id: "tank", description: "Tanque existente íntegro, fixo e sem vazamento", status: "pending", photos: [] },
      { id: "machine_points", description: "Pontos de máquina de lavar/louça com conexão aparente em condições de uso", status: "pending", photos: [] },
      { id: "grease_dirt", description: "Sem gordura excessiva, sujeira pesada ou mau cheiro", status: "pending", photos: [] },
    ],
  },
  {
    id: "furniture_appliances",
    title: "11. Móveis, equipamentos e itens entregues",
    tests: [
      { id: "built_in_furniture", description: "Móveis planejados/embutidos íntegros e funcionando", status: "pending", photos: [] },
      { id: "appliances", description: "Equipamentos entregues existentes e em estado aparente de conservação", status: "pending", photos: [] },
      { id: "remote_controls", description: "Controles remotos, tags ou acessórios entregues conferidos", status: "pending", photos: [] },
      { id: "inventory", description: "Itens existentes no ambiente registrados por foto", status: "pending", photos: [] },
    ],
  },
  {
    id: "gas_exhaust",
    title: "12. Gás, exaustão e ventilação",
    tests: [
      { id: "gas_point", description: "Ponto de gás aparente em condição visual adequada", status: "pending", photos: [] },
      { id: "gas_smell", description: "Sem cheiro de gás no ambiente", status: "pending", photos: [] },
      { id: "ventilation", description: "Ventilação natural ou exaustão existente funcionando", status: "pending", photos: [] },
      { id: "exhaust_hood", description: "Coifa/exaustor existente em conservação aparente", status: "pending", photos: [] },
    ],
  },
  {
    id: "humidity_waterproofing",
    title: "13. Umidade, infiltração e estanqueidade visual",
    tests: [
      { id: "humidity_walls", description: "Sem sinais de umidade em paredes e rodapés", status: "pending", photos: [] },
      { id: "humidity_ceiling", description: "Sem sinais de infiltração no teto/forro", status: "pending", photos: [] },
      { id: "wet_area_test", description: "Teste simples de escoamento em áreas molhadas realizado quando aplicável", status: "pending", photos: [] },
      { id: "water_accumulation", description: "Sem acúmulo anormal de água em piso de área molhada", status: "pending", photos: [] },
    ],
  },
  {
    id: "final_record",
    title: "14. Registro final do cômodo",
    tests: [
      { id: "general_photo", description: "Foto geral do ambiente registrada", status: "pending", photos: [] },
      { id: "detail_photos", description: "Fotos de detalhes/danos relevantes registradas", status: "pending", photos: [] },
      { id: "condition_notes", description: "Observações do ambiente preenchidas quando houver ressalvas", status: "pending", photos: [] },
    ],
  },
];

export const EXTERNAL_CHECKLIST: ChecklistSection[] = [
  {
    id: "external_general_state",
    title: "1. Estado geral da área externa",
    tests: [
      { id: "cleanliness", description: "Área limpa e em condições de uso", status: "pending", photos: [] },
      { id: "debris", description: "Sem entulhos, lixo ou resíduos relevantes", status: "pending", photos: [] },
      { id: "visible_damage", description: "Sem danos aparentes não compatíveis com uso normal", status: "pending", photos: [] },
      { id: "safety", description: "Sem risco aparente de segurança ao uso", status: "pending", photos: [] },
    ],
  },
  {
    id: "facade_walls",
    title: "2. Fachada, muros e paredes externas",
    tests: [
      { id: "paint_condition", description: "Pintura/revestimento externo em estado adequado", status: "pending", photos: [] },
      { id: "cracks", description: "Sem trincas, fissuras ou rachaduras relevantes", status: "pending", photos: [] },
      { id: "stains", description: "Sem manchas relevantes de umidade, sujeira ou escorrimento", status: "pending", photos: [] },
      { id: "peeling", description: "Sem descascamento, bolhas ou partes soltas", status: "pending", photos: [] },
    ],
  },
  {
    id: "external_floor",
    title: "3. Piso externo, calçada e garagem",
    tests: [
      { id: "floor_condition", description: "Piso externo íntegro e limpo", status: "pending", photos: [] },
      { id: "broken_pieces", description: "Sem peças quebradas, trincadas ou soltas", status: "pending", photos: [] },
      { id: "slippery", description: "Sem condição aparente de escorregamento anormal", status: "pending", photos: [] },
      { id: "garage_floor", description: "Piso de garagem em estado adequado, sem manchas severas ou danos relevantes", status: "pending", photos: [] },
      { id: "water_accumulation", description: "Sem acúmulo anormal de água", status: "pending", photos: [] },
    ],
  },
  {
    id: "external_drainage",
    title: "4. Drenagem, ralos e escoamento",
    tests: [
      { id: "drains", description: "Ralos/grelhas existentes e desobstruídos", status: "pending", photos: [] },
      { id: "flow", description: "Escoamento visualmente adequado quando testado", status: "pending", photos: [] },
      { id: "gutters", description: "Calhas/condutores aparentes íntegros quando existirem", status: "pending", photos: [] },
      { id: "no_leaks", description: "Sem vazamentos aparentes em pontos externos", status: "pending", photos: [] },
    ],
  },
  {
    id: "gates_access",
    title: "5. Portões, grades e acessos",
    tests: [
      { id: "gate_operation", description: "Portões abrem, fecham e travam corretamente", status: "pending", photos: [] },
      { id: "automatic_gate", description: "Motor/controle de portão funcionando quando houver", status: "pending", photos: [] },
      { id: "locks", description: "Fechaduras, trincos, cadeados e travas funcionando", status: "pending", photos: [] },
      { id: "bars", description: "Grades, telas e proteções íntegras e fixas", status: "pending", photos: [] },
      { id: "intercom", description: "Interfone/campainha funcionando quando houver", status: "pending", photos: [] },
    ],
  },
  {
    id: "external_windows_doors",
    title: "6. Esquadrias externas",
    tests: [
      { id: "condition", description: "Portas/janelas externas conservadas e íntegras", status: "pending", photos: [] },
      { id: "operation", description: "Funcionamento adequado de abertura, fechamento e travamento", status: "pending", photos: [] },
      { id: "glass", description: "Vidros íntegros, sem trincas ou quebras", status: "pending", photos: [] },
      { id: "sealing", description: "Vedação aparente adequada contra chuva", status: "pending", photos: [] },
    ],
  },
  {
    id: "external_electrical",
    title: "7. Elétrica externa e iluminação",
    tests: [
      { id: "lighting", description: "Iluminação externa funcionando quando houver lâmpadas instaladas", status: "pending", photos: [] },
      { id: "outlets", description: "Tomadas externas funcionando e com proteção adequada quando aplicável", status: "pending", photos: [] },
      { id: "exposed_wires", description: "Sem fios expostos ou instalações aparentes em risco", status: "pending", photos: [] },
      { id: "sensors", description: "Sensores, refletores ou fotocélulas funcionando quando houver", status: "pending", photos: [] },
    ],
  },
  {
    id: "external_hydraulic",
    title: "8. Hidráulica externa",
    tests: [
      { id: "taps", description: "Torneiras externas funcionando e sem vazamento", status: "pending", photos: [] },
      { id: "hose_points", description: "Pontos de mangueira/jardim em condição de uso", status: "pending", photos: [] },
      { id: "water_tank", description: "Caixa d’água/abrigo visível sem sinais aparentes de dano ou vazamento", status: "pending", photos: [] },
      { id: "pool_water", description: "Piscina, ducha ou itens hidráulicos externos vistoriados quando houver", status: "pending", photos: [] },
    ],
  },
  {
    id: "roof_coverage",
    title: "9. Cobertura, telhado e beirais",
    tests: [
      { id: "visible_tiles", description: "Telhas/cobertura visualmente íntegras quando acessíveis", status: "pending", photos: [] },
      { id: "infiltration_signs", description: "Sem sinais aparentes de infiltração em beirais ou forros externos", status: "pending", photos: [] },
      { id: "gutters_condition", description: "Calhas e rufos aparentes íntegros quando existirem", status: "pending", photos: [] },
      { id: "access_safety", description: "Sem acesso inseguro ou risco aparente na cobertura vistoriada", status: "pending", photos: [] },
    ],
  },
  {
    id: "balcony_railing",
    title: "10. Sacada, varanda, guarda-corpo e corrimão",
    tests: [
      { id: "floor", description: "Piso da sacada/varanda íntegro e limpo", status: "pending", photos: [] },
      { id: "railing", description: "Guarda-corpo/corrimão firme, íntegro e sem folgas aparentes", status: "pending", photos: [] },
      { id: "glass_railing", description: "Vidros de guarda-corpo íntegros quando houver", status: "pending", photos: [] },
      { id: "drainage", description: "Ralo/escoamento da sacada funcionando quando aplicável", status: "pending", photos: [] },
    ],
  },
  {
    id: "garden_yard",
    title: "11. Quintal, jardim e áreas descobertas",
    tests: [
      { id: "yard_condition", description: "Quintal/jardim em estado adequado de conservação", status: "pending", photos: [] },
      { id: "vegetation", description: "Vegetação sem excesso que prejudique uso ou acesso", status: "pending", photos: [] },
      { id: "soil", description: "Sem erosões, buracos ou irregularidades relevantes", status: "pending", photos: [] },
      { id: "external_items", description: "Itens externos existentes registrados por foto", status: "pending", photos: [] },
    ],
  },
  {
    id: "leisure_items",
    title: "12. Área de lazer e equipamentos externos",
    tests: [
      { id: "barbecue", description: "Churrasqueira, bancada ou pia externa em conservação adequada", status: "pending", photos: [] },
      { id: "pool", description: "Piscina/SPA visualmente íntegra e registrada quando houver", status: "pending", photos: [] },
      { id: "playground", description: "Playground/equipamentos externos íntegros quando houver", status: "pending", photos: [] },
      { id: "furniture", description: "Móveis/equipamentos externos entregues registrados por foto", status: "pending", photos: [] },
    ],
  },
  {
    id: "external_final_record",
    title: "13. Registro final da área externa",
    tests: [
      { id: "general_photo", description: "Foto geral da área externa registrada", status: "pending", photos: [] },
      { id: "detail_photos", description: "Fotos de danos, desgastes ou ressalvas registradas", status: "pending", photos: [] },
      { id: "condition_notes", description: "Observações da área preenchidas quando houver ressalvas", status: "pending", photos: [] },
    ],
  },
];

export const SUGGESTED_ROOMS = [
  "Sala",
  "Sala de Estar",
  "Sala de Jantar",
  "Cozinha",
  "Copa",
  "Quarto",
  "Suíte",
  "Closet",
  "Banheiro",
  "Lavabo",
  "Lavanderia",
  "Área de Serviço",
  "Corredor",
  "Hall",
  "Varanda",
  "Sacada",
  "Escritório",
  "Despensa",
  "Depósito",
  "Garagem Interna",
  "Outro",
];

export const SUGGESTED_EXTERNAL_AREAS = [
  "Fachada Principal",
  "Fachada Lateral",
  "Fachada Posterior",
  "Entrada Social",
  "Portão / Acesso",
  "Garagem Externa",
  "Quintal",
  "Jardim",
  "Área Gourmet",
  "Churrasqueira",
  "Piscina",
  "Varanda Externa",
  "Sacada",
  "Terraço",
  "Cobertura",
  "Área de Serviço Externa",
  "Corredor Externo",
  "Outro",
];