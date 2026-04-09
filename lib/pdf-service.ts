import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

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

async function imageToBase64(uri: string) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Erro ao converter imagem:", uri, error);
    return null;
  }
}

export async function buildInspectionHtml(state: any) {
  const roomsHtml = await Promise.all(
    state.rooms.map(async (room: any) => {
      const allTests = room.sections.flatMap((s: any) => s.tests);
      const aprovados = allTests.filter((t: any) => t.status === "approved").length;
      const reprovados = allTests.filter((t: any) => t.status === "rejected").length;
      const na = allTests.filter((t: any) => t.status === "na").length;
      const pendentes = allTests.filter((t: any) => t.status === "pending").length;

      const sectionsHtml = await Promise.all(
        room.sections.map(async (section: any) => {
          const testsHtml = await Promise.all(
            section.tests.map(async (test: any) => {
              const photosHtml = await Promise.all(
                (test.photos || []).map(async (photo: any) => {
                  const base64Image = await imageToBase64(photo.uri);
                  if (!base64Image) return "";

                  return `
                    <div class="photo-block">
                      <img src="${base64Image}" />
                      <p class="caption">${photo.caption || "Sem legenda"}</p>
                    </div>
                  `;
                })
              );

              return `
                <div class="test-block">
                  <p><strong>Item:</strong> ${test.description}</p>
                  <p><strong>Status:</strong> ${statusLabels[test.status] || test.status || "-"}</p>
                  ${
                    photosHtml.filter(Boolean).length > 0
                      ? `<div class="photos-grid">${photosHtml.join("")}</div>`
                      : "<p><em>Sem fotos</em></p>"
                  }
                </div>
              `;
            })
          );

          return `
            <div class="section-block">
              <h4>${section.title}</h4>
              ${testsHtml.join("")}
            </div>
          `;
        })
      );

      return `
        <div class="card">
          <h3>${room.roomName} (${room.areaType === "internal" ? "Interna" : "Externa"})</h3>
          <p><strong>Resumo:</strong> ${aprovados} aprovados | ${reprovados} reprovados | ${na} não se aplica | ${pendentes} pendentes</p>
          ${room.observations ? `<p><strong>Observações:</strong> ${room.observations}</p>` : ""}
          ${sectionsHtml.join("")}
        </div>
      `;
    })
  );

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          @page { margin: 24px; }
          body {
            font-family: Arial, sans-serif;
            color: #111;
            font-size: 12px;
          }
          h1, h2, h3, h4 {
            margin-bottom: 6px;
          }
          .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 16px;
          }
          .section {
            margin-bottom: 18px;
          }
          .section-block {
            margin-top: 14px;
            margin-bottom: 14px;
            padding-top: 8px;
            border-top: 1px solid #eee;
          }
          .test-block {
            margin-bottom: 14px;
            padding: 8px;
            border: 1px solid #eee;
            border-radius: 6px;
          }
          .photos-grid {
            margin-top: 8px;
          }
          .photo-block {
            margin-bottom: 12px;
          }
          .photo-block img {
            width: 180px;
            height: auto;
            border-radius: 6px;
            border: 1px solid #ccc;
            display: block;
            margin-bottom: 4px;
          }
          .caption {
            font-size: 11px;
            color: #444;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <h1>Relatório de Vistoria</h1>

        <div class="section">
          <h2>Cliente</h2>
          <p><strong>Nome:</strong> ${state.client.fullName || "-"}</p>
          <p><strong>CPF/CNPJ:</strong> ${state.client.document || "-"}</p>
          <p><strong>Email:</strong> ${state.client.email || "-"}</p>
          <p><strong>Telefone:</strong> ${state.client.phone || "-"}</p>
          <p><strong>Logradouro:</strong> ${state.client.address?.street || "-"}</p>
          <p><strong>Número:</strong> ${state.client.address?.number || "-"}</p>
          <p><strong>Complemento:</strong> ${state.client.address?.complement || "-"}</p>
          <p><strong>Bairro:</strong> ${state.client.address?.neighborhood || "-"}</p>
          <p><strong>Cidade:</strong> ${state.client.address?.city || "-"}</p>
          <p><strong>UF:</strong> ${state.client.address?.state || "-"}</p>
          <p><strong>CEP:</strong> ${state.client.address?.cep || "-"}</p>
        </div>

        <div class="section">
          <h2>Vistoriador</h2>
          <p><strong>Nome:</strong> ${state.vistoriador.name || "-"}</p>
          <p><strong>CPF/CNPJ:</strong> ${state.vistoriador.document || "-"}</p>
          <p><strong>Email:</strong> ${state.vistoriador.email || "-"}</p>
          <p><strong>Telefone:</strong> ${state.vistoriador.phone || "-"}</p>
          <p><strong>Logradouro:</strong> ${state.vistoriador.address?.street || "-"}</p>
          <p><strong>Número:</strong> ${state.vistoriador.address?.number || "-"}</p>
          <p><strong>Complemento:</strong> ${state.vistoriador.address?.complement || "-"}</p>
          <p><strong>Bairro:</strong> ${state.vistoriador.address?.neighborhood || "-"}</p>
          <p><strong>Cidade:</strong> ${state.vistoriador.address?.city || "-"}</p>
          <p><strong>UF:</strong> ${state.vistoriador.address?.state || "-"}</p>
          <p><strong>CEP:</strong> ${state.vistoriador.address?.cep || "-"}</p>
          ${state.type === "technical" ? `<p><strong>CREA:</strong> ${state.vistoriador.crea || "-"}</p>` : ""}
          ${state.type === "technical" ? `<p><strong>CAU:</strong> ${state.vistoriador.cau || "-"}</p>` : ""}
        </div>

        <div class="section">
          <h2>Condições da Vistoria</h2>
          <p><strong>Data:</strong> ${state.conditions.date || "-"}</p>
          <p><strong>Hora:</strong> ${state.conditions.time || "-"}</p>
          <p><strong>Clima:</strong> ${weatherLabels[state.conditions.weather] || "-"}</p>
          <p><strong>Acesso:</strong> ${accessLabels[state.conditions.access] || "-"}</p>
          <p><strong>Iluminação:</strong> ${lightingLabels[state.conditions.lighting] || "-"}</p>
          <p><strong>Ocupação:</strong> ${occupancyLabels[state.conditions.occupancy] || "-"}</p>
        </div>

        <div class="section">
          <h2>Cômodos Vistoriados</h2>
          ${roomsHtml.join("") || "<p>Nenhum cômodo vistoriado.</p>"}
        </div>
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