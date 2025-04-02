using Dapper;
using DotNetEnv;
using MySql.Data.MySqlClient;
using SistemaBackend.Models;



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

    public async Task<object> ObterClientesPaginados(int page, int pageSize)
    {
        using var conexao = new MySqlConnection(_connectionString);

        string sql = "SELECT * FROM clientes LIMIT @PageSize OFFSET @Offset";
        var clientes = await conexao.QueryAsync<Clientes>(sql, new { PageSize = pageSize, Offset = (page - 1) * pageSize });

        string countSql = "SELECT COUNT(*) FROM clientes";
        int total = await conexao.ExecuteScalarAsync<int>(countSql);

        return new { clientes, total };
    }


}




