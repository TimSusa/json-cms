import { createSlice, configureStore } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export const basicTypes = {
  string: 'String',
  integer: 'Integer',
  boolean: 'Boolean',
  custom: 'Custom'
}

export const { reducer, actions } = createSlice({
  name: 'typesAndModels',
  initialState: {
    types: [
      {
        name: 'CityWeatherExampleSchema ',
        namespace: 'custom',
        fields: {
          city: basicTypes.string,
          temperature: basicTypes.integer,
          isRainy: basicTypes.boolean
        }
      }
      // {
      //   name: 'WeatherCountry',
      //   namespace: 'inland',
      //   fields: { city: 'CityWeather' }
      // }
    ],
    models: [],
    isTypesDialogOpen: false,
    isAddTypeFieldDialogOpen: false,
    currentTypeElementIdx: 0,
    isModelsDialogOpen: false,
    currentModelElementIdx: 0
  },
  reducers: {
    setTypesDialogOpen: (
      draftState,
      { payload: { isTypesDialogOpen, currentTypeElementIdx } }
    ) => {
      draftState.isTypesDialogOpen = isTypesDialogOpen
      if (typeof currentTypeElementIdx === 'number') {
        draftState.currentTypeElementIdx = currentTypeElementIdx
      }
    },
    setModelsDialogOpen: (
      draftState,
      { payload: { isModelsDialogOpen, currentModelElementIdx } }
    ) => {
      draftState.isModelsDialogOpen = isModelsDialogOpen
      if (typeof currentModelElementIdx === 'number') {
        draftState.currentModelElementIdx = currentModelElementIdx
      }
    },
    addType: (state) => {
      state.types.push({
        name: 'Un-Set',
        namespace: 'custom',
        fields: {
          //dummyTextField: basicTypes.string
        }
      })
    },
    addTypeField: (state, { payload: { key, value } }) => {
      state.types[state.currentTypeElementIdx].fields[key] = value
    },
    changeTypeField: (state, { payload: { key, value } }) => {
      if (key) {
        state.types[state.currentTypeElementIdx].fields[key] = value
      }
    },
    changeTypeName: (state, { payload: { name } }) => {
      if (name) {
        state.types[state.currentTypeElementIdx].name = name
      }
    },
    changeTypeNamespace: (state, { payload: { namespace } }) => {
      state.types[state.currentTypeElementIdx].namespace = namespace
    },
    addModel: (state, { payload: { type } }) => {
      const { name, namespace, fields } = state.types.find(
        (item) => item.name === type
      )
      if (typeof fields === 'string') {
        console.log('timf ', fields)
      } else {
        state.models.push({
          id: uuidv4(),
          name: 'Un-Set-Model-Name',
          tenantId: '321',
          type: name,
          namespaces: [namespace],
          json: fields
        })
      }
    },
    changeModelData: (draftState, { payload: { key, value } }) => {
      const idx = draftState.currentModelElementIdx
      draftState.models[idx].json[key] = value
    },
    changeModelDataNested: (
      draftState,
      { payload: { typeName, key, value, idx } }
    ) => {
      //const idx = draftState.currentModelElementIdx
      console.log({ typeName, key, value, idx })
      draftState.models[idx].json[typeName][key] = value
    },
    changeModelName: (draftState, { payload: { name } }) => {
      const idx = draftState.currentModelElementIdx
      draftState.models[idx].name = name
    }
  }
})

export const {
  setTypesDialogOpen,
  setModelsDialogOpen,
  addType,
  addTypeField,
  changeTypeField,
  changeTypeName,
  changeTypeNamespace,
  addModel,
  changeModelData,
  changeModelDataNested,
  changeModelName
} = actions

export const store = configureStore({
  reducer
})
