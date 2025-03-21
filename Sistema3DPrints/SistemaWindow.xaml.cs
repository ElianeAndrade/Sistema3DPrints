using System.Windows;
using Sistema3DPrints;

namespace Sistema3DPrints
{
    public partial class SistemaWindow : Window
    {
        public SistemaWindow()
        {
            InitializeComponent();
        }

        // Evento para abrir a tela de cadastro de clientes
        private void CadastrarClienteButton_Click(object sender, RoutedEventArgs e)
        {
            // Aqui você pode criar uma nova janela de cadastro de cliente e exibi-la
            ClienteWindow clienteWindow = new ClienteWindow();
            clienteWindow.Show();
            this.Close(); // Fecha a tela do sistema
        }

        // Evento para abrir a tela de cadastro de pedidos
        private void CadastrarPedidoButton_Click(object sender, RoutedEventArgs e)
        {
            // Abre a janela de cadastro de pedidos
            PedidoWindow pedidoWindow = new PedidoWindow();
            pedidoWindow.Show();
            this.Close(); // Fecha a tela do sistema
        }

        // Evento para abrir a tela de cadastro de orçamentos
        private void CadastrarOrcamentoButton_Click(object sender, RoutedEventArgs e)
        {
            // Abre a janela de cadastro de orçamentos
            OrcamentoWindow orcamentoWindow = new OrcamentoWindow();
            orcamentoWindow.Show();
            this.Close(); // Fecha a tela do sistema
        }
    }
}
