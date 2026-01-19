export interface ProdutosType {
    id: string
    name: string
    description: string
    price: number
    stock: number
    category: string
    ratingAvg: number
    ratingCount?: number
    images?: string[]
}