(this["webpackJsonpultimate-tic-tac-toe"]=this["webpackJsonpultimate-tic-tac-toe"]||[]).push([[0],[,,,,,,,,,,,function(e,r,t){},function(e,r,t){},,function(e,r,t){},function(e,r,t){},function(e,r,t){},function(e,r,t){"use strict";t.r(r);var n=t(1),s=t.n(n),a=t(6),c=t.n(a),d=(t(11),t.p+"static/media/title.726388aa.png"),i=t.p+"static/media/logo.24944eed.png",o=(t(12),t(4)),u=function(e){for(var r=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],t=0;t<r.length;t++){var n=Object(o.a)(r[t],3),s=n[0],a=n[1],c=n[2];if(e[s]&&e[s]===e[a]&&e[s]===e[c])return e[s]}return null},b=t(2),j=t(0),l=s.a.createContext(),x={boards:Array(9).fill({squares:Array(9).fill(null),winner:null}),winner:null,stepNumber:0,xIsNext:!0},O=function(e,r){switch(r.type){case"RESTART":return x;case"SET_SUPER_WINNER":return Object(b.a)(Object(b.a)({},e),{},{winner:r.winner});case"SET_WINNER":return Object(b.a)(Object(b.a)({},e),{},{boards:e.boards.map((function(t,n){return n!==r.boardId?t:Object(b.a)(Object(b.a)({},t),{},{winner:e.xIsNext?"O":"X"})}))});case"UPDATE_TURN":return{boards:e.boards.map((function(e,t){return t!==r.boardId?e:Object(b.a)(Object(b.a)({},e),{},{squares:r.squares})})),stepNumber:e.stepNumber+1,xIsNext:!e.xIsNext};default:return e}},h=function(e){var r=e.children,t=Object(n.useReducer)(O,x),s=Object(o.a)(t,2),a=s[0],c=s[1],d=Object(n.useMemo)((function(){return{state:a,dispatch:c}}),[a,c]);return Object(j.jsx)(l.Provider,{value:d,children:r})},p=function(e){var r=Object(n.useContext)(l),t=r.state,s=t.boards,a=t.stepNumber,c=t.xIsNext,d=t.winner,i=r.dispatch;return{boards:s,stepNumber:a,xIsNext:c,winner:d,endGame:81===a,board:s[e],restart:function(){return i({type:"RESTART"})},updateTurn:function(r){return i({type:"UPDATE_TURN",squares:r,boardId:e})},setWinner:function(){return i({type:"SET_WINNER",boardId:e})},setSuperWinner:function(){return i({type:"SET_SUPER_WINNER",winner:u(s.map((function(e){return e.winner})))})}}},I=function(e){var r=e.squareId,t=e.boardId,n=p(t),s=n.board,a=n.xIsNext,c=n.updateTurn;return Object(j.jsx)("button",{className:"square",onClick:function(){return function(){if(!u(s.squares)&&!s.squares[r]){var e=s.squares.slice();e[r]=a?"X":"O",c(e)}}()},children:s.squares[r]})},f=(t(14),t(3)),m=t.n(f),N=(t(15),function(e){var r=e.winner,t=e.superWinner,n="X"===r?"https://contmoura.com.br/wp-content/uploads/2019/09/x-png-icon-8.png":"https://i.imgur.com/rCwsdBw.png";return Object(j.jsx)("div",{className:m()("image-wrapper",{super:t}),children:Object(j.jsx)("img",{width:"100%",height:"100%",className:"image",src:n,alt:r})})}),v=function(e){var r=e.hasBorder,t=void 0!==r&&r,s=e.boardId,a=p(s),c=a.board,d=a.setWinner,i=u(c.squares);return Object(n.useEffect)((function(){i&&d()}),[i]),Object(j.jsxs)("div",{className:"board-wrapper",children:[i&&Object(j.jsx)(N,{winner:i}),Object(j.jsxs)("div",{className:"board-row",children:[Object(j.jsx)(I,{squareId:0,boardId:s}),Object(j.jsx)(I,{squareId:1,boardId:s}),Object(j.jsx)(I,{squareId:2,boardId:s})]}),Object(j.jsxs)("div",{className:"board-row",children:[Object(j.jsx)(I,{squareId:3,boardId:s}),Object(j.jsx)(I,{squareId:4,boardId:s}),Object(j.jsx)(I,{squareId:5,boardId:s})]}),Object(j.jsxs)("div",{className:m()("board-row",{"board-border":t}),children:[Object(j.jsx)(I,{squareId:6,boardId:s}),Object(j.jsx)(I,{squareId:7,boardId:s}),Object(j.jsx)(I,{squareId:8,boardId:s})]})]})},g=(t(16),function(){var e=p(),r=e.winner,t=e.setSuperWinner;return Object(n.useEffect)((function(){t()}),[r]),Object(j.jsxs)("div",{className:"super-board-wrapper",children:[r&&Object(j.jsx)(N,{winner:r,superWinner:!0}),Object(j.jsxs)("div",{className:"board-border-right",children:[Object(j.jsx)(v,{hasBorder:!0,boardId:0}),Object(j.jsx)(v,{hasBorder:!0,boardId:1}),Object(j.jsx)(v,{boardId:2})]}),Object(j.jsxs)("div",{className:"board-border-right",children:[Object(j.jsx)(v,{hasBorder:!0,boardId:3}),Object(j.jsx)(v,{hasBorder:!0,boardId:4}),Object(j.jsx)(v,{boardId:5})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)(v,{hasBorder:!0,boardId:6}),Object(j.jsx)(v,{hasBorder:!0,boardId:7}),Object(j.jsx)(v,{boardId:8})]})]})}),w=function(){var e=p(),r=e.restart,t=e.winner,n=e.endGame;return Object(j.jsxs)("div",{className:"game",children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("img",{id:"imgjogo",src:i,alt:"Jogo da velha"}),Object(j.jsx)("img",{src:d,alt:"Jogo da velha"})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)(g,{}),t?Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{children:["Ganhador: ",t]}),Object(j.jsx)("button",{className:"historyButton",onClick:function(){return r()},children:"V\xe1 para o in\xedcio do jogo"})]}):n&&Object(j.jsxs)("div",{children:[Object(j.jsx)("h1",{children:"Deu velha!"}),Object(j.jsx)("button",{className:"historyButton",onClick:function(){return r()},children:"V\xe1 para o in\xedcio do jogo"})]})]})]})};var q=function(){return Object(j.jsx)(h,{children:Object(j.jsx)(w,{})})},E=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,18)).then((function(r){var t=r.getCLS,n=r.getFID,s=r.getFCP,a=r.getLCP,c=r.getTTFB;t(e),n(e),s(e),a(e),c(e)}))};c.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(q,{})}),document.getElementById("root")),E()}],[[17,1,2]]]);
//# sourceMappingURL=main.7c0558e3.chunk.js.map