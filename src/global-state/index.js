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

const examples = extractSamples(samples.samples)

export const { reducer, actions } = createSlice({
  name: 'global',
  initialState: {
    samples: examples,
    types: [examples[0]],
    models: [],
    isTypesDialogOpen: false,
    isSchemaDialogFieldAddOpen: false,
    currentTypeElementIdx: 0,
    isModelsDialogOpen: false,
    currentModelElementIdx: 0,
    currentSchema: {},
    currentModel: {}
  },
  reducers: {
    setSchemasDialogOpen: (
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
    addSchema: (state) => {
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
        //$schema: 'http://json-schema.org/draft-07/schema#',
        id: uuidv4(),
        name: '',
        namespace: basicTypes.custom,
        uiSchema: JSON.stringify(uiSchema),
        formData: {},
        schema: {
          type: 'object',
          title: '',
          description: '',
          properties: {
            // text: {
            //   type: basicTypes.string
            // }
          }
        }
      })
    },
    addSchemaField: (state, { payload: { key, value } }) => {
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
    },
    changeSchemaField: (state, { payload: { key, value } }) => {
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
        } else if (value === basicTypes.object) {
          obj = {
            type: value,
            title: key,
            properties: {
              [key]: {}
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
    setSchema: (state, { payload: { schema } }) => {
      if (schema) {
        state.types[state.currentTypeElementIdx].schema = schema
      } else {
        state.types[state.currentTypeElementIdx].schema = state.currentSchema
      }
    },
    changeSchemaName: (state, { payload: { name } }) => {
      if (name) {
        state.types[state.currentTypeElementIdx].name = name
      }
    },
    changeSchemaNamespace: (state, { payload: { namespace } }) => {
      state.types[state.currentTypeElementIdx].namespace = namespace
    },
    changeSchemaTitle: (state, { payload: { title } }) => {
      state.types[state.currentTypeElementIdx].schema.title = title
    },
    changeSchemaDescription: (state, { payload: { description } }) => {
      state.types[state.currentTypeElementIdx].schema.description = description
    },
    loadExamples: (state) => {
      state.types = state.samples
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
        name: '',
        tenantId: '',
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
    changeModelName: (draftState, { payload: { name } }) => {
      const idx = draftState.currentModelElementIdx
      draftState.models[idx].name = name
    }
  }
})

export const {
  setSchemasDialogOpen,
  setModelsDialogOpen,
  addSchema,
  addSchemaField,
  changeSchemaField,
  setSchema,
  changeSchemaName,
  changeSchemaNamespace,
  changeSchemaTitle,
  changeSchemaDescription,
  loadExamples,
  addModel,
  changeModelData,
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
