import PluginEditor from '@draft-js-plugins/editor'
import createMentionPlugin from '@draft-js-plugins/mention'

export * from 'draft-js'
export {
  createEditorStateWithText,
  composeDecorators,
  PluginEditorProps,
} from '@draft-js-plugins/editor'
export * from '@draft-js-plugins/mention'
export * from './adjustBlockDepthForContentState'
export * from './isSoftNewlineEvent'
export { PluginEditor, createMentionPlugin }
