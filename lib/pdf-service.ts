import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const weatherLabels: Record<string, string> = {
  sunny: "Ensolarado",
  cloudy: "Nublado",
  rainy: "Chuvoso",
  partly_cloudy: "Parcialmente nublado",
};

const accessLabels: Record<string, string> = {
  total: "Total",
  partial: "Parcial",
  restricted: "Restrito",
};

const lightingLabels: Record<string, string> = {
  adequate: "Adequada",
  partial: "Parcial",
  insufficient: "Insuficiente",
};

const occupancyLabels: Record<string, string> = {
  empty: "Desocupado",
  occupied: "Ocupado",
  under_construction: "Em obra",
};

const statusLabels: Record<string, string> = {
  approved: "Aprovado",
  rejected: "Reprovado",
  pending: "Pendente",
  na: "Não se aplica",
};

function getStatusClass(status: string) {
  if (status === "approved") return "status-approved";
  if (status === "rejected") return "status-rejected";
  if (status === "na") return "status-na";
  return "status-pending";
}

function getSeverityLabel(severity: string) {
  if (severity === "low") return "Baixa";
  if (severity === "medium") return "Média";
  if (severity === "high") return "Alta";
  return "-";
}

function getSeverityReportText(test: any) {
  if (!test?.severity || !test?.criticality) return "";

  if (test.severity === "low") return test.criticality?.low?.reportText || "";
  if (test.severity === "medium") return test.criticality?.medium?.reportText || "";
  if (test.severity === "high") return test.criticality?.high?.reportText || "";

  return "";
}

async function imageToBase64(uri: string) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Erro ao converter imagem:", uri, error);
    return "";
  }
}

function buildLegalText(state: any) {
  const artInfo =
    state?.conditions?.artMode === "with_art"
      ? `
        <p>
          Consta, para este relatório, indicação de responsabilidade técnica com ART,
          conforme dados informados pelo contratante e/ou profissional responsável,
          devendo eventual número, data, finalidade e vinculação documental ser analisados
          em conjunto com os registros formais correspondentes.
        </p>
      `
      : `
        <p>
          Para este relatório, a contratação pode ter ocorrido sem ART, conforme modalidade
          solicitada pelo cliente e escopo efetivamente pactuado entre as partes, sem prejuízo
          da necessidade de responsabilização técnica formal em hipóteses legalmente exigíveis.
        </p>
      `;

  return `
    <div class="legal-page">
      <div class="legal-box">
        <h2>Termos, Limitações Técnicas e Ressalvas Legais</h2>

        <p>
          Este relatório foi elaborado com base em vistoria visual, pontual e não destrutiva,
          realizada nas condições de acesso, iluminação, ocupação e exposição existentes no
          momento da inspeção. As conclusões aqui apresentadas refletem exclusivamente os
          elementos observáveis e acessíveis durante a diligência, não constituindo garantia
          absoluta de inexistência de falhas ocultas, anomalias internas, patologias em evolução
          ou vícios construtivos não aparentes.
        </p>

        <p>
          O presente documento não substitui ensaios laboratoriais, perícias especializadas,
          abertura de elementos construtivos, investigações invasivas, testes destrutivos,
          sondagens, escaneamentos instrumentais, verificações estruturais aprofundadas ou
          avaliação de sistemas que dependam de desmontagem, rompimento, remoção de revestimentos
          ou acesso técnico especializado a partes não expostas da edificação.
        </p>

        <p>
          Eventuais vícios ocultos, falhas internas em tubulações, instalações elétricas embutidas,
          impermeabilizações encobertas, armaduras internas, deficiências estruturais não aparentes,
          falhas sob revestimentos, defeitos progressivos, problemas decorrentes de uso inadequado,
          manutenção insuficiente, reformas posteriores, intervenções de terceiros ou degradação
          natural ao longo do tempo podem não ser identificados nesta modalidade de vistoria.
        </p>

        <p>
          Neste relatório, a avaliação possui caráter predominantemente observacional e documental,
          sendo destinada ao registro das condições visíveis verificadas na data da inspeção,
          conforme solicitado pelo contratante e dentro dos limites do escopo efetivamente contratado.
        </p>

        ${artInfo}

        <p>
          A ausência de apontamento específico neste relatório não deve ser interpretada como prova
          de inexistência definitiva de falha, anomalia, irregularidade técnica, desconformidade
          funcional ou patologia construtiva. Significa apenas que, nas condições em que a vistoria
          foi realizada, não houve constatação visual conclusiva suficiente para registro técnico
          no presente documento.
        </p>

        <p>
          Este relatório não implica assunção, pelo vistoriador, de responsabilidade por eventos
          supervenientes, agravamentos posteriores, alterações no imóvel após a data da vistoria,
          omissões decorrentes de restrição de acesso, negativa de abertura de ambientes, falta de
          documentação, ocultação de danos, interferência de ocupantes, falhas não aparentes ou
          informações inexatas prestadas por terceiros.
        </p>

        <p>
          Recomenda-se que quaisquer indícios de anomalias, umidade, fissuração, deformação,
          falhas de desempenho, desconformidades funcionais ou suspeitas de comprometimento
          construtivo sejam submetidos, quando necessário, à avaliação complementar específica,
          com profissional habilitado, metodologia apropriada e nível de aprofundamento compatível
          com a natureza da suspeita técnica.
        </p>

        <p>
          O uso deste relatório deve observar sua finalidade, escopo, modalidade de contratação e
          limites técnicos. Sua reprodução parcial, interpretação isolada ou utilização fora do
          contexto da vistoria realizada pode comprometer o correto entendimento do documento.
        </p>
      </div>
    </div>
  `;
}

function renderTechnicalExtra(test: any, state: any) {
  if (state.type !== "technical") return "";

  // 🔹 Critério objetivo baseado no status
  let selectedCriteria = "";

  if (test.objectiveCriteria) {
    if (test.status === "approved") {
      selectedCriteria = test.objectiveCriteria.approved;
    } else if (test.status === "rejected") {
      selectedCriteria = test.objectiveCriteria.rejected;
    } else if (test.status === "na") {
      selectedCriteria = test.objectiveCriteria.na;
    }
  }

  // 🔹 Base técnica
  const technicalBasisHtml =
    test.technicalBasis && test.technicalBasis.length > 0
      ? `
      <div class="detail-block">
        <div class="detail-title">Base técnica / embasamento</div>
        <ul class="detail-list">
          ${test.technicalBasis.map((item: string) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `
      : "";

  // 🔹 Criticidade (se reprovado)
  const severityHtml =
    test.status === "rejected" && test.severity
      ? `
      <div class="detail-block">
        <div class="detail-title">Criticidade da não conformidade</div>
        <div class="caption-block">
          <strong>${getSeverityLabel(test.severity)}:</strong>
          ${getSeverityReportText(test)}
        </div>
      </div>
    `
      : "";

  return `
    ${
      test.practicalDescription
        ? `
      <div class="detail-block">
        <div class="detail-title">Descrição prática</div>
        <div class="caption-block">${test.practicalDescription}</div>
      </div>
    `
        : ""
    }

    ${
      selectedCriteria
        ? `
      <div class="detail-block">
        <div class="detail-title">Critério objetivo aplicado</div>
        <div class="caption-block">${selectedCriteria}</div>
      </div>
    `
        : ""
    }

    ${technicalBasisHtml}

    ${severityHtml}
  `;
}

export async function buildInspectionHtml(state: any) {
  const roomsHtmlArray = await Promise.all(
    (state.rooms || []).map(async (room: any) => {
      const allTests = room.sections.flatMap((s: any) => s.tests);
      const aprovados = allTests.filter((t: any) => t.status === "approved").length;
      const reprovados = allTests.filter((t: any) => t.status === "rejected").length;
      const na = allTests.filter((t: any) => t.status === "na").length;
      const pendentes = allTests.filter((t: any) => t.status === "pending").length;

      const sectionsHtmlArray = await Promise.all(
        room.sections.map(async (section: any) => {
          const testsHtmlArray = await Promise.all(
            section.tests.map(async (test: any) => {
              const photosHtmlArray = await Promise.all(
                (test.photos || []).map(async (photo: any) => {
                  const imgSrc = await imageToBase64(photo.uri);
                  if (!imgSrc) return "";

                  return `
                    <div class="photo-card">
                      <img src="${imgSrc}" />
                      <div class="caption-block">
                        <strong>Legenda:</strong> ${photo.caption || "Sem legenda"}
                      </div>
                    </div>
                  `;
                })
              );

              const photosHtml = photosHtmlArray.filter(Boolean).join("");

              return `
                <div class="test-card">
                  <div class="test-title">
  ${test.isCustom && test.customSectionTitle ? `${test.customSectionTitle} — ` : ""}
  ${test.description || "Item personalizado"}
</div>

                  <div class="status ${getStatusClass(test.status)}">
                    ${statusLabels[test.status] || test.status || "-"}
                  </div>

                  ${
                  
                    test.instruction
                      ? `<div class="instruction">${test.instruction}</div>`
                      : ""
                  }
                  ${
  test.isCustom && test.status === "rejected" && test.rejectionLegend
    ? `<div class="caption-block"><strong>Motivo da reprovação:</strong> ${test.rejectionLegend}</div>`
    : ""
}

                  ${renderTechnicalExtra(test, state)}

                  ${
                    photosHtml
                      ? `<div class="photos-wrap">${photosHtml}</div>`
                      : `<div class="no-photo">Sem fotos</div>`
                  }
                </div>
              `;
            })
          );

          return `
            <div class="section-block">
              <h4>${section.title}</h4>
              ${testsHtmlArray.join("")}
            </div>
          `;
        })
      );

      return `
        <div class="room-card">
          <div class="room-name">${room.roomName}</div>
          <div class="room-type">${room.areaType === "internal" ? "Área Interna" : "Área Externa"}</div>

          <div class="room-summary">
            <strong>Resumo:</strong> ${aprovados} aprovados | ${reprovados} reprovados | ${na} não se aplica | ${pendentes} pendentes
          </div>

          ${
            room.observations
              ? `<div class="room-obs"><strong>Observações:</strong> ${room.observations}</div>`
              : ""
          }

          ${sectionsHtmlArray.join("")}
        </div>
      `;
    })
  );

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <title>Relatório de Vistoria</title>
        <style>
          @page {
            margin: 24px;
          }

          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, Helvetica, sans-serif;
            color: #111827;
            font-size: 12px;
            line-height: 1.45;
          }

          h1, h2, h3, h4, p {
            margin: 0;
          }

          .cover-page {
            min-height: 100vh;
            padding: 34px 26px;
            border: 2px solid #0f172a;
          }

          .cover-topline {
            font-size: 11px;
            letter-spacing: 1px;
            color: #0a7ea4;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
          }

          .cover-title {
            font-size: 28px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 6px;
          }

          .cover-subtitle {
            font-size: 15px;
            color: #475569;
            margin-bottom: 22px;
          }

          .cover-box {
            border: 1.5px solid #cbd5e1;
            border-radius: 10px;
            padding: 14px 16px;
            margin-bottom: 14px;
            page-break-inside: avoid;
          }

          .cover-box h3 {
            font-size: 14px;
            margin-bottom: 8px;
            color: #0f172a;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 4px;
          }

          .cover-row {
            margin-bottom: 4px;
            font-size: 12px;
          }

          .cover-footer {
            margin-top: 18px;
            border-top: 2px solid #0f172a;
            padding-top: 10px;
            font-size: 11px;
            color: #334155;
          }

          .room-card {
            border: 2px solid #94a3b8;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 20px;
            page-break-inside: avoid;
            background: #ffffff;
          }

          .room-name {
            font-size: 24px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 4px;
          }

          .room-type {
            font-size: 12px;
            font-weight: 600;
            color: #0a7ea4;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .room-summary {
            margin-bottom: 10px;
            font-size: 12px;
          }

          .room-obs {
            margin-bottom: 12px;
            font-size: 12px;
          }

          .section-block {
            margin-top: 14px;
            margin-bottom: 14px;
          }

          .section-block h4 {
            font-size: 14px;
            margin-bottom: 10px;
            color: #111827;
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 8px 10px;
          }

          .test-card {
            border: 1px solid #d1d5db;
            border-left: 5px solid #0a7ea4;
            border-radius: 8px;
            padding: 10px 12px;
            margin-bottom: 10px;
            page-break-inside: avoid;
            background: #fff;
          }

          .test-title {
            font-weight: 700;
            font-size: 13px;
            margin-bottom: 6px;
            color: #111827;
          }

          .status {
            display: inline-block;
            font-size: 11px;
            font-weight: bold;
            padding: 3px 8px;
            border-radius: 6px;
            margin-bottom: 6px;
          }

          .status-approved {
            background: #dcfce7;
            color: #166534;
          }

          .status-rejected {
            background: #fee2e2;
            color: #991b1b;
          }

          .status-na {
            background: #f3f4f6;
            color: #374151;
          }

          .status-pending {
            background: #fef3c7;
            color: #92400e;
          }

          .instruction {
            font-size: 11px;
            color: #475569;
            margin-top: 4px;
            margin-bottom: 8px;
          }

          .detail-block {
            margin-top: 8px;
            margin-bottom: 8px;
            padding: 8px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: #fafafa;
          }

          .detail-title {
            font-size: 11px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 6px;
            text-transform: uppercase;
          }

          .detail-list {
            margin: 0;
            padding-left: 18px;
          }

          .detail-list li {
            margin-bottom: 4px;
          }

          .photos-wrap {
            margin-top: 8px;
          }

          .photo-card {
            margin-bottom: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 8px;
          }

          .photo-card img {
            width: 140px;
            height: auto;
            display: block;
            border-radius: 6px;
            border: 1px solid #cbd5e1;
            margin-bottom: 6px;
          }

          .caption-block {
            font-size: 11px;
            color: #374151;
            margin-bottom: 4px;
          }

          .no-photo {
            font-size: 11px;
            color: #9ca3af;
            font-style: italic;
            margin-top: 6px;
          }

          .legal-page {
            page-break-before: always;
            margin-bottom: 24px;
          }

          .legal-box {
            border: 2px solid #0f172a;
            border-radius: 10px;
            padding: 18px;
          }

          .legal-box h2 {
            font-size: 18px;
            margin-bottom: 12px;
            color: #0f172a;
            border-bottom: 2px solid #0a7ea4;
            padding-bottom: 6px;
          }

          .legal-box p {
            margin-bottom: 10px;
            text-align: justify;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="cover-page">
          <div class="cover-topline">Relatório Técnico de Vistoria</div>
          <div class="cover-title">Relatório de Vistoria</div>
          <div class="cover-subtitle">Documento emitido com base nas condições observadas na data da inspeção</div>

          <div class="cover-box">
            <h3>Dados do Cliente</h3>
            <div class="cover-row"><strong>Nome:</strong> ${state.client.fullName || "-"}</div>
            <div class="cover-row"><strong>CPF/CNPJ:</strong> ${state.client.document || "-"}</div>
            <div class="cover-row"><strong>E-mail:</strong> ${state.client.email || "-"}</div>
            <div class="cover-row"><strong>Telefone:</strong> ${state.client.phone || "-"}</div>
            <div class="cover-row"><strong>Endereço:</strong> ${state.client.address?.street || "-"}, ${state.client.address?.number || "-"}${state.client.address?.complement ? ` - ${state.client.address.complement}` : ""}</div>
            <div class="cover-row"><strong>Bairro:</strong> ${state.client.address?.neighborhood || "-"}</div>
            <div class="cover-row"><strong>Cidade/UF:</strong> ${state.client.address?.city || "-"} - ${state.client.address?.state || "-"}</div>
            <div class="cover-row"><strong>CEP:</strong> ${state.client.address?.cep || "-"}</div>
          </div>

          <div class="cover-box">
            <h3>Dados do Vistoriador</h3>
            <div class="cover-row"><strong>Nome:</strong> ${state.vistoriador.name || "-"}</div>
            <div class="cover-row"><strong>CPF/CNPJ:</strong> ${state.vistoriador.document || "-"}</div>
            <div class="cover-row"><strong>E-mail:</strong> ${state.vistoriador.email || "-"}</div>
            <div class="cover-row"><strong>Telefone:</strong> ${state.vistoriador.phone || "-"}</div>
            <div class="cover-row"><strong>Endereço:</strong> ${state.vistoriador.address?.street || "-"}, ${state.vistoriador.address?.number || "-"}${state.vistoriador.address?.complement ? ` - ${state.vistoriador.address.complement}` : ""}</div>
            <div class="cover-row"><strong>Bairro:</strong> ${state.vistoriador.address?.neighborhood || "-"}</div>
            <div class="cover-row"><strong>Cidade/UF:</strong> ${state.vistoriador.address?.city || "-"} - ${state.vistoriador.address?.state || "-"}</div>
            <div class="cover-row"><strong>CEP:</strong> ${state.vistoriador.address?.cep || "-"}</div>
            ${state.type === "technical" ? `<div class="cover-row"><strong>CREA:</strong> ${state.vistoriador.crea || "-"}</div>` : ""}
            ${state.type === "technical" ? `<div class="cover-row"><strong>CAU:</strong> ${state.vistoriador.cau || "-"}</div>` : ""}
          </div>

          <div class="cover-box">
            <h3>Condições da Vistoria</h3>
            <div class="cover-row"><strong>Data:</strong> ${state.conditions.date || "-"}</div>
            <div class="cover-row"><strong>Hora:</strong> ${state.conditions.time || "-"}</div>
            <div class="cover-row"><strong>Clima:</strong> ${weatherLabels[state.conditions.weather] || "-"}</div>
            <div class="cover-row"><strong>Acesso:</strong> ${accessLabels[state.conditions.access] || "-"}</div>
            <div class="cover-row"><strong>Iluminação:</strong> ${lightingLabels[state.conditions.lighting] || "-"}</div>
            <div class="cover-row"><strong>Ocupação:</strong> ${occupancyLabels[state.conditions.occupancy] || "-"}</div>
            <div class="cover-row"><strong>Responsabilidade técnica:</strong> ${state.conditions?.artMode === "with_art" ? "Com ART" : "Sem ART"}</div>
            ${state.conditions?.artMode === "with_art" ? `<div class="cover-row"><strong>Número da ART:</strong> ${state.conditions?.artNumber || "-"}</div>` : ""}
            ${state.conditions?.artMode === "with_art" ? `<div class="cover-row"><strong>Data da ART:</strong> ${state.conditions?.artDate || "-"}</div>` : ""}
            ${state.conditions?.artMode === "with_art" ? `<div class="cover-row"><strong>Tipo / Finalidade:</strong> ${state.conditions?.artType || "-"}</div>` : ""}
            ${state.conditions?.artMode === "with_art" ? `<div class="cover-row"><strong>Observações da ART:</strong> ${state.conditions?.artNotes || "-"}</div>` : ""}
          </div>

          <div class="cover-footer">
            Este relatório registra as condições observadas visualmente no momento da vistoria, dentro do escopo contratado.
          </div>
        </div>

        ${buildLegalText(state)}

        ${roomsHtmlArray.join("") || '<div class="room-card"><div class="room-name">Relatório</div><div class="room-summary">Nenhum ambiente vistoriado.</div></div>'}
      </body>
    </html>
  `;
}

export async function generateInspectionPdf(state: any) {
  const html = await buildInspectionHtml(state);

  const { uri } = await Print.printToFileAsync({
    html,
    base64: false,
  });

  return uri;
}

export async function sharePdf(uri: string) {
  const available = await Sharing.isAvailableAsync();
  if (!available) return;

  await Sharing.shareAsync(uri, {
    mimeType: "application/pdf",
    UTI: ".pdf",
  });
}