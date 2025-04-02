using Dapper;
using MySql.Data.MySqlClient;
using SistemaBackend.Models;
using DotNetEnv;



namespace SistemaBackend.Services;

public class ClienteService
{
    private readonly string _connectionString;

    public ClienteService()
    {
        Env.Load();
        // Construir a string de conexão dinamicamente
        _connectionString = $"Server={Env.GetString("DB_HOST")};" +
                            $"Database={Env.GetString("DB_NAME")};" +
                            $"User={Env.GetString("DB_USER")};" +
                            $"Password={Env.GetString("DB_PASS")};";
    }

    public async Task<IEnumerable<Clientes>> ObterClientes()
    {
        using var conexao = new MySqlConnection(_connectionString);
        string sql = "SELECT * FROM clientes";
        return await conexao.QueryAsync<Clientes>(sql);
    }


}




