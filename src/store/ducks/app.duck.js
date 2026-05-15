import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

export const actionTypes = {
  PageSubtitle: "[Titles] Subtitles",
  PageTitle: "[Titles] Title",
  Keyword: "[Search] Keyword",
  Filters: "[Search] Filters",
  FromComponent: "[Search] Component",
  Display: "[Detail] Display",
  SaveSearchButton: "[QuickActions] SaveSearchButton",
  SaveSearch: "[QuickActions] SaveSearch",
  ShowSearch: "[QuickActions] ShowSearch",
  ShowVisualization: "[QuickActions] ShowVisualization",
  ShowVisualizationBar: "[QuickActions] ShowVisualizationBar",
  ShowSearchTags: "[QuickActions] ShowSearchTags",
  NewNotification: "[Notification] NewNotification",
};

const initialAppState = {
  pageSubtitle: "Sin resultados",
  pageTitle: "Sin título",
  keyword: "",
  filters: {
    filters: {
      keyword: "",
      resourceGroup: {
        resourceGroupText: "",
        resourceGroupIDS: "",
      },
      mapPolygon: "",
    },
  },
  fromComponent: "",
  saveSearchButton: false,
  saveSearch: false,
  showSearch: false,
  showVisualization: false,
  showVisualizationBar: false,
  newNotification: false,
  showSearchTags: false,
  display: {},
  tabSelected: 0,
};

export const reducer = persistReducer(
  {
    storage,
    key: "cev-app",
    whitelist: [
      "pageSubtitle",
      "keyword",
      "pageTitle",
      "filters",
      "saveSearchButton",
      "saveSearch",
      "showSearch",
      "showVisualization",
      "newNotification",
      "showVisualizationBar",
      "display",
      "showSearchTags",
      "fromComponent",
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
      case actionTypes.PageTitle: {
        const { pageTitle } = action.payload;
        return {
          ...state,
          pageTitle,
        };
      }

      case actionTypes.PageSubtitle: {
        const { pageSubtitle } = action.payload;
        return {
          ...state,
          pageSubtitle,
        };
      }

      case actionTypes.Keyword: {
        const { keyword } = action.payload;
        return {
          ...state,
          keyword,
        };
      }

      case actionTypes.Filters: {
        const { filters } = action.payload;
        return {
          ...state,
          filters,
        };
      }

      case actionTypes.FromComponent: {
        const { fromComponent } = action.payload;
        return {
          ...state,
          fromComponent,
        };
      }

      case actionTypes.SaveSearchButton: {
        const { saveSearchButton } = action.payload;
        return {
          ...state,
          saveSearchButton,
        };
      }

      case actionTypes.SaveSearch: {
        const { saveSearch } = action.payload;
        return {
          ...state,
          saveSearch,
        };
      }

      case actionTypes.ShowSearch: {
        const { showSearch } = action.payload;
        return {
          ...state,
          showSearch,
        };
      }

      case actionTypes.ShowVisualization: {
        const { showVisualization } = action.payload;
        return {
          ...state,
          showVisualization,
        };
      }

      case actionTypes.ShowVisualizationBar: {
        const { showVisualizationBar } = action.payload;
        return {
          ...state,
          showVisualizationBar,
        };
      }

      case actionTypes.NewNotification: {
        const { newNotification } = action.payload;
        return {
          ...state,
          newNotification,
        };
      }

      case actionTypes.Display: {
        const { display } = action.payload;
        return {
          ...state,
          display,
        };
      }

      case actionTypes.ShowSearchTags: {
        const { showSearchTags } = action.payload;
        return {
          ...state,
          showSearchTags,
        };
      }

      case actionTypes.SetTabSelected: {
        const { tabSelected } = action.payload;
        return {
          ...state,
          tabSelected,
        };
      }

      default: {
        return state;
      }
    }
  },
);

export const actions = {
  pageTitle: (pageTitle) => ({
    type: actionTypes.PageTitle,
    payload: {
      pageTitle,
    },
  }),
  pageSubtitle: (pageSubtitle) => ({
    type: actionTypes.PageSubtitle,
    payload: {
      pageSubtitle,
    },
  }),
  keyword: (keyword) => ({
    type: actionTypes.Keyword,
    payload: {
      keyword,
    },
  }),
  display: (display) => ({
    type: actionTypes.Display,
    payload: {
      display,
    },
  }),
  filters: (filters) => ({
    type: actionTypes.Filters,
    payload: {
      filters,
    },
  }),
  saveSearch: (saveSearch) => ({
    type: actionTypes.SaveSearch,
    payload: {
      saveSearch,
    },
  }),
  saveSearchButton: (saveSearchButton) => ({
    type: actionTypes.SaveSearchButton,
    payload: {
      saveSearchButton,
    },
  }),
  showSearch: (showSearch) => ({
    type: actionTypes.ShowSearch,
    payload: {
      showSearch,
    },
  }),
  showVisualization: (showVisualization) => ({
    type: actionTypes.ShowVisualization,
    payload: {
      showVisualization,
    },
  }),
  showVisualizationBar: (showVisualizationBar) => ({
    type: actionTypes.ShowVisualizationBar,
    payload: {
      showVisualizationBar,
    },
  }),
  newNotification: (newNotification) => ({
    type: actionTypes.NewNotification,
    payload: {
      newNotification,
    },
  }),
  showSearchTags: (showSearchTags) => ({
    type: actionTypes.ShowSearchTags,
    payload: {
      showSearchTags,
    },
  }),
  fromComponent: (fromComponent) => ({
    type: actionTypes.FromComponent,
    payload: {
      fromComponent,
    },
  }),
  setTabSelected: (tabSelected) => ({
    type: actionTypes.SetTabSelected,
    payload: {
      tabSelected,
    },
  }),
};
