import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

export const actionTypes = {
  Keyword: "[Search] Keyword",
  SetTabSelected: "[QuickActions] SetTabSelected",
  SetPage: "[QuickActions] SetPage",
  SetDpto: "[QuickActions] SetDpto",
  SetMpio: "[QuickActions] SetMpio",
  SetTempRange: "[QuickActions] SetTempRange",
  SetTotal: "[Search] SetTotal",
  SetUserBookmarks: "[Search] SetUserBookmarks",
  SetSection: "[QuickActions] SetSection",
  SetActiveStepCrea: "[QuickActions] SetActiveStepCrea",
  SetOpenLienzoCrea: "[QuickActions] SetOpenLienzoCrea",
  SetActiveCollection: "[Detail] SetActiveCollection",
  SetSelectedBilioteca: "[Search] SetSelectedBilioteca",
  SetAgregarRecursosBiblioteca: "[QuickActions] SetAgregarRecursosBiblioteca",
  SetSearchToBack: "[QuickActions] SetSearchToBack",
};

const initialAppState = {
  keyword: "",
  tabSelected: 0,
  pageExplora: 1,
  dptoExplora: null,
  mpioExplora: null,
  temporalRangeExplora: null,
  totalExplora: null,
  userBookmarks: null,
  currentSection: null,
  activeStepCrea: 0,
  openLienzoCrea: false,
  activeCollection: {
    cards: [],
    locations_resources: [],
    geographicCoverage: [],
    keywords: [],
    keywords_resources: [],
    temporalCoverage: {},
    place_creation: {},
    type_author: "",
    author: "",
    area_author: null,
    mandate: null,
    topic: null,
    category: "",
    type: "",
    cover_page: {},
    title: "",
    description: "",
    user: "",
  },
  selectedBilioteca: [],
  agregarRecursosBiblioteca: false,
  searchToBack: null,
};

export const reducer = persistReducer(
  {
    storage,
    key: "cev-museo",
    whitelist: [
      "keyword",
      "tabSelected",
      "pageExplora",
      "dptoExplora",
      "mpioExplora",
      "temporalRangeExplora",
      "totalExplora",
      "userBookmarks",
      "currentSection",
      "selectedBilioteca",
      "activeCollection",
      "activeStepCrea",
      "openLienzoCrea",
      "agregarRecursosBiblioteca",
    ],
    transforms: [
      encryptTransform({
        secretKey: "key_secret",
        onError: function (error) {},
      }),
    ],
  },
  (state = initialAppState, action) => {
    switch (action.type) {
      case actionTypes.Keyword: {
        const { keyword } = action.payload;
        return {
          ...state,
          keyword,
        };
      }

      case actionTypes.SetTabSelected: {
        const { tabSelected } = action.payload;
        return {
          ...state,
          tabSelected,
        };
      }

      case actionTypes.SetSection: {
        const { currentSection } = action.payload;
        return {
          ...state,
          currentSection,
        };
      }

      case actionTypes.SetTotal: {
        const { totalExplora } = action.payload;
        return {
          ...state,
          totalExplora,
        };
      }

      case actionTypes.SetPage: {
        const { pageExplora } = action.payload;
        return {
          ...state,
          pageExplora,
        };
      }

      case actionTypes.SetTempRange: {
        const { temporalRangeExplora } = action.payload;
        return {
          ...state,
          temporalRangeExplora,
        };
      }

      case actionTypes.SetUserBookmarks: {
        const { userBookmarks } = action.payload;
        return {
          ...state,
          userBookmarks,
        };
      }

      case actionTypes.SetDpto: {
        const { dptoExplora } = action.payload;
        return {
          ...state,
          dptoExplora,
        };
      }

      case actionTypes.SetMpio: {
        const { mpioExplora } = action.payload;
        return {
          ...state,
          mpioExplora,
        };
      }

      case actionTypes.SetActiveStepCrea: {
        const { activeStepCrea } = action.payload;
        return {
          ...state,
          activeStepCrea,
        };
      }

      case actionTypes.SetOpenLienzoCrea: {
        const { openLienzoCrea } = action.payload;
        return {
          ...state,
          openLienzoCrea,
        };
      }

      case actionTypes.SetActiveCollection: {
        const { activeCollection } = action.payload;
        return {
          ...state,
          activeCollection,
        };
      }

      case actionTypes.SetSelectedBilioteca: {
        const { selectedBilioteca } = action.payload;
        return {
          ...state,
          selectedBilioteca,
        };
      }

      case actionTypes.SetAgregarRecursosBiblioteca: {
        const { agregarRecursosBiblioteca } = action.payload;
        return {
          ...state,
          agregarRecursosBiblioteca,
        };
      }

      case actionTypes.SetSearchToBack: {
        const { searchToBack } = action.payload;
        return {
          ...state,
          searchToBack,
        };
      }

      default: {
        return state;
      }
    }
  },
);

export const actions = {
  keyword: (keyword) => ({
    type: actionTypes.Keyword,
    payload: {
      keyword,
    },
  }),
  setTabSelected: (tabSelected) => ({
    type: actionTypes.SetTabSelected,
    payload: {
      tabSelected,
    },
  }),
  setSection: (currentSection) => ({
    type: actionTypes.SetSection,
    payload: {
      currentSection,
    },
  }),
  setTotalExplora: (totalExplora) => ({
    type: actionTypes.SetTotal,
    payload: {
      totalExplora,
    },
  }),
  setPageExplora: (pageExplora) => ({
    type: actionTypes.SetPage,
    payload: {
      pageExplora,
    },
  }),
  setTempRange: (temporalRangeExplora) => ({
    type: actionTypes.SetTempRange,
    payload: {
      temporalRangeExplora,
    },
  }),
  setUserBookmarks: (userBookmarks) => ({
    type: actionTypes.SetUserBookmarks,
    payload: {
      userBookmarks,
    },
  }),
  setDpto: (dptoExplora) => ({
    type: actionTypes.SetDpto,
    payload: {
      dptoExplora,
    },
  }),
  setMpio: (mpioExplora) => ({
    type: actionTypes.SetMpio,
    payload: {
      mpioExplora,
    },
  }),
  setActiveCollection: (activeCollection) => ({
    type: actionTypes.SetActiveCollection,
    payload: {
      activeCollection,
    },
  }),
  setActiveStepCrea: (activeStepCrea) => ({
    type: actionTypes.SetActiveStepCrea,
    payload: {
      activeStepCrea,
    },
  }),
  setOpenLienzoCrea: (openLienzoCrea) => ({
    type: actionTypes.SetOpenLienzoCrea,
    payload: {
      openLienzoCrea,
    },
  }),
  setSelectedBilioteca: (selectedBilioteca) => ({
    type: actionTypes.SetSelectedBilioteca,
    payload: {
      selectedBilioteca,
    },
  }),
  setAgregarRecursosBiblioteca: (agregarRecursosBiblioteca) => ({
    type: actionTypes.SetAgregarRecursosBiblioteca,
    payload: {
      agregarRecursosBiblioteca,
    },
  }),
  SetSearchToBack: (searchToBack) => ({
    type: actionTypes.SetSearchToBack,
    payload: {
      searchToBack,
    },
  }),
};
