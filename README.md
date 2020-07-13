# ♻️ Ecoleta ♻️
 
 Projeto desenvolvido na primeira Next Level Week. <br>
 <a href="https://youtu.be/Vy96B0IjAso">Link do vídeo que apresenta o projeto em funcionamento</a>.

## 💻 Descrição da aplicação

O Ecoleta é um projeto que visa estimular a população a descartar seus resíduos de forma consciente. Ele é constituído por uma plataforma que conecta empresas e entidades de coleta de resíduos (sejam recicláveis e/ou orgânicos) a pessoas que desejam realizar o descarte ecológico. <br>
Para tornar mais fácil sua utilização, o Ecoleta possui as versões web e mobile. Dessa forma, a pessoa pode optar pelo meio que lhe for mais conveniente. <br>
O foco da aplicação é facilitar para que as pessoas encontrem pontos de Coleta. Para tal, é utilizada a sua localização, para que se abra um mapa mostrando os pontos mais próximos.

## ⚙️ Funcionamento
### A primeira etapa, é o cadastro dos Pontos de Coleta de Resíduos <br>
Para tal, é necessário informar:
- Estado e Cidade;
- Localização (coordenadas, que são selecionadas através de um mapa);
- Foto da fachada do estabelecimento;
- Contatos (e-mail e whatsapp);
- Resíduos coletados.

Nesta versão, existem as seguintes categorias de resíduos:
- lâmpadas
- pilhas e baterias
- papéis e papelão
- resíduos eletrônicos
- resíduos orgânicos
- óleo de cozinha

### Para as pessoas que querem descartar os resíduos nestes pontos, o Ecoleta funciona da seguinte forma:
- Abre o mapa mostrando os pontos daquela região;
- O usuário pode selecionar qual tipo de resíduo deseja descartar. Neste caso, os pontos que não coletam tal resíduo, serão omitidos;
- O mapa pode ser manuseado para que o usuário possa verificar qual Ponto lhe é mais conveniente;
- Existem também a possibilidade de entrar em contato com o ponto de coleta, através dos contatos informados no cadastro do mesmo.

### 🌐 Web 🌐 
Site da aplicação

### 📱 Mobile 📱
Aplicativo da Aplicação

## 🛠 Tecnologias Utilizadas
### Servidor 
- <a href="https://nodejs.org">Node.js</a>
- <a href="https://expo.io/">Expo</a>
- <a href="https://www.typescriptlang.org/">TypeScript</a>
- <a href="http://knexjs.org/">Knex</a>
- Sqlite3
- Cors

Para executar:<br>
Dentro da pasta <a href="./server">Server</a> execute: <br>
<code>npm run dev</code> 

### Web
- <a href="https://reactjs.org/">React</a> <a href=""></a>
- <a href="https://www.typescriptlang.org/">TypeScript</a>
- <a href="https://www.npmjs.com/package/axios">Axios</a>
- <a href="https://www.npmjs.com/package/celebrate">Celebrate</a>

Para executar:<br>
Dentro da pasta <a href="./web">Web</a> execute: <br>
<code>npm start</code> 


### Mobile
- <a href="https://reactnative.dev/">React Native</a>
- <a href="https://expo.io/">Expo</a>
- <a href="https://www.npmjs.com/package/axios">Axios</a>

Para executar:<br>
Dentro da pasta <a href="./mobile">Mobile</a> execute: <br>
<code>npm start</code> 
