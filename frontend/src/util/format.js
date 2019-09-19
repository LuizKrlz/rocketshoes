/**
 * O Intl é um helper que faz formatação e é nativo do próprio
 * javascript e pode ser utilizado para formatar varios tipos de dados
 */
export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
