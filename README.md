# report-on-demand

### Serviço para gerar relatórios

### Dependências Dev
    - Instalar as seguintes dependências
        npm install serverless -g
        npm install aws-cli -g
        apt install awscli
        npm start

### Serverless

> Necessário renomear o arquivo serverless-sample.yml para serverless.yml e inserir os valores para os parâmetros que estão vazios em "environment"  

    BUCKET: nome do bucket que irá armazenar os arquivos .csv
    AWS_ACCESS_KEY_ACCOUNT: chave de acesso da API
    AWS_SECRET_ACCESS_KEY_ACCOUNT: senha de acesso para a API
    EMAIL_USER_ACCOUNT: endereço de e-mail responsável por enviar os relatórios para os usuários 
    PASSWORD_ACCOUNT_EMAIL: senha do EMAIL_USER_ACCOUNT
    DB_HOST_CONFIG: host onde ficará a tablea report_on_demand
    DB_USER_CONFIG: usuário de acesso ao banco
    DB_PASSWORD_CONFIG: senha do usuário
    DB_DATABASE_CONFIG: banco de dados onde será criada a tabela report_on_demand
    
### Rota
    
    GET /search/{codigo}
    
### Deploy
    
  - Configurar credenciais da aws
  
        aws configure
        
  - Executar o comando
  
        serverless deploy
