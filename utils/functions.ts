export const firstToUpper = (input: string) => {
    return `${input[0].toUpperCase()}${input.slice(1, input.length).toLowerCase()}`
}