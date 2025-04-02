using Microsoft.AspNetCore.Mvc;
using SistemaBackend.Models;
using SistemaBackend.Services;
using DotNetEnv;



namespace SistemaBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly UsuarioService _usuarioService;

    public LoginController(UsuarioService usuarioService)
    {
        _usuarioService = usuarioService;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] UsuarioLoginDTO loginDTO)
    {
        var usuario = await _usuarioService.ValidarLogin(loginDTO.Email, loginDTO.Senha);
        if (usuario == null)
        {
            return Unauthorized(new { mensagem = "Credenciais inválidas!" });
        }

        return Ok(new { mensagem = "Login realizado com sucesso!" });
    }

}

public class UsuarioLoginDTO
{
    public string Email { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;
}



