using System.Security.Cryptography;
using System.Text;
using Dapper;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;
using DotNetEnv;
using SistemaBackend.Models;


namespace SistemaBackend.Services;

public class UsuarioService
{
    private readonly string _connectionString;

    public UsuarioService()
    {
        Env.Load();
        // Construir a string de conexão dinamicamente
        _connectionString = $"Server={Env.GetString("DB_HOST")};" +
                            $"Database={Env.GetString("DB_NAME")};" +
                            $"User={Env.GetString("DB_USER")};" +
                            $"Password={Env.GetString("DB_PASS")};";
    }

    public async Task<Usuario?> ValidarLogin(string email, string senha)
    {
        using var conexao = new MySqlConnection(_connectionString);
        string sql = "SELECT * FROM usuario WHERE email = @email";

        var usuario = await conexao.QueryFirstOrDefaultAsync<Usuario>(sql, new { Email = email });

        if (usuario == null)
        {
            return null;
        }
        
       //descriptografa a senha 
        string senhaCriptografada = HashMD5(senha);
        if (usuario.Senha != senhaCriptografada)
        {
            return null;
        }

        return usuario;

    }

    //descriptografa a senha 
    string HashMD5(string senha)
    {
        using var md5 = MD5.Create();
        byte[] inputBytes = Encoding.UTF8.GetBytes(senha);
        byte[] hashBytes = md5.ComputeHash(inputBytes);
        return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
    }


    public async Task<IEnumerable<Clientes>> ObterClientes()
    {
        using var conexao = new MySqlConnection(_connectionString);
        string sql = "SELECT * FROM clientes";
        return await conexao.QueryAsync<Clientes>(sql);
    }


}




