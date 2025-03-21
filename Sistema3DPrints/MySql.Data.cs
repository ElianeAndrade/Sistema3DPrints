using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;
using System;

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
}
