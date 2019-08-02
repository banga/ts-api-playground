"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
function visit(sourceFile) {
    visitNode(sourceFile);
    function visitNode(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
                for (const decorator of node.decorators) {
                    switch (decorator.expression.kind) {
                        case ts.SyntaxKind.CallExpression:
                            const mixinIds = decorator.expression
                                .arguments;
                            mixinIds.forEach(mixinId => {
                                const symbol = checker.getSymbolAtLocation(mixinId);
                                const declType = checker.getDeclaredTypeOfSymbol(symbol);
                                if (declType.symbol.members) {
                                    const members = declType.symbol.members;
                                    console.log("\n" + node.name.text);
                                    for (const [memberName, memberSymbol] of members) {
                                        console.log("-", memberName);
                                    }
                                }
                            });
                            break;
                    }
                }
                break;
        }
        ts.forEachChild(node, visitNode);
    }
    function report(node, message) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
        console.log(`${sourceFile.fileName} (${line + 1},${character + 1}): ${message}`);
    }
}
exports.visit = visit;
const fileNames = process.argv.slice(2);
let program = ts.createProgram(fileNames, {
    target: ts.ScriptTarget.ES2018,
    module: ts.ModuleKind.ES2015,
    jsx: ts.JsxEmit.React
});
// Get the checker, we will use it to find more about classes
const checker = program.getTypeChecker();
// Visit every sourceFile in the program
for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
        // Walk the tree to search for classes
        ts.forEachChild(sourceFile, visit);
    }
}
