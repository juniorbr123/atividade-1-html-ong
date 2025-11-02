/* --- CÓDIGO JAVASCRIPT PRINCIPAL (main.js) --- */

// Garante que o código só rode quando o HTML estiver 100% carregado
document.addEventListener('DOMContentLoaded', () => {
    
    /* --- PARTE 1: TEMPLATE DE PROJETOS (Página projetos.html) --- */
    
    // Seleciona o container na página de projetos
    const containerProjetos = document.getElementById('projetos-container');

    // Esta verificação garante que o código SÓ rode na página de projetos
    if (containerProjetos) {
        
        // 1. Dados dos projetos
        const projetos = [
            {
                titulo: 'Projeto Sementinha (Educação Ambiental)',
                imagem: 'img/projeto-educacao.jpg',
                alt: 'Crianças em uma aula ao ar livre sobre plantas.',
                descricao: 'Levamos oficinas de educação ambiental para escolas públicas, ensinando crianças sobre a importância da biodiversidade e do reflorestamento.'
            },
            {
                titulo: 'Horta Comunitária Urbana',
                imagem: 'img/projeto-reflorestamento.jpg',
                alt: 'Horta comunitária verdejante no meio da cidade.',
                descricao: 'Transformamos terrenos baldios em hortas comunitárias produtivas, gerando alimento saudável e fortalecendo os laços da vizinhança.'
            },
            {
                titulo: 'Mutirão Refloresta SP',
                imagem: 'img/home-banner.jpg', // Reutilizando a imagem
                alt: 'Voluntários plantando árvores.',
                descricao: 'Nosso próximo grande mutirão de plantio. Junte-se a nós para reflorestar a Serra da Cantareira. Inscrições abertas!'
            }
        ];

        // 2. Função de Template: Cria o HTML para cada projeto
        projetos.forEach(projeto => {
            const htmlProjeto = `
                <article>
                    <h3>${projeto.titulo}</h3>
                    <img src="${projeto.imagem}" alt="${projeto.alt}">
                    <p>${projeto.descricao}</p>
                </article>
            `;
            // 3. Insere o HTML dinâmico no DOM
            containerProjetos.innerHTML += htmlProjeto;
        });
    } // Fim da lógica da página de Projetos


    /* --- PARTE 2: VALIDAÇÃO DE FORMULÁRIO (Página cadastro.html) --- */

    // Seleciona o formulário na página de cadastro
    const formCadastro = document.getElementById('form-cadastro'); 

    // Esta verificação garante que o código SÓ rode na página de cadastro
    if (formCadastro) {
        
        // Mapeia todos os campos de input que vamos validar
        const campos = {
            nome: document.getElementById('nome'),
            email: document.getElementById('email'),
            cpf: document.getElementById('cpf'),
            telefone: document.getElementById('telefone'),
            cep: document.getElementById('cep'),
            endereco: document.getElementById('endereco'),
            cidade: document.getElementById('cidade'),
            estado: document.getElementById('estado')
        };

        // --- NOVO: Funções de Máscara Automática ---
        // Elas rodam a cada tecla digitada

        function mascaraCPF(input) {
            let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            valor = valor.slice(0, 11); // Limita a 11 dígitos
            
            // Aplica a máscara progressivamente
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); // 000.0
            valor = valor.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3'); // 000.000.0
            valor = valor.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4'); // 000.000.000-00
            input.value = valor;
        }

        function mascaraTelefone(input) {
            let valor = input.value.replace(/\D/g, '');
            valor = valor.slice(0, 11); // Limita a 11 dígitos (DDD + 9 dígitos)

            // Aplica a máscara (00) 00000-0000
            valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); 
            valor = valor.replace(/(\d{5})(\d{1,4})$/, '$1-$2');
            input.value = valor;
        }

        function mascaraCEP(input) {
            let valor = input.value.replace(/\D/g, '');
            valor = valor.slice(0, 8); // Limita a 8 dígitos

            // Aplica a máscara 00000-000
            valor = valor.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
            input.value = valor;
        }

        // --- NOVO: Conecta as máscaras aos inputs ---
        // "Escuta" o evento 'input' (cada vez que o usuário digita algo)
        campos.cpf.addEventListener('input', () => mascaraCPF(campos.cpf));
        campos.telefone.addEventListener('input', () => mascaraTelefone(campos.telefone));
        campos.cep.addEventListener('input', () => mascaraCEP(campos.cep));

        // --- Fim das novas adições de máscara ---


        // Regras de validação (Expressões Regulares)
        const validacoes = {
            nome: (input) => input.value.trim().length >= 3,
            email: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value),
            cpf: (input) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(input.value), // Valida o formato final
            telefone: (input) => /^\(\d{2}\) \d{5}-\d{4}$/.test(input.value), // Valida o formato final
            cep: (input) => /^\d{5}-\d{3}$/.test(input.value), // Valida o formato final
            endereco: (input) => input.value.trim().length >= 5,
            cidade: (input) => input.value.trim().length >= 3,
            estado: (input) => input.value.trim().length === 2
        };

        // Mensagens de erro correspondentes para o usuário
        const mensagensErro = {
            nome: 'O nome deve ter pelo menos 3 caracteres.',
            email: 'Por favor, insira um e-mail válido.',
            cpf: 'Formato de CPF inválido. Use 000.000.000-00.',
            telefone: 'Formato de telefone inválido. Use (00) 00000-0000.',
            cep: 'Formato de CEP inválido. Use 00000-000.',
            endereco: 'O endereço parece curto demais.',
            cidade: 'A cidade deve ter pelo menos 3 caracteres.',
            estado: 'O estado deve ter 2 caracteres (ex: SP).'
        };

        // Função para mostrar o aviso de erro ao usuário
        function mostrarErro(campoNome, mensagem) {
            const input = campos[campoNome];
            const errorDiv = document.getElementById(`error-${campoNome}`);
            
            errorDiv.textContent = mensagem; 
            input.classList.add('invalid'); 
            input.classList.remove('valid');
        }

        // Função para limpar o aviso de erro
        function limparErro(campoNome) {
            const input = campos[campoNome];
            const errorDiv = document.getElementById(`error-${campoNome}`);
            
            errorDiv.textContent = ''; 
            input.classList.remove('invalid');
        }

        // Adiciona o "escutador" de evento ao formulário
        formCadastro.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            let formularioValido = true;
            
            // Valida cada campo do formulário
            for (const nomeCampo in campos) {
                const input = campos[nomeCampo];
                const ehValido = validacoes[nomeCampo](input);
                
                if (!ehValido) {
                    formularioValido = false;
                    mostrarErro(nomeCampo, mensagensErro[nomeCampo]);
                } else {
                    limparErro(nomeCampo);
                    input.classList.add('valid'); 
                }
            }

            // Se tudo estiver correto, mostra o alerta de sucesso
            if (formularioValido) {
                alert('Cadastro enviado com sucesso! Obrigado por se juntar à Raízes do Amanhã.');
                formCadastro.reset(); 
                
                // Remove as classes de validação (bordas verdes)
                for (const nomeCampo in campos) {
                    campos[nomeCampo].classList.remove('valid');
                }
            } else {
                // Se houver erros, avisa o usuário
                alert('Ops! Parece que há erros no seu formulário. Por favor, verifique os campos em vermelho.');
            }
        });
    } // Fim da lógica da página de Cadastro

}); // Fim do DOMContentLoaded