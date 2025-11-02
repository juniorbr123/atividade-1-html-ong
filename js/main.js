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

        // --- Funções de Máscara Automática ---
        function mascaraCPF(input) {
            let valor = input.value.replace(/\D/g, ''); 
            valor = valor.slice(0, 11); 
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
            valor = valor.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
            input.value = valor;
        }

        function mascaraTelefone(input) {
            let valor = input.value.replace(/\D/g, '');
            valor = valor.slice(0, 11);
            valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); 
            valor = valor.replace(/(\d{5})(\d{1,4})$/, '$1-$2');
            input.value = valor;
        }

        function mascaraCEP(input) {
            let valor = input.value.replace(/\D/g, '');
            valor = valor.slice(0, 8);
            valor = valor.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
            input.value = valor;
        }

        [cite_start]// Conecta as máscaras aos inputs [cite: 599-601]
        campos.cpf.addEventListener('input', () => mascaraCPF(campos.cpf));
        campos.telefone.addEventListener('input', () => mascaraTelefone(campos.telefone));
        campos.cep.addEventListener('input', () => mascaraCEP(campos.cep));

        // Regras de validação (Expressões Regulares)
        const validacoes = {
            nome: (input) => input.value.trim().length >= 3,
            email: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value),
            cpf: (input) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(input.value),
            telefone: (input) => /^\(\d{2}\) \d{5}-\d{4}$/.test(input.value),
            cep: (input) => /^\d{5}-\d{3}$/.test(input.value),
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

        // --- Função para mostrar o aviso de erro (COM ACESSIBILIDADE) ---
        function mostrarErro(campoNome, mensagem) {
            const input = campos[campoNome];
            const errorDiv = document.getElementById(`error-${campoNome}`);
            
            errorDiv.textContent = mensagem; 
            input.classList.add('invalid'); 
            input.classList.remove('valid');

            [cite_start]// Conecta o input à mensagem de erro para leitores de tela [cite: 1555-1564]
            input.setAttribute('aria-invalid', 'true');
            input.setAttribute('aria-describedby', `error-${campoNome}`);
        }

        // --- Função para limpar o aviso (COM ACESSIBILIDADE) ---
        function limparErro(campoNome) {
            const input = campos[campoNome];
            const errorDiv = document.getElementById(`error-${campoNome}`);
            
            errorDiv.textContent = ''; 
            input.classList.remove('invalid');

            [cite_start]// Remove a conexão de erro [cite: 1555-1564]
            input.removeAttribute('aria-invalid');
            input.removeAttribute('aria-describedby');
        }

        // Adiciona o "escutador" de evento ao formulário
        formCadastro.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            let formularioValido = true;
            
            // Valida cada campo do formulário
            for (const nomeCampo in campos) {
                const input = campos[nomeCampo];
                // Verifica se o campo existe antes de validar (evita erros)
                if (input) {
                    const ehValido = validacoes[nomeCampo](input);
                    
                    if (!ehValido) {
                        formularioValido = false;
                        mostrarErro(nomeCampo, mensagensErro[nomeCampo]);
                    } else {
                        limparErro(nomeCampo);
                        input.classList.add('valid'); 
                    }
                }
            }

            // Se tudo estiver correto, mostra o alerta de sucesso
            if (formularioValido) {
                alert('Cadastro enviado com sucesso! Obrigado por se juntar à Raízes do Amanhã.');
                
                [cite_start]// Salva o primeiro nome no localStorage [cite: 1037-1040]
                try {
                    localStorage.setItem('nomeUsuario', campos.nome.value.split(' ')[0]);
                } catch (e) {
                    console.warn('Não foi possível salvar no localStorage.');
                }

                formCadastro.reset(); 
                
                // Remove as classes de validação (bordas verdes)
                for (const nomeCampo in campos) {
                    if (campos[nomeCampo]) {
                        campos[nomeCampo].classList.remove('valid');
                    }
                }
            } else {
                // Se houver erros, avisa o usuário
                alert('Ops! Parece que há erros no seu formulário. Por favor, verifique os campos em vermelho.');
            }
        });
    } // Fim da lógica da página de Cadastro


    /* --- PARTE 3: SAUDAÇÃO (Página index.html) --- */

    // Seleciona o H2 da home
    const saudacaoEl = document.getElementById('saudacao-principal');

    // Esta verificação garante que o código SÓ rode na página Home
    if (saudacaoEl) {
        try {
            [cite_start]// Tenta ler o nome salvo no localStorage [cite: 1037-1040]
            const nomeUsuario = localStorage.getItem('nomeUsuario');
            if (nomeUsuario) {
                // Modifica o DOM para incluir a saudação
                saudacaoEl.textContent = `Olá, ${nomeUsuario}! Bem-vindo(a) de volta!`;
            }
        } catch (e) {
            console.warn('Não foi possível ler do localStorage.');
        }
    } // Fim da lógica da página Home


    /* --- PARTE 4: LÓGICA DO MODO ESCURO (Todas as páginas) --- */

    // Seleciona o botão e o elemento <html>
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // O <html>

    [cite_start]// 1. Verifica no localStorage se o usuário JÁ TEM uma preferência salva [cite: 1037-1040]
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            htmlElement.setAttribute('data-theme', savedTheme);
            // Atualiza o ícone do botão
            if (savedTheme === 'dark') {
                themeToggle.textContent = '🌙';
            } else {
                themeToggle.textContent = '☀️';
            }
        }
    } catch (e) {
        console.warn('Não foi possível ler o tema salvo no localStorage.');
    }


    [cite_start]// 2. Adiciona o "escutador" de clique no botão de tema [cite: 599-601]
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Verifica qual tema está ativo no momento
            const currentTheme = htmlElement.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                // Se estiver escuro, muda para claro
                htmlElement.setAttribute('data-theme', 'light');
                themeToggle.textContent = '☀️';
                try {
                    localStorage.setItem('theme', 'light'); // Salva a preferência
                } catch (e) {
                    console.warn('Não foi possível salvar o tema no localStorage.');
                }
            } else {
                // Se estiver claro (ou nulo), muda para escuro
                htmlElement.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '🌙';
                try {
                    localStorage.setItem('theme', 'dark'); // Salva a preferência
                } catch (e) {
                    console.warn('Não foi possível salvar o tema no localStorage.');
                }
            }
        });
    } // Fim da lógica do Modo Escuro

}); // Fim do DOMContentLoaded