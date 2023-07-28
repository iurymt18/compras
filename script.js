class Produto {

    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }
    
    // 1 - função que lê a entrada de informação
    lerDados(){
    
        //declara o objeto
        let produto = {}
    
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;
        produto.quantidade = document.getElementById('quantidade').value;

    
            //retorna as informações do objeto a quem usou a função
            return produto;  
    }
    
    salvar(){
    //usa a função que lê dados digitados e salva no objeto produto
    let produto = this.lerDados();
    
    if (this.validaCampos(produto)){
        if(this.editId ==null){
            //mandando produto //se o id for nulo, trata-se de uma operação de inclusão
            this.adicionar(produto);
        } else{
            this.atualizar(this.editId, produto);
        }
    
    }
    
    //atualiza tabela
    this.listaTabela();
    this.cancelar();
    this.total();
    
    }
    
    validaCampos(produto){
        let msg = '';
    
        if(produto.nomeProduto == ''){
            msg += ' - Informe o Nome do Produto \n';
    
        }
        if(produto.preco == ''){
            msg += ' - Informe o Preço do Produto \n';
            
        }
        if(produto.quantidade == ''){
            msg += ' - Informe q quantidade'
        }
    
        if(msg != ''){
            alert(msg);
            return false;
        }
    
        return true;
    
    }
    
    //recebendo produto
    adicionar(produto){
        produto.preco = parseFloat(produto.preco);
        this.arrayProdutos.push(produto);
        this.id++;
       
    }
    
    //recebendo dados
    atualizar(id, produto){
        for( let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id ==id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
                this.arrayProdutos[i].quantidade = produto.quantidade;
                
            }
        }
    }
    
    //recebendo dados para editar
    preparaEdicao(dados){
        this.editId = dados.id;
        
          //preenchedo o input com os dados recebidos
          document.getElementById("produto").value = dados.nomeProduto;
          document.getElementById("preco").value = dados.preco;
          document.getElementById("quantidade").value = dados.preco;

        
        document.getElementById("btn1").innerText = "Atualizar";
        
        }
    
    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText='';
        for (let i = 0; i < this.arrayProdutos.length; i++){
    
            //cria uma linha, ou seja, insere o elemento linha
            let tr = tbody.insertRow();
    
            //cria as colunas na linha, ou seja, insere os elementos coluna
            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_quantidade = tr.insertCell();
            let td_acoes = tr.insertCell();

    
            //preenche os elementos criados anteriormente, e os preenche com os dados do objeto
            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].preco;
            td_quantidade.innerText = this.arrayProdutos[i].quantidade;

         
            //centraliza o id, apenas uma formatação
            td_id.classList.add('center');
    
            //incluindo a imagem dos botões
            let imgEdit = document.createElement('img');
            imgEdit.src = 'https://t4.ftcdn.net/jpg/03/38/46/23/240_F_338462346_wZZhUA9S6daekMfyuF8cBssJgj4nao8M.jpg';
           //mandando dados para editar
            imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");
            td_acoes.appendChild(imgEdit);
    
            let imgDelete = document.createElement('img');
            imgDelete.src = 'https://as1.ftcdn.net/v2/jpg/02/58/95/14/500_F_258951445_Md7JDFw3Qj4LPTorWUYdImTzS49fSnOf.jpg';
    
            //passando parametro pra função deletar
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");
    
            td_acoes.appendChild(imgDelete);
    
    
        }
    }
    
    //limpa as informações dos inputs
    cancelar(){
    
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';
        document.getElementById('quantidade').value = '';

    
        document.getElementById("btn1").innerText = "Salvar"
        this.editId = null;
      
    }
    
    //recebendo o parametro id do objeto
    deletar(id){
        if(confirm("Deseja realmente deletar o produto do ID " + id + " ?")){
    
            //pega o elemento tbody
        let tbody = document.getElementById('tbody');
    
        for (let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
    
                //deleta do array
                this.arrayProdutos.splice(i,1);
                //deleta da tabela html
                tbody.deleteRow(i);
            }
        }
        }  
    }
    
    soma(array){
        var total = 0

            for (let i = 0; i < this.arrayProdutos.length; i++){
            var quantidade = Number(this.arrayProdutos[i].quantidade);
            var preco = this.arrayProdutos[i].preco
            
            
            
            console.log(this.arrayProdutos[i].preco)
            console.log(quantidade)
            total = total + (preco * quantidade);

        }
        return total;


    }
    //atualizando valor total
    total(){
        var labeltotal = document.getElementById('labeltotal')
        var valor = this.soma(this.arrayProdutos)
        labeltotal.innerText = 'Total: ' + valor +' R$'
    }
    
    
    }
    
    var produto = new Produto();