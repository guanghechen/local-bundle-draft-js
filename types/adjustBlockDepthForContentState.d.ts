import type { ContentState, SelectionState } from './draft-js';
export declare function adjustBlockDepthForContentState(
  contentState: ContentState,
  selectionState: SelectionState,
  adjustment: number,
  maxDepth?: number,
): ContentState
