using System.Windows;

namespace Sistema3DPrints
{
    public partial class PedidoWindow : Window
    {
        public PedidoWindow()
        {
            InitializeComponent();
        }

        private void SalvarPedidoButton_Click(object sender, RoutedEventArgs e)
        {
            string codigoPedido = CodigoPedidoTextBox.Text;
            string clientePedido = ClientePedidoTextBox.Text;
            string valorPedido = ValorPedidoTextBox.Text;
            string dataPedido = DataPedidoDatePicker.SelectedDate?.ToString("dd/MM/yyyy");

            // Aqui você pode adicionar lógica para salvar os dados no banco de dados
            MessageBox.Show($"Pedido {codigoPedido} de {clientePedido} registrado com sucesso!");
            this.Close();
        }
    }
}
