import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type InspectionType = "simple" | "technical" | "rental";

export interface AddressData {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}

export interface ClientData {
  documentType: "cpf" | "cnpj";
  document: string;
  nameType: "individual" | "company";
  fullName: string;
  address: AddressData;
  email: string;
  phone: string;
}

export interface VistoriadorData {
  documentType: "cpf" | "cnpj";
  document: string;
  nameType: "individual" | "company";
  name: string;
  address: AddressData;
  email: string;
  phone: string;
  crea?: string;
  cau?: string;
}

export interface InspectionConditions {
  date: string;
  time: string;
  weather: "sunny" | "cloudy" | "rainy" | "partly_cloudy";
  access: "total" | "partial" | "restricted";
  lighting: "adequate" | "partial" | "insufficient";
  occupancy: "empty" | "occupied" | "under_construction";
  artMode?: "with_art" | "without_art";
  artNumber?: string;
  artDate?: string;
  artType?: string;
  artNotes?: string;
}

export interface InspectionPhoto {
  id: string;
  uri: string;
  timestamp: string;
  latitude?: number;
  longitude?: number;
  itemId?: string;
  status?: "approved" | "rejected" | "na";
  description?: string;
  caption?: string;
}

export interface InspectionItem {
  id: string;
  name: string;
  status: "approved" | "rejected" | "na";
  photos: InspectionPhoto[];
  description: string;
}

export interface RoomTest {
  id: string;
  description: string;
  instruction?: string;
  practicalDescription?: string;
  stepByStep?: string[];
  objectiveCriteria?: {
    approved: string;
    rejected: string;
    na: string;
  };
  criticality?: {
    low: {
      label: string;
      reportText: string;
    };
    medium: {
      label: string;
      reportText: string;
    };
    high: {
      label: string;
      reportText: string;
    };
  };
  status: string;
  severity?: "" | "low" | "medium" | "high";
  photos: Array<{
    id: string;
    uri: string;
    caption: string;
    timestamp: string;
  }>;
  isCustom?: boolean;
  customSectionTitle?: string;
  rejectionLegend?: string;
}

export interface RoomSection {
  id: string;
  title: string;
  tests: RoomTest[];
}

export interface RoomData {
  id: string;
  roomName: string;
  areaType: "internal" | "external";
  sections: RoomSection[];
  observations: string;
  createdAt: string;
}

export interface InspectionState {
  type: InspectionType | null;
  client: ClientData;
  vistoriador: VistoriadorData;
  conditions: InspectionConditions;
  items: InspectionItem[];
  rooms: RoomData[];
  currentInspectionId: string | null;
  createdAt: string;
  updatedAt: string;

  rental?: {
  type: "entry" | "exit"; // entrada ou saída
  referenceInspectionId?: string;

  property: {
    type: string; // casa, apto
    address: AddressData;
    condominium?: string;
    unit?: string;
    garageSpots?: string;
  };

  parties: {
    landlord: {
      name: string;
      document: string;
    };
    tenant: {
      name: string;
      document: string;
    };
    realEstate?: {
      name: string;
      document: string;
    };
  };

  contract: {
    number: string;
    startDate: string;
    inspectionDate: string;
  };

  keys: {
    mainDoor: number;
    garage: number;
    mailbox: number;
    others: string;
  };

  meters: {
    energy: string;
    water: string;
    gas: string;
  };
};
}

export interface InspectionContextType {
  state: InspectionState;
  setInspectionType: (type: InspectionType) => void;
  updateClient: (data: Partial<ClientData>) => void;
  updateVistoriador: (data: Partial<VistoriadorData>) => void;
  updateConditions: (data: Partial<InspectionConditions>) => void;
  addPhoto: (photo: InspectionPhoto) => void;
  updateItem: (itemId: string, data: Partial<InspectionItem>) => void;
  saveRoom: (room: RoomData) => void;
  deleteRoom: (roomId: string) => void;
  loadInspectionState: (data: InspectionState) => void;
  setCurrentInspectionId: (id: string | null) => void;
  reset: () => Promise<void>;
  updateRental: (data: Partial<InspectionState["rental"]>) => void;
}

const STORAGE_KEY = "@checkmais_current_inspection";

const defaultAddress: AddressData = {
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  cep: "",
};

const defaultState: InspectionState = {
  type: null,
  client: {
    documentType: "cpf",
    document: "",
    nameType: "individual",
    fullName: "",
    address: { ...defaultAddress },
    email: "",
    phone: "",
  },
  vistoriador: {
    documentType: "cpf",
    document: "",
    nameType: "individual",
    name: "",
    address: { ...defaultAddress },
    email: "",
    phone: "",
    crea: "",
    cau: "",
  },
  conditions: {
    date: "",
    time: "",
    weather: "sunny",
    access: "total",
    lighting: "adequate",
    occupancy: "empty",

    cleaning: "",
    energy: "",
    water: "",

    artMode: "without_art",
    artNumber: "",
    artDate: "",
    artType: "",
    artNotes: "",
  },
  items: [],
  rooms: [],
  currentInspectionId: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  rental: {
  type: "entry",

  referenceInspectionId: "", 

  property: {
    type: "",
    address: { ...defaultAddress },
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
},
};

type Action =
  | { type: "SET_INSPECTION_TYPE"; payload: InspectionType }
  | { type: "UPDATE_CLIENT"; payload: Partial<ClientData> }
  | { type: "UPDATE_VISTORIADOR"; payload: Partial<VistoriadorData> }
  | { type: "UPDATE_CONDITIONS"; payload: Partial<InspectionConditions> }
  | { type: "ADD_PHOTO"; payload: InspectionPhoto }
  | { type: "UPDATE_ITEM"; payload: { itemId: string; data: Partial<InspectionItem> } }
  | { type: "SAVE_ROOM"; payload: RoomData }
  | { type: "DELETE_ROOM"; payload: string }
  | { type: "LOAD_INSPECTION"; payload: InspectionState }
  | { type: "SET_CURRENT_INSPECTION_ID"; payload: string | null }
  | { type: "UPDATE_RENTAL"; payload: Partial<InspectionState["rental"]> }
  | { type: "RESET" };

function inspectionReducer(state: InspectionState, action: Action): InspectionState {
  switch (action.type) {
    case "SET_INSPECTION_TYPE":
      return {
        ...state,
        type: action.payload,
        updatedAt: new Date().toISOString(),
      };

    case "UPDATE_CLIENT":
      return {
        ...state,
        client: {
          ...state.client,
          ...action.payload,
          address: {
            ...state.client.address,
            ...(action.payload.address || {}),
          },
        },
        updatedAt: new Date().toISOString(),
      };

    case "UPDATE_VISTORIADOR":
      return {
        ...state,
        vistoriador: {
          ...state.vistoriador,
          ...action.payload,
          address: {
            ...state.vistoriador.address,
            ...(action.payload.address || {}),
          },
        },
        updatedAt: new Date().toISOString(),
      };

    case "UPDATE_CONDITIONS":
      return {
        ...state,
        conditions: { ...state.conditions, ...action.payload },
        updatedAt: new Date().toISOString(),
      };

    case "ADD_PHOTO":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, photos: [...item.photos, action.payload] }
            : item
        ),
        updatedAt: new Date().toISOString(),
      };

    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.itemId ? { ...item, ...action.payload.data } : item
        ),
        updatedAt: new Date().toISOString(),
      };

    case "SAVE_ROOM": {
      const exists = state.rooms.find((room) => room.id === action.payload.id);

      const updatedRooms = exists
        ? state.rooms.map((room) =>
            room.id === action.payload.id ? action.payload : room
          )
        : [...state.rooms, action.payload];

      return {
        ...state,
        rooms: updatedRooms,
        updatedAt: new Date().toISOString(),
      };
    }

    case "DELETE_ROOM":
  return {
    ...state,
    rooms: state.rooms.filter((room) => room.id !== action.payload),
    updatedAt: new Date().toISOString(),
  };

    case "LOAD_INSPECTION":
  return {
    ...defaultState,
    ...action.payload,
     rental: {
      ...defaultState.rental,
      ...action.payload.rental,
    },
    updatedAt: new Date().toISOString(),
  };

    case "SET_CURRENT_INSPECTION_ID":
      return {
        ...state,
        currentInspectionId: action.payload,
        updatedAt: new Date().toISOString(),
      };

      case "UPDATE_RENTAL":
  return {
    ...state,
    rental: {
      ...state.rental,
      ...action.payload,
    },
    updatedAt: new Date().toISOString(),
  };

    case "RESET":
      return {
        ...defaultState,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

    default:
      return state;
  }
}

const InspectionContext = createContext<InspectionContextType | undefined>(undefined);

export function InspectionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(inspectionReducer, defaultState);

  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved) {
          const parsed = JSON.parse(saved);
          dispatch({ type: "LOAD_INSPECTION", payload: parsed });
        }
      } catch (error) {
        console.log("Erro ao carregar vistoria salva:", error);
      }
    };

    loadSavedState();
  }, []);

  useEffect(() => {
    const persistState = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.log("Erro ao salvar vistoria localmente:", error);
      }
    };

    persistState();
  }, [state]);

  const value: InspectionContextType = {
    state,
    setInspectionType: (type) =>
      dispatch({ type: "SET_INSPECTION_TYPE", payload: type }),

    updateClient: (data) =>
      dispatch({ type: "UPDATE_CLIENT", payload: data }),

    updateVistoriador: (data) =>
      dispatch({ type: "UPDATE_VISTORIADOR", payload: data }),

    updateConditions: (data) =>
      dispatch({ type: "UPDATE_CONDITIONS", payload: data }),

    addPhoto: (photo) =>
      dispatch({ type: "ADD_PHOTO", payload: photo }),

    updateItem: (itemId, data) =>
      dispatch({ type: "UPDATE_ITEM", payload: { itemId, data } }),

    saveRoom: (room) =>
      dispatch({ type: "SAVE_ROOM", payload: room }),

    deleteRoom: (roomId) =>
       dispatch({ type: "DELETE_ROOM", payload: roomId }),

    loadInspectionState: (data) =>
      dispatch({ type: "LOAD_INSPECTION", payload: data }),

    setCurrentInspectionId: (id) =>
      dispatch({ type: "SET_CURRENT_INSPECTION_ID", payload: id }),

    updateRental: (data) =>
      dispatch({ type: "UPDATE_RENTAL", payload: data }),

    reset: async () => {
      try {
        await AsyncStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.log("Erro ao limpar vistoria salva:", error);
      }

      dispatch({ type: "RESET" });
    },
  };

  return (
    <InspectionContext.Provider value={value}>
      {children}
    </InspectionContext.Provider>
  );
}

export function useInspection() {
  const context = useContext(InspectionContext);

  if (!context) {
    throw new Error("useInspection must be used within InspectionProvider");
  }

  return context;
}