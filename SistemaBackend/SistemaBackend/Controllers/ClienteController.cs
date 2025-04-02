using System.Configuration;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;
using SistemaBackend.Models;
using SistemaBackend.Services;
using DotNetEnv;



namespace SistemaBackend.Controllers;
[ApiController]
[Route("api/cliente")]
public class ClienteController : ControllerBase
{
    private readonly ClienteService _clienteService;
    private string _connectionString;

    public ClienteController(ClienteService clienteService)
    {
        _clienteService = clienteService;
        Env.Load();
        // Construir a string de conexão dinamicamente
        _connectionString = $"Server={Env.GetString("DB_HOST")};" +
                            $"Database={Env.GetString("DB_NAME")};" +
                            $"User={Env.GetString("DB_USER")};" +
                            $"Password={Env.GetString("DB_PASS")};";
    }

    [HttpGet("buscaClientes")]
    public async Task<IActionResult> ObterClientes([FromQuery] string? filtro, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        using var conexao = new MySqlConnection(_connectionString);

        // 🔹 Conta o número total de clientes filtrados
        string countSql = "SELECT COUNT(*) FROM clientes WHERE (@Filtro IS NULL OR nome LIKE CONCAT('%', @Filtro, '%') OR id = @Filtro)";
        int total = await conexao.ExecuteScalarAsync<int>(countSql, new { Filtro = string.IsNullOrEmpty(filtro) ? null : filtro });

        // 🔹 Pega os clientes filtrados, com paginação
        string sql = @"
        SELECT * FROM clientes
        WHERE (@Filtro IS NULL OR nome LIKE CONCAT('%', @Filtro, '%') OR id = @Filtro)
        LIMIT @PageSize OFFSET @Offset";

        var parametros = new
        {
            Filtro = string.IsNullOrEmpty(filtro) ? null : filtro,
            PageSize = pageSize,
            Offset = (page - 1) * pageSize
        };

        var clientes = await conexao.QueryAsync<Clientes>(sql, parametros);

        return Ok(new { clientes, total }); // ✅ Retorna também o total
    }


    [HttpPost("novoCliente")]
    public async Task<IActionResult> CriarCliente([FromBody] Clientes novoCliente)
    {
        if (string.IsNullOrWhiteSpace(novoCliente.Nome))
            return BadRequest("O nome é obrigatório.");

        using var conexao = new MySqlConnection(_connectionString);
        string sql = @"
        INSERT INTO clientes (nome, cpf, email, telefone, endereco, cidade, data_cadastro, observacao)
        VALUES (@Nome, @Cpf, @Email, @Telefone, @Endereco, @Cidade, NOW(), @Observacao)";

        await conexao.ExecuteAsync(sql, novoCliente);
        return Ok("Cliente cadastrado com sucesso.");
    }

    [HttpPut("atualizaClientes/{id}")]
    public async Task<IActionResult> AtualizarCliente(int id, [FromBody] Clientes clienteAtualizado)
    {
        using var conexao = new MySqlConnection(_connectionString);
        string sql = @"
        UPDATE clientes
        SET nome = @Nome, cpf = @Cpf, email = @Email, telefone = @Telefone, 
            endereco = @Endereco, cidade = @Cidade, observacao = @Observacao
        WHERE id = @Id";

        clienteAtualizado.Id = id;
        int linhasAfetadas = await conexao.ExecuteAsync(sql, clienteAtualizado);

        if (linhasAfetadas == 0)
            return NotFound("Cliente não encontrado.");

        return Ok("Cliente atualizado com sucesso.");
    }

    [HttpDelete("deletaClientes/{id}")]
    public async Task<IActionResult> DeletarCliente(int id)
    {
        using var conexao = new MySqlConnection(_connectionString);
        string sql = "DELETE FROM clientes WHERE id = @Id";

        int linhasAfetadas = await conexao.ExecuteAsync(sql, new { Id = id });

        if (linhasAfetadas == 0)
            return NotFound("Cliente não encontrado.");

        return Ok("Cliente excluído com sucesso.");
    }






}




