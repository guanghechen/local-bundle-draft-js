import type { Options as PopperJsOptions, createPopper } from '@popperjs/core'
import { Modifier } from 'react-popper'
import { EditorState } from './draft-js'
import { EditorPlugin } from './draft-js-plugins-editor'

export declare type PopperOptions = Omit<Partial<PopperJsOptions>, 'modifiers'> & {
  createPopper?: typeof createPopper
  modifiers?: ReadonlyArray<Modifier<unknown>>
}

export interface MentionData {
  link?: string
  avatar?: string
  name: string
  id?: null | string | number
  [x: string]: any
}

export interface MentionPluginTheme {
  mention?: string
  mentionSuggestions?: string
  mentionSuggestionsPopup?: string
  mentionSuggestionsPopupVisible?: string
  mentionSuggestionsEntry?: string
  mentionSuggestionsEntryFocused?: string
  mentionSuggestionsEntryText?: string
  mentionSuggestionsEntryAvatar?: string
  [x: string]: string | undefined
}

export interface SubMentionComponentProps {
  mention: MentionData
  children: React.ReactNode
  className: string
  entityKey: string
  theme: MentionPluginTheme
  decoratedText: string
}

export interface EntryComponentProps {
  className?: string
  onMouseDown(event: React.MouseEvent): void
  onMouseUp(event: React.MouseEvent): void
  onMouseEnter(event: React.MouseEvent): void
  role: string
  id: string
  'aria-selected'?: boolean | 'false' | 'true'
  theme?: MentionPluginTheme
  mention: MentionData
  isFocused: boolean
  searchValue?: string
  selectMention(mention: MentionData | null): void
}

export interface PopoverComponentProps {
  className: string
  role: string
  id: string
}

interface ClientRectFunction {
  (): ClientRect
}

export interface MentionPluginStore {
  setEditorState?(editorState: EditorState): void
  getEditorState?(): EditorState
  getPortalClientRect(offsetKey: string): ClientRect
  getAllSearches(): Map<string, string>
  isEscaped(offsetKey: string): boolean
  escapeSearch(offsetKey: string): void
  resetEscapedSearch(): void
  register(offsetKey: string): void
  updatePortalClientRect(offsetKey: string, funct: ClientRectFunction): void
  unregister(offsetKey: string): void
  getIsOpened(): boolean
  setIsOpened(nextIsOpened: boolean): void
  getReferenceElement(): HTMLElement | null
  setReferenceElement(element: HTMLElement | null): void
}

export interface PopoverProps {
  store: MentionPluginStore
  children: React.ReactNode
  popperOptions?: PopperOptions
  theme: MentionPluginTheme
}

export interface MentionSuggestionsPubProps {
  suggestions: MentionData[]
  open: boolean
  onOpenChange(open: boolean): void
  onSearchChange(event: { trigger: string; value: string }): void
  onAddMention?(Mention: MentionData): void
  popoverComponent?: React.ReactElement<PopoverComponentProps & React.RefAttributes<HTMLElement>>
  entryComponent?: React.ComponentType<EntryComponentProps>
  popoverContainer?: React.ComponentType<PopoverProps>
  renderEmptyPopup?: boolean
}

export interface PositionSuggestionsParams {
  decoratorRect: ClientRect
  popover: HTMLElement
  props: {
    open: boolean
    suggestions: MentionData[]
    store: MentionPluginStore
  }
}

export function positionSuggestions({
  decoratorRect,
  popover,
  props,
}: PositionSuggestionsParams): React.CSSProperties

export interface MentionPluginConfig {
  mentionPrefix?: string
  theme?: MentionPluginTheme
  positionSuggestions?: typeof positionSuggestions
  mentionComponent?: React.ComponentType<SubMentionComponentProps>
  mentionSuggestionsComponent?: React.ComponentType
  entityMutability?: 'SEGMENTED' | 'IMMUTABLE' | 'MUTABLE'
  mentionTrigger?: string | string[]
  mentionRegExp?: string
  supportWhitespace?: boolean
  popperOptions?: PopperOptions
}

export function createMentionPlugin(config?: MentionPluginConfig): EditorPlugin & {
  MentionSuggestions: React.ComponentType<MentionSuggestionsPubProps>
}
