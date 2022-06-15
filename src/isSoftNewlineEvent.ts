export function isSoftNewlineEvent(e: React.KeyboardEvent): boolean {
  return (
    e.which === 13 &&
    (e.getModifierState('Shift') || e.getModifierState('Alt') || e.getModifierState('Control'))
  )
}
