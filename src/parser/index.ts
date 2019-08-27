import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'
import * as lexer from './SimpleFilterLexer'
import * as parser from './SimpleFilterParser'
import { SimpleFilterListener } from './SimpleFilterListener'
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker'

export class TestListener implements SimpleFilterListener {
  enterRelExpression(ctx: parser.RelExpressionContext) {
    console.log('Identifier found: ' + ctx.IDENTIFIER().text)
  }
}

export function evaluateExpression(input: string) {
  const is = new ANTLRInputStream(input)
  const lex = new lexer.SimpleFilterLexer(is)
  const ts = new CommonTokenStream(lex)
  const sfp = new parser.SimpleFilterParser(ts)
  const tree = sfp.filter()
  console.log('ParseTree:\n\n' + tree.toStringTree(sfp))

  const listener: SimpleFilterListener = new TestListener()
  ParseTreeWalker.DEFAULT.walk(listener, tree)
}
