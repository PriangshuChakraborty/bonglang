const code = `
eta y=6;
lekh y;
`
function lexer(input) {
    const tokens = [];
    let cursor = 0;

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
            if (word === 'eta'||word === 'lekh') {
                tokens.push({ type: 'keyword', value: word });
            } else {
                tokens.push({ type: 'identifier', value: word });
            }
        }

        if ((/[0-9]/.test(input[cursor]))) {
            let number = "";
            while (/[0-9]/.test(input[cursor])||input[cursor] === '.') {
                number += input[cursor];
                cursor++;
            }
            tokens.push({ type: 'number', value: eval(number) });  
        }

        if(/(\+|-|\*|\/|=)/.test(input[cursor])){
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
                while (tokens[0].type !== 'keyword' && tokens.length > 0) {
                    if (tokens[0].type !== 'operator' && tokens[1].type === 'identifier') {
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
            if (tokens[0].type === 'operator' && tokens[0].value === '=') {
                tokens.shift();
                let expression = ''
                while (tokens[0].type !== 'keyword' && tokens.length > 0) {
                    if (tokens[0].type !== 'operator' && tokens[1].type === 'identifier') {
                        expression += tokens.shift().value 
                        break
                    }
                    expression += tokens.shift().value;  
                }
                    equation.value= expression.trim();
            }
            ast.body.push(equation);
        }

        if(token.type === 'keyword' && token.value === 'lekh'){
            let expression = '';
            while (tokens[0]?.type !== 'keyword' && tokens.length > 0) {
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
    }
}

function compiler(input) {
    let tokens = lexer(input);
    console.log(tokens)
    let ast = parser(tokens);
    console.log(ast)
    let excutableCode = codeGenerator(ast);
    console.log(excutableCode)
    return excutableCode
}

function runner(input) {
    eval(input)
}

runner(compiler(code));