declare namespace pako {
    export function gzip(str: string, paran: object = { to: 'string' })
    export function ungzip(str: string, paran: object = { to: 'string' })
}