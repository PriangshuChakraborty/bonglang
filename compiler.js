const readFiles = require("./excution");

function lexer(input) {
    const tokens = [];
    let cursor = 0;
    let brackets_stack = [];

    while (cursor < input.length) {
       

        if (/\s/.test(input[cursor])) {
            cursor++;
            continue;
        }

        if (/[A-Za-z]/.test(input[cursor])) {
            let word = "";
            while (/[a-zA-Z0-9_]/.test(input[cursor])) {
                word += input[cursor];
                cursor++;
            }

            if (word === 'eta' || word === 'lekh' || word === 'jodi' || word === 'noito' || word === 'porjonto') {
                
                tokens.push({ type: 'keyword', value: word });
            } else {
                tokens.push({ type: 'identifier', value: word });
            }
        }

        if (/[0-9]/.test(input[cursor])) {
            let number = "";
            while (/[0-9]/.test(input[cursor])||input[cursor] === '.') {
                number += input[cursor];
                cursor++;
            }
            tokens.push({ type: 'number', value: eval(number) });  
        }
        
        if (/[(){}\[\]]/.test(input[cursor])) {
            if (input[cursor] === '{') {
                brackets_stack.push(input[cursor]);
            } else if (input[cursor] === '}') {
                brackets_stack.pop();
            }
            if (brackets_stack.length === 0 && input[cursor] === '}') {
                tokens.push({ type: 'brackets_end', value: input[cursor] })
            } else{
                tokens.push({ type: 'brackets', value: input[cursor] });
        }
             
        }

        if(/(\+|-|\*|\/|=|\!)/.test(input[cursor])){
            tokens.push({ type: 'operator', value: input[cursor] });
        }
        if (input[cursor] === '"') {
            let string = '"';
            cursor++; 
            while (input[cursor] !== '"' && cursor < input.length) {
                string += input[cursor];
                cursor++;
            }
            string += '"';
            tokens.push({ type: 'string', value: string });
        }

        cursor++;
    }
    return tokens;
}

function parser(tokens) { 
    const ast = {
        type: 'Program',
        body: []
    };
    while (tokens.length > 0) {
        let token = tokens.shift()
        if(token.type === 'keyword' && token.value === 'eta'){
            let declaration = {
                type: 'declaration',
                name: tokens.shift().value,
                value: null
            }
            if (tokens[0].type === 'operator' && tokens[0].value === '=') {
                tokens.shift();
                let expression = ''
                
                while (tokens[0]?.type !== 'keyword' && tokens.length > 0) {
                 
                    if (tokens[0]?.type !== 'operator' && tokens[1]?.type === 'identifier'&&tokens[0]?.type !== 'brackets') {
                        expression += tokens.shift().value 
                        break
                    }
                    expression += tokens.shift().value;  
                }
                declaration.value= expression.trim();
            }
            ast.body.push(declaration);
        }

        if (token.type === 'identifier') {
            let equation = {
                type: 'equation',
                name: token.value,
                value: null
            }
            if (tokens[0]?.type === 'operator' && tokens[0].value === '=') {
                tokens.shift();
                let expression = ''
                while (tokens[0]?.type !== 'keyword' && tokens.length > 0) {
                    if (tokens[0]?.type !== 'operator' && tokens[1]?.type === 'identifier'&&tokens[0]?.type !== 'brackets') {
                        expression += tokens.shift().value
                        break
                    }
                    expression += tokens.shift().value;  
                    
                }
                    equation.value= expression.trim();
            }
            ast.body.push(equation);
        }

        if (token.type === 'keyword' && token.value === 'jodi') { 
            
            let conditions = {
                type: 'conditions',
                value: null
            }
            let blockCode = {
                type: 'blockCode',
                conditions:null,
                body: null
            }
            let expression = '';
            if(tokens[0]?.type === 'brackets' && tokens[0].value === '('){
                tokens.shift();
                while (tokens[0]?.type !== 'brackets' && tokens.length > 0 && tokens[0]?.value !== ')') {
                expression += tokens.shift().value;
            }
                conditions.value = expression.trim();
                blockCode.conditions = conditions;
                tokens.shift();
            }
            let blockBody = null;
            let element = []
            if (tokens[0]?.type === 'brackets' && tokens[0].value === '{') {
                tokens.shift();
               
                while (tokens[0].type !== 'brackets_end') {
                    element.push(tokens[0])
                    tokens.shift()
                  
                }
               
                let joined = element.map((el) => el.value).join(' ')
                let joined_tokens = lexer(joined)
                blockBody = parser(joined_tokens);
                blockCode.body = blockBody;
                 tokens.shift();
                
            }
            ast.body.push(blockCode);
        }

         if (token.type === 'keyword' && token.value === 'noito') { 
            let blockCode_else  = {
                type: 'blockCode_else',
                body: null
            }
            let blockBody = null;
            let element = []
            if (tokens[0]?.type === 'brackets' && tokens[0].value === '{') {
                tokens.shift();
               
                while (tokens[0].type !== 'brackets_end') {
                    element.push(tokens[0])
                    tokens.shift()
                  
                }
               
                let joined = element.map((el) => el.value).join(' ')
                let joined_tokens = lexer(joined)
                blockBody = parser(joined_tokens);
                blockCode_else.body = blockBody;
                 tokens.shift();
            }
            ast.body.push(blockCode_else);
        }
        if (token.type === 'keyword' && token.value === 'porjonto') { 
            let conditions = {
                type: 'conditions',
                value: null
            }
            let blockCode_loop = {
                type: 'blockCode_loop',
                conditions:null,
                body: null
            }
            let expression = '';
            if(tokens[0]?.type === 'brackets' && tokens[0].value === '('){
                tokens.shift();
                while (tokens[0]?.type !== 'brackets' && tokens.length > 0 && tokens[0]?.value !== ')') {
                expression += tokens.shift().value;
            }
                conditions.value = expression.trim();
                blockCode_loop.conditions = conditions;
                tokens.shift();
            }
            let blockBody = null;
            let element = []
            if (tokens[0]?.type === 'brackets' && tokens[0].value === '{') {
                tokens.shift();
               
                while (tokens[0].type !== 'brackets_end') {
                    element.push(tokens[0])
                    tokens.shift()
                  
                }
               
                let joined = element.map((el) => el.value).join(' ')
                let joined_tokens = lexer(joined)
                blockBody = parser(joined_tokens);
                blockCode_loop.body = blockBody;
                 tokens.shift();
            }
            ast.body.push(blockCode_loop);
        }

        if(token.type === 'keyword' && token.value === 'lekh'){
            let expression = '';
            while (tokens[0]?.type !== 'keyword' && tokens.length > 0) {
                if (tokens[0]?.type !== 'operator' && tokens[1]?.type === 'identifier'&&tokens[0]?.type !== 'brackets') {
                        expression += tokens.shift().value + ' ' 
                        break
                }
                expression += tokens.shift().value + ' ';
            }
            
            ast.body.push({
                type: 'print',
                value: expression.trim()
            });
        }
    }
    return ast;
}

function codeGenerator(node) {
    switch (node.type) { 
        case 'Program':
            return node.body.map(codeGenerator).join('\n');
        case 'declaration':
            return `let ${node.name} = ${node.value};`;
        case 'equation':
            return ` ${node.name} = ${node.value};`;
        case 'print':
            return `console.log(${node.value});`;
        case 'blockCode':
            return `if(${node.conditions.value}){${node.body.body.map(codeGenerator).join('\n')}}`;
        case 'blockCode_else':
            return `else{${node.body.body.map(codeGenerator).join('\n')}}`;
        case 'blockCode_loop':
            return `while(${node.conditions.value}){${node.body.body.map(codeGenerator).join('\n')}}`;
    }
}

function compiler(input) {
    let tokens = lexer(input);
    let ast = parser(tokens);
    let excutableCode = codeGenerator(ast);
    return excutableCode
}

function runner(input) {
    eval(input)
}
async function main() {
    let data = await readFiles(); 
    runner(compiler(data[0]));
}

main();

