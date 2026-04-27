export type AreaType = "internal" | "external";
export type TestStatus = "pending" | "approved" | "rejected" | "na";
export type SeverityLevel = "" | "low" | "medium" | "high";

export interface PhotoWithCaption {
  id: string;
  uri: string;
  caption: string;
  timestamp: string;
}

export interface ObjectiveCriteria {
  approved: string;
  rejected: string;
  na: string;
}

export interface CriticalityLevel {
  label: string;
  reportText: string;
}

export interface CriticalityMap {
  low: CriticalityLevel;
  medium: CriticalityLevel;
  high: CriticalityLevel;
}

export interface TechnicalTestItem {
  id: string;
  description: string;
  instruction?: string;
  practicalDescription?: string;
  stepByStep?: string[];
  objectiveCriteria?: ObjectiveCriteria;
  technicalBasis?: string[];
  criticality?: CriticalityMap;
  status: TestStatus;
  severity?: SeverityLevel;
  photos: PhotoWithCaption[];
}

export interface ChecklistSection {
  id: string;
  title: string;
  tests: TechnicalTestItem[];
}

export const INTERNAL_CHECKLIST: ChecklistSection[] = [
  {
    id: "dimensions",
    title: "1. Conferência de Dimensões",
    tests: [
      {
        id: "length",
        description: "Comprimento conforme projeto",
        instruction:
          "Meça com trena ou laser e compare com a referência técnica disponível.",
        practicalDescription:
          "Comparar o comprimento real do ambiente com a medida prevista no projeto, croqui, memorial descritivo ou outra referência técnica disponível.",
        stepByStep: [
          "Medir o comprimento do ambiente com trena metálica ou medidor a laser, entre faces acabadas.",
          "Repetir a medição em pelo menos dois pontos para confirmar o valor obtido.",
          "Consultar a medida correspondente no projeto, memorial descritivo ou croqui aprovado.",
          "Comparar a medida real com a referência documental.",
          "Registrar a diferença encontrada em milímetros.",
        ],
        objectiveCriteria: {
          approved: "Diferença menor ou igual a 10 mm.",
          rejected: "Diferença superior a 10 mm.",
          na: "Quando não houver projeto, memorial ou outra referência técnica confiável para comparação.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — Edificações habitacionais — Desempenho.",
          "Projeto executivo, memorial descritivo e documentação técnica da obra.",
          "A compatibilidade dimensional entre o projetado e o executado influencia diretamente o desempenho funcional do ambiente, o encaixe de mobiliário, a instalação de esquadrias, acabamentos e a própria percepção de qualidade da execução.",
        ],
        criticality: {
          low: {
            label: "Diferença entre 11 mm e 20 mm.",
            reportText:
              "Divergência dimensional pequena, ainda próxima da tolerância prática de execução. Em geral, não inviabiliza o uso imediato do ambiente, mas já indica perda de precisão executiva e pode gerar pequenos ajustes em marcenaria, rodapés, paginação de revestimentos ou mobiliário planejado.",
          },
          medium: {
            label: "Diferença entre 21 mm e 30 mm.",
            reportText:
              "Divergência dimensional relevante, acima do esperado para uma entrega técnica controlada. Pode comprometer a compatibilização com móveis, nichos, bancadas, paginação de acabamento e áreas mínimas de circulação, representando perda perceptível de desempenho funcional.",
          },
          high: {
            label: "Diferença superior a 30 mm.",
            reportText:
              "Divergência acentuada em relação à referência de projeto. Indica não conformidade executiva importante, com potencial de comprometer funcionalidade, compatibilização com sistemas construtivos e aderência ao escopo técnico contratado, justificando tratativa corretiva prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "width",
        description: "Largura conforme projeto",
        instruction: "Meça a largura útil e compare com projeto ou memorial.",
        practicalDescription:
          "Comparar a largura real do ambiente com a medida prevista na documentação técnica.",
        stepByStep: [
          "Medir a largura útil do ambiente entre as faces acabadas.",
          "Repetir a medição em pelo menos dois pontos, principalmente quando houver suspeita de desalinhamento.",
          "Conferir a largura prevista no projeto ou memorial.",
          "Comparar o valor medido com a referência documental.",
          "Registrar a diferença em milímetros.",
        ],
        objectiveCriteria: {
          approved: "Diferença menor ou igual a 10 mm.",
          rejected: "Diferença superior a 10 mm.",
          na: "Ausência de referência técnica confiável.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — Desempenho das edificações habitacionais.",
          "Projeto executivo e memorial descritivo.",
          "A largura do ambiente interfere em acessibilidade interna, circulação, aproveitamento do espaço e instalação de móveis e equipamentos.",
        ],
        criticality: {
          low: {
            label: "Diferença entre 11 mm e 20 mm.",
            reportText:
              "Pequena diferença em relação ao projeto, normalmente sem impedir o uso do ambiente, porém já fora do padrão técnico ideal de execução e com potencial para ajustes pontuais de acabamento.",
          },
          medium: {
            label: "Diferença entre 21 mm e 30 mm.",
            reportText:
              "Diferença perceptível que pode impactar circulação, posicionamento de mobiliário e alinhamento com elementos de marcenaria ou divisórias, indicando desvio funcional moderado.",
          },
          high: {
            label: "Diferença superior a 30 mm.",
            reportText:
              "Diferença significativa com potencial para comprometer o uso adequado do ambiente, a compatibilização com o projeto e a qualidade técnica global da execução.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "height",
        description: "Pé-direito conforme especificado",
        instruction:
          "Meça do piso acabado ao teto acabado e compare com a referência.",
        practicalDescription:
          "Verificar se a altura do piso acabado ao teto acabado está compatível com o previsto em projeto ou memorial.",
        stepByStep: [
          "Medir a altura do piso acabado até o teto acabado com trena ou medidor a laser.",
          "Repetir a medição em pelo menos dois pontos do ambiente.",
          "Verificar a existência de variações localizadas provocadas por forro, vigas aparentes ou rebaixos.",
          "Comparar o valor obtido com a referência documental.",
          "Registrar a diferença em milímetros.",
        ],
        objectiveCriteria: {
          approved: "Diferença menor ou igual a 10 mm.",
          rejected: "Diferença superior a 10 mm.",
          na: "Ausência de referência documental válida.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — Desempenho.",
          "Projeto executivo, memorial descritivo e solução de forro adotada.",
          "O pé-direito interfere em conforto ambiental, ventilação, percepção espacial, compatibilização com esquadrias, marcenaria e instalações aparentes.",
        ],
        criticality: {
          low: {
            label: "Diferença entre 11 mm e 20 mm.",
            reportText:
              "Diferença pequena, normalmente sem impacto relevante imediato no uso do ambiente, mas já caracterizando execução fora do padrão previsto.",
          },
          medium: {
            label: "Diferença entre 21 mm e 30 mm.",
            reportText:
              "Diferença suficiente para alterar a percepção do ambiente e interferir em forros, armários altos, ventilação e composição visual do espaço.",
          },
          high: {
            label: "Diferença superior a 30 mm.",
            reportText:
              "Diferença importante, com potencial de comprometer compatibilização com os demais sistemas e descaracterizar o padrão técnico e funcional previsto no projeto.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "squareness",
        description: "Esquadro do ambiente",
        instruction:
          "Compare diagonais ou confira cantos para identificar desalinhamento geométrico.",
        practicalDescription:
          "Verificar se o ambiente está geometricamente compatível com o esquadro previsto, utilizando comparação entre diagonais ou aferição direta de cantos.",
        stepByStep: [
          "Medir as diagonais do ambiente com trena ou medidor a laser, quando a geometria permitir.",
          "Comparar os valores obtidos entre si.",
          "Quando necessário, conferir cantos com esquadro ou medição de triângulo de referência.",
          "Avaliar desalinhamentos aparentes em paredes, paginação de piso e encontro de elementos fixos.",
          "Registrar a diferença entre diagonais em milímetros.",
        ],
        objectiveCriteria: {
          approved:
            "Diferença entre diagonais menor ou igual a 10 mm em ambientes pequenos e médios.",
          rejected:
            "Diferença entre diagonais superior a 10 mm ou desalinhamento incompatível com a execução prevista.",
          na: "Quando a geometria do ambiente não permitir a aferição com confiabilidade.",
        },
        technicalBasis: [
          "Projeto executivo, paginação de acabamentos e boas práticas de controle geométrico da execução.",
          "Na ausência de um valor normativo único aplicável a todos os casos, prevalece a compatibilidade geométrica necessária para o desempenho funcional e o correto assentamento de revestimentos, esquadrias e mobiliário.",
        ],
        criticality: {
          low: {
            label: "Diferença entre 11 mm e 20 mm.",
            reportText:
              "Desvio de esquadro pequeno, muitas vezes perceptível apenas em medições de conferência ou em paginações mais sensíveis. Pode exigir pequenos ajustes de acabamento.",
          },
          medium: {
            label: "Diferença entre 21 mm e 30 mm.",
            reportText:
              "Desvio perceptível com potencial para comprometer paginação de pisos e revestimentos, instalação de portas, rodapés, armários e demais elementos lineares.",
          },
          high: {
            label: "Diferença superior a 30 mm.",
            reportText:
              "Desvio geométrico importante, com impacto direto na funcionalidade do ambiente, na execução de acabamentos e na aderência ao padrão técnico do projeto.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
    ],
  },
  {
    id: "walls",
    title: "2. Paredes e Revestimentos",
    tests: [
      {
        id: "cracks",
        description: "Fissuras em paredes internas",
        instruction:
          "Inspecione visualmente, meça a abertura quando possível e registre padrão e localização.",
        practicalDescription:
          "Verificar a presença de fissuras ou trincas nas paredes internas e avaliar seu potencial de risco para durabilidade, estanqueidade e estabilidade aparente do sistema.",
        stepByStep: [
          "Inspecionar visualmente toda a superfície da parede, inclusive cantos, vergas, encontros com lajes e regiões próximas a esquadrias.",
          "Identificar fissuras, trincas ou aberturas lineares visíveis.",
          "Observar direção predominante da fissura: vertical, horizontal, diagonal ou mapeada.",
          "Medir a abertura com régua milimetrada ou fissurômetro, quando possível.",
          "Verificar se o padrão se repete em outros pontos do ambiente.",
          "Observar presença de umidade, eflorescência, destacamento de pintura ou deformações associadas.",
          "Registrar localização, extensão aproximada e abertura observada.",
        ],
        objectiveCriteria: {
          approved:
            "Ausência de fissuras ou apenas microfissuras superficiais menores ou iguais a 0,3 mm, sem repetição relevante e sem infiltração associada.",
          rejected:
            "Fissuras visíveis superiores a 0,3 mm, trincas, padrão repetitivo, associação com umidade ou indício de movimentação do sistema.",
          na: "Quando a superfície estiver encoberta, inacessível ou impossibilitada de avaliação confiável.",
        },
        technicalBasis: [
          "ABNT NBR 6118 — Estruturas de concreto — controle de fissuração.",
          "ABNT NBR 15575 — Desempenho — estanqueidade e durabilidade.",
          "Segundo a NBR 6118, fissuras com pequenas aberturas podem ser toleráveis dentro de limites de durabilidade e exposição. Acima desses limites, cresce o risco de entrada de água e agentes agressivos, com perda de desempenho e redução de vida útil do sistema.",
        ],
        criticality: {
          low: {
            label: "Fissuras entre 0,3 mm e 0,5 mm.",
            reportText:
              "Não conformidade de baixa criticidade, geralmente associada a retração, acomodação ou movimentações pequenas do sistema. Ainda que não indique, por si só, falha estrutural, já pode comprometer acabamento e iniciar trajetos para infiltração superficial, merecendo correção e monitoramento.",
          },
          medium: {
            label:
              "Fissuras entre 0,5 mm e 1,0 mm ou repetição do padrão em vários pontos.",
            reportText:
              "Faixa que já indica perda mais perceptível de desempenho do sistema de vedação, com maior potencial de infiltração, desprendimento de acabamento e redução da durabilidade, em linha com os critérios de desempenho e estanqueidade da NBR 15575.",
          },
          high: {
            label:
              "Fissuras superiores a 1,0 mm, trincas abertas, padrão diagonal relevante, deformação associada ou infiltração ativa.",
            reportText:
              "Configuração compatível com não conformidade de alta criticidade. Pode indicar movimentação estrutural, recalque, falha de interface entre elementos ou perda significativa de desempenho, exigindo análise prioritária e providência corretiva específica.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "flatness",
        description: "Planicidade da parede/revestimento",
        instruction:
          "Use régua de 2,0 m para conferir empenos e irregularidades.",
        practicalDescription:
          "Verificar se a superfície da parede ou do revestimento apresenta irregularidades que comprometam alinhamento, acabamento e qualidade visual do ambiente.",
        stepByStep: [
          "Posicionar régua de alumínio de aproximadamente 2,0 m em diferentes pontos da parede ou do revestimento.",
          "Observar vãos entre a régua e a superfície.",
          "Aferir as maiores irregularidades visíveis com cunha, escala ou régua milimetrada, quando possível.",
          "Verificar se a irregularidade é pontual ou recorrente em vários trechos.",
          "Registrar a maior diferença observada.",
        ],
        objectiveCriteria: {
          approved:
            "Irregularidade menor ou igual a 3 mm sob régua de 2,0 m.",
          rejected: "Irregularidade superior a 3 mm sob régua de 2,0 m.",
          na: "Quando a superfície não estiver acessível para aferição.",
        },
        technicalBasis: [
          "ABNT NBR 13749 — Revestimento de paredes e tetos com argamassas inorgânicas.",
          "ABNT NBR 15575 — Desempenho e qualidade funcional do acabamento.",
          "A planicidade adequada é necessária para bom desempenho estético, correta instalação de esquadrias, marcenaria, louças, metais e demais elementos fixados à parede.",
        ],
        criticality: {
          low: {
            label: "Irregularidade entre 3 mm e 5 mm.",
            reportText:
              "Pequena perda de planicidade, predominantemente estética, sem impacto funcional importante na maioria dos casos, porém fora do padrão técnico desejável.",
          },
          medium: {
            label: "Irregularidade entre 5 mm e 10 mm.",
            reportText:
              "Perda de planicidade perceptível, com potencial de prejudicar acabamento, assentamento de peças, alinhamento visual e instalação de elementos fixos.",
          },
          high: {
            label: "Irregularidade superior a 10 mm.",
            reportText:
              "Não conformidade severa, com comprometimento claro do padrão executivo e potencial para gerar falhas de funcionalidade, incompatibilidade com sistemas e necessidade de correção mais ampla.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "adhesion",
        description: "Aderência do revestimento (som cavo)",
        instruction:
          "Faça percussão leve e identifique som cavo, estufamento ou desprendimento.",
        practicalDescription:
          "Verificar se o revestimento está adequadamente aderido ao substrato, sem áreas ocas ou com risco de destacamento.",
        stepByStep: [
          "Realizar percussão leve e sistemática com cabo de ferramenta ou outro meio adequado, sem provocar dano ao revestimento.",
          "Identificar diferenças sonoras entre regiões com som firme e regiões com som cavo.",
          "Delimitar a área comprometida, quando possível.",
          "Verificar se há fissuras, estufamento, desplacamento ou destacamento associado.",
          "Registrar a área aproximada afetada.",
        ],
        objectiveCriteria: {
          approved:
            "Ausência de som cavo relevante ou presença apenas pontual sem perda funcional perceptível.",
          rejected:
            "Presença de som cavo em área perceptível, áreas concentradas ou indício de desprendimento.",
          na: "Quando não houver revestimento aderido passível desse tipo de verificação.",
        },
        technicalBasis: [
          "ABNT NBR 13755 — Revestimento cerâmico de fachadas e paredes com placas cerâmicas e com utilização de argamassa colante.",
          "Boas práticas de inspeção de revestimentos aderidos.",
          "A aderência insuficiente do revestimento compromete segurança, durabilidade e desempenho do sistema, podendo evoluir para destacamento parcial ou total.",
        ],
        criticality: {
          low: {
            label: "Som cavo em ponto isolado de pequena extensão.",
            reportText:
              "Não conformidade localizada, ainda sem evidência de desprendimento iminente, mas já indicativa de perda parcial de aderência e necessidade de correção preventiva.",
          },
          medium: {
            label:
              "Som cavo em área localizada relevante ou em vários pontos do mesmo pano.",
            reportText:
              "Situação que já revela perda mais significativa de aderência, com potencial de evolução para fissuração, destacamento de placas e necessidade de intervenção corretiva dirigida.",
          },
          high: {
            label:
              "Som cavo extenso, estufamento, peças soltas ou risco de queda.",
            reportText:
              "Configuração de alta criticidade, por comprometer a integridade do sistema de revestimento e representar risco de desprendimento, perda de desempenho e necessidade de ação prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "wall-grout",
        description: "Rejuntes íntegros",
        practicalDescription:
          "Verificar se os rejuntes estão contínuos, bem preenchidos e sem falhas que favoreçam perda de estanqueidade ou destacamento das peças.",
        stepByStep: [
          "Inspecionar visualmente as juntas entre peças do revestimento.",
          "Verificar falhas de preenchimento, retrações, fissuras, perda de material ou desagregação.",
          "Observar se as falhas são isoladas ou recorrentes.",
          "Registrar os trechos comprometidos.",
        ],
        objectiveCriteria: {
          approved:
            "Juntas contínuas, preenchidas e sem falhas relevantes.",
          rejected:
            "Juntas com vazios, fissuras, perda de material ou descontinuidade perceptível.",
          na: "Quando não houver rejunte aplicável ao sistema.",
        },
        technicalBasis: [
          "ABNT NBR 13755 — sistema de revestimento cerâmico.",
          "ABNT NBR 15575 — estanqueidade e durabilidade.",
          "O rejunte participa do desempenho do conjunto, reduz a penetração de água e contribui para a estabilidade superficial do sistema revestido.",
        ],
        criticality: {
          low: {
            label: "Falhas pequenas e pontuais.",
            reportText:
              "Perda localizada de material, ainda sem reflexo importante no desempenho global do sistema, porém já exigindo reparo para evitar evolução.",
          },
          medium: {
            label: "Falhas repetidas em vários trechos.",
            reportText:
              "Não conformidade que já compromete parte da estanqueidade e da qualidade de acabamento, podendo facilitar infiltração e desgaste prematuro.",
          },
          high: {
            label:
              "Falhas extensas, ausência significativa de rejunte ou associação com destacamento/infiltração.",
            reportText:
              "Perda relevante do desempenho do sistema, com comprometimento funcional e maior probabilidade de patologias associadas, justificando intervenção prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "paint-uniformity",
        description: "Pintura uniforme e sem patologias aparentes",
        practicalDescription:
          "Verificar se a pintura apresenta uniformidade visual e ausência de defeitos que indiquem falha de preparo, umidade ou perda de aderência.",
        stepByStep: [
          "Observar a superfície com iluminação adequada, preferencialmente natural e artificial.",
          "Identificar diferenças de tonalidade, manchas, escorridos, bolhas, descascamentos ou empolamentos.",
          "Verificar se as falhas estão associadas a umidade, fissuras ou má preparação da base.",
          "Registrar os pontos comprometidos.",
        ],
        objectiveCriteria: {
          approved:
            "Superfície com aparência uniforme, sem falhas relevantes visíveis.",
          rejected:
            "Presença de manchas, descascamento, bolhas, escorridos ou falhas perceptíveis de acabamento.",
          na: "Quando não houver pintura ou a superfície não fizer parte do escopo.",
        },
        technicalBasis: [
          "Memorial descritivo, padrão de acabamento contratado e boas práticas de inspeção técnica.",
          "ABNT NBR 15575 — desempenho e durabilidade do acabamento, quando a falha afetar proteção e estanqueidade do sistema.",
          "Embora a aceitação visual dependa do padrão contratado, falhas de pintura podem revelar defeitos executivos ou patologias subjacentes.",
        ],
        criticality: {
          low: {
            label: "Falha estética pontual.",
            reportText:
              "Não conformidade de caráter predominantemente visual, sem evidência de perda funcional relevante, mas fora do padrão de acabamento esperado.",
          },
          medium: {
            label: "Falhas espalhadas ou repetitivas.",
            reportText:
              "Compromete a qualidade visual do ambiente e pode indicar deficiência de preparo da base ou início de perda de aderência do sistema de pintura.",
          },
          high: {
            label:
              "Bolhas, descascamento acentuado ou associação com umidade ativa.",
            reportText:
              "Indica perda importante do acabamento e possível patologia associada, com reflexo em durabilidade, proteção superficial e necessidade de investigação complementar.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
    ],
  },

  {
    id: "floors",
    title: "3. Pisos",
    tests: [
      {
        id: "level",
        description: "Nivelamento do piso",
        instruction:
          "Use régua e caminhe pelo ambiente para identificar desníveis relevantes.",
        practicalDescription:
          "Verificar se o piso apresenta desníveis ou deformações que comprometam segurança, acabamento e funcionalidade do ambiente.",
        stepByStep: [
          "Posicionar régua metálica ou nível em diferentes pontos do piso.",
          "Observar a existência de frestas ou descontinuidades sob a régua.",
          "Caminhar pelo ambiente para identificar desníveis perceptíveis ao uso.",
          "Verificar se o desnível interfere em portas, rodapés, mobiliário ou transição entre ambientes.",
          "Registrar os pontos críticos e a maior irregularidade percebida.",
        ],
        objectiveCriteria: {
          approved:
            "Ausência de desnível perceptível relevante e irregularidades dentro do padrão técnico do acabamento.",
          rejected:
            "Desnível perceptível ao caminhar, irregularidade visível ou interferência funcional no uso do ambiente.",
          na: "Quando o piso ainda não estiver acabado ou não puder ser avaliado.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — desempenho funcional e segurança de uso.",
          "Critérios executivos do sistema de piso adotado.",
          "O nivelamento influencia diretamente segurança, conforto ao caminhar, correta instalação de móveis, fechamento de portas e escoamento em áreas molhadas.",
        ],
        criticality: {
          low: {
            label: "Desnível leve, predominantemente estético.",
            reportText:
              "Pequena irregularidade, percebida em conferência técnica ou em inspeção mais atenta, sem impacto relevante imediato na segurança ou no uso.",
          },
          medium: {
            label: "Desnível perceptível com interferência funcional moderada.",
            reportText:
              "Pode afetar circulação, instalação de mobiliário, encontro com rodapés e percepção de qualidade da execução, caracterizando perda funcional parcial.",
          },
          high: {
            label:
              "Desnível importante, risco de tropeço ou interferência acentuada no uso.",
            reportText:
              "Não conformidade de alta criticidade, por comprometer segurança de uso e desempenho funcional do ambiente, justificando correção prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "slope",
        description: "Caimento adequado em áreas molhadas",
        instruction:
          "Lance água e verifique o direcionamento ao ralo, sem poças.",
        practicalDescription:
          "Verificar se o piso direciona a água adequadamente para o ralo, sem retenções incompatíveis com o uso previsto.",
        stepByStep: [
          "Lançar pequena quantidade de água em pontos representativos da área molhada.",
          "Observar a direção do escoamento.",
          "Verificar se a água se desloca para o ralo sem estagnação relevante.",
          "Identificar formação de poças ou escoamento em sentido inadequado.",
          "Registrar os pontos de retenção.",
        ],
        objectiveCriteria: {
          approved:
            "Água escoa adequadamente para o ralo, sem formação de poças relevantes após o teste.",
          rejected:
            "Água permanece retida, forma poças ou escoa em direção incompatível com o ralo.",
          na: "Quando o ambiente não for área molhada ou não houver drenagem prevista.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — desempenho e estanqueidade em áreas molhadas.",
          "Projeto executivo do piso e drenagem.",
          "O caimento funcional é essencial para evitar retenção de água, proliferação de umidade, risco de escorregamento e perda de desempenho do sistema.",
        ],
        criticality: {
          low: {
            label: "Pequena retenção localizada, sem permanência significativa.",
            reportText:
              "Falha funcional leve, ainda restrita a ponto específico, porém já indicativa de execução abaixo do padrão ideal.",
          },
          medium: {
            label: "Formação recorrente de poças ou escoamento incompleto.",
            reportText:
              "Compromete parte do desempenho do ambiente, favorece umidade, dificulta a limpeza e reduz a funcionalidade da área molhada.",
          },
          high: {
            label:
              "Retenção acentuada, escoamento invertido ou associação com infiltração.",
            reportText:
              "Perda importante de desempenho do sistema, com potencial para causar infiltração, degradação do acabamento e insegurança de uso, demandando correção prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "floor-adhesion",
        description: "Aderência do revestimento de piso",
        practicalDescription:
          "Verificar se o revestimento do piso está aderido e estável, sem som cavo relevante ou movimentação de peças.",
        stepByStep: [
          "Realizar percussão leve em diferentes pontos do piso.",
          "Identificar peças com som cavo ou alteração sonora significativa.",
          "Verificar se há movimentação perceptível ao pisar.",
          "Observar fissuras, lascas ou destacamentos associados.",
          "Registrar a extensão da área comprometida.",
        ],
        objectiveCriteria: {
          approved: "Peças firmes, sem movimentação e sem som cavo relevante.",
          rejected:
            "Presença de som cavo significativo, peça solta, movimentação ao pisar ou indício de desplacamento.",
          na: "Quando o sistema de piso não permitir esse tipo de avaliação.",
        },
        technicalBasis: [
          "Critérios técnicos do sistema de piso aderido e boas práticas de inspeção.",
          "ABNT NBR 15575 — durabilidade, segurança e desempenho funcional do sistema de piso.",
          "A perda de aderência do piso pode evoluir para quebra, destacamento e insegurança no uso.",
        ],
        criticality: {
          low: {
            label: "Ponto isolado de pequena extensão.",
            reportText:
              "Não conformidade localizada, ainda sem perda funcional importante, mas indicativa de execução imperfeita e necessidade de reparo pontual.",
          },
          medium: {
            label: "Vários pontos com som cavo ou movimentação localizada.",
            reportText:
              "Situação que já compromete a confiança no sistema de piso e pode evoluir para quebra de peças, perda de acabamento e manutenção corretiva mais ampla.",
          },
          high: {
            label:
              "Peças soltas, área extensa comprometida ou risco de quebra/desprendimento.",
            reportText:
              "Compromete diretamente segurança e durabilidade do piso, justificando intervenção prioritária por risco de acidente e perda relevante do sistema.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "floor-grout",
        description: "Rejuntes do piso íntegros",
        practicalDescription:
          "Verificar se os rejuntes do piso estão íntegros, contínuos e sem falhas que favoreçam infiltração, soltura de peças ou retenção de sujeira.",
        stepByStep: [
          "Inspecionar visualmente as juntas do piso.",
          "Verificar falhas de preenchimento, retrações, trincas ou perda de material.",
          "Observar se a falha se concentra em pontos isolados ou em áreas recorrentes.",
          "Registrar os trechos comprometidos.",
        ],
        objectiveCriteria: {
          approved:
            "Rejuntes contínuos, sem falhas relevantes e com bom acabamento.",
          rejected:
            "Perda de material, fissuras, vazios ou descontinuidade perceptível dos rejuntes.",
          na: "Quando o sistema de piso não possuir rejunte aplicável.",
        },
        technicalBasis: [
          "Boas práticas do sistema de revestimento de piso.",
          "ABNT NBR 15575 — durabilidade e funcionalidade do acabamento.",
          "Rejuntes degradados favorecem infiltração, sujeira, perda estética e movimentação das peças.",
        ],
        criticality: {
          low: {
            label: "Falha pequena e pontual.",
            reportText:
              "Comprometimento localizado, predominantemente de acabamento, mas que requer reparo para evitar evolução.",
          },
          medium: {
            label: "Falhas em vários trechos ou repetição do problema.",
            reportText:
              "Já interfere na qualidade do sistema e pode favorecer entrada de umidade e desgaste prematuro.",
          },
          high: {
            label: "Falhas extensas ou associação com destacamento e infiltração.",
            reportText:
              "Compromete o desempenho global do revestimento e exige intervenção prioritária para restabelecer funcionalidade e durabilidade.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
    ],
  },
  {
    id: "ceiling",
    title: "4. Teto / Forro",
    tests: [
      {
        id: "ceiling-cracks",
        description: "Fissuras ou trincas no teto/forro",
        practicalDescription:
          "Verificar a presença de fissuras, trincas ou aberturas no teto ou forro e avaliar seu significado técnico.",
        stepByStep: [
          "Inspecionar visualmente todo o teto ou forro.",
          "Identificar fissuras, juntas abertas ou trincas.",
          "Observar se há repetição do padrão em vários pontos.",
          "Medir a abertura quando possível.",
          "Verificar associação com umidade, deformação ou perda de fixação.",
          "Registrar localização e extensão.",
        ],
        objectiveCriteria: {
          approved:
            "Ausência de fissuras relevantes ou apenas microfissuras superficiais menores ou iguais a 0,3 mm sem sinais associados.",
          rejected:
            "Fissuras superiores a 0,3 mm, juntas abertas, padrão recorrente ou associação com umidade/deformação.",
          na: "Quando o elemento não puder ser avaliado com segurança.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — desempenho, durabilidade e segurança de uso.",
          "Boas práticas de inspeção de tetos, forros e acabamentos internos.",
          "Fissuras em teto ou forro podem indicar retração, movimentação do sistema, falha de acabamento, umidade ou perda localizada de desempenho.",
        ],
        criticality: {
          low: {
            label: "Abertura entre 0,3 mm e 0,5 mm sem outros sinais.",
            reportText:
              "Pode representar retração ou movimentação leve, ainda sem perda funcional importante, mas fora do padrão de acabamento desejado.",
          },
          medium: {
            label: "Abertura entre 0,5 mm e 1,0 mm ou repetição do padrão.",
            reportText:
              "Indica perda mais perceptível de desempenho do acabamento, podendo favorecer infiltração, destacamento ou necessidade de reparo mais abrangente.",
          },
          high: {
            label:
              "Abertura superior a 1,0 mm, deformação associada ou infiltração ativa.",
            reportText:
              "Situação de alta criticidade, pela possibilidade de perda relevante do sistema, instabilidade local ou patologia associada que exige providência prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "ceiling-humidity",
        description: "Manchas, mofo ou sinais de infiltração",
        practicalDescription:
          "Verificar se há indícios visuais de umidade no teto ou forro, com potencial de comprometer estanqueidade e durabilidade.",
        stepByStep: [
          "Observar toda a superfície do teto ou forro, inclusive cantos e encontros com paredes.",
          "Identificar manchas amareladas, escurecimentos, bolor, descascamento ou pintura estufada.",
          "Verificar se há gotejamento, umidade recente ou histórico aparente de infiltração.",
          "Registrar localização e intensidade do sinal encontrado.",
        ],
        objectiveCriteria: {
          approved: "Ausência de manchas, mofo ou sinais aparentes de infiltração.",
          rejected:
            "Presença de manchas, bolor, descascamento ou umidade associada.",
          na: "Quando não houver condição de avaliação confiável.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — estanqueidade, durabilidade e desempenho das edificações habitacionais.",
          "Boas práticas de inspeção visual de manifestações patológicas associadas à umidade.",
          "Manchas, bolor e descascamentos podem indicar falha de estanqueidade, infiltração ativa ou ocorrência anterior com necessidade de verificação da origem.",
        ],
        criticality: {
          low: {
            label: "Mancha antiga e superficial, sem atividade aparente.",
            reportText:
              "Indício de ocorrência passada, ainda sem evidência clara de atividade atual, mas que exige registro e verificação da origem.",
          },
          medium: {
            label: "Umidade recorrente, bolor ou descascamento localizado.",
            reportText:
              "Já compromete desempenho e salubridade do ambiente, com potencial para deterioração progressiva do acabamento.",
          },
          high: {
            label: "Infiltração ativa, gotejamento ou deterioração acentuada.",
            reportText:
              "Perda severa de desempenho do sistema, com comprometimento de estanqueidade, durabilidade e possível dano a instalações e acabamentos, justificando ação imediata.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "ceiling-alignment",
        description: "Alinhamento e fixação do forro",
        practicalDescription:
          "Verificar se o forro está estável, alinhado e sem risco de desprendimento ou deformação excessiva.",
        stepByStep: [
          "Observar o plano geral do forro a partir de diferentes ângulos.",
          "Identificar desalinhamentos, abaulamentos, flechas visíveis ou pontos rebaixados.",
          "Verificar folgas em emendas, cantos e arremates.",
          "Aplicar toque leve, quando apropriado, para identificar instabilidade superficial.",
          "Registrar os pontos comprometidos.",
        ],
        objectiveCriteria: {
          approved:
            "Forro alinhado, firme e sem deformações perceptíveis relevantes.",
          rejected:
            "Presença de desalinhamento, flecha aparente, folga em emendas ou instabilidade.",
          na: "Quando não houver forro.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — segurança de uso, desempenho e durabilidade.",
          "Critérios executivos do sistema de forro adotado e boas práticas de inspeção.",
          "A estabilidade e o alinhamento do forro interferem em segurança, qualidade visual, durabilidade do acabamento e compatibilização com luminárias e instalações.",
        ],
        criticality: {
          low: {
            label: "Desalinhamento discreto sem instabilidade.",
            reportText:
              "Comprometimento predominantemente visual, ainda sem risco imediato ao uso, mas já fora do padrão executivo esperado.",
          },
          medium: {
            label: "Desalinhamento perceptível ou folga localizada.",
            reportText:
              "Indica perda moderada de desempenho do sistema, com possibilidade de evolução para abertura de juntas, trincas ou perda de acabamento.",
          },
          high: {
            label:
              "Instabilidade, deformação acentuada ou risco de desprendimento.",
            reportText:
              "Compromete segurança de uso e integridade do sistema, exigindo providência corretiva prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
    ],
  },

{
    id: "frames",
    title: "5. Esquadrias / Portas / Janelas",
    tests: [
      {
        id: "operation",
        description: "Funcionamento de portas e janelas",
        practicalDescription:
          "Verificar se portas e janelas abrem, fecham e travam corretamente, sem interferências ou esforço excessivo.",
        stepByStep: [
          "Abrir e fechar completamente a porta ou janela.",
          "Verificar se há esforço excessivo ou travamento.",
          "Observar alinhamento entre folha e marco.",
          "Testar travas, fechaduras e sistemas de fechamento.",
          "Registrar qualquer interferência ou mau funcionamento.",
        ],
        objectiveCriteria: {
          approved:
            "Funcionamento suave, sem esforço excessivo e com fechamento adequado.",
          rejected:
            "Travamento, desalinhamento, dificuldade de operação ou falha de fechamento.",
          na: "Quando não houver esquadria instalada ou não for possível testar.",
        },
        technicalBasis: [
          "ABNT NBR 10821 — Esquadrias para edificações.",
          "ABNT NBR 15575 — Desempenho — funcionalidade e segurança.",
          "O correto funcionamento garante estanqueidade, segurança e conforto no uso.",
        ],
        criticality: {
          low: {
            label: "Leve dificuldade de operação.",
            reportText:
              "Funcionamento ainda possível, porém fora do padrão ideal, podendo gerar desconforto ao usuário.",
          },
          medium: {
            label: "Operação comprometida ou desalinhamento.",
            reportText:
              "Já interfere na funcionalidade do elemento, podendo comprometer vedação e segurança.",
          },
          high: {
            label: "Impossibilidade de uso ou risco de falha funcional.",
            reportText:
              "Compromete totalmente o desempenho da esquadria, podendo afetar segurança, vedação e usabilidade.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "sealing",
        description: "Vedação e estanqueidade",
        practicalDescription:
          "Verificar se há frestas, falhas de vedação ou possibilidade de entrada de água ou ar.",
        stepByStep: [
          "Observar frestas ao redor da esquadria.",
          "Verificar presença e condição de borrachas de vedação.",
          "Avaliar encaixe da folha com o marco.",
          "Identificar pontos com possível entrada de água ou ar.",
          "Registrar falhas encontradas.",
        ],
        objectiveCriteria: {
          approved:
            "Sem frestas relevantes e vedação adequada.",
          rejected:
            "Frestas visíveis, falha de vedação ou potencial de infiltração.",
          na: "Quando não for possível avaliar vedação.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — Estanqueidade e desempenho.",
          "ABNT NBR 10821 — Esquadrias.",
        ],
        criticality: {
          low: {
            label: "Pequenas frestas pontuais.",
            reportText:
              "Não compromete gravemente o desempenho, mas indica execução imperfeita.",
          },
          medium: {
            label: "Vedação parcial comprometida.",
            reportText:
              "Pode permitir entrada de água ou ar, afetando conforto e durabilidade.",
          },
          high: {
            label: "Falha significativa de vedação.",
            reportText:
              "Compromete estanqueidade e desempenho da edificação, exigindo correção imediata.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "alignment",
        description: "Alinhamento e instalação",
        practicalDescription:
          "Verificar se a esquadria está alinhada, nivelada e corretamente instalada.",
        stepByStep: [
          "Observar alinhamento visual da esquadria.",
          "Verificar prumo e nível.",
          "Avaliar folgas entre marco e alvenaria.",
          "Identificar deformações ou empenos.",
        ],
        objectiveCriteria: {
          approved: "Alinhamento e instalação adequados.",
          rejected: "Desalinhamento, empeno ou instalação inadequada.",
          na: "Quando não for possível avaliar.",
        },
        technicalBasis: [
          "Boas práticas de instalação de esquadrias.",
          "ABNT NBR 15575.",
        ],
        criticality: {
          low: {
            label: "Desvio leve.",
            reportText:
              "Desalinhamento pequeno, com impacto predominantemente estético.",
          },
          medium: {
            label: "Desalinhamento perceptível.",
            reportText:
              "Pode comprometer funcionamento e vedação.",
          },
          high: {
            label: "Desalinhamento acentuado.",
            reportText:
              "Compromete funcionamento e desempenho geral da esquadria.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
    ],
  },
  {
    id: "installations",
    title: "6. Instalações (Elétrica e Hidráulica)",
    tests: [
      {
        id: "electrical",
        description: "Funcionamento elétrico",
        practicalDescription:
          "Verificar funcionamento de tomadas, interruptores e pontos de energia.",
        stepByStep: [
          "Testar tomadas com equipamento apropriado.",
          "Acionar interruptores.",
          "Verificar funcionamento de luminárias.",
        ],
        objectiveCriteria: {
          approved: "Funcionamento normal.",
          rejected: "Falha de funcionamento.",
          na: "Quando não aplicável.",
        },
        technicalBasis: [
          "ABNT NBR 5410 — Instalações elétricas de baixa tensão.",
        ],
        criticality: {
          low: {
            label: "Falha pontual.",
            reportText:
              "Não compromete o sistema como um todo.",
          },
          medium: {
            label: "Falha recorrente.",
            reportText:
              "Compromete parte do sistema elétrico.",
          },
          high: {
            label: "Falha geral ou risco.",
            reportText:
              "Compromete segurança e funcionamento do sistema.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "hydraulic",
        description: "Funcionamento hidráulico",
        practicalDescription:
          "Verificar vazamentos, pressão e funcionamento de pontos hidráulicos.",
        stepByStep: [
          "Abrir registros.",
          "Verificar vazamentos.",
          "Testar escoamento.",
        ],
        objectiveCriteria: {
          approved: "Funcionamento adequado.",
          rejected: "Vazamento ou falha.",
          na: "Quando não aplicável.",
        },
        technicalBasis: [
          "ABNT NBR 5626 — Instalações prediais de água fria.",
        ],
        criticality: {
          low: {
            label: "Pequena falha.",
            reportText:
              "Impacto reduzido.",
          },
          medium: {
            label: "Falha relevante.",
            reportText:
              "Compromete uso parcial.",
          },
          high: {
            label: "Falha grave.",
            reportText:
              "Compromete funcionamento e pode causar danos.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
    ],
  },
];

export const EXTERNAL_CHECKLIST: ChecklistSection[] = [
  {
    id: "facade",
    title: "1. Fachada e Revestimentos Externos",
    tests: [
      {
        id: "facade-cracks",
        description: "Fissuras em fachada",
        practicalDescription:
          "Verificar a presença de fissuras ou trincas na fachada e avaliar seu potencial de risco para durabilidade, estanqueidade e comportamento do sistema de vedação externa.",
        stepByStep: [
          "Realizar inspeção visual em todo o pano de fachada acessível, incluindo encontros com esquadrias, vergas, peitoris, quinas, juntas e regiões de mudança de material.",
          "Identificar fissuras, trincas, aberturas lineares ou padrão de fissuração mapeada.",
          "Observar direção predominante da fissura: vertical, horizontal, diagonal, mapeada ou em contorno de vãos.",
          "Medir a abertura com régua milimetrada ou fissurômetro, quando possível.",
          "Verificar se há repetição do padrão em diferentes pontos da fachada ou em mais de um pano.",
          "Observar presença de umidade associada, escurecimento, eflorescência, destacamento de pintura ou deterioração do revestimento.",
          "Registrar localização, extensão aproximada e abertura observada.",
        ],
        objectiveCriteria: {
          approved:
            "Ausência de fissuras relevantes ou apenas microfissuras superficiais menores ou iguais a 0,3 mm, sem repetição importante e sem infiltração associada.",
          rejected:
            "Fissuras visíveis superiores a 0,3 mm, trincas, padrão repetitivo, associação com umidade ou indício de movimentação do sistema.",
          na: "Quando a superfície não puder ser avaliada com segurança ou acessibilidade mínima.",
        },
        technicalBasis: [
          "ABNT NBR 6118 — Estruturas de concreto — controle de fissuração.",
          "ABNT NBR 15575 — Desempenho — estanqueidade e durabilidade.",
          "Segundo a NBR 6118, aberturas de fissuras têm relação direta com durabilidade e exposição do sistema. Em fachada, a NBR 15575 reforça a necessidade de estanqueidade e manutenção do desempenho ao longo da vida útil.",
        ],
        criticality: {
          low: {
            label: "Fissuras entre 0,3 mm e 0,5 mm.",
            reportText:
              "Não conformidade de baixa criticidade, ainda sem indício estrutural imediato, porém já suficiente para comprometer acabamento e iniciar perda localizada de estanqueidade superficial da fachada.",
          },
          medium: {
            label: "Fissuras entre 0,5 mm e 1,0 mm, ou repetição do padrão em vários pontos.",
            reportText:
              "Indicam perda mais perceptível de desempenho do sistema de vedação externa, com maior potencial de infiltração, degradação do revestimento e redução de durabilidade do pano de fachada.",
          },
          high: {
            label:
              "Fissuras superiores a 1,0 mm, trincas abertas, padrão diagonal relevante, deformação associada ou infiltração ativa.",
            reportText:
              "Configuração compatível com não conformidade severa, podendo indicar movimentação estrutural, recalque, falha de interface entre elementos ou perda significativa de desempenho da fachada, exigindo providência prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "facade-adhesion",
        description: "Aderência do revestimento externo",
        practicalDescription:
          "Verificar se o revestimento externo está adequadamente aderido ao substrato, sem áreas ocas, estufamento ou risco de desprendimento.",
        stepByStep: [
          "Realizar percussão leve e sistemática nos trechos acessíveis da fachada ou do revestimento externo.",
          "Identificar diferenças sonoras entre regiões com som firme e regiões com som cavo.",
          "Delimitar a área comprometida, quando possível, por observação direta ou registro descritivo.",
          "Observar se há fissuras, estufamento, deslocamento de placas, destacamento de pintura ou outra manifestação associada.",
          "Registrar a extensão aproximada e a localização da anomalia.",
        ],
        objectiveCriteria: {
          approved:
            "Ausência de som cavo relevante ou presença apenas pontual sem risco perceptível de destacamento.",
          rejected:
            "Presença de som cavo em área perceptível, estufamento, destacamento ou indício de desprendimento do revestimento.",
          na: "Quando o tipo de acabamento não permitir esse tipo de verificação ou quando não houver acesso seguro.",
        },
        technicalBasis: [
          "ABNT NBR 13755 — Revestimento cerâmico com placas e argamassa colante.",
          "Boas práticas de inspeção de revestimentos aderidos em fachadas.",
          "A aderência insuficiente do revestimento externo compromete segurança, durabilidade e desempenho do sistema, podendo evoluir para queda de placas, infiltração e degradação do pano de fachada.",
        ],
        criticality: {
          low: {
            label: "Som cavo em ponto isolado de pequena extensão.",
            reportText:
              "Não conformidade localizada, ainda sem evidência de destacamento iminente, mas já indicativa de perda parcial de aderência e necessidade de reparo preventivo.",
          },
          medium: {
            label: "Som cavo em área localizada relevante ou repetição em pontos do mesmo pano.",
            reportText:
              "Revela perda moderada de aderência, com potencial de evolução para fissuração, destacamento e necessidade de intervenção corretiva dirigida.",
          },
          high: {
            label: "Som cavo extenso, estufamento, peça solta ou risco de queda do revestimento.",
            reportText:
              "Compromete diretamente integridade e segurança do sistema de fachada, justificando ação prioritária pela possibilidade de desprendimento e perda importante de desempenho.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "facade-paint",
        description: "Pintura externa uniforme e sem patologias aparentes",
        practicalDescription:
          "Verificar se a pintura da fachada apresenta uniformidade visual e ausência de defeitos que indiquem falha de preparo, perda de aderência, degradação por intempéries ou umidade associada.",
        stepByStep: [
          "Observar a fachada sob iluminação natural adequada, avaliando diferentes ângulos do pano externo.",
          "Identificar diferenças de tonalidade, manchas, escorridos, bolhas, descascamentos, empolamentos ou pulverulência excessiva.",
          "Verificar se as falhas estão associadas a umidade, fissuras, eflorescência ou degradação do substrato.",
          "Registrar os pontos comprometidos e a recorrência da manifestação.",
        ],
        objectiveCriteria: {
          approved:
            "Pintura com aparência uniforme, sem falhas relevantes visíveis e sem perda perceptível de desempenho do acabamento.",
          rejected:
            "Presença de manchas, descascamento, bolhas, pulverulência, falhas de cobertura ou defeitos perceptíveis de acabamento.",
          na: "Quando não houver pintura externa no elemento ou quando a superfície não fizer parte do escopo avaliado.",
        },
        technicalBasis: [
          "Memorial descritivo, padrão de acabamento contratado e boas práticas de inspeção técnica.",
          "ABNT NBR 15575 — desempenho e durabilidade do acabamento, quando a falha afetar proteção superficial e estanqueidade do sistema.",
          "Na fachada, a pintura cumpre também papel de proteção superficial contra intempéries. Falhas de pintura podem indicar não apenas defeito estético, mas perda de barreira superficial, umidade ou deficiência de preparo da base.",
        ],
        criticality: {
          low: {
            label: "Falha estética pontual.",
            reportText:
              "Não conformidade predominantemente visual, sem evidência de perda funcional relevante imediata, porém fora do padrão técnico esperado de acabamento externo.",
          },
          medium: {
            label: "Falhas espalhadas, repetitivas ou desgaste moderado do acabamento.",
            reportText:
              "Comprometem qualidade visual da fachada e podem indicar deficiência de preparo, perda de aderência ou início de degradação do sistema de pintura.",
          },
          high: {
            label:
              "Bolhas, descascamento acentuado, pulverulência intensa ou associação com umidade ativa.",
            reportText:
              "Indicam perda importante do acabamento externo e possível patologia subjacente do sistema, com reflexo em durabilidade, proteção superficial e desempenho geral da fachada.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "facade-humidity",
        description: "Eflorescência e sinais de umidade na fachada",
        practicalDescription:
          "Verificar a presença de eflorescência, escurecimento, manchas de umidade, bolor ou outras manifestações patológicas associadas à presença de água no sistema de vedação externa.",
        stepByStep: [
          "Inspecionar visualmente a fachada, especialmente regiões inferiores, encontros com peitoris, rufos, pingadeiras, juntas e proximidades de áreas molhadas internas.",
          "Identificar depósitos esbranquiçados, escurecimentos, trilhas de água, bolor, destacamento de pintura ou degradação superficial.",
          "Verificar se a manifestação é isolada, linear, recorrente ou generalizada em diferentes panos.",
          "Registrar localização, extensão e intensidade aparente dos sinais observados.",
        ],
        objectiveCriteria: {
          approved:
            "Ausência de sinais relevantes de umidade, eflorescência ou perda de estanqueidade na fachada.",
          rejected:
            "Presença de eflorescência, manchas, bolor, trilhas de água ou outra manifestação compatível com umidade e falha do sistema externo.",
          na: "Quando a superfície não estiver acessível ou a leitura não puder ser feita com confiabilidade.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — estanqueidade e durabilidade do sistema de vedação externa.",
          "ABNT NBR 9575 — interfaces com impermeabilização e proteção da edificação, quando aplicável.",
          "A presença de umidade e eflorescência em fachada é forte indicativo de perda de estanqueidade, falha de arremate, deficiência de pingadeiras/rufos ou degradação do sistema de vedação.",
        ],
        criticality: {
          low: {
            label: "Manifestação pontual e superficial.",
            reportText:
              "Indica início de perda localizada de desempenho, ainda sem comprometimento amplo do pano de fachada.",
          },
          medium: {
            label:
              "Manifestação recorrente em vários pontos ou com deterioração moderada do acabamento.",
            reportText:
              "Compromete parcialmente estanqueidade e durabilidade do sistema, exigindo correção e investigação da origem da água.",
          },
          high: {
            label:
              "Manifestação intensa, generalizada ou com infiltração ativa associada.",
            reportText:
              "Configura não conformidade severa da fachada, com perda importante de desempenho e necessidade de providência corretiva prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
    ],
  },

    {
    id: "external-floors",
    title: "2. Pisos Externos",
    tests: [
      {
        id: "external-floor-level",
        description: "Nivelamento e regularidade do piso externo",
        practicalDescription:
          "Verificar se o piso externo apresenta desníveis, deformações ou irregularidades capazes de comprometer circulação, segurança de uso e comportamento superficial da água.",
        stepByStep: [
          "Percorrer o piso externo observando visualmente irregularidades, depressões, ressaltos e diferenças de nível.",
          "Posicionar régua, nível ou outro instrumento simples em pontos representativos para confirmar a irregularidade percebida.",
          "Identificar se há interferência na circulação, no posicionamento de mobiliário ou no uso normal da área externa.",
          "Registrar os pontos críticos e a intensidade aparente da irregularidade.",
        ],
        objectiveCriteria: {
          approved:
            "Ausência de desnível perceptível relevante e regularidade compatível com o uso seguro e funcional da área.",
          rejected:
            "Desnível perceptível, deformação, depressão ou irregularidade capaz de comprometer circulação, segurança ou qualidade executiva.",
          na: "Quando a área não estiver finalizada ou não puder ser avaliada adequadamente.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — desempenho funcional e segurança no uso.",
          "Critérios executivos do sistema de piso adotado para área externa.",
          "No ambiente externo, irregularidades de piso têm efeito ampliado sobre segurança do usuário, drenagem superficial e durabilidade do revestimento.",
        ],
        criticality: {
          low: {
            label:
              "Irregularidade leve, predominantemente estética ou de pequeno impacto funcional.",
            reportText:
              "Ainda sem comprometer de modo importante a circulação, mas fora do padrão técnico adequado do piso.",
          },
          medium: {
            label:
              "Irregularidade perceptível, com interferência moderada na circulação ou no acabamento.",
            reportText:
              "Já reduz a funcionalidade da área e pode favorecer retenção de água, desconforto de uso e desgaste localizado do piso.",
          },
          high: {
            label:
              "Desnível acentuado, risco de tropeço/queda ou comprometimento importante do uso.",
            reportText:
              "Configura não conformidade severa do piso externo por afetar diretamente segurança e desempenho funcional da área.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "external-floor-slope",
        description: "Caimento e direcionamento da água no piso externo",
        practicalDescription:
          "Verificar se o piso externo direciona adequadamente a água para pontos de drenagem, sem empoçamentos incompatíveis com o uso e a durabilidade do sistema.",
        stepByStep: [
          "Lançar água em pontos representativos da área externa, quando tecnicamente possível.",
          "Observar a direção do escoamento e o tempo de permanência da água na superfície.",
          "Verificar formação de poças, escoamento em sentido inadequado, retorno para a edificação ou concentração em regiões críticas.",
          "Registrar os pontos de retenção ou fluxo incorreto.",
        ],
        objectiveCriteria: {
          approved:
            "Água escoa adequadamente para ralos, grelhas ou áreas de dissipação, sem poças relevantes após o teste.",
          rejected:
            "Água permanece retida, forma poças significativas, escoa em sentido incompatível ou retorna para zonas sensíveis da edificação.",
          na: "Quando a área não permitir o teste ou quando não houver condição operacional segura para sua realização.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — desempenho, estanqueidade e segurança de uso.",
          "Projeto executivo de drenagem e acabamento da área externa.",
          "O caimento funcional no piso externo é essencial para evitar infiltração, deterioração de revestimentos, proliferação de umidade e risco de escorregamento.",
        ],
        criticality: {
          low: {
            label: "Pequena retenção localizada, sem permanência relevante.",
            reportText:
              "Indica falha funcional leve, ainda restrita, mas incompatível com a execução ideal da área externa.",
          },
          medium: {
            label: "Formação recorrente de poças ou escoamento incompleto.",
            reportText:
              "Compromete parte do desempenho da área externa, dificulta uso e limpeza e aumenta o potencial de degradação do sistema.",
          },
          high: {
            label:
              "Retenção acentuada, fluxo invertido ou associação com infiltração/escorregamento.",
            reportText:
              "Perda importante de desempenho do piso externo, com risco funcional e de segurança, justificando correção prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "external-floor-slip",
        description: "Aderência / risco de escorregamento do piso externo",
        practicalDescription:
          "Verificar se o piso externo apresenta condição superficial compatível com segurança de uso, especialmente em situações molhadas, sem risco excessivo de escorregamento.",
        stepByStep: [
          "Inspecionar o tipo de acabamento superficial do piso externo, observando textura, desgaste e presença de polimento excessivo.",
          "Quando tecnicamente seguro, avaliar a sensação de aderência em condição seca e, se aplicável, em condição úmida ou molhada.",
          "Identificar regiões críticas, como rampas, áreas de transição, acessos, bordas de piscinas, varandas e caminhos expostos à chuva.",
          "Registrar os pontos de maior risco percebido.",
        ],
        objectiveCriteria: {
          approved:
            "Superfície com aderência compatível ao uso esperado, sem risco perceptível relevante de escorregamento.",
          rejected:
            "Superfície escorregadia, com redução importante de aderência ou condição incompatível com uso seguro, sobretudo em presença de água.",
          na: "Quando a área não puder ser avaliada com segurança ou quando o teste não se aplicar.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — segurança no uso e operação.",
          "Boas práticas de escolha e inspeção de pisos para áreas externas e molháveis.",
          "A aderência superficial do piso externo é requisito importante de segurança, especialmente em áreas sujeitas à ação de chuva, limpeza e umidade frequente.",
        ],
        criticality: {
          low: {
            label: "Leve redução de aderência, sem risco imediato elevado.",
            reportText:
              "Não conformidade leve, ainda com impacto limitado, mas abaixo do padrão seguro ideal para a área externa.",
          },
          medium: {
            label:
              "Risco moderado de escorregamento em uso normal ou em condição úmida previsível.",
            reportText:
              "Compromete segurança funcional do ambiente e exige correção ou mitigação do risco ao usuário.",
          },
          high: {
            label:
              "Alto risco de queda, sobretudo em área molhada, inclinada ou de circulação frequente.",
            reportText:
              "Configura condição crítica sob a ótica de segurança de uso, justificando adequação prioritária do acabamento ou da solução de piso.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
    ],
  },
  {
    id: "drainage",
    title: "3. Drenagem e Escoamento",
    tests: [
      {
        id: "drainage-points",
        description: "Funcionamento dos ralos, grelhas e pontos de captação",
        practicalDescription:
          "Verificar se os ralos, grelhas e demais pontos de captação da área externa recebem e conduzem a água adequadamente, sem obstrução, refluxo ou deficiência funcional.",
        stepByStep: [
          "Identificar os pontos de drenagem existentes na área externa.",
          "Realizar teste com água, quando tecnicamente possível, observando velocidade e regularidade do escoamento para os dispositivos de captação.",
          "Verificar presença de obstrução, retorno, borbulhamento anômalo, grelha inadequada ou má conservação do ponto.",
          "Registrar o comportamento observado e os pontos comprometidos.",
        ],
        objectiveCriteria: {
          approved:
            "Captação e escoamento regulares, sem refluxo, lentidão relevante ou obstrução perceptível.",
          rejected:
            "Escoamento lento, retorno, entupimento aparente, deficiência de captação ou condição incompatível com o uso da área.",
          na: "Quando não houver ponto de captação aplicável ou quando o teste não puder ser realizado.",
        },
        technicalBasis: [
          "ABNT NBR 10844 — instalações prediais de águas pluviais.",
          "ABNT NBR 15575 — estanqueidade e desempenho funcional da edificação.",
          "Os pontos de captação são elementos fundamentais da drenagem superficial e sua deficiência favorece empoçamentos, infiltrações, erosões localizadas e prejuízo ao uso da área externa.",
        ],
        criticality: {
          low: {
            label: "Leve lentidão sem retorno nem acúmulo relevante.",
            reportText:
              "Indica desempenho abaixo do ideal, ainda sem perda funcional grave, mas merecendo correção preventiva.",
          },
          medium: {
            label:
              "Captação comprometida ou lentidão recorrente com impacto funcional.",
            reportText:
              "Reduz a eficiência da drenagem e pode favorecer poças, umidade e manutenção frequente da área externa.",
          },
          high: {
            label:
              "Obstrução severa, refluxo ou falha de captação incompatível com o sistema.",
            reportText:
              "Configura perda importante de desempenho da drenagem, justificando providência corretiva prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
    ],
  },

    {
    id: "waterproofing",
    title: "4. Impermeabilização e Estanqueidade Externa",
    tests: [
      {
        id: "external-waterproofing-signs",
        description: "Sinais de falha de impermeabilização",
        practicalDescription:
          "Verificar a presença de manifestações compatíveis com falha de impermeabilização em áreas externas, como manchas, bolhas, desplacamentos, eflorescência ou umidade recorrente.",
        stepByStep: [
          "Inspecionar visualmente pisos, paredes, rodapés, encontros com fachadas, platibandas, ralos, jardineiras, floreiras e áreas expostas à chuva.",
          "Identificar manchas de umidade, bolhas, descascamentos, eflorescência, fissuras ou deterioração localizada.",
          "Observar se as manifestações estão próximas a pontos críticos, como ralos, juntas, rodapés, cantos, arremates e passagens de tubulação.",
          "Verificar sinais de umidade recorrente ou infiltração ativa, quando possível.",
          "Registrar localização, extensão e intensidade dos sinais observados.",
        ],
        objectiveCriteria: {
          approved:
            "Ausência de sinais aparentes de falha de impermeabilização ou umidade relevante nas áreas avaliadas.",
          rejected:
            "Presença de manchas, bolhas, eflorescência, descascamento, infiltração ou deterioração compatível com falha de impermeabilização.",
          na: "Quando a área não possuir sistema impermeabilizante aplicável ou não puder ser avaliada visualmente.",
        },
        technicalBasis: [
          "ABNT NBR 9575 — Impermeabilização — Seleção e projeto.",
          "ABNT NBR 9574 — Execução de impermeabilização.",
          "ABNT NBR 15575 — Estanqueidade e durabilidade das edificações habitacionais.",
          "Falhas de impermeabilização reduzem a estanqueidade do sistema e podem causar degradação progressiva de revestimentos, argamassas, pinturas, elementos estruturais e ambientes adjacentes.",
        ],
        criticality: {
          low: {
            label: "Sinal pontual e superficial, sem evidência de infiltração ativa.",
            reportText:
              "Indica possível início de perda localizada de desempenho, ainda sem comprometimento amplo, mas que exige monitoramento e correção preventiva.",
          },
          medium: {
            label:
              "Manifestações recorrentes, umidade localizada ou deterioração moderada.",
            reportText:
              "Já sugere perda parcial de estanqueidade, com risco de evolução para infiltração mais ampla e degradação progressiva dos acabamentos.",
          },
          high: {
            label:
              "Infiltração ativa, umidade intensa, deterioração extensa ou dano em ambientes adjacentes.",
            reportText:
              "Configura não conformidade severa, com perda importante de desempenho do sistema impermeabilizante e necessidade de intervenção prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "external-joints-sealing",
        description: "Juntas, rufos, pingadeiras e arremates externos",
        practicalDescription:
          "Verificar se juntas, rufos, pingadeiras, soleiras, peitoris e arremates externos estão íntegros e executados de forma compatível com a proteção contra entrada de água.",
        stepByStep: [
          "Inspecionar visualmente juntas, encontros entre materiais, rufos, pingadeiras, peitoris, soleiras e arremates de borda.",
          "Verificar falhas de vedação, fissuras, ausência de caimento, peças soltas, frestas ou deterioração de selantes.",
          "Observar se existem manchas, trilhas de água, escurecimento ou eflorescência próximos aos arremates.",
          "Registrar os pontos onde houver falha, descontinuidade ou risco de entrada de água.",
        ],
        objectiveCriteria: {
          approved:
            "Arremates íntegros, com vedação adequada, caimento funcional e sem sinais associados de infiltração.",
          rejected:
            "Falhas de vedação, ausência ou deficiência de pingadeira/rufo, selante deteriorado, frestas ou sinais de passagem de água.",
          na: "Quando não houver arremate aplicável ou o ponto não estiver acessível para avaliação.",
        },
        technicalBasis: [
          "ABNT NBR 15575 — Estanqueidade e durabilidade.",
          "ABNT NBR 9575 — Interfaces com sistemas de impermeabilização.",
          "Boas práticas de execução de fachadas, coberturas, esquadrias e arremates externos.",
          "Arremates deficientes são pontos recorrentes de entrada de água e podem comprometer a durabilidade da fachada, dos revestimentos e dos ambientes internos.",
        ],
        criticality: {
          low: {
            label: "Falha pontual de acabamento ou vedação sem infiltração aparente.",
            reportText:
              "Não conformidade localizada, ainda sem evidência de dano ativo, mas com potencial de evolução caso não seja corrigida.",
          },
          medium: {
            label:
              "Falha de vedação recorrente, arremate deficiente ou sinais moderados de passagem de água.",
            reportText:
              "Compromete parcialmente a estanqueidade da interface e aumenta o risco de infiltrações e deterioração progressiva.",
          },
          high: {
            label:
              "Entrada de água evidente, rufo/pingadeira ausente ou falha extensa de arremate.",
            reportText:
              "Situação crítica por representar caminho direto de infiltração, exigindo correção prioritária para restabelecer a proteção do sistema.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "external-expansion-joints",
        description: "Juntas de movimentação e dilatação",
        practicalDescription:
          "Verificar se juntas de movimentação, dilatação ou dessolidarização em áreas externas estão presentes, íntegras e compatíveis com a movimentação prevista do sistema.",
        stepByStep: [
          "Identificar a presença de juntas em panos de fachada, pisos externos, revestimentos e encontros estruturais.",
          "Verificar continuidade, limpeza, preenchimento, elasticidade aparente e integridade dos selantes.",
          "Observar fissuras próximas às juntas, descolamentos, endurecimento do selante ou perda de aderência nas bordas.",
          "Registrar juntas ausentes, deterioradas, mal executadas ou com sinais de falha funcional.",
        ],
        objectiveCriteria: {
          approved:
            "Juntas presentes e íntegras, com preenchimento adequado e sem sinais de falha ou fissuração associada.",
          rejected:
            "Juntas ausentes onde necessárias, deterioradas, rígidas, abertas, com perda de aderência ou associadas a fissuras/desplacamentos.",
          na: "Quando não houver juntas aplicáveis ao sistema avaliado.",
        },
        technicalBasis: [
          "ABNT NBR 13755 — Revestimentos cerâmicos em fachadas.",
          "ABNT NBR 15575 — Durabilidade, desempenho e manutenção.",
          "Boas práticas de projeto e execução de juntas em revestimentos e fachadas.",
          "As juntas absorvem movimentações térmicas, higroscópicas e estruturais. Falhas nesse sistema podem gerar fissuração, destacamento e perda de estanqueidade.",
        ],
        criticality: {
          low: {
            label: "Deterioração leve ou falha pontual no selante.",
            reportText:
              "Comprometimento inicial, ainda localizado, mas que pode evoluir com exposição ao tempo e movimentações do sistema.",
          },
          medium: {
            label:
              "Junta parcialmente comprometida, selante rígido ou perda de aderência localizada.",
            reportText:
              "Reduz a capacidade da junta de absorver movimentações e pode favorecer fissuras, infiltrações e degradação do revestimento.",
          },
          high: {
            label:
              "Junta ausente, falha extensa, abertura significativa ou associação com desplacamento/infiltração.",
            reportText:
              "Não conformidade severa, com potencial de comprometer a integridade do sistema de fachada ou piso externo, exigindo intervenção prioritária.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
    ],
  },
  {
    id: "external-structures",
    title: "5. Elementos Estruturais e Guarda-corpos",
    tests: [
      {
        id: "external-structural-visible",
        description: "Condições aparentes de elementos estruturais externos",
        practicalDescription:
          "Verificar visualmente elementos estruturais externos aparentes, como pilares, vigas, lajes, marquises, sacadas e muros, identificando sinais de fissuração, corrosão, deformação ou deterioração.",
        stepByStep: [
          "Inspecionar visualmente os elementos estruturais aparentes e acessíveis.",
          "Identificar fissuras, trincas, deformações, desplacamentos, armaduras expostas, manchas de corrosão ou deterioração do concreto/revestimento.",
          "Observar se há associação com umidade, infiltração, sobrecarga aparente ou movimentações.",
          "Registrar localização, extensão e intensidade das manifestações.",
        ],
        objectiveCriteria: {
          approved:
            "Ausência de sinais aparentes relevantes de deterioração, deformação, corrosão, fissuração crítica ou perda de integridade.",
          rejected:
            "Presença de fissuras relevantes, deformação, armadura exposta, corrosão, desplacamento ou deterioração com potencial impacto estrutural ou de segurança.",
          na: "Quando não houver elemento estrutural aparente ou acessível para avaliação visual.",
        },
        technicalBasis: [
          "ABNT NBR 6118 — Projeto de estruturas de concreto.",
          "ABNT NBR 15575 — Segurança estrutural, durabilidade e desempenho.",
          "Inspeção visual não substitui avaliação estrutural especializada, mas manifestações aparentes podem indicar perda de durabilidade, exposição de armaduras, movimentação ou risco local.",
        ],
        criticality: {
          low: {
            label:
              "Manifestação superficial pontual, sem deformação ou exposição de armadura.",
            reportText:
              "Sinal localizado, ainda sem evidência imediata de comprometimento estrutural, mas que deve ser registrado e acompanhado.",
          },
          medium: {
            label:
              "Fissuras recorrentes, desplacamento localizado ou sinais iniciais de corrosão.",
            reportText:
              "Indica perda de durabilidade e possível evolução patológica, exigindo avaliação técnica e correção dirigida.",
          },
          high: {
            label:
              "Armadura exposta, corrosão avançada, deformação, trinca aberta ou risco aparente.",
            reportText:
              "Situação crítica, com potencial comprometimento de segurança e durabilidade, exigindo avaliação estrutural prioritária por profissional habilitado.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "guardrails",
        description: "Guarda-corpos, corrimãos e proteções contra queda",
        practicalDescription:
          "Verificar se guarda-corpos, corrimãos e proteções em áreas externas estão firmes, íntegros e compatíveis com segurança de uso.",
        stepByStep: [
          "Inspecionar guarda-corpos, corrimãos, gradis, peitoris e demais proteções contra queda.",
          "Verificar fixação, estabilidade, corrosão, folgas, deformações, ausência de elementos ou risco de desprendimento.",
          "Avaliar visualmente a continuidade da proteção e pontos de interrupção.",
          "Registrar falhas de fixação, instabilidade ou risco ao usuário.",
        ],
        objectiveCriteria: {
          approved:
            "Proteções firmes, contínuas, íntegras e sem instabilidade perceptível.",
          rejected:
            "Instabilidade, folgas, corrosão relevante, ausência de proteção, fixação deficiente ou risco de queda/desprendimento.",
          na: "Quando não houver guarda-corpo, corrimão ou proteção aplicável.",
        },
        technicalBasis: [
          "ABNT NBR 14718 — Guarda-corpos para edificação.",
          "ABNT NBR 15575 — Segurança no uso e operação.",
          "A integridade dos guarda-corpos e proteções contra queda é requisito essencial de segurança em sacadas, varandas, escadas, terraços e desníveis.",
        ],
        criticality: {
          low: {
            label: "Folga pequena ou acabamento pontualmente deficiente.",
            reportText:
              "Falha localizada, ainda sem risco imediato elevado, mas que exige correção para manter o padrão de segurança.",
          },
          medium: {
            label:
              "Instabilidade moderada, corrosão localizada ou fixação parcialmente comprometida.",
            reportText:
              "Reduz a confiabilidade do sistema de proteção e pode evoluir para condição insegura se não corrigida.",
          },
          high: {
            label:
              "Risco de queda, fixação severamente comprometida, ausência de proteção ou instabilidade acentuada.",
            reportText:
              "Configuração de alta criticidade por envolver segurança direta do usuário, exigindo providência imediata.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
    ],
  },
    {
    id: "external-complementary",
    title: "6. Elementos Complementares e Condições Gerais",
    tests: [
      {
        id: "external-cleaning",
        description: "Condição geral de limpeza e conservação",
        practicalDescription:
          "Verificar o estado geral da área externa quanto à limpeza, conservação e ausência de resíduos, acúmulo de materiais ou degradação visível.",
        stepByStep: [
          "Percorrer toda a área externa observando o estado geral.",
          "Identificar presença de resíduos, entulho, sujeira acumulada ou vegetação indesejada.",
          "Verificar sinais de abandono, degradação ou falta de manutenção.",
          "Registrar pontos críticos encontrados.",
        ],
        objectiveCriteria: {
          approved:
            "Área limpa, conservada e compatível com o padrão esperado.",
          rejected:
            "Presença de sujeira, resíduos, acúmulo de materiais ou degradação visível.",
          na: "Quando a área não fizer parte do escopo de avaliação.",
        },
        technicalBasis: [
          "Boas práticas de conservação e manutenção predial.",
          "ABNT NBR 5674 — Manutenção de edificações.",
          "A condição de limpeza e conservação impacta diretamente na durabilidade dos sistemas e na percepção de qualidade do imóvel.",
        ],
        criticality: {
          low: {
            label: "Sujeira leve ou pontual.",
            reportText:
              "Não compromete funcionalidade, mas está abaixo do padrão ideal de apresentação.",
          },
          medium: {
            label: "Sujeira recorrente ou acúmulo moderado.",
            reportText:
              "Compromete o uso e a percepção de qualidade da área.",
          },
          high: {
            label: "Acúmulo excessivo ou degradação evidente.",
            reportText:
              "Indica abandono ou falha grave de manutenção, podendo gerar danos progressivos.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "external-access",
        description: "Condições de acesso e circulação externa",
        practicalDescription:
          "Verificar se os acessos e circulações externas estão livres, seguros e compatíveis com o uso previsto.",
        stepByStep: [
          "Percorrer caminhos, acessos, rampas e circulações externas.",
          "Identificar obstáculos, irregularidades ou bloqueios.",
          "Verificar condições de uso seguro.",
          "Registrar interferências encontradas.",
        ],
        objectiveCriteria: {
          approved:
            "Acessos livres, seguros e sem interferências.",
          rejected:
            "Obstáculos, bloqueios ou condições inseguras de circulação.",
          na: "Quando não aplicável.",
        },
        technicalBasis: [
          "ABNT NBR 9050 — Acessibilidade.",
          "ABNT NBR 15575 — Segurança no uso.",
        ],
        criticality: {
          low: {
            label: "Pequena interferência.",
            reportText:
              "Impacto reduzido no uso.",
          },
          medium: {
            label: "Interferência moderada.",
            reportText:
              "Compromete parcialmente circulação.",
          },
          high: {
            label: "Risco à segurança.",
            reportText:
              "Compromete diretamente o uso seguro da área.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
      {
        id: "external-lighting",
        description: "Iluminação externa",
        practicalDescription:
          "Verificar se a iluminação externa está funcional e adequada ao uso do ambiente.",
        stepByStep: [
          "Acionar pontos de iluminação externa.",
          "Verificar funcionamento das luminárias.",
          "Identificar falhas ou ausência de iluminação.",
          "Registrar pontos não funcionais.",
        ],
        objectiveCriteria: {
          approved: "Iluminação funcional.",
          rejected: "Falha ou ausência de iluminação.",
          na: "Quando não houver iluminação instalada.",
        },
        technicalBasis: [
          "ABNT NBR 5410 — Instalações elétricas.",
          "ABNT NBR 15575 — Segurança e funcionalidade.",
        ],
        criticality: {
          low: {
            label: "Falha pontual.",
            reportText:
              "Impacto reduzido.",
          },
          medium: {
            label: "Falha recorrente.",
            reportText:
              "Compromete uso parcial.",
          },
          high: {
            label: "Ausência ou risco.",
            reportText:
              "Compromete segurança.",
          },
        },
        status: "pending",
        severity: "",
        photos: [],
      },
    ],
  },
];