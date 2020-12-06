import { createSlice, configureStore } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import * as samples from '../assets/samples'

export const basicTypes = {
  string: 'string',
  integer: 'integer',
  boolean: 'boolean',
  object: 'object',
  array: 'array',
  custom: 'none'
}

export const { reducer, actions } = createSlice({
  name: 'typesAndModels',
  initialState: {
    types: extractSamples(samples.samples),
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
      const uiSchema = {
        text: {
          'ui:autofocus': true,
          'ui:emptyValue': ''
        },

        integer: {
          'ui:widget': 'updown',
          'ui:title': 'Integers',
          'ui:description': 'Usable for Numbers'
        },
        boolean: {}
      }
      state.types.push({
        id: uuidv4(),
        name: 'Put Name of Schema here!',
        namespace: basicTypes.custom,
        uiSchema: JSON.stringify(uiSchema),
        formData: {},
        schema: {
          type: 'object',
          title: 'Basic Types',
          description: 'Basic Types for simple usage.',
          properties: {
            text: {
              type: basicTypes.string
            },
            integers: {
              type: basicTypes.integer
            },
            boolean: {
              type: basicTypes.boolean
            }
          }
        }
      })
    },
    addTypeField: (state, { payload: { key, value } }) => {
      state.types[state.currentTypeElementIdx].schema.properties[key] = {
        type: value,
        title: key,
        items:
          key === basicTypes.array
            ? {
                type: basicTypes.string
              }
            : undefined
      }
    },
    changeTypeField: (state, { payload: { key, value } }) => {
      if (key) {
        let obj = {}
        if (value === basicTypes.array) {
          obj = {
            type: value,
            title: key,
            items: {
              type: basicTypes.object,
              properties: {
                nested: {
                  title: 'Nested array',
                  type: 'string',
                  default: 'nested array default'
                }
              }
            }
          }
        } else {
          obj = {
            type: value,
            title: key
          }
        }
        state.types[state.currentTypeElementIdx].schema.properties[key] = obj
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
      const {
        name,
        namespace,
        schema,
        uiSchema,
        formData,
        id
      } = state.types.find((item) => item.name === type)

      state.models.push({
        id: uuidv4(),
        name: 'Un-Set-Model-Name',
        tenantId: '321',
        type: name,
        namespaces: [namespace],
        schemaId: id,
        schema,
        uiSchema,
        formData
      })
    },
    changeModelData: (draftState, { payload: { formData } }) => {
      const idx = draftState.currentModelElementIdx
      draftState.models[idx].formData = formData
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

function extractSamples(samples) {
  let samplesArray = []
  for (const key in samples) {
    const { schema, formData, uiSchema } = samples[key]
    const data = {
      id: uuidv4(),
      namespace: 'none',
      name: key,
      schema,
      formData,
      uiSchema: JSON.stringify(uiSchema)
    }
    samplesArray.push(data)
  }
  return samplesArray
}
