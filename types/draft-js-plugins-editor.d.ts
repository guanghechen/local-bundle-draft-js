import PropTypes from 'prop-types'
import {
  CompositeDecorator,
  ContentBlock,
  DraftBlockRenderMap,
  DraftDecorator,
  DraftDragType,
  DraftEditorCommand,
  DraftHandleValue,
  DraftInlineStyle,
  DraftStyleMap,
  Editor,
  EditorCommand,
  EditorProps,
  EditorState,
  SelectionState,
} from './draft-js'
import React from 'react'

export class PluginEditor extends React.Component<PluginEditorProps> {
  static propTypes: {
    editorState: PropTypes.Validator<object>
    onChange: PropTypes.Validator<(...args: any[]) => any>
    plugins: PropTypes.Requireable<any[]>
    defaultKeyBindings: PropTypes.Requireable<boolean>
    defaultKeyCommands: PropTypes.Requireable<boolean>
    defaultBlockRenderMap: PropTypes.Requireable<boolean>
    customStyleMap: PropTypes.Requireable<object>
    decorators: PropTypes.Requireable<any[]>
  }
  static defaultProps: Partial<PluginEditorProps>
  editor: Editor | null
  state: {
    readOnly: boolean
  }
  constructor(props: PluginEditorProps)
  focus(): void
  blur(): void
  componentDidMount(): void
  componentDidUpdate(prevProps: PluginEditorProps): void
  componentWillUnmount(): void
  onChange: (editorState: EditorState) => void
  getPlugins: () => EditorPlugin[]
  getProps: () => PluginEditorProps
  getReadOnly: () => boolean
  setReadOnly: (readOnly: boolean) => void
  getEditorRef: () => EditorRef
  getEditorState: () => EditorState
  getPluginMethods: () => PluginFunctions
  createPluginHooks: () => Partial<EditorProps>
  resolvePlugins: () => EditorPlugin[]
  resolveCustomStyleMap: () => DraftStyleMap
  resolveblockRenderMap: () => DraftBlockRenderMap
  resolveAccessibilityProps: () => AriaProps
  render(): React.ReactElement
}

declare type WrappedComponentType = React.ComponentType<any> & {
  WrappedComponent?: React.ComponentType<any>
}
interface ParamFunction {
  (param: WrappedComponentType): WrappedComponentType
}
export declare const createEditorStateWithText: (text: string) => EditorState
export declare const composeDecorators: (...funcs: Array<ParamFunction>) => ParamFunction

export interface PluginEditorProps extends Omit<EditorProps, 'keyBindingFn'> {
  plugins?: EditorPlugin[]
  defaultKeyBindings?: boolean
  defaultKeyCommands?: boolean
  defaultBlockRenderMap?: boolean
  keyBindingFn?(event: React.KeyboardEvent): DraftEditorCommand | string | null | undefined
  decorators?: Array<CompositeDecorator | DraftDecorator>
}

export interface GetSetEditorState {
  setEditorState(editorState: EditorState): void
  getEditorState(): EditorState
}
export interface EditorRef {
  refs?: {
    editor: HTMLElement
  }
  editor: HTMLElement
}
export interface PluginFunctions extends GetSetEditorState {
  getPlugins(): EditorPlugin[]
  getProps(): unknown
  getReadOnly(): boolean
  setReadOnly(readOnly: boolean): void
  getEditorRef(): EditorRef
}
export interface AriaProps {
  ariaHasPopup?: string
  ariaExpanded?: boolean
  ariaOwneeID?: string
  ariaActiveDescendantID?: string
}
export interface EditorPlugin {
  decorators?: Array<DraftDecorator | CompositeDecorator>
  getAccessibilityProps?(): AriaProps
  initialize?: (pluginFunctions: PluginFunctions) => void
  onChange?: (editorState: EditorState, pluginFunctions: PluginFunctions) => EditorState
  willUnmount?: (pluginFunctions: GetSetEditorState) => void
  blockRenderMap?: DraftBlockRenderMap
  blockRendererFn?(block: ContentBlock, pluginFunctions: PluginFunctions): any
  blockStyleFn?(block: ContentBlock, pluginFunctions: PluginFunctions): string | undefined | null
  customStyleFn?: (
    style: DraftInlineStyle,
    block: ContentBlock,
    pluginFunctions: PluginFunctions,
  ) => React.CSSProperties
  customStyleMap?: DraftStyleMap
  keyBindingFn?(
    event: React.KeyboardEvent,
    pluginFunctions: PluginFunctions,
  ): EditorCommand | null | undefined
  handleReturn?(
    event: React.KeyboardEvent,
    editorState: EditorState,
    pluginFunctions: PluginFunctions,
  ): DraftHandleValue | undefined
  handleKeyCommand?(
    command: EditorCommand,
    editorState: EditorState,
    eventTimeStamp: number,
    pluginFunctions: PluginFunctions,
  ): DraftHandleValue
  handleBeforeInput?(
    chars: string,
    editorState: EditorState,
    eventTimeStamp: number,
    pluginFunctions: PluginFunctions,
  ): DraftHandleValue
  handlePastedText?(
    text: string,
    html: string | undefined,
    editorState: EditorState,
    pluginFunctions: PluginFunctions,
  ): DraftHandleValue
  handlePastedFiles?(files: Array<Blob>, pluginFunctions: PluginFunctions): DraftHandleValue
  handleDroppedFiles?(
    selection: SelectionState,
    files: Array<Blob>,
    pluginFunctions: PluginFunctions,
  ): DraftHandleValue
  handleDrop?(
    selection: SelectionState,
    dataTransfer: Record<string, unknown>,
    isInternal: DraftDragType,
    pluginFunctions: PluginFunctions,
  ): DraftHandleValue
  onEscape?(event: React.KeyboardEvent, pluginFunctions: PluginFunctions): void | true
  onTab?(event: React.KeyboardEvent, pluginFunctions: PluginFunctions): void | true
  onUpArrow?(event: React.KeyboardEvent, pluginFunctions: PluginFunctions): void | true
  onDownArrow?(event: React.KeyboardEvent, pluginFunctions: PluginFunctions): void | true
  onRightArrow?(event: React.KeyboardEvent, pluginFunctions: PluginFunctions): void | true
  onLeftArrow?(event: React.KeyboardEvent, pluginFunctions: PluginFunctions): void | true
  onBlur?(event: React.SyntheticEvent, pluginFunctions: PluginFunctions): void | true
  onFocus?(event: React.SyntheticEvent, pluginFunctions: PluginFunctions): void | true
}
