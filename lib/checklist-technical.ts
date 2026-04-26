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
        instruction: "Meça com trena ou laser e compare com a referência técnica disponível.",
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
        instruction: "Meça do piso acabado ao teto acabado e compare com a referência.",
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
        instruction: "Compare diagonais ou confira cantos para identificar desalinhamento geométrico.",
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
          approved: "Diferença entre diagonais menor ou igual a 10 mm em ambientes pequenos e médios.",
          rejected: "Diferença entre diagonais superior a 10 mm ou desalinhamento incompatível com a execução prevista.",
          na: "Quando a geometria do ambiente não permitir a aferição com confiabilidade.",
        },
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
        instruction: "Inspecione visualmente, meça a abertura quando possível e registre padrão e localização.",
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
          approved: "Ausência de fissuras ou apenas microfissuras superficiais menores ou iguais a 0,3 mm, sem repetição relevante e sem infiltração associada.",
          rejected: "Fissuras visíveis superiores a 0,3 mm, trincas, padrão repetitivo, associação com umidade ou indício de movimentação do sistema.",
          na: "Quando a superfície estiver encoberta, inacessível ou impossibilitada de avaliação confiável.",
        },
        criticality: {
          low: {
            label: "Fissuras entre 0,3 mm e 0,5 mm.",
            reportText:
              "Não conformidade de baixa criticidade, geralmente associada a retração, acomodação ou movimentações pequenas do sistema. Ainda que não indique, por si só, falha estrutural, já pode comprometer acabamento e iniciar trajetos para infiltração superficial, merecendo correção e monitoramento.",
          },
          medium: {
            label: "Fissuras entre 0,5 mm e 1,0 mm ou repetição do padrão.",
            reportText:
              "Faixa que já indica perda mais perceptível de desempenho do sistema de vedação, com maior potencial de infiltração, desprendimento de acabamento e redução da durabilidade.",
          },
          high: {
            label: "Fissuras acima de 1,0 mm ou infiltração ativa.",
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
        instruction: "Use régua de 2,0 m para conferir empenos e irregularidades.",
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
          approved: "Irregularidade menor ou igual a 3 mm sob régua de 2,0 m.",
          rejected: "Irregularidade superior a 3 mm sob régua de 2,0 m.",
          na: "Quando a superfície não estiver acessível para aferição.",
        },
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
        instruction: "Faça percussão leve e identifique som cavo, estufamento ou desprendimento.",
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
          approved: "Ausência de som cavo relevante ou presença apenas pontual sem perda funcional perceptível.",
          rejected: "Presença de som cavo em área perceptível, áreas concentradas ou indício de desprendimento.",
          na: "Quando não houver revestimento aderido passível desse tipo de verificação.",
        },
        criticality: {
          low: {
            label: "Som cavo em ponto isolado de pequena extensão.",
            reportText:
              "Não conformidade localizada, ainda sem evidência de desprendimento iminente, mas já indicativa de perda parcial de aderência e necessidade de correção preventiva.",
          },
          medium: {
            label: "Som cavo em área localizada relevante ou vários pontos.",
            reportText:
              "Situação que já revela perda mais significativa de aderência, com potencial de evolução para fissuração, destacamento de placas e necessidade de intervenção corretiva dirigida.",
          },
          high: {
            label: "Som cavo extenso, estufamento, peças soltas ou risco de queda.",
            reportText:
              "Configuração de alta criticidade, por comprometer a integridade do sistema de revestimento e representar risco de desprendimento, perda de desempenho e necessidade de ação prioritária.",
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
        instruction: "Use régua e caminhe pelo ambiente para identificar desníveis relevantes.",
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
          approved: "Ausência de desnível perceptível relevante e irregularidades dentro do padrão técnico do acabamento.",
          rejected: "Desnível perceptível ao caminhar, irregularidade visível ou interferência funcional no uso do ambiente.",
          na: "Quando o piso ainda não estiver acabado ou não puder ser avaliado.",
        },
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
            label: "Desnível importante, risco de tropeço ou interferência acentuada no uso.",
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
        instruction: "Lance água e verifique o direcionamento ao ralo, sem poças.",
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
          approved: "Água escoa adequadamente para o ralo, sem formação de poças relevantes após o teste.",
          rejected: "Água permanece retida, forma poças ou escoa em direção incompatível com o ralo.",
          na: "Quando o ambiente não for área molhada ou não houver drenagem prevista.",
        },
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
            label: "Retenção acentuada, escoamento invertido ou associação com infiltração.",
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
        "Registrar a extensão da área comprometida."
      ],
      objectiveCriteria: {
        approved: "Peças firmes, sem movimentação e sem som cavo relevante.",
        rejected: "Presença de som cavo significativo, peça solta, movimentação ao pisar ou indício de desplacamento.",
        na: "Quando o sistema de piso não permitir esse tipo de avaliação."
      },
      criticality: {
        low: {
          label: "Ponto isolado de pequena extensão.",
          reportText:
            "Não conformidade localizada, ainda sem perda funcional importante, mas indicativa de execução imperfeita e necessidade de reparo pontual."
        },
        medium: {
          label: "Vários pontos com som cavo ou movimentação localizada.",
          reportText:
            "Situação que já compromete a confiança no sistema de piso e pode evoluir para quebra de peças, perda de acabamento e manutenção corretiva mais ampla."
        },
        high: {
          label: "Peças soltas, área extensa comprometida ou risco de quebra/desprendimento.",
          reportText:
            "Compromete diretamente segurança e durabilidade do piso, justificando intervenção prioritária por risco de acidente e perda relevante do sistema."
        }
      },
      status: "pending",
      severity: "",
      photos: []
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
        "Registrar os trechos comprometidos."
      ],
      objectiveCriteria: {
        approved: "Rejuntes contínuos, sem falhas relevantes e com bom acabamento.",
        rejected: "Perda de material, fissuras, vazios ou descontinuidade perceptível dos rejuntes.",
        na: "Quando o sistema de piso não possuir rejunte aplicável."
      },
      criticality: {
        low: {
          label: "Falha pequena e pontual.",
          reportText:
            "Comprometimento localizado, predominantemente de acabamento, mas que requer reparo para evitar evolução."
        },
        medium: {
          label: "Falhas em vários trechos ou repetição do problema.",
          reportText:
            "Já interfere na qualidade do sistema e pode favorecer entrada de umidade e desgaste prematuro."
        },
        high: {
          label: "Falhas extensas ou associação com destacamento e infiltração.",
          reportText:
            "Compromete o desempenho global do revestimento e exige intervenção prioritária para restabelecer funcionalidade e durabilidade."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    }

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
        "Registrar localização e extensão."
      ],
      objectiveCriteria: {
        approved: "Ausência de fissuras relevantes ou apenas microfissuras superficiais menores ou iguais a 0,3 mm sem sinais associados.",
        rejected: "Fissuras superiores a 0,3 mm, juntas abertas, padrão recorrente ou associação com umidade/deformação.",
        na: "Quando o elemento não puder ser avaliado com segurança."
      },
      criticality: {
        low: {
          label: "Abertura entre 0,3 mm e 0,5 mm sem outros sinais.",
          reportText:
            "Pode representar retração ou movimentação leve, ainda sem perda funcional importante, mas fora do padrão de acabamento desejado."
        },
        medium: {
          label: "Abertura entre 0,5 mm e 1,0 mm ou repetição do padrão.",
          reportText:
            "Indica perda mais perceptível de desempenho do acabamento, podendo favorecer infiltração, destacamento ou necessidade de reparo mais abrangente."
        },
        high: {
          label: "Abertura superior a 1,0 mm, deformação associada ou infiltração ativa.",
          reportText:
            "Situação de alta criticidade, pela possibilidade de perda relevante do sistema, instabilidade local ou patologia associada que exige providência prioritária."
        }
      },
      status: "pending",
      severity: "",
      photos: []
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
        "Registrar localização e intensidade do sinal encontrado."
      ],
      objectiveCriteria: {
        approved: "Ausência de manchas, mofo ou sinais aparentes de infiltração.",
        rejected: "Presença de manchas, bolor, descascamento ou umidade associada.",
        na: "Quando não houver condição de avaliação confiável."
      },
      criticality: {
        low: {
          label: "Mancha antiga e superficial, sem atividade aparente.",
          reportText:
            "Indício de ocorrência passada, ainda sem evidência clara de atividade atual, mas que exige registro e verificação da origem."
        },
        medium: {
          label: "Umidade recorrente, bolor ou descascamento localizado.",
          reportText:
            "Já compromete desempenho e salubridade do ambiente, com potencial para deterioração progressiva do acabamento."
        },
        high: {
          label: "Infiltração ativa, gotejamento ou deterioração acentuada.",
          reportText:
            "Perda severa de desempenho do sistema, com comprometimento de estanqueidade, durabilidade e possível dano a instalações e acabamentos, justificando ação imediata."
        }
      },
      status: "pending",
      severity: "",
      photos: []
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
        "Registrar os pontos comprometidos."
      ],
      objectiveCriteria: {
        approved: "Forro alinhado, firme e sem deformações perceptíveis relevantes.",
        rejected: "Presença de desalinhamento, flecha aparente, folga em emendas ou instabilidade.",
        na: "Quando não houver forro."
      },
      criticality: {
        low: {
          label: "Desalinhamento discreto sem instabilidade.",
          reportText:
            "Comprometimento predominantemente visual, ainda sem risco imediato ao uso, mas já fora do padrão executivo esperado."
        },
        medium: {
          label: "Desalinhamento perceptível ou folga localizada.",
          reportText:
            "Indica perda moderada de desempenho do sistema, com possibilidade de evolução para abertura de juntas, trincas ou perda de acabamento."
        },
        high: {
          label: "Instabilidade, deformação acentuada ou risco de desprendimento.",
          reportText:
            "Compromete segurança de uso e integridade do sistema, exigindo providência corretiva prioritária."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    }
  ]
  },
  {
    id: "windows",
    title: "5. Esquadrias",
    tests: [
    {
      id: "window-operation",
      description: "Funcionamento de portas e janelas",
      practicalDescription:
        "Verificar se as esquadrias abrem, fecham e travam adequadamente, sem esforço anormal ou interferências incompatíveis com o uso.",
      stepByStep: [
        "Abrir integralmente a esquadria.",
        "Fechar integralmente a esquadria.",
        "Repetir o ciclo de operação mais de uma vez.",
        "Observar raspagem, empeno, travamento, atrito excessivo ou desalinhamento.",
        "Verificar o funcionamento de fechaduras, travas e ferragens.",
        "Registrar anomalias observadas."
      ],
      objectiveCriteria: {
        approved: "Abertura, fechamento e travamento normais, sem esforço anormal.",
        rejected: "Travamento, raspagem, desalinhamento, dificuldade de operação ou falha de fechamento.",
        na: "Quando o elemento não existir no ambiente."
      },
      criticality: {
        low: {
          label: "Ajuste leve sem perda significativa de uso.",
          reportText:
            "Pequena não conformidade operacional, geralmente corrigível com regulagem, ainda sem prejuízo importante ao desempenho global."
        },
        medium: {
          label: "Funcionamento comprometido com esforço anormal ou fechamento imperfeito.",
          reportText:
            "Situação que já afeta funcionalidade, conforto e estanqueidade, exigindo correção para restabelecer o desempenho previsto."
        },
        high: {
          label: "Travamento severo, impossibilidade de fechamento ou risco de desprendimento.",
          reportText:
            "Compromete diretamente segurança, uso e desempenho da esquadria, justificando ação corretiva prioritária."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    },
    {
      id: "window-sealing",
      description: "Vedação da esquadria",
      practicalDescription:
        "Verificar se a esquadria apresenta vedação compatível, sem frestas relevantes para entrada de ar, água ou poeira.",
      stepByStep: [
        "Fechar completamente a esquadria.",
        "Observar frestas visíveis de luz entre folha e marco, quando aplicável.",
        "Verificar a condição de borrachas, escovas, selantes e arremates.",
        "Quando possível, avaliar comportamento frente à incidência de água ou vento.",
        "Registrar pontos de perda de vedação."
      ],
      objectiveCriteria: {
        approved: "Vedação adequada, sem frestas relevantes ou perda de desempenho aparente.",
        rejected: "Frestas visíveis, falha de vedação, ausência ou dano em componentes vedantes.",
        na: "Quando o teste não se aplicar ao elemento."
      },
      criticality: {
        low: {
          label: "Fresta pequena sem infiltração aparente.",
          reportText:
            "Perda leve de vedação, ainda sem reflexo relevante em estanqueidade, porém fora do padrão técnico desejado."
        },
        medium: {
          label: "Fresta perceptível ou vedação deficiente com perda funcional moderada.",
          reportText:
            "Pode gerar entrada de vento, poeira, ruído ou umidade, reduzindo o desempenho esperado do conjunto."
        },
        high: {
          label: "Falha severa de vedação, infiltração ou perda importante de desempenho.",
          reportText:
            "Compromete de forma relevante a estanqueidade e o conforto do ambiente, justificando correção prioritária."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    },
    {
      id: "window-glass",
      description: "Integridade dos vidros",
      practicalDescription:
        "Verificar se os vidros estão íntegros, sem trincas, lascas relevantes, folgas ou risco de desprendimento.",
      stepByStep: [
        "Inspecionar visualmente todo o pano de vidro.",
        "Procurar trincas, lascas, quebras, riscos profundos ou falhas de fixação.",
        "Verificar a condição dos apoios, baguetes, borrachas e selantes.",
        "Registrar os danos observados."
      ],
      objectiveCriteria: {
        approved: "Vidro íntegro, sem trincas e com fixação adequada.",
        rejected: "Trinca, lasca relevante, folga de fixação ou risco de quebra/desprendimento.",
        na: "Quando não houver vidro no elemento."
      },
      criticality: {
        low: {
          label: "Lasca pequena sem risco imediato.",
          reportText:
            "Dano localizado, ainda sem comprometer significativamente o uso, mas já fora do padrão técnico e estético esperado."
        },
        medium: {
          label: "Dano visível com perda parcial de desempenho ou fixação duvidosa.",
          reportText:
            "Situação que pode reduzir estanqueidade, segurança e vida útil do conjunto, exigindo correção programada."
        },
        high: {
          label: "Trinca, risco de quebra ou desprendimento.",
          reportText:
            "Não conformidade crítica pela possibilidade de acidente e perda direta da integridade do sistema, justificando substituição ou intervenção imediata."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    },
    {
      id: "window-frame",
      description: "Alinhamento e acabamento do marco/arremates",
      practicalDescription:
        "Verificar se os marcos e arremates das esquadrias estão alinhados, bem acabados e sem falhas que comprometam desempenho ou estética.",
      stepByStep: [
        "Observar o alinhamento visual do marco em relação à parede e ao vão.",
        "Verificar frestas excessivas, falhas de arremate e acabamento deficiente.",
        "Observar fissuras, destacamentos ou preenchimentos inadequados no entorno.",
        "Registrar as anomalias encontradas."
      ],
      objectiveCriteria: {
        approved: "Marco alinhado, arremates regulares e acabamento compatível com o padrão da obra.",
        rejected: "Desalinhamento perceptível, arremate deficiente, frestas ou falhas de acabamento relevantes.",
        na: "Quando o elemento não puder ser avaliado."
      },
      criticality: {
        low: {
          label: "Falha estética pontual.",
          reportText:
            "Comprometimento pequeno, predominantemente visual, sem perda funcional relevante imediata."
        },
        medium: {
          label: "Falhas perceptíveis com potencial de afetar vedação e acabamento.",
          reportText:
            "Pode gerar perda moderada de desempenho do conjunto, exigindo correção para restabelecer estanqueidade e padrão executivo."
        },
        high: {
          label: "Falha importante de arremate, frestas significativas ou comprometimento funcional.",
          reportText:
            "Compromete vedação, durabilidade e qualidade técnica da instalação, justificando ação corretiva prioritária."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    }
  ]
  },
  {
    id: "electrical",
    title: "6. Instalações Elétricas",
    tests: [
    {
      id: "electrical-outlets",
      description: "Funcionamento das tomadas",
      practicalDescription:
        "Verificar se as tomadas energizam corretamente e se não apresentam sinais de aquecimento, folga ou falha de contato.",
      stepByStep: [
        "Utilizar testador apropriado ou equipamento compatível para verificar alimentação da tomada.",
        "Testar cada tomada do ambiente.",
        "Observar folgas, mau contato aparente, aquecimento anormal, escurecimento ou ruídos.",
        "Verificar se o espelho está corretamente fixado.",
        "Registrar as anomalias encontradas."
      ],
      objectiveCriteria: {
        approved: "Funcionamento normal, sem folgas relevantes e sem sinais de aquecimento ou falha.",
        rejected: "Ausência de alimentação, mau contato, aquecimento, folga excessiva ou indício de risco elétrico.",
        na: "Quando não houver tomada no ponto avaliado."
      },
      criticality: {
        low: {
          label: "Falha simples de acabamento ou pequena folga sem aquecimento.",
          reportText:
            "Não conformidade leve, geralmente passível de ajuste simples, mas já fora do padrão seguro e adequado de entrega."
        },
        medium: {
          label: "Tomada sem funcionamento ou com contato deficiente.",
          reportText:
            "Perda funcional moderada do sistema, exigindo correção para restabelecer uso regular e confiável do ponto elétrico."
        },
        high: {
          label: "Aquecimento, escurecimento, risco de choque ou curto-circuito.",
          reportText:
            "Não conformidade crítica sob a ótica de segurança da instalação, pois compromete diretamente a segurança do usuário, demandando ação imediata."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    },
    {
      id: "electrical-switches",
      description: "Funcionamento dos interruptores",
      practicalDescription:
        "Verificar se os interruptores comandam corretamente os circuitos previstos, sem falha, aquecimento ou folga excessiva.",
      stepByStep: [
        "Acionar o interruptor ligando e desligando o circuito correspondente.",
        "Verificar resposta imediata do ponto controlado.",
        "Observar folga, ruídos, aquecimento ou mau encaixe do conjunto.",
        "Registrar falhas ou inconsistências."
      ],
      objectiveCriteria: {
        approved: "Acionamento normal, sem aquecimento e com funcionamento correto do circuito.",
        rejected: "Falha de acionamento, aquecimento, folga excessiva ou irregularidade no comando.",
        na: "Quando o ponto não existir no ambiente."
      },
      criticality: {
        low: {
          label: "Falha de acabamento ou pequena folga sem perda de função.",
          reportText:
            "Irregularidade leve, predominantemente de instalação ou acabamento, ainda sem perda importante de desempenho."
        },
        medium: {
          label: "Funcionamento irregular ou acionamento intermitente.",
          reportText:
            "Indica perda funcional moderada do sistema e necessidade de correção técnica para evitar agravamento."
        },
        high: {
          label: "Aquecimento, falha severa ou risco elétrico evidente.",
          reportText:
            "Compromete a segurança e o uso da instalação, configurando condição crítica que exige correção prioritária."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    },
    {
      id: "electrical-finish",
      description: "Fixação e acabamento dos pontos elétricos",
      practicalDescription:
        "Verificar se espelhos, tomadas, interruptores e caixas aparentes estão bem fixados e com acabamento compatível.",
      stepByStep: [
        "Inspecionar visualmente os pontos elétricos.",
        "Verificar alinhamento dos espelhos e firmeza de fixação.",
        "Observar frestas, folgas, componentes tortos ou mal acabados.",
        "Registrar os pontos com irregularidade."
      ],
      objectiveCriteria: {
        approved: "Componentes firmes, alinhados e com acabamento regular.",
        rejected: "Componentes soltos, tortos, desalinhados ou com acabamento deficiente.",
        na: "Quando não houver ponto elétrico no local."
      },
      criticality: {
        low: {
          label: "Desalinhamento ou falha de acabamento pontual.",
          reportText:
            "Irregularidade leve, com reflexo principalmente visual, porém fora do padrão técnico adequado."
        },
        medium: {
          label: "Fixação deficiente com possibilidade de dano ao uso.",
          reportText:
            "Já compromete parcialmente segurança e durabilidade do ponto, exigindo correção de instalação."
        },
        high: {
          label: "Componente solto ou com risco de exposição elétrica.",
          reportText:
            "Condição crítica por comprometer diretamente a segurança da instalação e do usuário."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    },
    {
      id: "electrical-safety",
      description: "Anomalias aparentes de segurança elétrica",
      practicalDescription:
        "Verificar a existência de sinais visuais de risco elétrico, como fios aparentes, emendas inadequadas ou componentes danificados.",
      stepByStep: [
        "Inspecionar visualmente todos os pontos e trechos aparentes da instalação acessível.",
        "Identificar fios expostos, emendas improvisadas, partes quebradas ou sinais de aquecimento.",
        "Observar odor de queimado, escurecimento ou deformação de componentes.",
        "Registrar os achados."
      ],
      objectiveCriteria: {
        approved: "Ausência de anomalias aparentes que indiquem risco elétrico.",
        rejected: "Presença de fios expostos, emendas inadequadas, componentes danificados ou sinais de aquecimento/queima.",
        na: "Quando não houver acesso visual à instalação."
      },
      criticality: {
        low: {
          label: "Anomalia visual sem exposição direta a partes energizadas.",
          reportText:
            "Indica instalação abaixo do padrão, mas sem risco imediato elevado, exigindo correção programada."
        },
        medium: {
          label: "Componente danificado ou situação que pode evoluir para falha de segurança.",
          reportText:
            "Compromete confiabilidade e segurança da instalação, merecendo intervenção célere."
        },
        high: {
          label: "Exposição de partes energizadas, aquecimento ou sinal claro de risco.",
          reportText:
            "Condição crítica de segurança, exigindo interrupção de uso e correção imediata."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    }
  ]
  },
  {
    id: "hydraulic",
    title: "7. Instalações Hidráulicas",
    tests: [
    {
      id: "hydraulic-leaks",
      description: "Vazamentos em pontos hidráulicos",
      practicalDescription:
        "Verificar se há vazamentos em torneiras, registros, conexões, sifões e demais pontos hidráulicos acessíveis.",
      stepByStep: [
        "Abrir o ponto hidráulico avaliado.",
        "Observar conexões, registros, uniões, base das peças e sifões.",
        "Verificar se há gotejamento, escorrimento ou vazamento contínuo.",
        "Registrar os pontos comprometidos."
      ],
      objectiveCriteria: {
        approved: "Ausência de vazamentos aparentes nos pontos avaliados.",
        rejected: "Presença de gotejamento, escorrimento, vazamento ou umidade localizada associada ao ponto.",
        na: "Quando o ponto não existir ou não puder ser testado."
      },
      criticality: {
        low: {
          label: "Gotejamento leve e pontual.",
          reportText:
            "Não conformidade de baixa criticidade, com impacto localizado e possibilidade de correção pontual, porém já fora do padrão técnico esperado."
        },
        medium: {
          label: "Vazamento perceptível com impacto funcional ou risco de dano a acabamento.",
          reportText:
            "Não conformidade de média criticidade, com potencial de comprometer parcialmente o uso e causar degradação localizada de acabamentos, recomendando-se correção célere."
        },
        high: {
          label: "Vazamento contínuo, ativo ou com potencial de dano relevante.",
          reportText:
            "Não conformidade de alta criticidade, com potencial de comprometer o desempenho do ambiente, gerar danos a acabamentos e agravar patologias associadas, justificando intervenção prioritária."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    },
    {
      id: "hydraulic-pressure",
      description: "Pressão e vazão adequadas",
      practicalDescription:
        "Verificar se a pressão e a vazão dos pontos hidráulicos são compatíveis com o uso previsto.",
      stepByStep: [
        "Abrir integralmente o ponto hidráulico.",
        "Observar intensidade do fluxo e estabilidade da vazão.",
        "Comparar o comportamento entre pontos do ambiente, quando aplicável.",
        "Registrar anomalias percebidas."
      ],
      objectiveCriteria: {
        approved: "Pressão e vazão adequadas ao uso, sem irregularidades relevantes.",
        rejected: "Fluxo insuficiente, oscilação excessiva ou desempenho incompatível com o uso esperado.",
        na: "Quando o ponto não existir ou não puder ser operado."
      },
      criticality: {
        low: {
          label: "Desempenho ligeiramente abaixo do ideal.",
          reportText:
            "Perda leve de desempenho, ainda sem inviabilizar o uso, mas fora do padrão técnico esperado."
        },
        medium: {
          label: "Baixa vazão perceptível, comprometendo parte do uso.",
          reportText:
            "Afeta funcionalidade e conforto de uso do ponto hidráulico, exigindo verificação e correção."
        },
        high: {
          label: "Pressão/vazão incompatível com a operação adequada do sistema.",
          reportText:
            "Compromete de forma importante a funcionalidade do sistema hidráulico, justificando tratativa prioritária."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    },
    {
      id: "hydraulic-drainage",
      description: "Escoamento adequado",
      practicalDescription:
        "Verificar se o escoamento da água ocorre de forma adequada, sem lentidão excessiva, refluxo ou retenção incompatível.",
      stepByStep: [
        "Lançar água no ponto de drenagem ou utilizar o ponto hidráulico correspondente.",
        "Observar a velocidade do escoamento.",
        "Identificar sinais de lentidão, refluxo, borbulhamento anômalo ou retenção.",
        "Registrar os pontos comprometidos."
      ],
      objectiveCriteria: {
        approved: "Escoamento regular, sem lentidão relevante ou refluxo.",
        rejected: "Escoamento lento, refluxo, retenção incompatível ou sinal de obstrução.",
        na: "Quando o ponto não existir ou não puder ser testado."
      },
      criticality: {
        low: {
          label: "Lentidão leve sem refluxo.",
          reportText:
            "Indica perda pontual de desempenho do escoamento, ainda sem prejuízo severo ao uso."
        },
        medium: {
          label: "Lentidão recorrente ou retenção funcional perceptível.",
          reportText:
            "Compromete parte do uso e pode favorecer acúmulo de umidade e manutenção corretiva recorrente."
        },
        high: {
          label: "Refluxo, obstrução severa ou perda importante de funcionalidade.",
          reportText:
            "Configura não conformidade de alta criticidade, justificando correção prioritária para restabelecer o desempenho do sistema."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    }
  ]
  },
  




{
  id: "fixtures",
  title: "8. Louças e Metais",
  tests: [
    {
      id: "fixtures-fixation",
      description: "Fixação adequada",
      practicalDescription:
        "Verificar se as peças sanitárias, metais e acessórios estão fixados de forma adequada, sem folgas ou instabilidade.",
      stepByStep: [
        "Inspecionar visualmente e, quando apropriado, verificar manualmente a firmeza da peça.",
        "Observar deslocamentos, folgas ou movimentos anormais.",
        "Registrar os pontos comprometidos."
      ],
      objectiveCriteria: {
        approved: "Fixação firme e compatível com o uso previsto.",
        rejected: "Folga, instabilidade, deslocamento ou fixação inadequada.",
        na: "Quando o elemento não existir no ambiente."
      },
      criticality: {
        low: {
          label: "Folga pequena sem perda importante de função.",
          reportText:
            "Irregularidade pontual ainda sem comprometer significativamente o uso, mas fora do padrão técnico adequado."
        },
        medium: {
          label: "Fixação comprometida com impacto moderado no uso.",
          reportText:
            "Pode comprometer durabilidade e funcionamento do elemento, exigindo correção dirigida."
        },
        high: {
          label: "Instabilidade relevante ou risco de desprendimento.",
          reportText:
            "Compromete segurança de uso e integridade da peça, justificando correção prioritária."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    },
    {
      id: "fixtures-function",
      description: "Funcionamento correto",
      practicalDescription:
        "Verificar se louças, metais e dispositivos associados funcionam de forma regular e compatível com o uso.",
      stepByStep: [
        "Acionar o componente avaliado.",
        "Observar resposta funcional, vazão, vedação e retorno ao estado de repouso.",
        "Registrar falhas percebidas."
      ],
      objectiveCriteria: {
        approved: "Funcionamento normal e compatível com o uso.",
        rejected: "Falha de acionamento, vazamento, mau funcionamento ou desempenho incompatível.",
        na: "Quando o elemento não existir ou não puder ser operado."
      },
      criticality: {
        low: {
          label: "Falha leve ou intermitente.",
          reportText:
            "Pequena perda de desempenho, ainda sem comprometimento funcional severo, mas fora do padrão esperado."
        },
        medium: {
          label: "Mau funcionamento perceptível com prejuízo parcial ao uso.",
          reportText:
            "Compromete parte da funcionalidade do elemento e exige correção técnica para restabelecer desempenho adequado."
        },
        high: {
          label: "Falha importante, vazamento ou impossibilidade de uso adequado.",
          reportText:
            "Não conformidade de alta criticidade, com comprometimento direto do uso e possível agravamento de danos associados."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    }
  ]
},
{
  id: "waterproofing",
  title: "9. Impermeabilização e Umidade",
  tests: [
    {
      id: "waterproofing-signs",
      description: "Sinais de umidade e perda de estanqueidade",
      practicalDescription:
        "Verificar sinais visuais compatíveis com falha de estanqueidade, umidade persistente ou deficiência de impermeabilização.",
      stepByStep: [
        "Inspecionar paredes, pisos, rodapés, encontros e áreas sensíveis à umidade.",
        "Identificar manchas, bolor, escurecimento, eflorescência ou destacamento.",
        "Relacionar a manifestação com áreas molhadas, fachadas ou instalações.",
        "Registrar localização e intensidade aparente."
      ],
      objectiveCriteria: {
        approved: "Ausência de sinais relevantes de umidade ou perda de estanqueidade.",
        rejected: "Presença de sinais compatíveis com umidade persistente, infiltração ou perda de desempenho.",
        na: "Quando não houver condição de avaliação confiável."
      },
      criticality: {
        low: {
          label: "Manifestação pontual e superficial.",
          reportText:
            "Indício localizado de perda de estanqueidade, ainda sem impacto amplo, mas incompatível com o desempenho esperado."
        },
        medium: {
          label: "Manifestação recorrente ou com início de degradação do sistema.",
          reportText:
            "Compromete parte do desempenho do ambiente e pode evoluir com perda de acabamento e salubridade."
        },
        high: {
          label: "Manifestação intensa, infiltração ativa ou comprometimento importante do desempenho.",
          reportText:
            "Não conformidade severa, com potencial de afetar durabilidade, salubridade e integridade do sistema, justificando intervenção prioritária."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    }
  ]
},
{
  id: "compliance",
  title: "10. Conformidade e Condição de Entrega",
  tests: [
    {
      id: "delivery-condition",
      description: "Condição geral de entrega do ambiente",
      practicalDescription:
        "Verificar se a condição geral de limpeza, organização e apresentação do ambiente é compatível com entrega técnica e avaliação adequada.",
      stepByStep: [
        "Inspecionar visualmente o ambiente como um todo.",
        "Identificar sujeira, resíduos, materiais remanescentes de obra ou condição incompatível com entrega.",
        "Avaliar se a condição prejudica a vistoria, o uso ou a percepção de qualidade da entrega.",
        "Registrar os pontos comprometidos."
      ],
      objectiveCriteria: {
        approved: "Ambiente em condição compatível com entrega técnica e avaliação adequada.",
        rejected: "Resíduos ou sujeira impedem avaliação adequada ou caracterizam condição de entrega inadequada.",
        na: "Quando o teste não se aplicar."
      },
      criticality: {
        low: {
          label: "Sujeira superficial sem impedir vistoria ou uso.",
          reportText:
            "Irregularidade leve, ainda sem comprometer de forma importante a avaliação ou a utilização do ambiente."
        },
        medium: {
          label: "Resíduos que prejudicam parte da vistoria ou do uso.",
          reportText:
            "Compromete parcialmente a condição de entrega e dificulta leitura técnica adequada do ambiente."
        },
        high: {
          label: "Condição incompatível com entrega técnica, ocultando defeitos ou impedindo uso.",
          reportText:
            "Configura não conformidade relevante de entrega, comprometendo avaliação, uso e percepção técnica do ambiente, justificando providência corretiva prioritária."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    },
    {
      id: "aggressive-residues",
      description: "Ausência de resíduos que comprometam acabamentos",
      practicalDescription:
        "Verificar se não há resíduos aderidos ou agressivos ao acabamento, como argamassa endurecida, tinta, cola, graxa, pó abrasivo ou materiais que possam degradar superfícies.",
      stepByStep: [
        "Inspecionar pisos, paredes, bancadas, esquadrias, metais, louças e vidros.",
        "Identificar resíduos aderidos ou materiais de difícil remoção.",
        "Avaliar se o resíduo já causou dano ao acabamento ou se compromete a apresentação final.",
        "Registrar as áreas afetadas."
      ],
      objectiveCriteria: {
        approved: "Ausência de resíduos aderidos com potencial de danificar ou descaracterizar o acabamento.",
        rejected: "Presença de resíduos aderidos, agressivos ou com dano perceptível ao acabamento.",
        na: "Quando não houver possibilidade de avaliação do elemento."
      },
      criticality: {
        low: {
          label: "Resíduo pontual removível sem dano aparente.",
          reportText:
            "Irregularidade localizada, ainda sem dano relevante ao acabamento, mas fora do padrão técnico adequado de entrega."
        },
        medium: {
          label: "Resíduo recorrente ou aderido com risco de danificação.",
          reportText:
            "Compromete parte da condição de entrega e pode gerar perda de qualidade do acabamento se não corrigido."
        },
        high: {
          label: "Resíduo agressivo com dano ao acabamento ou comprometimento relevante da entrega.",
          reportText:
            "Não conformidade severa de entrega, com dano efetivo ou potencial relevante ao acabamento, justificando tratativa corretiva prioritária."
        }
      },
      status: "pending",
      severity: "",
      photos: []
    }
  ]
}
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
          "Realizar inspeção visual em todo o pano de fachada acessível.",
          "Identificar fissuras, trincas, aberturas lineares ou padrão de fissuração.",
          "Observar a direção predominante da fissura.",
          "Medir a abertura quando possível.",
          "Verificar repetição do padrão e associação com umidade.",
          "Registrar localização e extensão."
        ],
        objectiveCriteria: {
          approved: "Ausência de fissuras relevantes ou apenas microfissuras superficiais ≤ 0,3 mm, sem infiltração associada.",
          rejected: "Fissuras visíveis > 0,3 mm, trincas, repetição do padrão ou associação com umidade.",
          na: "Quando a superfície não puder ser avaliada com segurança."
        },
        criticality: {
          low: {
            label: "0,3 a 0,5 mm",
            reportText:
              "Não conformidade de baixa criticidade, ainda sem indício estrutural imediato, porém já suficiente para comprometer acabamento e iniciar perda localizada de estanqueidade superficial da fachada."
          },
          medium: {
            label: "0,5 a 1,0 mm ou repetição",
            reportText:
              "Indica perda mais perceptível de desempenho do sistema de vedação externa, com maior potencial de infiltração, degradação do revestimento e redução de durabilidade do pano de fachada."
          },
          high: {
            label: "> 1,0 mm ou infiltração ativa",
            reportText:
              "Configuração compatível com não conformidade severa, podendo indicar movimentação estrutural, recalque, falha de interface entre elementos ou perda significativa de desempenho da fachada, exigindo providência prioritária."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      },
      {
        id: "facade-adhesion",
        description: "Aderência do revestimento externo",
        practicalDescription:
          "Verificar se o revestimento externo está adequadamente aderido ao substrato, sem áreas ocas, estufamento ou risco de desprendimento.",
        stepByStep: [
          "Realizar percussão leve e sistemática nos trechos acessíveis.",
          "Identificar diferenças sonoras entre regiões firmes e regiões com som cavo.",
          "Delimitar a área comprometida quando possível.",
          "Observar fissuras, estufamento ou deslocamento de peças.",
          "Registrar extensão aproximada e localização."
        ],
        objectiveCriteria: {
          approved: "Ausência de som cavo relevante ou presença apenas pontual sem risco perceptível de destacamento.",
          rejected: "Presença de som cavo em área perceptível, estufamento, destacamento ou indício de desprendimento.",
          na: "Quando o tipo de acabamento não permitir esse tipo de verificação."
        },
        criticality: {
          low: {
            label: "Ponto isolado de pequena extensão",
            reportText:
              "Não conformidade localizada, ainda sem evidência de destacamento iminente, mas já indicativa de perda parcial de aderência e necessidade de reparo preventivo."
          },
          medium: {
            label: "Área localizada relevante ou repetição",
            reportText:
              "Revela perda moderada de aderência, com potencial de evolução para fissuração, destacamento e necessidade de intervenção corretiva dirigida."
          },
          high: {
            label: "Extenso, estufamento ou risco de queda",
            reportText:
              "Compromete diretamente integridade e segurança do sistema de fachada, justificando ação prioritária pela possibilidade de desprendimento e perda importante de desempenho."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      },
      {
        id: "facade-paint",
        description: "Pintura externa uniforme e sem patologias aparentes",
        practicalDescription:
          "Verificar se a pintura da fachada apresenta uniformidade visual e ausência de defeitos que indiquem falha de preparo, perda de aderência, degradação por intempéries ou umidade associada.",
        stepByStep: [
          "Observar a fachada sob iluminação natural adequada.",
          "Identificar diferenças de tonalidade, manchas, escorridos, bolhas e descascamentos.",
          "Verificar se as falhas estão associadas a umidade, fissuras ou eflorescência.",
          "Registrar os pontos comprometidos e a recorrência."
        ],
        objectiveCriteria: {
          approved: "Pintura com aparência uniforme, sem falhas relevantes visíveis.",
          rejected: "Presença de manchas, descascamento, bolhas, pulverulência ou falhas perceptíveis.",
          na: "Quando não houver pintura externa no elemento."
        },
        criticality: {
          low: {
            label: "Falha estética pontual",
            reportText:
              "Irregularidade leve, com reflexo predominantemente visual, ainda sem perda funcional importante do acabamento externo."
          },
          medium: {
            label: "Falhas espalhadas ou repetitivas",
            reportText:
              "Compromete a percepção de qualidade e já indica perda moderada de desempenho do acabamento, podendo evoluir com exposição ao tempo."
          },
          high: {
            label: "Bolhas, descascamento intenso ou umidade ativa",
            reportText:
              "Não conformidade severa por comprometer de forma relevante a proteção superficial da fachada e indicar falha importante do sistema de acabamento."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      },
      {
        id: "facade-humidity",
        description: "Eflorescência e sinais de umidade na fachada",
        practicalDescription:
          "Verificar a presença de eflorescência, escurecimento, manchas de umidade, bolor ou outras manifestações patológicas associadas à presença de água no sistema de vedação externa.",
        stepByStep: [
          "Inspecionar visualmente a fachada, especialmente em regiões inferiores e encontros.",
          "Identificar depósitos esbranquiçados, trilhas de água, escurecimentos e bolor.",
          "Verificar se a manifestação é isolada, linear ou recorrente.",
          "Registrar localização, extensão e intensidade aparente."
        ],
        objectiveCriteria: {
          approved: "Ausência de sinais relevantes de umidade, eflorescência ou perda de estanqueidade na fachada.",
          rejected: "Presença de eflorescência, manchas, bolor, trilhas de água ou manifestação compatível com umidade.",
          na: "Quando a superfície não estiver acessível."
        },
        criticality: {
          low: {
            label: "Pontual e superficial",
            reportText:
              "Manifestação localizada, ainda sem perda importante de desempenho global, mas já fora do padrão esperado de estanqueidade e acabamento."
          },
          medium: {
            label: "Recorrente ou com deterioração moderada",
            reportText:
              "Indica perda moderada de desempenho da fachada, com potencial de progressão da umidade e degradação do revestimento."
          },
          high: {
            label: "Intensa, generalizada ou com infiltração ativa",
            reportText:
              "Compromete de forma relevante a estanqueidade e durabilidade do sistema externo, exigindo providência corretiva prioritária."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      }
    ]
  },
  {
    id: "external-floors",
    title: "2. Pisos Externos",
    tests: [
      {
        id: "external-level",
        description: "Nivelamento e regularidade do piso externo",
        practicalDescription:
          "Verificar se o piso externo apresenta desníveis, deformações ou irregularidades capazes de comprometer circulação, segurança de uso e comportamento superficial da água.",
        stepByStep: [
          "Percorrer o piso externo observando irregularidades, depressões, ressaltos e diferenças de nível.",
          "Posicionar régua ou nível em pontos representativos.",
          "Identificar interferência na circulação ou no uso normal da área.",
          "Registrar os pontos críticos e a intensidade aparente da irregularidade."
        ],
        objectiveCriteria: {
          approved: "Ausência de desnível perceptível relevante e regularidade compatível com uso seguro.",
          rejected: "Desnível perceptível, deformação, depressão ou irregularidade capaz de comprometer circulação, segurança ou qualidade executiva.",
          na: "Quando a área não estiver finalizada ou não puder ser avaliada adequadamente."
        },
        criticality: {
          low: {
            label: "Irregularidade leve, predominantemente estética",
            reportText:
              "Ainda sem comprometer de modo importante a circulação, mas fora do padrão técnico adequado do piso."
          },
          medium: {
            label: "Irregularidade perceptível com interferência moderada",
            reportText:
              "Já reduz a funcionalidade da área e pode favorecer retenção de água, desconforto de uso e desgaste localizado do piso."
          },
          high: {
            label: "Desnível acentuado ou risco de tropeço/queda",
            reportText:
              "Configura não conformidade severa do piso externo por afetar diretamente segurança e desempenho funcional da área."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      },
      {
        id: "external-slope",
        description: "Caimento e direcionamento da água",
        practicalDescription:
          "Verificar se o piso externo direciona adequadamente a água para pontos de drenagem, sem empoçamentos incompatíveis com o uso e a durabilidade do sistema.",
        stepByStep: [
          "Lançar água em pontos representativos da área externa.",
          "Observar a direção do escoamento e o tempo de permanência da água.",
          "Verificar formação de poças ou escoamento em sentido inadequado.",
          "Registrar os pontos de retenção ou fluxo incorreto."
        ],
        objectiveCriteria: {
          approved: "Água escoa adequadamente para ralos, grelhas ou áreas de dissipação, sem poças relevantes.",
          rejected: "Água permanece retida, forma poças significativas, escoa em sentido incompatível ou retorna para zonas sensíveis.",
          na: "Quando a área não permitir o teste."
        },
        criticality: {
          low: {
            label: "Pequena retenção localizada",
            reportText:
              "Indica falha funcional leve, ainda restrita, mas incompatível com a execução ideal da área externa."
          },
          medium: {
            label: "Poças recorrentes ou escoamento incompleto",
            reportText:
              "Compromete parte do desempenho da área externa, dificulta uso e limpeza e aumenta o potencial de degradação do sistema."
          },
          high: {
            label: "Retenção acentuada, fluxo invertido ou infiltração",
            reportText:
              "Perda importante de desempenho do piso externo, com risco funcional e de segurança, justificando correção prioritária."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      },
      {
        id: "external-slip",
        description: "Aderência / risco de escorregamento",
        practicalDescription:
          "Verificar se o piso externo apresenta condição superficial compatível com segurança de uso, especialmente em situações molhadas, sem risco excessivo de escorregamento.",
        stepByStep: [
          "Inspecionar o tipo de acabamento superficial do piso externo.",
          "Observar textura, desgaste e polimento excessivo.",
          "Avaliar regiões críticas como rampas, acessos e áreas molhadas.",
          "Registrar os pontos de maior risco percebido."
        ],
        objectiveCriteria: {
          approved: "Superfície com aderência compatível ao uso esperado, sem risco perceptível relevante de escorregamento.",
          rejected: "Superfície escorregadia ou condição incompatível com uso seguro, sobretudo em presença de água.",
          na: "Quando a área não puder ser avaliada com segurança."
        },
        criticality: {
          low: {
            label: "Leve redução de aderência",
            reportText:
              "Perda limitada de aderência, ainda sem risco imediato elevado, mas já fora do padrão recomendável para segurança de uso."
          },
          medium: {
            label: "Risco moderado em uso normal ou condição úmida",
            reportText:
              "Situação que já compromete segurança funcional da área, especialmente sob molhagem previsível."
          },
          high: {
            label: "Alto risco de queda",
            reportText:
              "Não conformidade crítica sob a ótica de segurança de uso, exigindo correção prioritária para redução do risco de acidentes."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      }
    ]
  },
  {
    id: "drainage",
    title: "3. Drenagem e Escoamento",
    tests: [
      {
        id: "drains",
        description: "Funcionamento dos ralos, grelhas e pontos de captação",
        practicalDescription:
          "Verificar se os ralos, grelhas e demais pontos de captação da área externa recebem e conduzem a água adequadamente, sem obstrução, refluxo ou deficiência funcional.",
        stepByStep: [
          "Identificar os pontos de drenagem existentes na área externa.",
          "Realizar teste com água observando velocidade e regularidade do escoamento.",
          "Verificar presença de obstrução, retorno ou grelha inadequada.",
          "Registrar o comportamento observado e os pontos comprometidos."
        ],
        objectiveCriteria: {
          approved: "Captação e escoamento regulares, sem refluxo, lentidão relevante ou obstrução perceptível.",
          rejected: "Escoamento lento, retorno, entupimento aparente, deficiência de captação ou condição incompatível com o uso da área.",
          na: "Quando não houver ponto de captação aplicável."
        },
        criticality: {
          low: {
            label: "Leve lentidão sem retorno",
            reportText:
              "Indica desempenho abaixo do ideal, ainda sem perda funcional grave, mas merecendo correção preventiva."
          },
          medium: {
            label: "Captação comprometida ou lentidão recorrente",
            reportText:
              "Reduz a eficiência da drenagem e pode favorecer poças, umidade e manutenção frequente da área externa."
          },
          high: {
            label: "Obstrução severa, refluxo ou falha de captação",
            reportText:
              "Configura perda importante de desempenho da drenagem, justificando providência corretiva prioritária."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      },
      {
        id: "ponding",
        description: "Acúmulo de água / empoçamento",
        practicalDescription:
          "Verificar se a área externa apresenta acúmulo persistente de água, indicativo de drenagem insuficiente, caimento inadequado ou deficiência do sistema de captação.",
        stepByStep: [
          "Observar a área após chuva recente ou realizar teste controlado com água.",
          "Identificar poças, acúmulo persistente e áreas de retenção.",
          "Verificar se o acúmulo ocorre próximo à edificação ou em rotas de circulação.",
          "Registrar localização, extensão e permanência aparente da água acumulada."
        ],
        objectiveCriteria: {
          approved: "Ausência de empoçamento relevante e escoamento compatível com uso e drenagem da área.",
          rejected: "Presença de poças persistentes, acúmulo relevante ou retenção incompatível com a função da área externa.",
          na: "Quando não houver condição de observação minimamente confiável."
        },
        criticality: {
          low: {
            label: "Retenção pequena e localizada",
            reportText:
              "Falha localizada, ainda sem comprometer de forma importante o uso global da área, mas incompatível com a execução técnica ideal."
          },
          medium: {
            label: "Retenção recorrente em áreas perceptíveis",
            reportText:
              "Compromete parcialmente o desempenho, o uso e a conservação da área externa, exigindo correção."
          },
          high: {
            label: "Acúmulo importante, persistente ou junto à edificação",
            reportText:
              "Não conformidade severa por comprometer desempenho de drenagem e aumentar o potencial de infiltração, deterioração e insegurança de uso."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      }
    ]
  },
  {
    id: "roof",
    title: "4. Cobertura, Telhado e Proteção Superior",
    tests: [
      {
        id: "roof-watertightness",
        description: "Estanqueidade da cobertura",
        practicalDescription:
          "Verificar se a cobertura impede adequadamente o ingresso de água para os ambientes ou elementos adjacentes, sem sinais de perda relevante de estanqueidade.",
        stepByStep: [
          "Inspecionar a cobertura e elementos aparentes, quando houver acesso seguro.",
          "Verificar indícios indiretos em forros, lajes, beirais e fachadas adjacentes.",
          "Identificar manchas, trilhas de água, gotejamento e deterioração de acabamento.",
          "Registrar localização, intensidade e recorrência dos sinais."
        ],
        objectiveCriteria: {
          approved: "Ausência de infiltração, gotejamento ou sinais compatíveis com perda relevante de estanqueidade da cobertura.",
          rejected: "Presença de infiltração, manchas, umidade recorrente ou indícios claros de falha do sistema de cobertura.",
          na: "Quando não houver condição segura de observação."
        },
        criticality: {
          low: {
            label: "Vestígios leves ou indícios antigos sem atividade aparente",
            reportText:
              "Indício de perda localizada de desempenho, ainda sem atividade evidente no momento da inspeção, porém merecendo acompanhamento e correção."
          },
          medium: {
            label: "Infiltração leve ou sinais recorrentes de umidade",
            reportText:
              "Compromete parcialmente a estanqueidade da cobertura e pode evoluir com prejuízo a acabamentos e elementos adjacentes."
          },
          high: {
            label: "Infiltração ativa, gotejamento ou perda importante de proteção",
            reportText:
              "Não conformidade severa por comprometer diretamente a função principal da cobertura, exigindo providência corretiva prioritária."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      },
      {
        id: "roof-fixation",
        description: "Fixação e integridade de telhas, placas, rufos e arremates",
        practicalDescription:
          "Verificar se os componentes da cobertura estão firmes, íntegros e adequadamente arrematados, sem peças soltas, deslocadas, quebradas ou com risco de desprendimento.",
        stepByStep: [
          "Inspecionar visualmente telhas, placas, chapas, rufos, cumeeiras e pingadeiras.",
          "Identificar peças quebradas, desalinhadas, soltas ou com fixação deficiente.",
          "Observar frestas, sobreposições inadequadas e deformações.",
          "Registrar os elementos comprometidos."
        ],
        objectiveCriteria: {
          approved: "Componentes íntegros, bem fixados e sem risco perceptível de deslocamento ou perda funcional do arremate.",
          rejected: "Presença de peça solta, quebrada, deslocada, falha de fixação ou arremate comprometido.",
          na: "Quando não houver condição segura de avaliação do sistema."
        },
        criticality: {
          low: {
            label: "Ajuste ou falha pontual sem risco imediato elevado",
            reportText:
              "Irregularidade localizada, ainda sem perda funcional significativa do conjunto, mas fora do padrão técnico esperado."
          },
          medium: {
            label: "Instabilidade perceptível, dano localizado ou arremate deficiente",
            reportText:
              "Já compromete parte do desempenho da cobertura e pode favorecer infiltração ou deterioração progressiva."
          },
          high: {
            label: "Peça com risco de queda ou ausência relevante de arremate",
            reportText:
              "Configura condição crítica por comprometer segurança e estanqueidade do sistema, justificando ação imediata."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      }
    ]
  },
  {
    id: "dividers",
    title: "5. Muros, Muretas, Contenção e Divisas",
    tests: [
      {
        id: "divider-stability",
        description: "Fissuras, trincas e instabilidade em muros/muretas",
        practicalDescription:
          "Verificar se muros, muretas e elementos verticais externos apresentam fissuras, trincas, inclinações ou sinais de instabilidade incompatíveis com segurança e durabilidade do sistema.",
        stepByStep: [
          "Inspecionar visualmente todo o comprimento do muro, mureta ou elemento de divisa acessível.",
          "Identificar fissuras, trincas, aberturas, destacamentos e deslocamentos.",
          "Observar inclinação, desaprumo ou abaulamento.",
          "Registrar localização, extensão e intensidade da manifestação."
        ],
        objectiveCriteria: {
          approved: "Ausência de fissuras relevantes, inclinações perigosas ou sinais de instabilidade aparente.",
          rejected: "Presença de trincas, desaprumo, deslocamento, abertura importante ou indícios de perda de estabilidade.",
          na: "Quando o elemento não fizer parte do escopo ou não puder ser avaliado com segurança."
        },
        criticality: {
          low: {
            label: "Fissura leve ou pequena irregularidade sem instabilidade aparente",
            reportText:
              "Manifestação inicial, ainda sem evidência de perda relevante de estabilidade, mas incompatível com o padrão técnico esperado."
          },
          medium: {
            label: "Trinca, inclinação ou degradação perceptível",
            reportText:
              "Indica comprometimento moderado da estabilidade ou durabilidade do elemento, exigindo correção e acompanhamento."
          },
          high: {
            label: "Instabilidade aparente, desaprumo acentuado ou risco ao entorno",
            reportText:
              "Não conformidade severa por comprometer segurança de uso e integridade do elemento, justificando ação prioritária."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      }
    ]
  },
  {
    id: "safety-elements",
    title: "6. Escadas, Rampas, Guarda-corpos e Corrimãos",
    tests: [
      {
        id: "guardrail-fixation",
        description: "Integridade e fixação de guarda-corpos e corrimãos",
        practicalDescription:
          "Verificar se guarda-corpos e corrimãos externos apresentam integridade, estabilidade e fixação compatíveis com a função de proteção e apoio ao usuário.",
        stepByStep: [
          "Inspecionar visualmente guarda-corpos, corrimãos e seus pontos de fixação.",
          "Aplicar verificação leve de estabilidade quando apropriado.",
          "Identificar folgas, corrosão, soldas comprometidas, deformações ou ausência de componentes.",
          "Registrar as anomalias encontradas."
        ],
        objectiveCriteria: {
          approved: "Elemento íntegro, estável, sem folgas relevantes e compatível com função de proteção/apoio.",
          rejected: "Presença de instabilidade, folga, corrosão significativa, falha de fixação ou comprometimento funcional.",
          na: "Quando não houver guarda-corpo ou corrimão aplicável ao ambiente externo."
        },
        criticality: {
          low: {
            label: "Pequena folga ou desgaste sem perda importante de função",
            reportText:
              "Indica perda leve de desempenho do elemento, ainda sem comprometimento relevante da função principal."
          },
          medium: {
            label: "Instabilidade moderada ou comprometimento perceptível de fixação",
            reportText:
              "Reduz a segurança e a confiabilidade do elemento de proteção, exigindo correção técnica."
          },
          high: {
            label: "Falha severa, risco de queda ou perda da função de proteção",
            reportText:
              "Configura condição crítica de segurança, justificando intervenção prioritária e restrição de uso se necessário."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      },
      {
        id: "ramp-stairs-safety",
        description: "Segurança de uso em escadas e rampas externas",
        practicalDescription:
          "Verificar se escadas e rampas externas apresentam condição compatível com circulação segura, sem irregularidades relevantes de acabamento, inclinação, desnível ou risco de escorregamento.",
        stepByStep: [
          "Inspecionar degraus, espelhos, pisos e transições.",
          "Verificar regularidade dos elementos e presença de desníveis.",
          "Observar acabamento superficial e risco de escorregamento.",
          "Registrar os pontos com risco ou perda funcional."
        ],
        objectiveCriteria: {
          approved: "Condição compatível com circulação segura e regular.",
          rejected: "Presença de irregularidade, desnível, acabamento inadequado ou risco de escorregamento relevante.",
          na: "Quando não houver escadas ou rampas no ambiente externo."
        },
        criticality: {
          low: {
            label: "Irregularidade leve sem risco imediato elevado",
            reportText:
              "Irregularidade pontual, ainda sem perda importante de segurança, mas fora do padrão recomendado."
          },
          medium: {
            label: "Risco moderado à circulação",
            reportText:
              "Compromete parcialmente a segurança e o conforto de uso, exigindo correção para adequação funcional."
          },
          high: {
            label: "Risco significativo de acidente",
            reportText:
              "Não conformidade severa de segurança, com potencial de provocar queda ou acidente, justificando providência prioritária."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      }
    ]
  },
  {
    id: "external-electrical",
    title: "7. Instalações Elétricas Externas",
    tests: [
      {
        id: "external-electrical-points",
        description: "Funcionamento e proteção dos pontos elétricos externos",
        practicalDescription:
          "Verificar se os pontos elétricos externos funcionam adequadamente e se apresentam proteção compatível com exposição às intempéries.",
        stepByStep: [
          "Inspecionar tomadas, luminárias, caixas e acionamentos externos.",
          "Verificar funcionamento dos pontos acessíveis.",
          "Observar vedação, integridade e proteção contra água.",
          "Registrar os pontos com anomalia."
        ],
        objectiveCriteria: {
          approved: "Funcionamento regular e proteção compatível com o ambiente externo.",
          rejected: "Falha de funcionamento, vedação deficiente, dano aparente ou proteção inadequada.",
          na: "Quando não houver ponto elétrico externo aplicável."
        },
        criticality: {
          low: {
            label: "Falha pontual sem risco imediato elevado",
            reportText:
              "Irregularidade localizada, ainda sem exposição direta importante, mas fora do padrão técnico de instalação."
          },
          medium: {
            label: "Funcionamento comprometido ou proteção deficiente",
            reportText:
              "Compromete parte do uso e da segurança do sistema, exigindo correção técnica."
          },
          high: {
            label: "Risco elétrico ou exposição inadequada à umidade",
            reportText:
              "Condição crítica de segurança, com potencial de choque, falha severa ou perda importante de confiabilidade do sistema."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      }
    ]
  },
  {
    id: "external-hydraulic",
    title: "8. Instalações Hidráulicas Externas",
    tests: [
      {
        id: "external-hydraulic-points",
        description: "Funcionamento e estanqueidade dos pontos hidráulicos externos",
        practicalDescription:
          "Verificar se os pontos hidráulicos externos operam adequadamente e sem vazamentos, com compatibilidade ao uso previsto.",
        stepByStep: [
          "Acionar os pontos hidráulicos externos acessíveis.",
          "Verificar vazão, pressão e estanqueidade.",
          "Observar vazamentos, gotejamento ou falha de vedação.",
          "Registrar as anomalias encontradas."
        ],
        objectiveCriteria: {
          approved: "Funcionamento adequado, sem vazamentos aparentes e com desempenho compatível ao uso.",
          rejected: "Falha de operação, vazamento, gotejamento ou desempenho incompatível.",
          na: "Quando não houver ponto hidráulico externo aplicável."
        },
        criticality: {
          low: {
            label: "Gotejamento leve ou falha pontual",
            reportText:
              "Não conformidade localizada, ainda sem grande impacto global, mas incompatível com entrega técnica adequada."
          },
          medium: {
            label: "Vazamento perceptível ou perda moderada de desempenho",
            reportText:
              "Compromete parte da funcionalidade e pode causar degradação localizada do entorno."
          },
          high: {
            label: "Vazamento contínuo ou perda importante de funcionalidade",
            reportText:
              "Não conformidade severa, com potencial de dano relevante ao ambiente externo e necessidade de correção prioritária."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      }
    ]
  },
  {
    id: "external-waterproofing",
    title: "9. Impermeabilização e Estanqueidade Externa",
    tests: [
      {
        id: "external-waterproofing-signs",
        description: "Sinais de umidade, infiltração ou perda de estanqueidade",
        practicalDescription:
          "Verificar sinais visuais compatíveis com falha de impermeabilização ou estanqueidade em áreas externas e interfaces com a edificação.",
        stepByStep: [
          "Inspecionar paredes, lajes, encontros, peitoris, soleiras e áreas de transição.",
          "Identificar manchas, escurecimento, bolor, eflorescência ou destacamento.",
          "Relacionar a manifestação com chuva, drenagem ou falhas de arremate.",
          "Registrar localização e intensidade."
        ],
        objectiveCriteria: {
          approved: "Ausência de sinais relevantes de umidade ou perda de estanqueidade.",
          rejected: "Presença de sinais compatíveis com umidade persistente, infiltração ou falha de impermeabilização.",
          na: "Quando não houver condição de avaliação confiável."
        },
        criticality: {
          low: {
            label: "Manifestação pontual e superficial",
            reportText:
              "Indica perda localizada de desempenho, ainda sem impacto amplo, mas fora do padrão técnico esperado."
          },
          medium: {
            label: "Manifestação recorrente ou com início de degradação",
            reportText:
              "Compromete parte do desempenho do sistema externo e pode evoluir com perda de acabamento e durabilidade."
          },
          high: {
            label: "Manifestação intensa, infiltração ativa ou comprometimento relevante",
            reportText:
              "Não conformidade severa, com potencial de afetar durabilidade, estanqueidade e integridade de elementos externos e internos associados."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      }
    ]
  },
  {
    id: "joints-finishes",
    title: "10. Juntas, Arremates e Acabamentos Externos",
    tests: [
      {
        id: "joints-finishes-integrity",
        description: "Integridade de juntas, selantes e arremates",
        practicalDescription:
          "Verificar se juntas, selantes e arremates externos estão íntegros, contínuos e compatíveis com a função de vedação e acabamento.",
        stepByStep: [
          "Inspecionar juntas aparentes, selantes, encontros e arremates.",
          "Observar falhas de preenchimento, retrações, fissuras, ausência ou destacamento.",
          "Verificar se há pontos suscetíveis à entrada de água.",
          "Registrar os trechos comprometidos."
        ],
        objectiveCriteria: {
          approved: "Juntas, selantes e arremates íntegros, contínuos e compatíveis com a função.",
          rejected: "Falhas, aberturas, ausência, retração ou comprometimento perceptível dos elementos de vedação/arremate.",
          na: "Quando o sistema não possuir esse elemento aplicável."
        },
        criticality: {
          low: {
            label: "Falha pequena e pontual",
            reportText:
              "Comprometimento localizado, ainda sem perda relevante de desempenho, porém fora do padrão técnico esperado."
          },
          medium: {
            label: "Falhas recorrentes ou em vários trechos",
            reportText:
              "Reduz a eficiência de vedação e acabamento do sistema, exigindo correção técnica dirigida."
          },
          high: {
            label: "Falha extensa ou associação com infiltração/desplacamento",
            reportText:
              "Compromete de forma importante estanqueidade e durabilidade do sistema externo, justificando ação prioritária."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      }
    ]
  },
  {
    id: "external-delivery",
    title: "11. Limpeza Técnica e Condição de Entrega Externa",
    tests: [
      {
        id: "external-delivery-condition",
        description: "Condição geral de entrega da área externa",
        practicalDescription:
          "Verificar se a área externa se encontra em condição compatível com entrega técnica e avaliação adequada.",
        stepByStep: [
          "Inspecionar visualmente a área externa como um todo.",
          "Identificar resíduos, materiais remanescentes, sujeira ou condição incompatível com entrega.",
          "Avaliar se a condição prejudica a vistoria, o uso ou a percepção de qualidade.",
          "Registrar os pontos comprometidos."
        ],
        objectiveCriteria: {
          approved: "Área externa em condição compatível com entrega técnica e avaliação adequada.",
          rejected: "Resíduos, sujeira ou condição inadequada caracterizam entrega externa incompatível com o padrão esperado.",
          na: "Quando o teste não se aplicar."
        },
        criticality: {
          low: {
            label: "Sujeira superficial sem impedir vistoria ou uso",
            reportText:
              "Irregularidade leve, ainda sem comprometer de forma importante a avaliação ou a utilização da área."
          },
          medium: {
            label: "Resíduos que prejudicam parte da vistoria ou do uso",
            reportText:
              "Compromete parcialmente a condição de entrega e dificulta a leitura técnica adequada da área externa."
          },
          high: {
            label: "Condição incompatível com entrega técnica, ocultando defeitos ou impedindo uso",
            reportText:
              "Configura não conformidade relevante de entrega, comprometendo avaliação, uso e percepção técnica da área, justificando providência corretiva prioritária."
          }
        },
        status: "pending",
        severity: "",
        photos: []
      }
    ]
  }
];

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
  "Hall",
  "Escritório",
  "Outro",
];

export const SUGGESTED_EXTERNAL_AREAS = [
  "Fachada Principal",
  "Fachada Lateral",
  "Fachada Posterior",
  "Cobertura",
  "Terraço",
  "Sacada",
  "Área Técnica",
  "Garagem Externa",
  "Área de Serviço",
  "Pátio",
  "Circulação Externa",
  "Outro",
];