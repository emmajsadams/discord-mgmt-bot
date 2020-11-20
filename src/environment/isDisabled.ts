// TODO: change this to featureIsEnabled (I only ever check for that)
// TODO: create enum instead of string
export default function getDisableEnv(name: string): boolean {
	const stringBoolean = process.env[`DISABLE_${name.toUpperCase()}`]

	return stringBoolean === 'true'
}
