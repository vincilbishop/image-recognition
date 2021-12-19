export interface Convertible {
    convert(): Promise<void>
    convertImage(input: string, output: string, percent: number): Promise<void>
}