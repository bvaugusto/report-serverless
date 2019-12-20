# report-on-demand

### Serviço para gerar relatórios por demanda de acordo com os dados retornados da tabela report_on_demand no banco reports

### Dependências Dev
    - Instalar as seguintes dependências
        npm install serverless -g
        npm install aws-cli -g
        apt install awscli
        npm start
        
### Tabela

    create table report_on_demand
    (
    	id int auto_increment comment 'ID único do registro',
    	code varchar(20) not null comment 'Código aleatório que sera passado na url para identificar qual relatório sera executado',
    	name varchar(100) null comment 'Primeiro nome do arquivo que será gerado para o relatório',
    	host varchar(100) null comment 'Endereço para acessar o banco de dados',
    	user varchar(20) null comment 'Usuário para autenticação no banco',
    	password varchar(20) null comment 'Senha para autenticação no banco',
    	command varchar(500) null comment 'Script sql que será executado',
    	mail varchar(500) null comment 'Lista de e-mail''s separado por virgula que receberam o relatorio',
    	constraint report_on_demand_pk
    		primary key (id)
    );

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
