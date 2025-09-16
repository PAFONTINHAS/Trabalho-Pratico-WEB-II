export let todasSolicitacoes = [
    { 
      id: 0, 
      equipamento: 'Notebook Lenovo', 
      cliente: 'Amauri Correia',        
      descricao: 'Tela quebrada', 
      dataSolicitacao: parseDataSolicitacao('16/09/2025 - 15:48'),
      categoria: 'Notebook', 
      status:'ABERTA',
    },
    { 
      id: 1, 
      equipamento: 'Smartphone Samsung',
      cliente: 'Amauri Correia',      
      descricao: 'Botão de ligar pifou', 
      dataSolicitacao: parseDataSolicitacao('16/09/2025 - 15:48'), 
      categoria: 'Celular',
      status:'ABERTA',
    },
    { 
      id: 2, 
      equipamento: 'Tablet Apple iPad', 
      cliente: 'Amauri Correia',      
      descricao: 'Problema na bateria', 
      dataSolicitacao: parseDataSolicitacao('05/08/2025 - 15:48'), 
      categoria: 'Tablet',
      status:'ABERTA',
    },
    { 
      id: 3, 
      equipamento: 'Notebook Dell Inspiron', 
      cliente: 'Amauri Correia', 
      descricao: 'Teclado não funciona', 
      dataSolicitacao: parseDataSolicitacao('03/08/2025 - 15:48'), 
      categoria: 'Notebook',
      status:'ABERTA',
    },
    { 
      id: 4, 
      equipamento: 'Impresora HP 5300', 
      cliente: 'Amauri Correia',
      descricao: 'Carcaça estraçalhada pelo meu...', 
      dataSolicitacao: parseDataSolicitacao('01/08/2025 - 15:48'), 
      categoria: 'Impressora',
      status:'ABERTA',
    },
    // Novas solicitações com outros status
    {
      id: 5,
      equipamento: 'Monitor LG UltraWide',
      cliente: 'Bruna Silva',
      descricao: 'Tela piscando',
      dataSolicitacao: parseDataSolicitacao('10/09/2025 - 09:30'),
      categoria: 'Monitor',
      status: 'ORÇADA',
    },
    {
      id: 6,
      equipamento: 'Impressora Epson L3150',
      cliente: 'Carlos Souza',
      descricao: 'Não puxa papel',
      dataSolicitacao: parseDataSolicitacao('12/09/2025 - 11:15'),
      categoria: 'Impressora',
      status: 'APROVADA',
    },
    {
      id: 7,
      equipamento: 'Notebook Acer Aspire',
      cliente: 'Daniela Lima',
      descricao: 'Superaquecendo',
      dataSolicitacao: parseDataSolicitacao('14/09/2025 - 14:00'),
      categoria: 'Notebook',
      status: 'REDIRECIONADA',
    },
    {
      id: 8,
      equipamento: 'Tablet Samsung Galaxy Tab',
      cliente: 'Eduardo Ramos',
      descricao: 'Não liga',
      dataSolicitacao: parseDataSolicitacao('13/09/2025 - 16:45'),
      categoria: 'Tablet',
      status: 'ARRUMADA',
    }
];


export function parseDataSolicitacao(dataStr : string) : Date{
  const [data, hora] = dataStr.split(' - ');
  const [dia, mes, ano] = data.split('/').map(Number);
  const [horas, minutos] = hora.split(':').map(Number);
  return new Date(ano, mes -1, dia, horas, minutos);
}