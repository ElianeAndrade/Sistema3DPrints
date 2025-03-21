using System.Windows;

namespace Sistema3DPrints;

    public partial class OrcamentoWindow : Window
    {
        public OrcamentoWindow()
        {
            InitializeComponent();
        }

        private void SalvarOrcamentoButton_Click(object sender, RoutedEventArgs e)
        {
            string codigoOrcamento = CodigoOrcamentoTextBox.Text;
            string clienteOrcamento = ClienteOrcamentoTextBox.Text;
            string valorOrcamento = ValorOrcamentoTextBox.Text;
            string dataOrcamento = DataOrcamentoDatePicker.SelectedDate?.ToString("dd/MM/yyyy");

            // Aqui você pode adicionar lógica para salvar os dados no banco de dados
            MessageBox.Show($"Orçamento {codigoOrcamento} de {clienteOrcamento} registrado com sucesso!");
            this.Close();
        }
    }

