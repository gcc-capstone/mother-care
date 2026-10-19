// Vite command check is essential: even `build --mode testing` or NODE_ENV=development must stay off.
export function usabilityEnabled(command: string, mode: string, flag: string | undefined): boolean {
  return command === 'serve' && mode !== 'production' && flag === 'true'
}
