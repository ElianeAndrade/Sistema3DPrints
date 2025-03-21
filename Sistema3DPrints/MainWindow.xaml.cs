using System.Windows;

namespace Sistema3DPrints
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            LoginWindow loginWindow = new LoginWindow();
            loginWindow.Show();
        }

        private void CadastroClienteButton_Click(object sender, RoutedEventArgs e)
        {
            ClienteWindow clienteWindow = new ClienteWindow();
            clienteWindow.Show();
        }

        private void CadastroPedidoButton_Click(object sender, RoutedEventArgs e)
        {
            PedidoWindow pedidoWindow = new PedidoWindow();
            pedidoWindow.Show();
        }

        private void CadastroOrcamentoButton_Click(object sender, RoutedEventArgs e)
        {
            OrcamentoWindow orcamentoWindow = new OrcamentoWindow();
            orcamentoWindow.Show();
        }
    }
}
