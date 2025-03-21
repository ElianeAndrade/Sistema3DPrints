using Sistema3DPrints;
using System.Windows;

namespace Sistema3DPrints;

public partial class LoginWindow : Window
{
    public LoginWindow()
    {
        InitializeComponent();
    }

    private void EntrarButton_Click(object sender, RoutedEventArgs e)
    {
        string usuario = UsuarioTextBox.Text;
        string senha = SenhaPasswordBox.Password;

        if (ValidarLogin(usuario, senha))
        {
            // Se o login for válido, abre a tela do sistema
            SistemaWindow sistemaWindow = new SistemaWindow();
            sistemaWindow.Show();
            this.Close(); // Fecha a tela de login
        }
        else
        {
            MessageBox.Show("Usuário ou senha inválidos", "Erro", MessageBoxButton.OK, MessageBoxImage.Error);
        }
    }

    private bool ValidarLogin(string usuario, string senha)
    {
        // Lógica de autenticação com dados fixos
        return usuario == "admin" && senha == "1234"; // Exemplo simples
    }
}
