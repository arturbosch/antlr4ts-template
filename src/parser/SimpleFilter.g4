grammar SimpleFilter;

filter: sortableExpression ('AND' sortableExpression)*;

sortableExpression: expression (sortby (asc | dsc))*;

expression:
	expression OR expression				# orExpression
	| expression AND expression				# andExpression
	| LPAREN expression RPAREN				# parenthesisExpression
	| IDENTIFIER relationalOperator value	# relExpression;

OR: '|';
AND: '&';
sortby: 'SORT BY' | 'sort by';
asc: 'ASC' | 'asc';
dsc: 'DSC' | 'dsc';

relationalOperator:
	EQ
	| NEQ
	| EQLESS
	| EQGREATER
	| GREATER
	| LESS;

value: NUMBER | STRING;

IDENTIFIER: VALID_ID_START VALID_ID_CHAR*;
fragment VALID_ID_START: ('a' .. 'z') | ('A' .. 'Z') | '_';
fragment VALID_ID_CHAR: VALID_ID_START | ('0' .. '9');

STRING: '"' SAFECODEPOINT* '"';
fragment SAFECODEPOINT: ~ ["\\\u0000-\u001F];

NUMBER: '-'? INT ('.' [0-9]+)? EXP?;
fragment INT: '0' | [1-9] [0-9]*;
fragment EXP: [Ee] [+\-]? INT;

EQ: '=';
NEQ: '!=';
EQLESS: '<=';
EQGREATER: '>=';
GREATER: '>';
LESS: '<';

RPAREN: ')';
LPAREN: '(';

WS: [ \t\n\r]+ -> skip;
