using System.Windows;

namespace Sistema3DPrints
{
    public partial class ClienteWindow : Window
    {
        public ClienteWindow()
        {
            InitializeComponent();
        }

        private void SalvarClienteButton_Click(object sender, RoutedEventArgs e)
        {
            string nome = NomeTextBox.Text;
            string email = EmailTextBox.Text;

            // Aqui você pode adicionar lógica para salvar os dados no banco de dados
            MessageBox.Show($"Cliente {nome} cadastrado com sucesso!");
            this.Close();
        }
    }
}
