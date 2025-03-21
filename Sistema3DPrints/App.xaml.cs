//using System.Windows;

//namespace Sistema3DPrints
//{
//    public partial class App : Application
//    {
//        protected override void OnStartup(StartupEventArgs e)
//        {
//            base.OnStartup(e);

//            // Exibe a janela de login
//            LoginWindow login = new LoginWindow();
//            login.ShowDialog(); // Usa ShowDialog para esperar o login ser concluído

//            // Após o login bem-sucedido, abre a MainWindow
//            if (login.Autenticado) // 'Autenticado': Se true autentica e fecha
//            {
//                MainWindow mainWindow = new MainWindow();
//                mainWindow.Show();
//            }
//            else
//            {
//                // Se o login falhar, encerre o aplicativo
//                Application.Current.Shutdown();
//            }
//        }
//    }
//}
