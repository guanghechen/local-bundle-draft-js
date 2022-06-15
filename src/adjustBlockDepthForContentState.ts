import type { ContentState, SelectionState } from 'draft-js'

export function adjustBlockDepthForContentState(
  contentState: ContentState,
  selectionState: SelectionState,
  adjustment: number,
  maxDepth?: number,
): ContentState {
  const startKey = selectionState.getStartKey()
  const endKey = selectionState.getEndKey()
  let blockMap = contentState.getBlockMap()
  const blocks = blockMap
    .toSeq()
    .skipUntil(function (_, k) {
      return k === startKey
    })
    .takeUntil(function (_, k) {
      return k === endKey
    })
    .concat([[endKey, blockMap.get(endKey)]])
    .map((block) => {
      let depth = block!.getDepth() + adjustment
      depth = Math.max(0, Math.min(depth, maxDepth as number))
      return block!.set('depth', depth)
    })
  blockMap = blockMap.merge(blocks as any)
  return contentState.merge({
    blockMap: blockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState,
  }) as ContentState
}