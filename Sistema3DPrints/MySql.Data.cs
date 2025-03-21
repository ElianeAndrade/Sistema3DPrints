using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;
using System;
using System.Windows;

public class BancoDeDados
{
    private string conexaoString = "Server=srv461.hstgr.io;Database=u802695155_3d;Uid=u802695155_root;Pwd=.Donibus459);";

    public MySqlConnection Conectar()
    {
        MySqlConnection conexao = new MySqlConnection(conexaoString);
        try
        {
            conexao.Open();
            Console.WriteLine("Conectado com sucesso!");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Erro ao conectar: " + ex.Message);
        }
        return conexao;
    }

    //public void TestarConsulta()
    //{
    //    using (MySqlConnection conexao = new MySqlConnection(conexaoString))
    //    {
    //        try
    //        {
    //            conexao.Open();
    //            string query = "SELECT nome FROM clientes LIMIT 1"; // Pegando só um nome
    //            MySqlCommand cmd = new MySqlCommand(query, conexao);
    //            object resultado = cmd.ExecuteScalar();

    //            if (resultado != null)
    //            {
    //                MessageBox.Show($"Primeiro cliente: {resultado.ToString()}", "Teste Banco", MessageBoxButton.OK, MessageBoxImage.Information);
    //            }
    //            else
    //            {
    //                MessageBox.Show("Nenhum cliente encontrado!", "Teste Banco", MessageBoxButton.OK, MessageBoxImage.Warning);
    //            }
    //        }
    //        catch (Exception ex)
    //        {
    //            MessageBox.Show($"Erro: {ex.Message}", "Erro no Banco", MessageBoxButton.OK, MessageBoxImage.Error);
    //        }
    //    }
    //}

}


