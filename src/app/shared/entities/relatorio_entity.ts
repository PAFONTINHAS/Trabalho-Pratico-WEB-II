export interface ReceitaPorPeriodo {
    dia: string; // Formato: "YYYY-MM-DD"
    totalReceita: number; // Alterado de BigDecimal para number
}

export interface ReceitaPorCategoria {
    categoria: string; // Nome da categoria
    totalReceita: number; // Alterado de BigDecimal para number
}