// TODO: validate boolean string
export default function getDisableEnv(name: string): boolean {
  const stringBoolean = process.env[`DISABLE_${name.toUpperCase()}`]

  return stringBoolean === 'true'
}
