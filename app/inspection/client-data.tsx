import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { FormInput } from "@/components/form-input";
import { LargeButton } from "@/components/large-button";
import { Toast } from "@/components/toast";
import { useInspection } from "@/lib/inspection-context";
import { useDocumentMask } from "@/hooks/use-document-mask";
import { StateSelect } from "@/components/state-select";
import * as Haptics from "expo-haptics";

export default function ClientDataScreen() {
  const {
  state,
  updateClient,
  updateVistoriador,
  updateRental,
  reset,
} = useInspection();

  const { formatDocument } = useDocumentMask();
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();

  const rental = state.rental || {
  type: "entry",
  property: {
    type: "",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      cep: "",
    },
    condominium: "",
    unit: "",
    garageSpots: "",
  },
  parties: {
    landlord: { name: "", document: "" },
    tenant: { name: "", document: "" },
    realEstate: { name: "", document: "" },
  },
  contract: {
    number: "",
    startDate: "",
    inspectionDate: "",
  },
  keys: {
    mainDoor: 0,
    garage: 0,
    mailbox: 0,
    others: "",
  },
  meters: {
    energy: "",
    water: "",
    gas: "",
  },
};

  const handleNext = async () => {
  if (state.type === "technical" && !state.vistoriador.crea && !state.vistoriador.cau) {
    if (Platform.OS !== "web") {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    return;
  }

  if (Platform.OS !== "web") {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  setShowToast(true);

  setTimeout(() => {
    if (returnTo === "summary") {
      router.push("/inspection/summary");
    } else {
      router.push("/inspection/conditions");
    }
  }, 500);
};

  return (
    <ScreenContainer className="p-6">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="gap-6 pb-6">
              <View className="gap-2">
                <Text className="text-2xl font-bold text-foreground">
                  Dados da Vistoria
                </Text>
                <Text className="text-sm text-muted">Etapa 1 de 4</Text>
              </View>

              {state.type !== "rental" && (
                <View className="gap-4">
                  <Text className="text-lg font-semibold text-foreground">
                    Cliente (Contratante)
                  </Text>

                  <FormInput
                    label="Nome Completo"
                    placeholder="Ex: João Silva"
                    value={state.client.fullName}
                    onChangeText={(text) => updateClient({ fullName: text })}
                  />

                  <FormInput
                    label="CPF/CNPJ"
                    placeholder="Digite o CPF ou CNPJ"
                    value={state.client.document}
                    onChangeText={(text) => updateClient({ document: text })}
                    keyboardType="numeric"
                  />

                  <FormInput
                    label="Rua"
                    placeholder="Ex: Rua das Flores"
                    value={state.client.address.street}
                    onChangeText={(text) =>
                      updateClient({
                        address: { ...state.client.address, street: text },
                      })
                    }
                  />

                  <View className="flex-row gap-3">
                    <View className="flex-1">
                      <FormInput
                        label="Número"
                        placeholder="Ex: 123"
                        value={state.client.address.number}
                        onChangeText={(text) =>
                          updateClient({
                            address: { ...state.client.address, number: text },
                          })
                        }
                        keyboardType="numeric"
                      />
                    </View>

                    <View className="flex-1">
                      <FormInput
                        label="Complemento"
                        placeholder="Ex: Apt 42"
                        value={state.client.address.complement}
                        onChangeText={(text) =>
                          updateClient({
                            address: {
                              ...state.client.address,
                              complement: text,
                            },
                          })
                        }
                      />
                    </View>
                  </View>

                  <FormInput
                    label="Bairro"
                    placeholder="Ex: Centro"
                    value={state.client.address.neighborhood}
                    onChangeText={(text) =>
                      updateClient({
                        address: {
                          ...state.client.address,
                          neighborhood: text,
                        },
                      })
                    }
                  />

                  <View className="flex-row gap-3">
                    <View className="flex-1">
                      <FormInput
                        label="Cidade"
                        placeholder="Ex: São Paulo"
                        value={state.client.address.city}
                        onChangeText={(text) =>
                          updateClient({
                            address: { ...state.client.address, city: text },
                          })
                        }
                      />
                    </View>

                    <View className="flex-0.25">
                      <StateSelect
                        label="UF"
                        value={state.client.address.state}
                        onValueChange={(text) =>
                          updateClient({
                            address: { ...state.client.address, state: text },
                          })
                        }
                        placeholder="Selecione"
                      />
                    </View>
                  </View>

                  <FormInput
                    label="CEP"
                    placeholder="Ex: 12345-678"
                    value={state.client.address.cep}
                    onChangeText={(text) =>
                      updateClient({
                        address: { ...state.client.address, cep: text },
                      })
                    }
                    keyboardType="numeric"
                  />

                  <FormInput
                    label="Email"
                    placeholder="Ex: joao@email.com"
                    value={state.client.email}
                    onChangeText={(text) => updateClient({ email: text })}
                    keyboardType="email-address"
                  />

                  <FormInput
                    label="Telefone"
                    placeholder="Ex: (11) 99999-9999"
                    value={state.client.phone}
                    onChangeText={(text) => updateClient({ phone: text })}
                    keyboardType="phone-pad"
                  />
                </View>
              )}

              <View className="gap-4">
                <Text className="text-lg font-semibold text-foreground">
                  Vistoriador / Empresa responsável
                </Text>

                <FormInput
                  label="Nome / Razão Social"
                  placeholder="Ex: João Vistoriador ou Empresa XYZ"
                  value={state.vistoriador.name}
                  onChangeText={(text) => updateVistoriador({ name: text })}
                />

                <FormInput
                  label="CPF/CNPJ"
                  placeholder="Ex: 123.456.789-00 ou 00.000.000/0000-00"
                  value={state.vistoriador.document}
                  onChangeText={(text) =>
                    updateVistoriador({ document: formatDocument(text) })
                  }
                  keyboardType="numeric"
                />

                <FormInput
                  label="Rua"
                  placeholder="Ex: Rua das Flores"
                  value={state.vistoriador.address.street}
                  onChangeText={(text) =>
                    updateVistoriador({
                      address: { ...state.vistoriador.address, street: text },
                    })
                  }
                />

                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <FormInput
                      label="Número"
                      placeholder="Ex: 123"
                      value={state.vistoriador.address.number}
                      onChangeText={(text) =>
                        updateVistoriador({
                          address: {
                            ...state.vistoriador.address,
                            number: text,
                          },
                        })
                      }
                      keyboardType="numeric"
                    />
                  </View>

                  <View className="flex-1">
                    <FormInput
                      label="Complemento"
                      placeholder="Ex: Apt 42"
                      value={state.vistoriador.address.complement}
                      onChangeText={(text) =>
                        updateVistoriador({
                          address: {
                            ...state.vistoriador.address,
                            complement: text,
                          },
                        })
                      }
                    />
                  </View>
                </View>

                <FormInput
                  label="Bairro"
                  placeholder="Ex: Centro"
                  value={state.vistoriador.address.neighborhood}
                  onChangeText={(text) =>
                    updateVistoriador({
                      address: {
                        ...state.vistoriador.address,
                        neighborhood: text,
                      },
                    })
                  }
                />

                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <FormInput
                      label="Cidade"
                      placeholder="Ex: São Paulo"
                      value={state.vistoriador.address.city}
                      onChangeText={(text) =>
                        updateVistoriador({
                          address: {
                            ...state.vistoriador.address,
                            city: text,
                          },
                        })
                      }
                    />
                  </View>

                  <View className="flex-0.25">
                    <StateSelect
                      label="UF"
                      value={state.vistoriador.address.state}
                      onValueChange={(text) =>
                        updateVistoriador({
                          address: {
                            ...state.vistoriador.address,
                            state: text,
                          },
                        })
                      }
                      placeholder="Selecione"
                    />
                  </View>
                </View>

                <FormInput
                  label="CEP"
                  placeholder="Ex: 12345-678"
                  value={state.vistoriador.address.cep}
                  onChangeText={(text) =>
                    updateVistoriador({
                      address: {
                        ...state.vistoriador.address,
                        cep: text,
                      },
                    })
                  }
                  keyboardType="numeric"
                />

                <FormInput
                  label="Email"
                  placeholder="Ex: vistoriador@email.com"
                  value={state.vistoriador.email}
                  onChangeText={(text) => updateVistoriador({ email: text })}
                  keyboardType="email-address"
                />

                <FormInput
                  label="Telefone"
                  placeholder="Ex: (11) 99999-9999"
                  value={state.vistoriador.phone}
                  onChangeText={(text) => updateVistoriador({ phone: text })}
                  keyboardType="phone-pad"
                />
              </View>

              {state.type === "technical" && (
                <View className="gap-4">
                  <Text className="text-lg font-semibold text-foreground">
                    Dados Técnicos
                  </Text>

                  <FormInput
                    label="CREA (ou deixe em branco se tiver CAU)"
                    placeholder="Ex: 12345/D-SP"
                    value={state.vistoriador.crea || ""}
                    onChangeText={(text) => updateVistoriador({ crea: text })}
                  />

                  <FormInput
                    label="CAU (ou deixe em branco se tiver CREA)"
                    placeholder="Ex: 123456"
                    value={state.vistoriador.cau || ""}
                    onChangeText={(text) => updateVistoriador({ cau: text })}
                  />
                </View>
              )}

              {state.type === "rental" && (
                <View className="gap-6">
                  <View className="gap-4">
                    <Text className="text-lg font-semibold text-foreground">
                      Dados de Locação
                    </Text>

                    <View className="flex-row gap-3">
                      <Pressable
                        onPress={() => updateRental({ type: "entry" })}
                        style={{
                          flex: 1,
                          padding: 12,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor:
                            rental.type === "entry" ? "#0a7ea4" : "#e5e7eb",
                          backgroundColor:
                            rental.type === "entry" ? "#e0f2fe" : "#fff",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color:
                              rental.type === "entry" ? "#0a7ea4" : "#333",
                            fontWeight: "700",
                          }}
                        >
                          Entrada
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() => updateRental({ type: "exit" })}
                        style={{
                          flex: 1,
                          padding: 12,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor:
                            rental.type === "exit" ? "#0a7ea4" : "#e5e7eb",
                          backgroundColor:
                            rental.type === "exit" ? "#e0f2fe" : "#fff",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: rental.type === "exit" ? "#0a7ea4" : "#333",
                            fontWeight: "700",
                          }}
                        >
                          Saída
                        </Text>
                      </Pressable>
                    </View>
                  </View>

                  <View className="gap-4">
                    <Text className="text-lg font-semibold text-foreground">
                      Imóvel
                    </Text>

                    <FormInput
                      label="Tipo do imóvel"
                      placeholder="Ex: Apartamento, casa, sala comercial"
                      value={rental.property.type}
                      onChangeText={(text) =>
                        updateRental({
                          property: {
                            ...rental.property,
                            type: text,
                          },
                        })
                      }
                    />

                    <FormInput
                      label="Condomínio"
                      placeholder="Ex: Condomínio Jardim das Flores"
                      value={rental.property.condominium || ""}
                      onChangeText={(text) =>
                        updateRental({
                          property: {
                            ...rental.property,
                            condominium: text,
                          },
                        })
                      }
                    />

                    <View className="flex-row gap-3">
                      <View className="flex-1">
                        <FormInput
                          label="Unidade"
                          placeholder="Ex: Apto 302"
                          value={rental.property.unit || ""}
                          onChangeText={(text) =>
                            updateRental({
                              property: {
                                ...rental.property,
                                unit: text,
                              },
                            })
                          }
                        />
                      </View>

                      <View className="flex-1">
                        <FormInput
                          label="Vagas"
                          placeholder="Ex: 1"
                          value={rental.property.garageSpots || ""}
                          onChangeText={(text) =>
                            updateRental({
                              property: {
                                ...rental.property,
                                garageSpots: text,
                              },
                            })
                          }
                          keyboardType="numeric"
                        />
                      </View>
                    </View>

                    <FormInput
                      label="Rua do imóvel"
                      placeholder="Ex: Rua das Flores"
                      value={rental.property.address.street}
                      onChangeText={(text) =>
                        updateRental({
                          property: {
                            ...rental.property,
                            address: {
                              ...rental.property.address,
                              street: text,
                            },
                          },
                        })
                      }
                    />

                    <View className="flex-row gap-3">
                      <View className="flex-1">
                        <FormInput
                          label="Número"
                          placeholder="Ex: 123"
                          value={rental.property.address.number}
                          onChangeText={(text) =>
                            updateRental({
                              property: {
                                ...rental.property,
                                address: {
                                  ...rental.property.address,
                                  number: text,
                                },
                              },
                            })
                          }
                          keyboardType="numeric"
                        />
                      </View>

                      <View className="flex-1">
                        <FormInput
                          label="Complemento"
                          placeholder="Ex: Bloco B"
                          value={rental.property.address.complement}
                          onChangeText={(text) =>
                            updateRental({
                              property: {
                                ...rental.property,
                                address: {
                                  ...rental.property.address,
                                  complement: text,
                                },
                              },
                            })
                          }
                        />
                      </View>
                    </View>

                    <FormInput
                      label="Bairro"
                      placeholder="Ex: Centro"
                      value={rental.property.address.neighborhood}
                      onChangeText={(text) =>
                        updateRental({
                          property: {
                            ...rental.property,
                            address: {
                              ...rental.property.address,
                              neighborhood: text,
                            },
                          },
                        })
                      }
                    />

                    <View className="flex-row gap-3">
                      <View className="flex-1">
                        <FormInput
                          label="Cidade"
                          placeholder="Ex: São Paulo"
                          value={rental.property.address.city}
                          onChangeText={(text) =>
                            updateRental({
                              property: {
                                ...rental.property,
                                address: {
                                  ...rental.property.address,
                                  city: text,
                                },
                              },
                            })
                          }
                        />
                      </View>

                      <View className="flex-0.25">
                        <StateSelect
                          label="UF"
                          value={rental.property.address.state}
                          onValueChange={(text) =>
                            updateRental({
                              property: {
                                ...rental.property,
                                address: {
                                  ...rental.property.address,
                                  state: text,
                                },
                              },
                            })
                          }
                          placeholder="Selecione"
                        />
                      </View>
                    </View>

                    <FormInput
                      label="CEP"
                      placeholder="Ex: 12345-678"
                      value={rental.property.address.cep}
                      onChangeText={(text) =>
                        updateRental({
                          property: {
                            ...rental.property,
                            address: {
                              ...rental.property.address,
                              cep: text,
                            },
                          },
                        })
                      }
                      keyboardType="numeric"
                    />
                  </View>

                  <View className="gap-4">
                    <Text className="text-lg font-semibold text-foreground">
                      Partes da Locação
                    </Text>

                    <FormInput
                      label="Proprietário / Locador"
                      placeholder="Ex: João Silva"
                      value={rental.parties.landlord.name}
                      onChangeText={(text) =>
                        updateRental({
                          parties: {
                            ...rental.parties,
                            landlord: {
                              ...rental.parties.landlord,
                              name: text,
                            },
                          },
                        })
                      }
                    />

                    <FormInput
                      label="CPF/CNPJ do proprietário"
                      placeholder="Digite o CPF ou CNPJ"
                      value={rental.parties.landlord.document}
                      onChangeText={(text) =>
                        updateRental({
                          parties: {
                            ...rental.parties,
                            landlord: {
                              ...rental.parties.landlord,
                              document: formatDocument(text),
                            },
                          },
                        })
                      }
                      keyboardType="numeric"
                    />

                    <FormInput
                      label="Inquilino / Locatário"
                      placeholder="Ex: Maria Santos"
                      value={rental.parties.tenant.name}
                      onChangeText={(text) =>
                        updateRental({
                          parties: {
                            ...rental.parties,
                            tenant: {
                              ...rental.parties.tenant,
                              name: text,
                            },
                          },
                        })
                      }
                    />

                    <FormInput
                      label="CPF/CNPJ do inquilino"
                      placeholder="Digite o CPF ou CNPJ"
                      value={rental.parties.tenant.document}
                      onChangeText={(text) =>
                        updateRental({
                          parties: {
                            ...rental.parties,
                            tenant: {
                              ...rental.parties.tenant,
                              document: formatDocument(text),
                            },
                          },
                        })
                      }
                      keyboardType="numeric"
                    />

                    <FormInput
                      label="Imobiliária / Administradora"
                      placeholder="Ex: Imobiliária ABC"
                      value={rental.parties.realEstate?.name || ""}
                      onChangeText={(text) =>
                        updateRental({
                          parties: {
                            ...rental.parties,
                            realEstate: {
                              ...(rental.parties.realEstate || {
                                name: "",
                                document: "",
                              }),
                              name: text,
                            },
                          },
                        })
                      }
                    />

                    <FormInput
                      label="CPF/CNPJ da imobiliária"
                      placeholder="Digite o CPF ou CNPJ"
                      value={rental.parties.realEstate?.document || ""}
                      onChangeText={(text) =>
                        updateRental({
                          parties: {
                            ...rental.parties,
                            realEstate: {
                              ...(rental.parties.realEstate || {
                                name: "",
                                document: "",
                              }),
                              document: formatDocument(text),
                            },
                          },
                        })
                      }
                      keyboardType="numeric"
                    />
                  </View>

                  <View className="gap-4">
                    <Text className="text-lg font-semibold text-foreground">
                      Contrato
                    </Text>

                    <FormInput
                      label="Número do contrato"
                      placeholder="Ex: LOC-2025-001"
                      value={rental.contract.number}
                      onChangeText={(text) =>
                        updateRental({
                          contract: {
                            ...rental.contract,
                            number: text,
                          },
                        })
                      }
                    />

                    <FormInput
                      label="Data de início da locação"
                      placeholder="Ex: 26/04/2026"
                      value={rental.contract.startDate}
                      onChangeText={(text) =>
                        updateRental({
                          contract: {
                            ...rental.contract,
                            startDate: text,
                          },
                        })
                      }
                    />

                    <FormInput
                      label="Data da vistoria"
                      placeholder="Ex: 26/04/2026"
                      value={rental.contract.inspectionDate}
                      onChangeText={(text) =>
                        updateRental({
                          contract: {
                            ...rental.contract,
                            inspectionDate: text,
                          },
                        })
                      }
                    />
                  </View>

                  <View className="gap-4">
                    <Text className="text-lg font-semibold text-foreground">
                      Chaves e Acessos
                    </Text>

                    <FormInput
                      label="Chaves da porta principal"
                      placeholder="Ex: 2"
                      value={String(rental.keys.mainDoor)}
                      onChangeText={(text) =>
                        updateRental({
                          keys: {
                            ...rental.keys,
                            mainDoor: Number(text || 0),
                          },
                        })
                      }
                      keyboardType="numeric"
                    />

                    <FormInput
                      label="Controles / chaves da garagem"
                      placeholder="Ex: 1"
                      value={String(rental.keys.garage)}
                      onChangeText={(text) =>
                        updateRental({
                          keys: {
                            ...rental.keys,
                            garage: Number(text || 0),
                          },
                        })
                      }
                      keyboardType="numeric"
                    />

                    <FormInput
                      label="Chaves de caixa de correio"
                      placeholder="Ex: 1"
                      value={String(rental.keys.mailbox)}
                      onChangeText={(text) =>
                        updateRental({
                          keys: {
                            ...rental.keys,
                            mailbox: Number(text || 0),
                          },
                        })
                      }
                      keyboardType="numeric"
                    />

                    <FormInput
                      label="Outras chaves / tags / observações"
                      placeholder="Ex: 1 tag de acesso, 1 controle do portão"
                      value={rental.keys.others}
                      onChangeText={(text) =>
                        updateRental({
                          keys: {
                            ...rental.keys,
                            others: text,
                          },
                        })
                      }
                    />
                  </View>

                  <View className="gap-4">
                    <Text className="text-lg font-semibold text-foreground">
                      Medidores
                    </Text>

                    <FormInput
                      label="Leitura de energia"
                      placeholder="Ex: 12345 kWh"
                      value={rental.meters.energy}
                      onChangeText={(text) =>
                        updateRental({
                          meters: {
                            ...rental.meters,
                            energy: text,
                          },
                        })
                      }
                    />

                    <FormInput
                      label="Leitura de água"
                      placeholder="Ex: 123 m³"
                      value={rental.meters.water}
                      onChangeText={(text) =>
                        updateRental({
                          meters: {
                            ...rental.meters,
                            water: text,
                          },
                        })
                      }
                    />

                    <FormInput
                      label="Leitura de gás"
                      placeholder="Ex: 45 m³"
                      value={rental.meters.gas}
                      onChangeText={(text) =>
                        updateRental({
                          meters: {
                            ...rental.meters,
                            gas: text,
                          },
                        })
                      }
                    />
                  </View>
                </View>
              )}

              <View className="gap-3 mt-4">
  <LargeButton title="Próximo" onPress={handleNext} variant="primary" />

  <Pressable onPress={() => router.back()}>
    <Text className="text-center text-primary font-semibold">
      Voltar
    </Text>
  </Pressable>

  <Pressable
    onPress={() => {
      reset();
      router.replace("/");
    }}
    style={{
      padding: 12,
      borderRadius: 10,
      backgroundColor: "#fee2e2",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "#dc2626", fontWeight: "700" }}>
      Limpar dados da vistoria
    </Text>
  </Pressable>
</View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Toast
        visible={showToast}
        message="Dados salvos com sucesso!"
        onHide={() => setShowToast(false)}
      />
    </ScreenContainer>
  );
}