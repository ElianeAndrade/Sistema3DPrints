namespace SistemaBackend.Models;

public class Clientes
{
    public int Id { get; set; } // PK, gerado automaticamente no banco
    public string Nome { get; set; } // Obrigatório
    public string? Cpf { get; set; }
    public string? Email { get; set; }
    public string? Telefone { get; set; }
    public string? Endereco { get; set; }
    public string? Cidade { get; set; }
    public DateTime DataCadastro { get; set; } // Automático
    public string? Observacao { get; set; }
}
